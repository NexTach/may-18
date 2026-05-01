"use client";

import MiniMap from "./MiniMap";

type Props = {
  objective: string;
  location: string;
  locationDesc: string;
  currentSceneId: string;
  visitedSceneIds: Set<string>;
};

export default function LeftPanel({
  objective,
  location,
  locationDesc,
  currentSceneId,
  visitedSceneIds,
}: Props) {
  return (
    <div
      className="flex flex-col gap-2.5 p-3 border-r-2 border-[#2c3f12] bg-[#0b1208] overflow-hidden"
      style={{ width: 240, minWidth: 240 }}
    >
      {/* 목표 */}
      <div className="border border-[#2c3f12] bg-[#0d1608] p-3">
        <div
          className="text-[11px] text-[#4a6a1a] mb-2 pb-1.5 border-b border-[#1e2e0e]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          목표
        </div>
        <p
          className="text-[13px] text-[#8aa040] leading-relaxed"
          style={{ fontFamily: "monospace" }}
        >
          {objective || "—"}
        </p>
      </div>

      {/* 현재 위치 */}
      <div className="border border-[#2c3f12] bg-[#0d1608] p-3">
        <div
          className="text-[11px] text-[#4a6a1a] mb-2 pb-1.5 border-b border-[#1e2e0e]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          현재 위치
        </div>
        <div
          className="w-full bg-[#0a1006] border border-[#1e2e0e] mb-2"
          style={{ height: 72 }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="text-[12px] text-[#3a5010] text-center leading-snug px-2"
              style={{ fontFamily: "monospace" }}
            >
              {location}
            </span>
          </div>
        </div>
        <p
          className="text-[12px] text-[#5a7a20] leading-relaxed"
          style={{ fontFamily: "monospace" }}
        >
          {locationDesc}
        </p>
      </div>

      {/* 지역 지도 */}
      <div className="border border-[#2c3f12] bg-[#0d1608] p-3 flex-1 min-h-0">
        <div
          className="text-[11px] text-[#4a6a1a] mb-2 pb-1.5 border-b border-[#1e2e0e]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          지역 지도
        </div>
        <div className="w-full" style={{ height: 120 }}>
          <MiniMap
            currentSceneId={currentSceneId}
            visitedSceneIds={visitedSceneIds}
            compact
          />
        </div>
        {/* legend */}
        <div className="flex flex-col gap-1 mt-2">
          {[
            { color: "#c4d47a", label: "현재 위치" },
            { color: "#4a6a1a", label: "이동 가능" },
            { color: "#1a2a0c", label: "잠긴 지역", border: "#2a3a12" },
          ].map(({ color, label, border }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 inline-block flex-shrink-0"
                style={{ background: color, border: border ? `1px solid ${border}` : undefined }}
              />
              <span className="text-[11px] text-[#4a6a1a]" style={{ fontFamily: "monospace" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
