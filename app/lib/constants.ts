import type { StatKey } from "../types";

export const AVATAR_COLORS: Record<string, { bg: string; border: string }> = {
  player: { bg: "#1a2a0c", border: "#4a6a1a" },
  friend: { bg: "#0c1a1a", border: "#1a5a5a" },
  citizen: { bg: "#1a180c", border: "#5a4a1a" },
  student: { bg: "#0c0c1a", border: "#2a2a6a" },
  mother: { bg: "#1a0c0c", border: "#5a2a2a" },
  elder: { bg: "#18180c", border: "#5a5a1a" },
  youth: { bg: "#0c1a0c", border: "#2a5a2a" },
  merchant: { bg: "#1a100c", border: "#5a3a1a" },
  soldier: { bg: "#0c1208", border: "#3a5a1a" },
};

export const STAT_LABELS: Record<StatKey, string> = {
  courage: "용기",
  record: "기록",
  trust: "신뢰",
  safety: "안전",
};
