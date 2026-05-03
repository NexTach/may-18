"use client";

type KeyHint = { key: string; label: string };

const hints: KeyHint[] = [
  { key: "1/2/3", label: "선택" },
  { key: "X", label: "역사 보기" },
  { key: "M", label: "지도 보기" },
  { key: "Tab", label: "가방 열기" },
  { key: "ESC", label: "메뉴/일시정지" },
];

export default function BottomBar() {
  return (
    <div
      className="flex items-center justify-center gap-5 px-4 py-2 border-2 border-game-border bg-[#090d06]"
      style={{ minHeight: 38 }}
    >
      {hints.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="px-1.5 py-0.5 border border-game-text-muted bg-[#0d1608] text-[11px] text-game-text-dim leading-none"
            style={{ fontFamily: "monospace" }}
          >
            {key}
          </span>
          <span
            className="text-[11px] text-game-text-muted"
            style={{ fontFamily: "monospace" }}
          >
            : {label}
          </span>
        </div>
      ))}
    </div>
  );
}
