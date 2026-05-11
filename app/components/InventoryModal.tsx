"use client";

import { collectibleDefs } from "../data/collectibles";
import type { StatKey, Stats } from "../types";

type Props = {
  stats: Stats;
  choiceLog: string[];
  collectedItems: string[];
  onClose: () => void;
};

const STAT_CONFIG: Array<{ key: StatKey; label: string; desc: string }> = [
  { key: "courage", label: "용기", desc: "어려운 상황에서 나선 횟수" },
  { key: "record", label: "기록", desc: "기록을 남기려 한 횟수" },
  { key: "trust", label: "신뢰", desc: "타인을 돕고 연결한 횟수" },
  { key: "safety", label: "안전", desc: "신중하게 행동한 횟수" },
];

const STAT_COLOR_VAR: Record<StatKey, string> = {
  courage: "var(--color-stat-courage)",
  record: "var(--color-stat-record)",
  trust: "var(--color-stat-trust)",
  safety: "var(--color-stat-safety)",
};

export default function InventoryModal({
  stats,
  collectedItems,
  onClose,
}: Props) {
  const maxStat = Math.max(5, ...Object.values(stats));
  const collectedSet = new Set(collectedItems);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/78">
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div
        className="relative border-2 border-game-border-bright bg-game-panel p-4 md:p-5 xl:p-6 max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full mx-4 max-h-[85dvh] overflow-y-auto"
        style={{
          boxShadow:
            "0 0 0 2px var(--color-game-border), 0 0 0 4px var(--color-game-panel)",
        }}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-game-border">
          <span className="text-[12px] xl:text-[13px] text-game-text font-pixel">
            ▣ 가방 / 기록
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-game-border-bright hover:text-game-text transition-colors cursor-pointer font-mono"
          >
            <span className="hidden md:inline">[Tab] </span>닫기
          </button>
        </div>

        <div className="mb-5">
          <div className="text-[11px] xl:text-[12px] text-game-border-bright mb-3 font-pixel">
            나의 선택 통계
          </div>
          <div className="flex flex-col gap-3">
            {STAT_CONFIG.map(({ key, label, desc }) => {
              const val = stats[key];
              const pct = Math.min(100, (val / maxStat) * 100);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[14px] xl:text-[15px] font-mono"
                      style={{ color: STAT_COLOR_VAR[key] }}
                    >
                      {label}
                    </span>
                    <span className="text-[13px] xl:text-[14px] text-game-text-muted font-mono">
                      {val}
                    </span>
                  </div>
                  <div className="w-full bg-[#0a1006] border border-[#1e2e0e] h-2.5">
                    <div
                      className="h-full transition-all opacity-70"
                      style={{
                        width: `${pct}%`,
                        background: STAT_COLOR_VAR[key],
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-[#2a3a10] mt-0.5 font-mono">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-game-border bg-game-panel-dark p-3 md:p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] text-game-border-bright font-pixel">
              수집품
            </div>
            <span className="text-[11px] text-game-text-muted font-mono">
              {collectedItems.length} / {collectibleDefs.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {collectibleDefs.map(({ id, icon, name, description }) => {
              const has = collectedSet.has(id);
              return (
                <div
                  key={id}
                  className="group relative flex flex-col items-center p-2 border border-[#1e2e0e]"
                  style={{
                    background: has
                      ? "var(--color-game-panel)"
                      : "var(--color-game-panel-dark)",
                    opacity: has ? 1 : 0.35,
                  }}
                  title={has ? `${name}: ${description}` : "???"}
                >
                  <span
                    className="text-xl mb-1"
                    style={{ filter: has ? "none" : "grayscale(1)" }}
                  >
                    {icon}
                  </span>
                  <span
                    className="text-[10px] text-center leading-tight font-mono"
                    style={{
                      color: has ? "var(--color-game-accent)" : "#2a3a10",
                    }}
                  >
                    {has ? name : "???"}
                  </span>
                  {has && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-40 border border-game-border bg-game-panel px-2 py-1.5 text-[10px] leading-relaxed text-game-text-dim opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 hidden md:block font-mono">
                      {description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {collectedItems.length === 0 && (
            <p className="mt-3 text-[11px] text-[#2a3a10] text-center font-mono">
              선택에 따라 수집품이 생깁니다.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full border border-game-border-bright bg-game-panel hover:bg-[#0f2420] py-3 transition-colors cursor-pointer font-pixel"
        >
          <span className="text-[12px] text-game-text">[ 닫기 ]</span>
        </button>
      </div>
    </div>
  );
}
