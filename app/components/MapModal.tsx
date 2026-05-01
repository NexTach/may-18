"use client";

import MiniMap from "./MiniMap";

type Props = {
  currentSceneId: string;
  visitedSceneIds: Set<string>;
  choiceLog: string[];
  onClose: () => void;
};

export default function MapModal({
  currentSceneId,
  visitedSceneIds,
  choiceLog,
  onClose,
}: Props) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className="border-2 border-[#4a6a1a] bg-[#0b1208] p-5 max-w-2xl w-full mx-4"
        style={{ boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2c3f12]">
          <span
            className="text-[12px] text-[#c4d47a]"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ▣ 지역 지도
          </span>
          <button
            onClick={onClose}
            className="text-[13px] text-[#4a6a1a] hover:text-[#c4d47a] transition-colors cursor-pointer"
            style={{ fontFamily: "monospace" }}
          >
            [ESC] 닫기
          </button>
        </div>

        {/* map */}
        <div
          className="border border-[#2c3f12] bg-[#090d06] mb-4"
          style={{ height: 280 }}
        >
          <MiniMap
            currentSceneId={currentSceneId}
            visitedSceneIds={visitedSceneIds}
            compact={false}
          />
        </div>

        {/* choice log */}
        <div className="border border-[#2c3f12] bg-[#090d06] p-4">
          <div
            className="text-[11px] text-[#4a6a1a] mb-3"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            기록한 선택
          </div>
          {choiceLog.length === 0 ? (
            <p
              className="text-[13px] text-[#2a3a10]"
              style={{ fontFamily: "monospace" }}
            >
              아직 기록된 선택이 없습니다.
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {choiceLog.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="text-[12px] text-[#3a5010]"
                    style={{ fontFamily: "monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span
                    className="text-[13px] text-[#7a9038]"
                    style={{ fontFamily: "monospace" }}
                  >
                    {c}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* legend */}
        <div className="flex items-center gap-5 mt-3">
          {[
            { color: "#c4d47a", label: "현재 위치" },
            { color: "#4a6a1a", label: "방문함" },
            { color: "#1a2a0c", label: "미방문" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 inline-block border"
                style={{ background: color, borderColor: color }}
              />
              <span
                className="text-[12px] text-[#3a5010]"
                style={{ fontFamily: "monospace" }}
              >
                {label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span
              className="text-[12px] text-[#4a6a1a]"
              style={{ fontFamily: "monospace" }}
            >
              - - -
            </span>
            <span
              className="text-[12px] text-[#3a5010]"
              style={{ fontFamily: "monospace" }}
            >
              경로
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
