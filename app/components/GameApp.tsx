"use client";

import { useEffect, useMemo } from "react";
import { useGame } from "../context/GameContext";
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

  if (screen === "game") {
    return (
      <>
        <GameScreen />
        <ToastLayer toasts={toasts} onDismiss={dismissToast} />
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
    </>
  );
}
