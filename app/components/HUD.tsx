"use client";

import { TOTAL_STAGES } from "../data/scenes";
import type { Stats } from "../types";

type Props = {
  stageNum: number;
  stageTitle: string;
  date: string;
  location: string;
  hp: number;
  stats: Stats;
  sceneIndex: number;
  totalScenes: number;
  onHistory: () => void;
  onMap: () => void;
  onInventory: () => void;
  onMenu: () => void;
};

function HeartBar({ hp }: { hp: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          className="text-xl leading-none"
          style={{ color: i < hp ? "#cc2200" : "#2a3a18" }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function HUDButton({
  label,
  shortcut,
  onClick,
}: {
  label: string;
  shortcut: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2c3f12] bg-[#0d1608] hover:bg-[#1a2a0c] transition-colors cursor-pointer"
      style={{ fontFamily: "monospace" }}
    >
      <span className="text-[11px] text-[#4a6a1a]">[{shortcut}]</span>
      <span className="text-[13px] text-[#8aa040]">{label}</span>
    </button>
  );
}

export default function HUD({
  stageNum,
  stageTitle,
  date,
  location,
  hp,
  sceneIndex,
  onHistory,
  onMap,
  onInventory,
  onMenu,
}: Props) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2 border-2 border-[#2c3f12] bg-[#0b1208]"
      style={{ minHeight: 52 }}
    >
      {/* left: stage + date */}
      <div className="flex items-center gap-4">
        <span
          className="text-[13px] font-bold text-[#c4d47a]"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            letterSpacing: "0.05em",
          }}
        >
          {String(stageNum).padStart(2, "0")}. {stageTitle}
        </span>
        <span
          className="text-[13px] text-[#5a7a20]"
          style={{ fontFamily: "monospace" }}
        >
          {date}
        </span>
        <span
          className="text-[12px] text-[#3a5010]"
          style={{ fontFamily: "monospace" }}
        >
          | {location}
        </span>
      </div>

      {/* center: HP */}
      <div className="flex items-center gap-4">
        <span
          className="text-[12px] text-[#3a5010]"
          style={{ fontFamily: "monospace" }}
        >
          기록한 선택
        </span>
        <HeartBar hp={hp} />
        <span
          className="text-[12px] text-[#5a7a20]"
          style={{ fontFamily: "monospace" }}
        >
          {String(sceneIndex).padStart(2, "0")}/
          {String(TOTAL_STAGES).padStart(2, "0")}
        </span>
      </div>

      {/* right: action buttons */}
      <div className="flex items-center gap-1.5">
        <HUDButton label="기록" shortcut="X" onClick={onHistory} />
        <HUDButton label="지도" shortcut="M" onClick={onMap} />
        <HUDButton label="가방" shortcut="Tab" onClick={onInventory} />
        <HUDButton label="메뉴" shortcut="ESC" onClick={onMenu} />
      </div>
    </div>
  );
}
