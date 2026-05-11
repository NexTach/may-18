"use client";

import { useEffect, useState } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 마운트 후 한 프레임 뒤에 show — CSS 트랜지션 트리거
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

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
        /* 참조 HTML .npc-bubble 효과 */
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "0 4px",
        transition: "opacity 0.35s ease, translate 0.35s ease",
      }}
    >
      <div
        style={{
          background: `rgba(11,28,24,0.88)`,
          border: `1.5px solid ${borderColor}`,
          padding: "5px 9px",
          minWidth: 72,
          maxWidth: 160,
          wordBreak: "keep-all",
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            fontSize: 10,
            marginBottom: 2,
            color: borderColor,
            fontFamily: "'DungGeunMo', monospace",
            letterSpacing: "0.5px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--color-game-text)",
            fontFamily: "'DungGeunMo', monospace",
            letterSpacing: "0.3px",
          }}
        >
          {truncate(line)}
        </div>
      </div>
      {/* 말풍선 꼬리 삼각형 */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: `5px solid ${borderColor}`,
          marginLeft: 12,
        }}
      />
    </div>
  );
}
