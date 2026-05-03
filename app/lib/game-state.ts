import { achievementDefs } from "../data/achievements";
import { scenes } from "../data/scenes";
import type {
  GameProgress,
  GameSettings,
  MapDefaultMode,
  Stats,
  TextSpeed,
} from "../types";

export const SETTINGS_STORAGE_KEY = "may18.settings";
export const PROGRESS_STORAGE_KEY = "may18.progress";

export const DEFAULT_STATS: Stats = {
  courage: 0,
  record: 0,
  trust: 0,
  safety: 0,
};

export const DEFAULT_SETTINGS: GameSettings = {
  soundOn: false,
  musicOn: false,
  textSpeed: "normal",
  defaultMapMode: "city",
  autoSync: false,
};

export const DEFAULT_PROGRESS: GameProgress = {
  currentSceneId: "start",
  visitedSceneIds: ["start"],
  choiceLog: [],
  stats: DEFAULT_STATS,
  sceneIndex: 1,
  updatedAt: null,
  allVisitedSceneIds: ["start"],
  allChoiceLog: [],
};

export const TEXT_SPEED_MS: Record<TextSpeed, number> = {
  instant: 0,
  normal: 22,
  slow: 38,
};

export function createFreshProgress(): GameProgress {
  return {
    ...DEFAULT_PROGRESS,
    visitedSceneIds: [...DEFAULT_PROGRESS.visitedSceneIds],
    choiceLog: [],
    stats: { ...DEFAULT_STATS },
    updatedAt: null,
  };
}

export function sanitizeSettings(value: unknown): GameSettings {
  if (!value || typeof value !== "object") return { ...DEFAULT_SETTINGS };

  const raw = value as Partial<GameSettings>;
  const defaultMode: MapDefaultMode =
    raw.defaultMapMode === "activity" ? "activity" : "city";
  const textSpeed: TextSpeed =
    raw.textSpeed === "instant" || raw.textSpeed === "slow"
      ? raw.textSpeed
      : "normal";

  return {
    soundOn: Boolean(raw.soundOn),
    musicOn: Boolean(raw.musicOn),
    textSpeed,
    defaultMapMode: defaultMode,
    autoSync: Boolean(raw.autoSync),
  };
}

export function sanitizeProgress(value: unknown): GameProgress {
  if (!value || typeof value !== "object") return createFreshProgress();

  const raw = value as Partial<GameProgress>;
  const validSceneIds = new Set(scenes.map((scene) => scene.id));
  const currentSceneId =
    typeof raw.currentSceneId === "string" &&
    validSceneIds.has(raw.currentSceneId)
      ? raw.currentSceneId
      : "start";
  const visitedSceneIds = Array.isArray(raw.visitedSceneIds)
    ? raw.visitedSceneIds.filter(
        (sceneId): sceneId is string =>
          typeof sceneId === "string" && validSceneIds.has(sceneId),
      )
    : ["start"];

  const uniqueVisited = Array.from(new Set(["start", ...visitedSceneIds]));
  if (!uniqueVisited.includes(currentSceneId))
    uniqueVisited.push(currentSceneId);

  return {
    currentSceneId,
    visitedSceneIds: uniqueVisited,
    choiceLog: Array.isArray(raw.choiceLog)
      ? raw.choiceLog.filter((item): item is string => typeof item === "string")
      : [],
    stats: {
      courage:
        typeof raw.stats?.courage === "number"
          ? Math.max(0, raw.stats.courage)
          : 0,
      record:
        typeof raw.stats?.record === "number"
          ? Math.max(0, raw.stats.record)
          : 0,
      trust:
        typeof raw.stats?.trust === "number" ? Math.max(0, raw.stats.trust) : 0,
      safety:
        typeof raw.stats?.safety === "number"
          ? Math.max(0, raw.stats.safety)
          : 0,
    },
    sceneIndex:
      typeof raw.sceneIndex === "number" && raw.sceneIndex >= 1
        ? raw.sceneIndex
        : 1,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : null,
    allVisitedSceneIds: Array.isArray(raw.allVisitedSceneIds)
      ? raw.allVisitedSceneIds.filter(
          (id): id is string => typeof id === "string" && validSceneIds.has(id),
        )
      : uniqueVisited,
    allChoiceLog: Array.isArray(raw.allChoiceLog)
      ? raw.allChoiceLog.filter((item): item is string => typeof item === "string")
      : (Array.isArray(raw.choiceLog)
          ? raw.choiceLog.filter((item): item is string => typeof item === "string")
          : []),
  };
}

export function getEndingSceneIds() {
  return scenes.filter((scene) => scene.isEnding).map((scene) => scene.id);
}

export function getReachedEndingIds(progress: GameProgress) {
  const endings = new Set(getEndingSceneIds());
  return progress.visitedSceneIds.filter((sceneId) => endings.has(sceneId));
}

export function getAchievementState(progress: GameProgress) {
  const visited = new Set(
    progress.allVisitedSceneIds.length > 0
      ? progress.allVisitedSceneIds
      : progress.visitedSceneIds,
  );
  const visitedCount = visited.size;
  const endingIds = new Set(getEndingSceneIds());
  const reachedEndings = new Set(
    [...visited].filter((id) => endingIds.has(id)),
  );
  const { courage, record, trust, safety } = progress.stats;
  const unlocked = new Set<string>();

  if (record >= 1) unlocked.add("first_record");
  if (record >= 6) unlocked.add("deep_record");
  if (record >= 3 && courage >= 3) unlocked.add("courageous_record");
  if (courage >= 3) unlocked.add("witness");
  if (courage >= 5) unlocked.add("brave_soul");
  if (trust >= 3) unlocked.add("trusted_hands");
  if (trust >= 6) unlocked.add("strong_trust");
  if (safety >= 3) unlocked.add("steady_steps");
  if (safety >= 5) unlocked.add("safe_keeper");
  if (courage >= 2 && record >= 2 && trust >= 2 && safety >= 2)
    unlocked.add("balanced_eye");

  if (visitedCount >= 12) unlocked.add("many_paths");
  if (visitedCount >= 18) unlocked.add("explorer");
  if (visited.has("university_gate")) unlocked.add("at_the_gate");
  if (visited.has("radio_room")) unlocked.add("heard_radio");
  if (visited.has("street_clinic") || visited.has("help_people"))
    unlocked.add("helper");
  if (visited.has("outside_message")) unlocked.add("messenger");
  if (visited.has("last_night")) unlocked.add("last_witness");

  // 엔딩 기반
  if (reachedEndings.has("archive_ending")) unlocked.add("archivist");
  if (reachedEndings.has("memory_ending")) unlocked.add("memory_keeper");

  return achievementDefs.map((achievement) => ({
    ...achievement,
    unlocked: unlocked.has(achievement.id),
  }));
}

export function hasContinuableProgress(progress: GameProgress) {
  return progress.sceneIndex > 1 || progress.choiceLog.length > 0;
}
