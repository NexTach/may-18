"use client";

type Props = {
  x: number;
  y: number;
  name: string;
  line: string;
  borderColor: string;
  bgColor: string;
};

function truncate(s: string, n = 20): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export default function SpeechBubble({ x, y, name, line, borderColor, bgColor }: Props) {
  return (
    <div
      className="hidden md:block"
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -100%)",
        zIndex: 15,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: `${bgColor}f0`,
          border: `1.5px solid ${borderColor}`,
          padding: "4px 8px",
          minWidth: 72,
          maxWidth: 136,
          wordBreak: "keep-all",
          boxShadow: `0 0 0 1px rgba(0,0,0,0.6), inset 0 0 6px ${bgColor}`,
        }}
      >
        <div
          className="font-pixel text-[9px] mb-[3px] leading-none tracking-[0.04em]"
          style={{ color: borderColor }}
        >
          {name}
        </div>
        <div className="font-mono text-[11px] text-game-text leading-[1.4]">
          {truncate(line)}
        </div>
      </div>
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: `6px solid ${borderColor}`,
          margin: "0 auto",
        }}
      />
    </div>
  );
}
