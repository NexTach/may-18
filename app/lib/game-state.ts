import { z } from "zod";
import { achievementDefs } from "../data/achievements";
import { collectibleDefs } from "../data/collectibles";
import { scenes } from "../data/scenes";
import type {
  GameProgress,
  GameSettings,
  MapDefaultMode,
  SceneId,
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
  collectedItems: [],
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
    collectedItems: [],
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

// ── Zod schemas ──────────────────────────────────────────────────────────────

const validSceneIdSet = new Set(scenes.map((s) => s.id as SceneId));
const SceneIdSchema = z.string().refine(
  (id): id is SceneId => validSceneIdSet.has(id as SceneId),
  { message: "Invalid SceneId" },
) as z.ZodType<SceneId>;

const StatsSchema = z.object({
  courage: z.number().min(0).default(0),
  record: z.number().min(0).default(0),
  trust: z.number().min(0).default(0),
  safety: z.number().min(0).default(0),
});

const validCollectibleIds = new Set(collectibleDefs.map((c) => c.id));
const CollectibleIdSchema = z
  .string()
  .refine((id) => validCollectibleIds.has(id));

const GameProgressSchema = z.object({
  currentSceneId: SceneIdSchema.default("start"),
  visitedSceneIds: z.array(SceneIdSchema).default(["start"]),
  choiceLog: z.array(z.string()).default([]),
  stats: StatsSchema.default({ courage: 0, record: 0, trust: 0, safety: 0 }),
  sceneIndex: z.number().min(1).default(1),
  updatedAt: z.string().nullable().default(null),
  allVisitedSceneIds: z.array(SceneIdSchema).default(["start"]),
  allChoiceLog: z.array(z.string()).default([]),
  collectedItems: z.array(CollectibleIdSchema).default([]),
});

export function sanitizeProgress(value: unknown): GameProgress {
  const result = GameProgressSchema.safeParse(value);
  if (!result.success) return createFreshProgress();

  const data = result.data;

  const uniqueVisited = Array.from(new Set<SceneId>(["start", ...data.visitedSceneIds]));
  if (!uniqueVisited.includes(data.currentSceneId))
    uniqueVisited.push(data.currentSceneId);

  return {
    ...data,
    visitedSceneIds: uniqueVisited,
    allVisitedSceneIds:
      data.allVisitedSceneIds.length > 0 ? data.allVisitedSceneIds : uniqueVisited,
    collectedItems: Array.from(new Set(data.collectedItems)),
  } as GameProgress;
}

// ── Achievement helpers ──────────────────────────────────────────────────────

export function getEndingSceneIds() {
  return scenes.filter((scene) => scene.isEnding).map((scene) => scene.id);
}

export function getReachedEndingIds(progress: GameProgress) {
  const endings = new Set(getEndingSceneIds());
  return progress.visitedSceneIds.filter((sceneId) => endings.has(sceneId));
}

export function getAchievementState(progress: GameProgress) {
  return achievementDefs.map((achievement) => ({
    ...achievement,
    unlocked: achievement.condition(progress),
  }));
}

export function hasContinuableProgress(progress: GameProgress) {
  return progress.sceneIndex > 1 || progress.choiceLog.length > 0;
}
