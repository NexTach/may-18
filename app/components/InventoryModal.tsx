"use client";

import { collectibleDefs } from "../data/collectibles";
import type { Stats } from "../types";

type Props = {
  stats: Stats;
  choiceLog: string[];
  collectedItems: string[];
  onClose: () => void;
};

const STAT_CONFIG = [
  {
    key: "courage" as const,
    label: "용기",
    color: "#cc4420",
    desc: "어려운 상황에서 나선 횟수",
  },
  {
    key: "record" as const,
    label: "기록",
    color: "#2080cc",
    desc: "기록을 남기려 한 횟수",
  },
  {
    key: "trust" as const,
    label: "신뢰",
    color: "#20aa60",
    desc: "타인을 돕고 연결한 횟수",
  },
  {
    key: "safety" as const,
    label: "안전",
    color: "#c8a020",
    desc: "신중하게 행동한 횟수",
  },
];

export default function InventoryModal({ stats, collectedItems, onClose }: Props) {
  const maxStat = Math.max(5, ...Object.values(stats));
  const collectedSet = new Set(collectedItems);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.78)" }}
      onClick={onClose}
    >
      <div
        className="border-2 border-game-border-bright bg-game-panel p-4 md:p-5 max-w-lg w-full mx-4 max-h-[85dvh] overflow-y-auto"
        style={{ boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-game-border">
          <span
            className="text-[12px] text-game-text"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ▣ 가방 / 기록
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-game-border-bright hover:text-game-text transition-colors cursor-pointer"
            style={{ fontFamily: "monospace" }}
          >
            <span className="hidden md:inline">[Tab] </span>닫기
          </button>
        </div>

        <div className="mb-5">
          <div
            className="text-[11px] text-game-border-bright mb-3"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            나의 선택 통계
          </div>
          <div className="flex flex-col gap-3">
            {STAT_CONFIG.map(({ key, label, color, desc }) => {
              const val = stats[key];
              const pct = Math.min(100, (val / maxStat) * 100);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[14px]"
                      style={{ color, fontFamily: "monospace" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[13px] text-game-text-muted"
                      style={{ fontFamily: "monospace" }}
                    >
                      {val}
                    </span>
                  </div>
                  <div
                    className="w-full bg-[#0a1006] border border-[#1e2e0e]"
                    style={{ height: 10 }}
                  >
                    <div
                      className="h-full transition-all"
                      style={{ width: `${pct}%`, background: color, opacity: 0.7 }}
                    />
                  </div>
                  <p
                    className="text-[11px] text-[#2a3a10] mt-0.5"
                    style={{ fontFamily: "monospace" }}
                  >
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-game-border bg-[#090d06] p-3 md:p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div
              className="text-[11px] text-game-border-bright"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              수집품
            </div>
            <span
              className="text-[11px] text-game-text-muted"
              style={{ fontFamily: "monospace" }}
            >
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
                    background: has ? "#0d1608" : "#090d06",
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
                    className="text-[10px] text-center leading-tight"
                    style={{
                      fontFamily: "monospace",
                      color: has ? "#8aa040" : "#2a3a10",
                    }}
                  >
                    {has ? name : "???"}
                  </span>
                  {has && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-40 border border-game-border bg-game-panel px-2 py-1.5 text-[10px] leading-relaxed text-game-text-dim opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 hidden md:block"
                      style={{ fontFamily: "monospace" }}
                    >
                      {description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {collectedItems.length === 0 && (
            <p
              className="mt-3 text-[11px] text-[#2a3a10] text-center"
              style={{ fontFamily: "monospace" }}
            >
              선택에 따라 수집품이 생깁니다.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full border border-game-border-bright bg-[#0d1608] hover:bg-[#162010] py-3 transition-colors cursor-pointer"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <span className="text-[12px] text-game-text">[ 닫기 ]</span>
        </button>
      </div>
    </div>
  );
}
