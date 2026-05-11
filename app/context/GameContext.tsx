"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ToastItem } from "../components/ToastLayer";
import { collectibleDefs } from "../data/collectibles";
import { useBgm } from "../hooks/useBgm";
import { SCENE_BGM, SOUNDS } from "../lib/audio-config";
import {
  createFreshProgress,
  DEFAULT_PROGRESS,
  DEFAULT_SETTINGS,
  getAchievementState,
  PROGRESS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  sanitizeProgress,
  sanitizeSettings,
} from "../lib/game-state";
import type {
  GameProgress,
  GameSettings,
  SyncBundle,
  SyncStatus,
} from "../types";

export type Screen = "menu" | "game";

type GameState = {
  progress: GameProgress;
  settings: GameSettings;
  screen: Screen;
  syncStatus: SyncStatus;
  syncBusy: boolean;
  booted: boolean;
};

export type GameAction =
  | {
      type: "BOOT";
      progress: GameProgress;
      settings: GameSettings;
      screen: Screen;
    }
  | { type: "SET_PROGRESS"; progress: GameProgress }
  | { type: "PATCH_SETTINGS"; patch: Partial<GameSettings> }
  | { type: "SET_SCREEN"; screen: Screen }
  | { type: "SET_SYNC_STATUS"; status: SyncStatus }
  | { type: "SET_SYNC_BUSY"; busy: boolean }
  | { type: "RESTART_GAME" };

const SCREEN_STORAGE_KEY = "may18.screen";

const initialState: GameState = {
  progress: DEFAULT_PROGRESS,
  settings: DEFAULT_SETTINGS,
  screen: "menu",
  syncStatus: { authenticated: false, user: null, lastSyncedAt: null },
  syncBusy: false,
  booted: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "BOOT":
      return {
        ...state,
        progress: action.progress,
        settings: action.settings,
        screen: action.screen,
        booted: true,
      };
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    case "PATCH_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case "SET_SCREEN":
      return { ...state, screen: action.screen };
    case "SET_SYNC_STATUS":
      return { ...state, syncStatus: action.status };
    case "SET_SYNC_BUSY":
      return { ...state, syncBusy: action.busy };
    case "RESTART_GAME":
      return { ...state, progress: createFreshProgress(), screen: "menu" };
    default:
      return state;
  }
}

type GameContextValue = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
  toasts: ToastItem[];
  pushToast: (message: string, tone?: ToastItem["tone"]) => void;
  dismissToast: (id: number) => void;
  achievements: ReturnType<typeof getAchievementState>;
  syncPush: () => Promise<void>;
  syncPull: () => Promise<void>;
};

const GameContext = createContext<GameContextValue | null>(null);

function readStoredJson<T>(key: string, fallback: T): T {
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
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useState<GameState>(initialState);
  const dispatchAction = useCallback((action: GameAction) => {
    dispatch((prev) => gameReducer(prev, action));
  }, []);

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback(
    (message: string, tone: ToastItem["tone"] = "info") => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3600);
    },
    [],
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Boot: read localStorage once
  useEffect(() => {
    const savedProgress = sanitizeProgress(
      readStoredJson(PROGRESS_STORAGE_KEY, DEFAULT_PROGRESS),
    );
    const savedSettings = sanitizeSettings(
      readStoredJson(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS),
    );
    const savedScreen: Screen =
      window.localStorage.getItem(SCREEN_STORAGE_KEY) === "game"
        ? "game"
        : "menu";
    dispatchAction({
      type: "BOOT",
      progress: savedProgress,
      settings: savedSettings,
      screen: savedScreen,
    });
  }, [dispatchAction]);

  // Persist progress
  useEffect(() => {
    if (!state.booted) return;
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(state.progress),
    );
  }, [state.booted, state.progress]);

  // Persist settings
  useEffect(() => {
    if (!state.booted) return;
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(state.settings),
    );
  }, [state.booted, state.settings]);

  // Persist screen
  useEffect(() => {
    if (!state.booted) return;
    window.localStorage.setItem(SCREEN_STORAGE_KEY, state.screen);
  }, [state.booted, state.screen]);

  // BGM
  const bgmSrc =
    state.screen === "menu"
      ? SOUNDS.may
      : (SCENE_BGM[state.progress.currentSceneId] ?? SOUNDS.may);
  useBgm(bgmSrc, state.settings.musicOn);

  // Auth status
  const refreshAuth = useCallback(async (): Promise<SyncStatus> => {
    try {
      const res = await fetch("/api/auth/datagsm/me", { cache: "no-store" });
      const data = (await res.json()) as SyncStatus;
      dispatchAction({ type: "SET_SYNC_STATUS", status: data });
      return data;
    } catch {
      const fallback: SyncStatus = {
        authenticated: false,
        user: null,
        lastSyncedAt: null,
      };
      dispatchAction({ type: "SET_SYNC_STATUS", status: fallback });
      return fallback;
    }
  }, [dispatchAction]);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  // Auth redirect callback
  // biome-ignore lint/correctness/useExhaustiveDependencies: 부트 시 1회 실행이 목적
  useEffect(() => {
    if (typeof window === "undefined" || !state.booted) return;
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get("auth");
    const authReason = params.get("reason");
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
        let status = await refreshAuth();
        if (!status.authenticated) {
          await delay(250);
          status = await refreshAuth();
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
        await reconcileAfterLogin(status);
      })();
      return;
    }
    pushToast(detailedMessage, "error");
    void refreshAuth();
  }, [state.booted]);

  // Sync operations
  const syncPush = useCallback(async () => {
    dispatchAction({ type: "SET_SYNC_BUSY", busy: true });
    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progress: state.progress,
          settings: state.settings,
          savedAt: new Date().toISOString(),
        } satisfies SyncBundle),
      });
      if (!res.ok) {
        const data = (await res.json()) as { message?: string };
        throw new Error(data.message ?? "서버에 기록을 저장하지 못했습니다.");
      }
      const data = (await res.json()) as { bundle: SyncBundle };
      dispatchAction({
        type: "SET_SYNC_STATUS",
        status: { ...state.syncStatus, lastSyncedAt: data.bundle.savedAt },
      });
      pushToast("현재 기록을 서버에 저장했습니다.", "success");
    } catch (e) {
      pushToast(
        e instanceof Error ? e.message : "서버 저장에 실패했습니다.",
        "error",
      );
    } finally {
      dispatchAction({ type: "SET_SYNC_BUSY", busy: false });
    }
  }, [
    state.progress,
    state.settings,
    state.syncStatus,
    dispatchAction,
    pushToast,
  ]);

  const syncPull = useCallback(async () => {
    dispatchAction({ type: "SET_SYNC_BUSY", busy: true });
    try {
      const res = await fetch("/api/sync", { cache: "no-store" });
      if (!res.ok) {
        const data = (await res.json()) as { message?: string };
        throw new Error(data.message ?? "서버 기록을 불러오지 못했습니다.");
      }
      const data = (await res.json()) as { bundle: SyncBundle | null };
      if (!data.bundle) {
        pushToast("서버에 저장된 기록이 아직 없습니다.");
        return;
      }
      dispatchAction({
        type: "SET_PROGRESS",
        progress: sanitizeProgress(data.bundle.progress),
      });
      dispatchAction({
        type: "PATCH_SETTINGS",
        patch: sanitizeSettings(data.bundle.settings),
      });
      dispatchAction({
        type: "SET_SYNC_STATUS",
        status: { ...state.syncStatus, lastSyncedAt: data.bundle.savedAt },
      });
      pushToast("서버 기록과 설정을 불러왔습니다.", "success");
    } catch (e) {
      pushToast(
        e instanceof Error ? e.message : "서버 기록을 불러오지 못했습니다.",
        "error",
      );
    } finally {
      dispatchAction({ type: "SET_SYNC_BUSY", busy: false });
    }
  }, [state.syncStatus, dispatchAction, pushToast]);

  const reconcileAfterLogin = useCallback(
    async (status: SyncStatus) => {
      if (!status.authenticated) return;
      dispatchAction({ type: "SET_SYNC_BUSY", busy: true });
      try {
        const res = await fetch("/api/sync", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as { bundle: SyncBundle | null };
          if (data.bundle) {
            dispatchAction({
              type: "SET_PROGRESS",
              progress: sanitizeProgress(data.bundle.progress),
            });
            dispatchAction({
              type: "PATCH_SETTINGS",
              patch: sanitizeSettings(data.bundle.settings),
            });
            dispatchAction({
              type: "SET_SYNC_STATUS",
              status: { ...status, lastSyncedAt: data.bundle.savedAt },
            });
            pushToast(
              "서버 기록을 불러와 이어서 시작할 수 있습니다.",
              "success",
            );
            return;
          }
        }
        const pushRes = await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            progress: state.progress,
            settings: state.settings,
            savedAt: new Date().toISOString(),
          } satisfies SyncBundle),
        });
        if (pushRes.ok) {
          const pushData = (await pushRes.json()) as { bundle: SyncBundle };
          dispatchAction({
            type: "SET_SYNC_STATUS",
            status: { ...status, lastSyncedAt: pushData.bundle.savedAt },
          });
        }
        pushToast(
          "처음 로그인한 계정입니다. 지금 기록을 서버에 저장했습니다.",
          "success",
        );
      } catch (e) {
        pushToast(
          e instanceof Error
            ? e.message
            : "로그인 후 기록을 확인하는 중 문제가 생겼습니다.",
          "error",
        );
      } finally {
        dispatchAction({ type: "SET_SYNC_BUSY", busy: false });
      }
    },
    [state.progress, state.settings, dispatchAction, pushToast],
  );

  // Auto-sync
  useEffect(() => {
    if (
      !state.booted ||
      !state.syncStatus.authenticated ||
      !state.settings.autoSync
    )
      return;
    const timer = window.setTimeout(() => {
      void fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progress: state.progress,
          settings: state.settings,
          savedAt: new Date().toISOString(),
        } satisfies SyncBundle),
      }).catch(() => {
        pushToast("자동 동기화 중 문제가 생겼습니다.", "error");
      });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [
    state.booted,
    state.progress,
    state.settings,
    state.syncStatus.authenticated,
    pushToast,
  ]);

  // Collected item toasts
  const prevCollectedRef = useRef<Set<string> | null>(null);
  useEffect(() => {
    if (!state.booted) return;
    const current = new Set(state.progress.collectedItems ?? []);
    if (prevCollectedRef.current === null) {
      prevCollectedRef.current = current;
      return;
    }
    for (const id of current) {
      if (!prevCollectedRef.current.has(id)) {
        const item = collectibleDefs.find((c) => c.id === id);
        if (item) {
          const toastId = Date.now() + Math.floor(Math.random() * 1000);
          setToasts((prev) => [
            ...prev,
            {
              id: toastId,
              message: `${item.name} 획득`,
              tone: "success" as const,
            },
          ]);
          window.setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== toastId));
          }, 4000);
        }
      }
    }
    prevCollectedRef.current = current;
  }, [state.booted, state.progress.collectedItems]);

  const achievements = useMemo(
    () => getAchievementState(state.progress),
    [state.progress],
  );

  // Achievement toasts
  const prevUnlockedRef = useRef<Set<string> | null>(null);
  useEffect(() => {
    if (!state.booted) return;
    const current = new Set(
      achievements.filter((a) => a.unlocked).map((a) => a.id),
    );
    if (prevUnlockedRef.current === null) {
      prevUnlockedRef.current = current;
      return;
    }
    for (const id of current) {
      if (!prevUnlockedRef.current.has(id)) {
        const ach = achievements.find((a) => a.id === id);
        if (ach) {
          const toastId = Date.now() + Math.floor(Math.random() * 1000);
          setToasts((prev) => [
            ...prev,
            {
              id: toastId,
              message: ach.title,
              tone: "achievement",
              achievementIcon: ach.icon,
            },
          ]);
          window.setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== toastId));
          }, 5000);
        }
      }
    }
    prevUnlockedRef.current = current;
  }, [state.booted, achievements]);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      dispatch: dispatchAction,
      toasts,
      pushToast,
      dismissToast,
      achievements,
      syncPush,
      syncPull,
    }),
    [
      state,
      dispatchAction,
      toasts,
      pushToast,
      dismissToast,
      achievements,
      syncPush,
      syncPull,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
