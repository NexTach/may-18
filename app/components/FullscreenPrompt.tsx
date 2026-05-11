"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  onFullscreen: () => void;
  onMainMenu: () => void;
};

const font = "'DungGeunMo', monospace";

export default function FullscreenPrompt({ onFullscreen, onMainMenu }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const buttons = [
    { key: "fullscreen", label: "전체화면으로 플레이", action: onFullscreen },
    { key: "menu", label: "메인화면으로 가기", action: onMainMenu },
  ] as const;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-game-bg)", zIndex: 80 }}
    >
      <Image
        src="/menu-bg.png"
        alt=""
        fill
        quality={100}
        className="object-cover object-bottom"
        style={{ imageRendering: "pixelated", opacity: 0.3 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.92) 100%)",
          zIndex: 1,
        }}
      />

      <div
        className="relative flex flex-col items-center gap-5 max-w-[480px] w-full text-center px-6"
        style={{ zIndex: 2 }}
      >
        <div
          className="text-[11px] tracking-[4px]"
          style={{ color: "var(--color-game-text-muted)", fontFamily: font }}
        >
          안내
        </div>

        <div
          className="text-[22px] tracking-[4px] leading-snug"
          style={{
            color: "var(--color-game-accent)",
            fontFamily: font,
            textShadow: "0 0 24px rgba(245,208,108,0.5)",
          }}
        >
          전체화면 권장
        </div>

        <div
          className="text-[13px] leading-[2] tracking-[1px] border-t border-b py-4 w-full"
          style={{
            color: "var(--color-game-text)",
            borderColor: "var(--color-game-border)",
            fontFamily: font,
          }}
        >
          이 게임은 전체화면에서 플레이하도록 설계되었습니다.{"\n"}
          전체화면으로 전환하거나 메인화면으로 돌아갈 수 있습니다.
        </div>

        <div className="flex gap-2.5 mt-2 flex-wrap justify-center">
          {buttons.map(({ key, label, action }) => (
            <button
              key={key}
              type="button"
              onClick={action}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className="px-5 py-2.5 text-[13px] tracking-[1px] transition-colors cursor-pointer"
              style={{
                background: "none",
                border: "2px solid",
                borderColor:
                  hovered === key
                    ? "var(--color-game-accent)"
                    : "var(--color-game-border-bright)",
                color:
                  hovered === key
                    ? "var(--color-game-accent)"
                    : "var(--color-game-text)",
                fontFamily: font,
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
