"use client";

const hints = [
  { key: "1/2/3", label: "선택" },
  { key: "X", label: "기록 하기" },
  { key: "M", label: "지도 열기" },
  { key: "Tab", label: "가방 열기" },
  { key: "Z", label: "메뉴/일시정지" },
];

const font = "'DungGeunMo', monospace";

export default function BottomBar() {
  return (
    <div
      className="flex items-center justify-center gap-5 px-4 py-2 shrink-0"
      style={{ fontFamily: font }}
    >
      {hints.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="px-1.5 py-px text-[11px] leading-none"
            style={{
              border: "1.5px solid var(--color-game-border-bright)",
              color: "var(--color-game-text)",
            }}
          >
            {key}
          </span>
          <span
            className="text-[11px]"
            style={{
              color: "var(--color-game-text-dim)",
              letterSpacing: "1px",
            }}
          >
            : {label}
          </span>
        </div>
      ))}
    </div>
  );
}
