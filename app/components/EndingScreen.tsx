"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  stageTitle: string;
  text: string;
  dialogue: { name: string; line: string; avatar: string }[];
  history: string;
  onRestart: () => void;
  onMainMenu: () => void;
};

export default function EndingScreen({
  stageTitle,
  text,
  dialogue,
  history,
  onRestart,
  onMainMenu,
}: Props) {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const quote = dialogue[0]?.line ?? "";

  return (
    <div
      className="relative w-full h-dvh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-game-bg)" }}
    >
      <Image
        src="/menu-bg.png"
        alt=""
        fill
        priority
        quality={100}
        className="object-cover"
        style={{ imageRendering: "pixelated", opacity: 0.3 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,0.92) 100%)",
          zIndex: 1,
        }}
      />

      <div
        className="relative flex flex-col items-center gap-5 max-w-[560px] w-full text-center px-6"
        style={{ zIndex: 2 }}
      >
        <div
          className="text-[11px] tracking-[4px]"
          style={{ color: "var(--color-game-text-dim)", fontFamily: "'DungGeunMo', monospace" }}
        >
          {stageTitle}
        </div>

        <div
          className="text-[24px] md:text-[28px] tracking-[4px] leading-snug"
          style={{
            color: "var(--color-game-accent)",
            fontFamily: "'DungGeunMo', monospace",
            textShadow: "0 0 24px rgba(245,208,108,0.5)",
          }}
        >
          {quote}
        </div>

        <div
          className="text-[13px] md:text-[15px] leading-[2] tracking-[1px] border-t border-b py-4 w-full"
          style={{
            color: "var(--color-game-text)",
            borderColor: "var(--color-game-border)",
            fontFamily: "'DungGeunMo', monospace",
          }}
        >
          {text}
        </div>

        <div
          className="text-[11px] md:text-[12px] leading-[1.9] tracking-[0.5px] text-left w-full"
          style={{
            color: "var(--color-game-text-dim)",
            fontFamily: "'DungGeunMo', monospace",
          }}
        >
          {history}
        </div>

        <div className="flex gap-2.5 mt-3 flex-wrap justify-center">
          {(
            [
              { key: "restart", label: "처음으로 돌아가기", action: onRestart },
              { key: "menu", label: "메인 메뉴", action: onMainMenu },
            ] as const
          ).map(({ key, label, action }) => (
            <button
              key={key}
              type="button"
              onClick={action}
              onMouseEnter={() => setHoveredBtn(key)}
              onMouseLeave={() => setHoveredBtn(null)}
              className="px-5 py-2.5 text-[12px] tracking-[1px] transition-colors cursor-pointer"
              style={{
                background: "none",
                border: "2px solid",
                borderColor:
                  hoveredBtn === key
                    ? "var(--color-game-accent)"
                    : "var(--color-game-border-bright)",
                color:
                  hoveredBtn === key
                    ? "var(--color-game-accent)"
                    : "var(--color-game-text)",
                fontFamily: "'DungGeunMo', monospace",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
