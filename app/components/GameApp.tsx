"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useGame } from "../context/GameContext";
import { usePoorViewport } from "../hooks/usePoorViewport";
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
import { requestFullscreen } from "../lib/fullscreen";
import { useIsFullscreen } from "../hooks/useIsFullscreen";
import type { GameProgress } from "../types";
import FullscreenPrompt from "./FullscreenPrompt";
import GameScreen from "./GameScreen";
import MainMenu from "./MainMenu";
import SettingsModal from "./SettingsModal";
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

function ContinuePrompt({
  progress,
  onContinue,
  onFresh,
}: {
  progress: GameProgress;
  onContinue: () => void;
  onFresh: () => void;
}) {
  const btnBase: React.CSSProperties = {
    display: "block",
    width: "100%",
    border: "1.5px solid",
    padding: "12px",
    fontFamily: "'DungGeunMo', monospace",
    fontSize: 13,
    cursor: "pointer",
    transition: "background 0.1s, border-color 0.1s, color 0.1s",
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-game-bg">
      <Image
        src="/menu-bg.png"
        alt=""
        fill
        quality={100}
        className="object-cover object-bottom"
        style={{ imageRendering: "pixelated", opacity: 0.25 }}
      />
      <div
        className="relative z-10 bg-game-panel p-8 w-[320px]"
        style={{
          border: "2px solid var(--color-game-border-bright)",
          boxShadow: "0 0 0 2px var(--color-game-border), 0 0 40px rgba(245,208,108,0.1)",
        }}
      >
        <p
          className="text-center mb-1.5"
          style={{ fontSize: 10, color: "var(--color-game-text-muted)", fontFamily: "'DungGeunMo', monospace", letterSpacing: "2px" }}
        >
          저장된 기록 발견
        </p>
        <p
          className="text-center mb-2"
          style={{ fontSize: 14, color: "var(--color-game-text)", fontFamily: "'DungGeunMo', monospace" }}
        >
          이어서 하시겠습니까?
        </p>
        <p
          className="text-center mb-7"
          style={{ fontSize: 11, color: "var(--color-game-text-muted)", fontFamily: "monospace" }}
        >
          {progress.sceneIndex - 1}번의 선택 기록이 있습니다
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            type="button"
            onClick={onContinue}
            style={{
              ...btnBase,
              borderColor: "var(--color-game-border-bright)",
              background: "#0f2420",
              color: "var(--color-game-accent)",
            }}
          >
            이어서 하기
          </button>
          <button
            type="button"
            onClick={onFresh}
            style={{
              ...btnBase,
              borderColor: "var(--color-game-border)",
              background: "var(--color-game-panel)",
              color: "var(--color-game-text-dim)",
            }}
          >
            새로 시작
          </button>
        </div>
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
    syncPush,
    syncPull,
    pushToast,
  } = useGame();
  const { progress, settings, screen, syncStatus, syncBusy, booted } = state;

  const isPoorViewport = usePoorViewport();
  const isFullscreen = useIsFullscreen();
  const [viewportDismissed, setViewportDismissed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [continuePromptDone, setContinuePromptDone] = useState(false);

  useEffect(() => {
    if (!isPoorViewport) setViewportDismissed(false);
  }, [isPoorViewport]);

  const sceneById = useMemo(
    () => new Map(scenes.map((s) => [s.id, s])),
    [],
  );

  useEffect(() => {
    if (!booted) return;
    preloadImage("/menu-bg.png");
    preloadAudio(SOUNDS.may);
    preloadAudio(SOUNDS.march);
  }, [booted]);

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

  const canContinue = hasContinuableProgress(progress);
  const showContinuePrompt = booted && canContinue && !continuePromptDone;

  const settingsProps = {
    settings,
    syncStatus,
    syncBusy,
    onClose: () => setSettingsOpen(false),
    onSettingsChange: (patch: Partial<typeof settings>) =>
      dispatch({ type: "PATCH_SETTINGS", patch }),
    onLogin: () => { window.location.href = "/api/auth/datagsm/login"; },
    onLogout: () => {
      void fetch("/api/auth/datagsm/logout", { method: "POST" })
        .then(() => {
          pushToast("DataGSM 계정에서 로그아웃했습니다.", "success");
          dispatch({
            type: "SET_SYNC_STATUS",
            status: { ...syncStatus, authenticated: false, user: null },
          });
        })
        .catch(() => pushToast("로그아웃 중 문제가 생겼습니다.", "error"));
    },
    onPull: () => { void syncPull(); },
    onPush: () => { void syncPush(); },
    onResetProgress: () => {
      dispatch({ type: "SET_PROGRESS", progress: createFreshProgress() });
      pushToast("이 기기의 진행 기록을 초기화했습니다.", "success");
    },
    onResetServerData: async () => {
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
    },
  };

  const viewportOverlay =
    isPoorViewport && !viewportDismissed ? (
      <ViewportWarningOverlay onDismiss={() => setViewportDismissed(true)} />
    ) : null;

  const achievementViews = getAchievementState(progress);

  if (showContinuePrompt) {
    return (
      <>
        <ContinuePrompt
          progress={progress}
          onContinue={() => {
            requestFullscreen();
            setContinuePromptDone(true);
            dispatch({ type: "SET_SCREEN", screen: "game" });
          }}
          onFresh={() => {
            dispatch({ type: "SET_PROGRESS", progress: createFreshProgress() });
            dispatch({ type: "SET_SCREEN", screen: "menu" });
            setContinuePromptDone(true);
          }}
        />
        {viewportOverlay}
      </>
    );
  }

  if (screen === "game") {
    return (
      <>
        <GameScreen onOpenSettings={() => setSettingsOpen(true)} />
        {!isFullscreen && (
          <FullscreenPrompt
            onFullscreen={requestFullscreen}
            onMainMenu={() => dispatch({ type: "SET_SCREEN", screen: "menu" })}
          />
        )}
        <ToastLayer toasts={toasts} onDismiss={dismissToast} />
        {settingsOpen && <SettingsModal {...settingsProps} />}
        {viewportOverlay}
      </>
    );
  }

  return (
    <>
      <MainMenu
        onStart={() => dispatch({ type: "SET_SCREEN", screen: "game" })}
        canContinue={canContinue}
        progress={progress}
        settings={settings}
        achievements={achievementViews}
        syncStatus={syncStatus}
        syncBusy={syncBusy}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogin={settingsProps.onLogin}
        onLogout={settingsProps.onLogout}
        onPull={settingsProps.onPull}
        onPush={settingsProps.onPush}
        onResetProgress={settingsProps.onResetProgress}
        onResetServerData={settingsProps.onResetServerData}
      />
      <ToastLayer toasts={toasts} onDismiss={dismissToast} />
      {settingsOpen && <SettingsModal {...settingsProps} />}
      {viewportOverlay}
    </>
  );
}
