"use client";

type Props = {
  history: string;
  location: string;
  date: string;
  onClose: () => void;
};

export default function HistoryModal({ history, location, date, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="border-2 border-[#4a6a1a] bg-[#0b1208] p-7 max-w-xl w-full mx-4 relative"
        style={{ boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208, 0 0 0 6px #1a2a0c" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="border-b border-[#2c3f12] pb-4 mb-5">
          <div
            className="text-[12px] text-[#4a6a1a] mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ▣ 실제 기록
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[13px] text-[#c4d47a]" style={{ fontFamily: "monospace" }}>
              {date}
            </span>
            <span className="text-[13px] text-[#5a7a20]" style={{ fontFamily: "monospace" }}>
              · {location}
            </span>
          </div>
        </div>

        {/* content */}
        <div className="mb-6 border border-[#1e2e0e] bg-[#090d06] p-5">
          <p className="text-[14px] text-[#9ab048] leading-loose" style={{ fontFamily: "monospace" }}>
            {history}
          </p>
        </div>

        {/* source */}
        <div className="mb-5">
          <p className="text-[12px] text-[#3a5010]" style={{ fontFamily: "monospace" }}>
            출처: 5·18기념재단 / 국가기록원 / 5·18민주화운동기록관
          </p>
        </div>

        {/* close */}
        <button
          onClick={onClose}
          className="w-full border border-[#4a6a1a] bg-[#0d1608] hover:bg-[#162010] py-3 transition-colors cursor-pointer"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <span className="text-[12px] text-[#c4d47a]">[ 닫기 ]</span>
        </button>
      </div>
    </div>
  );
}
