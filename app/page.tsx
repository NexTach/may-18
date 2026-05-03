"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import GameScreen from "./components/GameScreen";
import MainMenu from "./components/MainMenu";
import {
  createFreshProgress,
  DEFAULT_PROGRESS,
  DEFAULT_SETTINGS,
  getAchievementState,
  hasContinuableProgress,
  PROGRESS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  sanitizeProgress,
  sanitizeSettings,
} from "./lib/game-state";
import type {
  GameProgress,
  GameSettings,
  SyncBundle,
  SyncStatus,
} from "./types";

type Screen = "menu" | "game";

function readStoredJson<T>(key: string, fallback: T) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function GameApp() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [progress, setProgress] = useState<GameProgress>(DEFAULT_PROGRESS);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    configured: false,
    storageConfigured: false,
    authenticated: false,
    user: null,
    lastSyncedAt: null,
  });
  const [syncBusy, setSyncBusy] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    setProgress(
      sanitizeProgress(readStoredJson(PROGRESS_STORAGE_KEY, DEFAULT_PROGRESS)),
    );
    setSettings(
      sanitizeSettings(readStoredJson(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS)),
    );
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted || typeof window === "undefined") return;
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [booted, progress]);

  useEffect(() => {
    if (!booted || typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [booted, settings]);

  const refreshAuthStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/datagsm/me", {
        cache: "no-store",
      });
      const data = (await response.json()) as SyncStatus;
      setSyncStatus(data);
    } catch {
      setSyncStatus({
        configured: false,
        storageConfigured: false,
        authenticated: false,
        user: null,
        lastSyncedAt: null,
      });
    }
  }, []);

  useEffect(() => {
    void refreshAuthStatus();
  }, [refreshAuthStatus]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const authCode = new URLSearchParams(window.location.search).get("auth");
    if (!authCode) return;

    const messages: Record<string, string> = {
      success: "DataGSM 로그인에 성공했습니다.",
      "not-configured": "DataGSM OAuth 환경 변수가 설정되지 않았습니다.",
      "invalid-state": "로그인 상태 검증에 실패했습니다. 다시 시도해 주세요.",
      "token-failed": "토큰 교환에 실패했습니다.",
      "token-missing": "응답에서 액세스 토큰을 찾지 못했습니다.",
      "userinfo-failed": "사용자 정보를 불러오지 못했습니다.",
      "network-failed": "로그인 도중 네트워크 오류가 발생했습니다.",
    };

    setSyncMessage(messages[authCode] ?? `로그인 처리 상태: ${authCode}`);
    window.history.replaceState({}, "", "/");
    void refreshAuthStatus();
  }, [refreshAuthStatus]);

  const pushSyncBundle = useCallback(async (bundle: SyncBundle) => {
    const response = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bundle),
    });

    if (!response.ok) {
      throw new Error("동기화 업로드에 실패했습니다.");
    }

    const data = (await response.json()) as { bundle: SyncBundle };
    setSyncStatus((prev) => ({
      ...prev,
      lastSyncedAt: data.bundle.savedAt,
    }));
    return data.bundle;
  }, []);

  async function pullSyncBundle() {
    const response = await fetch("/api/sync", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("동기화 데이터를 불러오지 못했습니다.");
    }

    const data = (await response.json()) as { bundle: SyncBundle | null };
    return data.bundle;
  }

  async function handleManualPush() {
    if (!syncStatus.authenticated || !syncStatus.storageConfigured) return;
    setSyncBusy(true);
    try {
      await pushSyncBundle({
        progress,
        settings,
        savedAt: new Date().toISOString(),
      });
      setSyncMessage("현재 기기의 기록을 서버에 저장했습니다.");
    } catch (error) {
      setSyncMessage(
        error instanceof Error ? error.message : "동기화 저장에 실패했습니다.",
      );
    } finally {
      setSyncBusy(false);
    }
  }

  async function handleManualPull() {
    if (!syncStatus.authenticated || !syncStatus.storageConfigured) return;
    setSyncBusy(true);
    try {
      const bundle = await pullSyncBundle();
      if (!bundle) {
        setSyncMessage("서버에 저장된 기록이 아직 없습니다.");
        return;
      }

      setProgress(sanitizeProgress(bundle.progress));
      setSettings(sanitizeSettings(bundle.settings));
      setSyncStatus((prev) => ({
        ...prev,
        lastSyncedAt: bundle.savedAt,
      }));
      setSyncMessage("서버에 저장된 기록과 설정을 불러왔습니다.");
    } catch (error) {
      setSyncMessage(
        error instanceof Error
          ? error.message
          : "동기화 데이터를 불러오지 못했습니다.",
      );
    } finally {
      setSyncBusy(false);
    }
  }

  useEffect(() => {
    if (
      !booted ||
      !syncStatus.authenticated ||
      !syncStatus.storageConfigured ||
      !settings.autoSync
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      void pushSyncBundle({
        progress,
        settings,
        savedAt: new Date().toISOString(),
      }).catch(() => {
        setSyncMessage("자동 동기화 중 오류가 발생했습니다.");
      });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [
    booted,
    progress,
    pushSyncBundle,
    settings,
    syncStatus.authenticated,
    syncStatus.storageConfigured,
  ]);

  const achievements = useMemo(() => getAchievementState(progress), [progress]);

  if (screen === "game") {
    return (
      <GameScreen
        initialProgress={progress}
        settings={settings}
        onProgressChange={setProgress}
        onBackToMenu={() => setScreen("menu")}
      />
    );
  }

  return (
    <MainMenu
      onStart={() => setScreen("game")}
      canContinue={hasContinuableProgress(progress)}
      progress={progress}
      settings={settings}
      achievements={achievements}
      syncStatus={syncStatus}
      syncBusy={syncBusy}
      syncMessage={syncMessage}
      onSettingsChange={(patch) => {
        setSettings((prev) => ({ ...prev, ...patch }));
      }}
      onLogin={() => {
        window.location.href = "/api/auth/datagsm/login";
      }}
      onLogout={() => {
        void fetch("/api/auth/datagsm/logout", { method: "POST" }).then(() => {
          setSyncMessage("DataGSM 계정에서 로그아웃했습니다.");
          setSyncStatus((prev) => ({
            ...prev,
            authenticated: false,
            user: null,
          }));
        });
      }}
      onPull={() => {
        void handleManualPull();
      }}
      onPush={() => {
        void handleManualPush();
      }}
      onResetProgress={() => {
        const fresh = createFreshProgress();
        setProgress(fresh);
        setSyncMessage("이 기기의 진행 기록을 초기화했습니다.");
      }}
    />
  );
}
