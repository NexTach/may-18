"use client";

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
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-2 py-1.5 md:px-3 border border-[#2c3f12] bg-[#0d1608] hover:bg-[#1a2a0c] transition-colors cursor-pointer"
      style={{ fontFamily: "monospace" }}
    >
      <span className="hidden md:inline text-[11px] text-game-border-bright">[{shortcut}]</span>
      <span className="text-[12px] md:text-[13px] text-[#8aa040]">{label}</span>
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
    <div
      className="flex items-center justify-between px-3 py-2 md:px-4 border-2 border-game-border bg-game-panel shrink-0"
      style={{ minHeight: 48 }}
    >
      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1 mr-2">
        <span
          className="text-[11px] md:text-[13px] font-bold text-game-text truncate"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            letterSpacing: "0.05em",
          }}
        >
          {String(stageNum).padStart(2, "0")}. {stageTitle}
        </span>
        <span
          className="hidden md:inline text-[13px] text-game-text-dim shrink-0"
          style={{ fontFamily: "monospace" }}
        >
          {date}
        </span>
        <span
          className="hidden md:inline text-[12px] text-game-text-muted shrink-0"
          style={{ fontFamily: "monospace" }}
        >
          | {location}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4 shrink-0">
        <span
          className="text-[12px] text-game-text-muted"
          style={{ fontFamily: "monospace" }}
        >
          기록한 선택
        </span>
        <span
          className="text-[12px] text-game-text-dim"
          style={{ fontFamily: "monospace" }}
        >
          {String(sceneIndex).padStart(2, "0")}/
          {String(totalScenes).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-1 md:gap-1.5 shrink-0 md:ml-4">
        <HUDButton label="역사" shortcut="X" onClick={onHistory} />
        <HUDButton label="지도" shortcut="M" onClick={onMap} />
        <HUDButton label="가방" shortcut="Tab" onClick={onInventory} />
        <HUDButton label="메뉴" shortcut="ESC" onClick={onMenu} />
      </div>
    </div>
  );
}
