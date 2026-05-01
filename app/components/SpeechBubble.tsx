"use client";

type Props = {
  x: number; // center x percent
  y: number; // NPC anchor y percent — tail points here
  name: string;
  line: string;
  borderColor: string;
  bgColor: string;
};

function truncate(s: string, n = 20): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export default function SpeechBubble({
  x,
  y,
  name,
  line,
  borderColor,
  bgColor,
}: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        // bottom of this div (tail) sits at the NPC anchor point
        transform: "translate(-50%, -100%)",
        zIndex: 15,
        pointerEvents: "none",
      }}
    >
      {/* bubble box */}
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
        {/* speaker name */}
        <div
          style={{
            fontSize: 9,
            color: borderColor,
            fontFamily: "'Press Start 2P', monospace",
            marginBottom: 3,
            lineHeight: 1,
            letterSpacing: "0.04em",
          }}
        >
          {name}
        </div>
        {/* dialogue text */}
        <div
          style={{
            fontSize: 11,
            color: "#d4e47a",
            fontFamily: "monospace",
            lineHeight: 1.4,
          }}
        >
          {truncate(line)}
        </div>
      </div>
      {/* downward-pointing tail */}
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
