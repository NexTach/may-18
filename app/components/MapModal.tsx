"use client";

import { useState } from "react";
import type { SceneId } from "../types";
import GwangjuCityMap from "./map/GwangjuCityMap";
import MiniMap from "./MiniMap";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";

type MapMode = "activity" | "city";

type Props = {
  currentSceneId: SceneId;
  visitedSceneIds: Set<SceneId>;
  choiceLog: string[];
  defaultMode: MapMode;
  onClose: () => void;
  onJump?: (sceneId: SceneId) => void;
};

const LEGEND_ITEMS = [
  { color: "#c4d47a", label: "현재 위치" },
  { color: "#7d8f3a", label: "이동 가능" },
  { color: "#5a8a2a", label: "지나온 곳" },
  { color: "#0f2420", label: "미방문" },
] as const;

export default function MapModal({
  currentSceneId,
  visitedSceneIds,
  choiceLog,
  defaultMode,
  onClose,
  onJump,
}: Props) {
  const [mode, setMode] = useState<MapMode>(defaultMode);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <button type="button" aria-label="지도 닫기" className="absolute inset-0" onClick={onClose} />
      <div
        className="relative mx-4 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl border-2 border-game-border-bright bg-game-panel p-4 md:p-5 xl:p-6 max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208" }}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="지역 지도"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-game-border">
          <div className="flex items-center gap-3">
            <span className="text-[12px] xl:text-[13px] text-game-text font-pixel">▣ 지역 지도</span>
            <div className="flex gap-1">
              {(["activity", "city"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className="px-2.5 py-1 xl:px-3 xl:py-1.5 text-[11px] xl:text-[12px] border transition-colors cursor-pointer font-mono"
                  style={{
                    borderColor: mode === m ? "#4a6a1a" : "#2c3f12",
                    background: mode === m ? "#0f2420" : "#0b1c18",
                    color: mode === m ? "#c4d47a" : "#4a6a1a",
                  }}
                >
                  {m === "activity" ? "활동 지도" : "광주 전도"}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-game-border-bright hover:text-game-text transition-colors cursor-pointer font-mono"
          >
            <span className="hidden md:inline">[Z] </span>닫기
          </button>
        </div>

        {/* Map area */}
        <div
          className="border border-game-border bg-[#060d04] mb-4 relative flex items-center justify-center"
          style={{ height: "clamp(280px, 32vh, 480px)" }}
        >
          {mode === "activity" ? (
            <>
              <MiniMap
                currentSceneId={currentSceneId}
                visitedSceneIds={visitedSceneIds}
                compact={false}
                onJump={
                  DEV_MODE && onJump
                    ? (id) => { onJump(id); onClose(); }
                    : undefined
                }
              />
              {DEV_MODE && (
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 border border-[#6a3a1a] bg-[#1a0d06] font-mono">
                  <span className="text-[10px] text-[#c4741a]">DEV · 노드 클릭 시 이동</span>
                </div>
              )}
            </>
          ) : (
            <GwangjuCityMap currentSceneId={currentSceneId} visitedSceneIds={visitedSceneIds} />
          )}
        </div>

        {/* Choice log */}
        <div className="border border-game-border bg-game-panel-dark p-4 xl:p-5">
          <div className="text-[11px] xl:text-[12px] text-game-border-bright mb-3 font-pixel">기록한 선택</div>
          {choiceLog.length === 0 ? (
            <p className="text-[13px] xl:text-[14px] text-[#2a3a10] font-mono">아직 기록된 선택이 없습니다.</p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {choiceLog.map((c, i) => (
                <div key={`${i}-${c}`} className="flex items-start gap-3">
                  <span className="text-[12px] xl:text-[13px] text-game-text-muted font-mono">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-[13px] xl:text-[14px] text-[#7a9038] font-mono">{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3 flex-wrap">
          {LEGEND_ITEMS.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-3 h-3 xl:w-3.5 xl:h-3.5 inline-block border" style={{ background: color, borderColor: color }} />
              <span className="text-[12px] xl:text-[13px] text-game-text-muted font-mono">{label}</span>
            </div>
          ))}
          {mode === "activity" && (
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] xl:text-[13px] text-game-border-bright font-mono">- - -</span>
              <span className="text-[12px] xl:text-[13px] text-game-text-muted font-mono">경로</span>
            </div>
          )}
          {mode === "city" && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] xl:text-[12px] text-game-border-bright font-mono">□ - -</span>
              <span className="text-[12px] xl:text-[13px] text-game-text-muted font-mono">게임 무대</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
