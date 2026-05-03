"use client";

import type { Stats } from "../types";

type Props = {
  stats: Stats;
  choiceLog: string[];
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

export default function InventoryModal({ stats, choiceLog, onClose }: Props) {
  const maxStat = Math.max(5, ...Object.values(stats));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.78)" }}
      onClick={onClose}
    >
      <div
        className="border-2 border-game-border-bright bg-game-panel p-5 max-w-lg w-full mx-4"
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
            [Tab] 닫기
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
                      style={{
                        width: `${pct}%`,
                        background: color,
                        opacity: 0.7,
                      }}
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

        <div className="border border-game-border bg-[#090d06] p-4 mb-4">
          <div
            className="text-[11px] text-game-border-bright mb-3"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            소지품
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: "📔", label: "수첩", has: stats.record > 0 },
              { icon: "✏", label: "연필", has: stats.record > 0 },
              { icon: "💧", label: "물통", has: stats.trust > 0 },
              { icon: "🗺", label: "지도", has: true },
            ].map(({ icon, label, has }) => (
              <div
                key={label}
                className="flex flex-col items-center p-3 border border-[#1e2e0e]"
                style={{
                  background: has ? "#0d1608" : "#090d06",
                  opacity: has ? 1 : 0.4,
                }}
              >
                <span className="text-2xl">{icon}</span>
                <span
                  className="text-[12px] text-game-text-dim mt-1"
                  style={{ fontFamily: "monospace" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
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
