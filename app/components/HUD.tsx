"use client";

import { useState } from "react";

type Props = {
  stageNum: number;
  stageTitle: string;
  date: string;
  location: string;
  sceneIndex: number;
  totalScenes: number;
  onHistory: () => void;
  onMap: () => void;
  onInventory: () => void;
  onMenu: () => void;
};

function HUDButton({
  label,
  shortcut,
  onClick,
}: {
  label: string;
  shortcut: string;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-1.5 px-2 py-1.5 md:px-3 xl:px-4 xl:py-2 cursor-pointer transition-colors"
      style={{
        background: "var(--color-game-panel)",
        border: "2px solid",
        borderColor: hov ? "var(--color-game-accent)" : "var(--color-game-border-bright)",
        color: hov ? "var(--color-game-accent)" : "var(--color-game-text)",
        fontFamily: "'DungGeunMo', monospace",
      }}
    >
      <span
        className="hidden md:inline text-[11px] xl:text-[12px] px-1 py-px"
        style={{
          border: "1px solid var(--color-game-border-bright)",
          color: "var(--color-game-text-dim)",
        }}
      >
        {shortcut}
      </span>
      <span className="text-[12px] md:text-[13px] xl:text-[14px]">{label}</span>
    </button>
  );
}

export default function HUD({
  stageNum,
  stageTitle,
  date,
  location,
  sceneIndex,
  totalScenes,
  onHistory,
  onMap,
  onInventory,
  onMenu,
}: Props) {
  return (
    <div className="flex items-center justify-between px-3 py-2 md:px-4 xl:px-6 border-2 border-game-border bg-game-panel shrink-0 min-h-[48px] xl:min-h-[60px]">
      <div className="flex items-center gap-2 md:gap-4 xl:gap-6 min-w-0 flex-1 mr-2">
        <span className="text-[11px] md:text-[13px] xl:text-[15px] font-bold text-game-text truncate font-pixel tracking-[0.05em]">
          {String(stageNum).padStart(2, "0")}. {stageTitle}
        </span>
        <span className="hidden md:inline text-[13px] xl:text-[14px] text-game-text-dim shrink-0 font-mono">
          {date}
        </span>
        <span className="hidden md:inline text-[12px] xl:text-[13px] text-game-text-muted shrink-0 font-mono">
          | {location}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4 shrink-0">
        <span className="text-[12px] xl:text-[13px] text-game-text-muted font-mono">기록한 선택</span>
        <span className="text-[12px] xl:text-[13px] text-game-text-dim font-mono">
          {String(sceneIndex).padStart(2, "0")}/
          {String(totalScenes).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-1 md:gap-1.5 xl:gap-2 shrink-0 md:ml-4 xl:ml-6">
        <HUDButton label="역사" shortcut="X" onClick={onHistory} />
        <HUDButton label="지도" shortcut="M" onClick={onMap} />
        <HUDButton label="가방" shortcut="Tab" onClick={onInventory} />
        <HUDButton label="메뉴" shortcut="ESC" onClick={onMenu} />
      </div>
    </div>
  );
}
