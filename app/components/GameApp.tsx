"use client";

import { useEffect, useMemo, useState } from "react";
import { useGame } from "../context/GameContext";
import { usePoorViewport } from "../hooks/usePoorViewport";
import { collectibleDefs } from "../data/collectibles";
import { scenes } from "../data/scenes";
import {
  createFreshProgress,
  getAchievementState,
  hasContinuableProgress,
} from "../lib/game-state";
import {
  preloadAudio,
  preloadImage,
  preloadSceneTypes,
  scheduleIdlePreload,
} from "../lib/asset-cache";
import { SOUNDS } from "../lib/audio-config";
import GameScreen from "./GameScreen";
import MainMenu from "./MainMenu";
import ToastLayer from "./ToastLayer";

function ViewportWarningOverlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm">
      <div
        className="border-2 border-[#4a6a1a] bg-[#0b1208] p-8 max-w-xs w-full text-center"
        style={{ boxShadow: "0 0 0 1px #3e4a36, 0 0 40px rgba(245,208,108,0.13)" }}
      >
        <p className="text-[28px] mb-4 text-[#8aaa40]">⚠</p>
        <p className="text-[13px] text-game-text font-pixel mb-4 leading-relaxed tracking-wide">
          화면 비율 조정 필요
        </p>
        <p className="text-[12px] text-game-accent font-mono leading-relaxed">
          현재 화면 높이가 낮아<br />게임이 제대로 표시되지 않습니다.
        </p>
        <p className="text-[11px] text-[#5a7a30] font-mono mt-2.5 leading-relaxed">
          브라우저 창을 최대화하거나<br />화면 배율을 낮춰 주세요.
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="mt-6 w-full px-4 py-2.5 border border-[#2c3f12] hover:border-[#4a6a1a] bg-[#0f1a08] hover:bg-[#162010] text-[12px] text-[#5a7a30] hover:text-game-accent font-mono transition-colors cursor-pointer"
        >
          그냥 계속하기
        </button>
      </div>
    </div>
  );
}

export default function GameApp() {
  const {
    state,
    dispatch,
    toasts,
    dismissToast,
    achievements,
    syncPush,
    syncPull,
    pushToast,
  } = useGame();
  const { progress, settings, screen, syncStatus, syncBusy, booted } = state;

  const isPoorViewport = usePoorViewport();
  const [viewportDismissed, setViewportDismissed] = useState(false);

  // 화면이 정상 크기로 돌아오면 dismissed 리셋 (다시 작아지면 재표시)
  useEffect(() => {
    if (!isPoorViewport) setViewportDismissed(false);
  }, [isPoorViewport]);

  const sceneById = useMemo(
    () => new Map(scenes.map((s) => [s.id, s])),
    [],
  );

  // Asset preload on boot
  useEffect(() => {
    if (!booted) return;
    preloadImage("/menu-bg.png");
    preloadAudio(SOUNDS.may);
    preloadAudio(SOUNDS.march);
  }, [booted]);

  // Scene asset preload on scene change
  useEffect(() => {
    if (!booted) return;
    const activeScene = sceneById.get(progress.currentSceneId) ?? sceneById.get("start");
    if (!activeScene) return;
    const nextTypes = activeScene.choices.flatMap((c) => {
      const next = sceneById.get(c.nextSceneId);
      return next ? [next.sceneType] : [];
    });
    return scheduleIdlePreload(() => {
      preloadSceneTypes([activeScene.sceneType, ...nextTypes]);
    });
  }, [booted, progress.currentSceneId, sceneById]);

  const viewportOverlay =
    isPoorViewport && !viewportDismissed ? (
      <ViewportWarningOverlay onDismiss={() => setViewportDismissed(true)} />
    ) : null;

  if (screen === "game") {
    return (
      <>
        <GameScreen />
        <ToastLayer toasts={toasts} onDismiss={dismissToast} />
        {viewportOverlay}
      </>
    );
  }

  return (
    <>
      <MainMenu
        onStart={() => dispatch({ type: "SET_SCREEN", screen: "game" })}
        canContinue={hasContinuableProgress(progress)}
        progress={progress}
        settings={settings}
        achievements={achievements}
        syncStatus={syncStatus}
        syncBusy={syncBusy}
        onSettingsChange={(patch) => dispatch({ type: "PATCH_SETTINGS", patch })}
        onLogin={() => { window.location.href = "/api/auth/datagsm/login"; }}
        onLogout={() => {
          void fetch("/api/auth/datagsm/logout", { method: "POST" })
            .then(() => {
              pushToast("DataGSM 계정에서 로그아웃했습니다.", "success");
              dispatch({
                type: "SET_SYNC_STATUS",
                status: { ...syncStatus, authenticated: false, user: null },
              });
            })
            .catch(() => pushToast("로그아웃 중 문제가 생겼습니다.", "error"));
        }}
        onPull={() => { void syncPull(); }}
        onPush={() => { void syncPush(); }}
        onResetProgress={() => {
          dispatch({ type: "SET_PROGRESS", progress: createFreshProgress() });
          pushToast("이 기기의 진행 기록을 초기화했습니다.", "success");
        }}
        onResetServerData={async () => {
          try {
            const res = await fetch("/api/sync", { method: "DELETE" });
            if (!res.ok) {
              const data = (await res.json()) as { message?: string };
              throw new Error(data.message ?? "서버 데이터를 삭제하지 못했습니다.");
            }
            dispatch({
              type: "SET_SYNC_STATUS",
              status: { ...syncStatus, lastSyncedAt: null },
            });
            pushToast("서버에 저장된 데이터를 삭제했습니다.", "success");
          } catch (e) {
            pushToast(
              e instanceof Error ? e.message : "서버 데이터 삭제에 실패했습니다.",
              "error",
            );
          }
        }}
      />
      <ToastLayer toasts={toasts} onDismiss={dismissToast} />
      {viewportOverlay}
    </>
  );
}
