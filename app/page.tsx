"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import GameScreen from "./components/GameScreen";
import MainMenu from "./components/MainMenu";
import ToastLayer, { type ToastItem } from "./components/ToastLayer";
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

function formatUserSummary(user: SyncStatus["user"]) {
  if (!user) return "계정 정보를 확인했습니다.";
  return `${user.name} · ${user.role} · ${user.grade ?? "-"}학년 ${user.classRoom ?? "-"}반 ${user.number ?? "-"}번`;
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export default function GameApp() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [progress, setProgress] = useState<GameProgress>(DEFAULT_PROGRESS);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    authenticated: false,
    user: null,
    lastSyncedAt: null,
  });
  const [syncBusy, setSyncBusy] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [booted, setBooted] = useState(false);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, tone: ToastItem["tone"] = "info") => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3600);
    },
    [],
  );

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

  const refreshAuthStatus = useCallback(async (): Promise<SyncStatus> => {
    try {
      const response = await fetch("/api/auth/datagsm/me", {
        cache: "no-store",
      });
      const data = (await response.json()) as SyncStatus;
      setSyncStatus(data);
      return data;
    } catch {
      const fallback = {
        authenticated: false,
        user: null,
        lastSyncedAt: null,
      };
      setSyncStatus(fallback);
      return fallback;
    }
  }, []);

  useEffect(() => {
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
      let message = "서버에 기록을 저장하지 못했습니다.";
      try {
        const data = (await response.json()) as { message?: string };
        if (data.message) {
          message = data.message;
        }
      } catch {}
      throw new Error(message);
    }

    const data = (await response.json()) as { bundle: SyncBundle };
    setSyncStatus((prev) => ({
      ...prev,
      lastSyncedAt: data.bundle.savedAt,
    }));
    return data.bundle;
  }, []);

  const pullSyncBundle = useCallback(async () => {
    const response = await fetch("/api/sync", { cache: "no-store" });
    if (!response.ok) {
      let message = "서버 기록을 불러오지 못했습니다.";
      try {
        const data = (await response.json()) as { message?: string };
        if (data.message) {
          message = data.message;
        }
      } catch {}
      throw new Error(message);
    }

    const data = (await response.json()) as { bundle: SyncBundle | null };
    return data.bundle;
  }, []);

  const applyRemoteBundle = useCallback((bundle: SyncBundle) => {
    setProgress(sanitizeProgress(bundle.progress));
    setSettings(sanitizeSettings(bundle.settings));
    setSyncStatus((prev) => ({
      ...prev,
      lastSyncedAt: bundle.savedAt,
    }));
  }, []);

  const reconcileSyncAfterLogin = useCallback(
    async (status: SyncStatus) => {
      if (!status.authenticated) return;

      setSyncBusy(true);
      try {
        const bundle = await pullSyncBundle();
        if (bundle) {
          applyRemoteBundle(bundle);
          pushToast("서버 기록을 불러와 이어서 시작할 수 있습니다.", "success");
          return;
        }

        const uploaded = await pushSyncBundle({
          progress,
          settings,
          savedAt: new Date().toISOString(),
        });
        setSyncStatus((prev) => ({
          ...prev,
          lastSyncedAt: uploaded.savedAt,
        }));
        pushToast(
          "처음 로그인한 계정입니다. 지금 기록을 서버에 저장했습니다.",
          "success",
        );
      } catch (error) {
        pushToast(
          error instanceof Error
            ? error.message
            : "로그인 후 기록을 확인하는 중 문제가 생겼습니다.",
          "error",
        );
      } finally {
        setSyncBusy(false);
      }
    },
    [
      applyRemoteBundle,
      progress,
      pullSyncBundle,
      pushSyncBundle,
      pushToast,
      settings,
    ],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !booted) return;
    const searchParams = new URLSearchParams(window.location.search);
    const authCode = searchParams.get("auth");
    const authReason = searchParams.get("reason");
    if (!authCode) return;

    const messages: Record<string, string> = {
      success: "DataGSM 로그인이 완료되었습니다.",
      "invalid-state":
        "로그인 확인 과정이 올바르지 않았습니다. 다시 시도해 주세요.",
      "token-failed": "로그인을 마무리하지 못했습니다.",
      "token-missing": "로그인 토큰을 받지 못했습니다.",
      "userinfo-failed": "계정 정보를 불러오지 못했습니다.",
      "network-failed": "로그인 중 네트워크 문제가 발생했습니다.",
      "unauthorized-role": "자퇴한 계정은 로그인할 수 없습니다.",
    };

    const message = messages[authCode] ?? `로그인 처리 상태: ${authCode}`;
    const detailedMessage =
      authCode === "token-failed" && authReason
        ? `${message} (${authReason})`
        : message;

    window.history.replaceState({}, "", "/");

    if (authCode === "success") {
      void (async () => {
        let status = await refreshAuthStatus();

        if (!status.authenticated) {
          await delay(250);
          status = await refreshAuthStatus();
        }

        if (!status.authenticated) {
          pushToast(
            "로그인은 완료됐지만 계정 상태를 확인하지 못했습니다.",
            "error",
          );
          return;
        }

        pushToast(
          `${formatUserSummary(status.user)} 계정으로 로그인했습니다.`,
          "success",
        );
        await reconcileSyncAfterLogin(status);
      })();
      return;
    }

    pushToast(detailedMessage, "error");
    void refreshAuthStatus();
  }, [booted, pushToast, reconcileSyncAfterLogin, refreshAuthStatus]);

  async function handleManualPush() {
    if (!syncStatus.authenticated) return;
    setSyncBusy(true);
    try {
      await pushSyncBundle({
        progress,
        settings,
        savedAt: new Date().toISOString(),
      });
      pushToast("현재 기록을 서버에 저장했습니다.", "success");
    } catch (error) {
      pushToast(
        error instanceof Error ? error.message : "서버 저장에 실패했습니다.",
        "error",
      );
    } finally {
      setSyncBusy(false);
    }
  }

  async function handleManualPull() {
    if (!syncStatus.authenticated) return;
    setSyncBusy(true);
    try {
      const bundle = await pullSyncBundle();
      if (!bundle) {
        pushToast("서버에 저장된 기록이 아직 없습니다.");
        return;
      }

      applyRemoteBundle(bundle);
      pushToast("서버 기록과 설정을 불러왔습니다.", "success");
    } catch (error) {
      pushToast(
        error instanceof Error
          ? error.message
          : "서버 기록을 불러오지 못했습니다.",
        "error",
      );
    } finally {
      setSyncBusy(false);
    }
  }

  useEffect(() => {
    if (!booted || !syncStatus.authenticated || !settings.autoSync) {
      return;
    }

    const timer = window.setTimeout(() => {
      void pushSyncBundle({
        progress,
        settings,
        savedAt: new Date().toISOString(),
      }).catch(() => {
        pushToast("자동 동기화 중 문제가 생겼습니다.", "error");
      });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [
    booted,
    progress,
    pushToast,
    pushSyncBundle,
    settings,
    syncStatus.authenticated,
  ]);

  const achievements = useMemo(() => getAchievementState(progress), [progress]);

  if (screen === "game") {
    return (
      <>
        <GameScreen
          initialProgress={progress}
          settings={settings}
          onProgressChange={setProgress}
          onBackToMenu={() => setScreen("menu")}
        />
        <ToastLayer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <>
      <MainMenu
        onStart={() => setScreen("game")}
        canContinue={hasContinuableProgress(progress)}
        progress={progress}
        settings={settings}
        achievements={achievements}
        syncStatus={syncStatus}
        syncBusy={syncBusy}
        onSettingsChange={(patch) => {
          setSettings((prev) => ({ ...prev, ...patch }));
        }}
        onLogin={() => {
          window.location.href = "/api/auth/datagsm/login";
        }}
        onLogout={() => {
          void fetch("/api/auth/datagsm/logout", { method: "POST" })
            .then(() => {
              pushToast("DataGSM 계정에서 로그아웃했습니다.", "success");
              setSyncStatus((prev) => ({
                ...prev,
                authenticated: false,
                user: null,
              }));
            })
            .catch(() => {
              pushToast("로그아웃 중 문제가 생겼습니다.", "error");
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
          pushToast("이 기기의 진행 기록을 초기화했습니다.", "success");
        }}
      />
      <ToastLayer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
