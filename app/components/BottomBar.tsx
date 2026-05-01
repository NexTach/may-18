"use client";

type KeyHint = { key: string; label: string };

const hints: KeyHint[] = [
  { key: "1/2/3", label: "선택" },
  { key: "X", label: "기록 보기" },
  { key: "M", label: "지도 보기" },
  { key: "Tab", label: "가방 열기" },
  { key: "ESC", label: "메뉴/일시정지" },
];

export default function BottomBar() {
  return (
    <div
      className="flex items-center justify-center gap-5 px-4 py-2 border-t-2 border-[#2c3f12] bg-[#090d06]"
      style={{ minHeight: 38 }}
    >
      {hints.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="px-1.5 py-0.5 border border-[#3a5010] bg-[#0d1608] text-[11px] text-[#5a7a20] leading-none"
            style={{ fontFamily: "monospace" }}
          >
            {key}
          </span>
          <span className="text-[11px] text-[#3a5010]" style={{ fontFamily: "monospace" }}>
            : {label}
          </span>
        </div>
      ))}
    </div>
  );
}
