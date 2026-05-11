"use client";

import Image from "next/image";
import { useState } from "react";
import { playSfx } from "../lib/sfx";
import type { GameProgress, GameSettings, SyncStatus } from "../types";
import AchievementModal from "./AchievementModal";
import ArchiveModal from "./ArchiveModal";

type AchievementView = {
  id: string;
  icon: string;
  title: string;
  description: string;
  hint: string;
  unlocked: boolean;
};

type Props = {
  onStart: () => void;
  canContinue: boolean;
  progress: GameProgress;
  settings: GameSettings;
  achievements: AchievementView[];
  syncStatus: SyncStatus;
  syncBusy: boolean;
  onSettingsChange: (patch: Partial<GameSettings>) => void;
  onOpenSettings: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onPull: () => void;
  onPush: () => void;
  onResetProgress: () => void;
  onResetServerData: () => Promise<void>;
};

type MenuItem = { label: string; action: () => void };

export default function MainMenu({
  onStart,
  canContinue,
  progress,
  settings,
  achievements,
  syncStatus,
  syncBusy,
  onSettingsChange,
  onOpenSettings,
  onLogin,
  onLogout,
  onPull,
  onPush,
  onResetProgress,
  onResetServerData,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [exitHint, setExitHint] = useState(false);

  const menuItems: MenuItem[] = [
    { label: canContinue ? "이어하기" : "게임 시작", action: onStart },
    { label: "기록 보기", action: () => setArchiveOpen(true) },
    { label: "설정", action: onOpenSettings },
    { label: "게임 종료", action: () => { window.close(); setExitHint(true); } },
  ];

  return (
    <>
      <div className="relative h-[100dvh] w-full overflow-hidden bg-game-bg">
        <Image
          src="/menu-bg.png"
          alt=""
          fill
          priority
          quality={100}
          className="object-cover object-bottom"
          style={{ imageRendering: "pixelated" }}
        />

        {/* scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)" }}
        />
        {/* vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.9) 100%)" }}
        />

        <div className="relative z-[2] flex h-full flex-col items-center justify-center">
          <p
            className="text-[12px] tracking-[4px] mb-5 px-4 text-center"
            style={{ color: "var(--color-game-text-dim)", fontFamily: "'DungGeunMo', monospace" }}
          >
            5·18 민주화운동 인터랙티브 체험 게임
          </p>

          <h1
            className="text-[42px] md:text-[54px] text-center mb-2 tracking-[10px]"
            style={{
              color: "var(--color-game-accent)",
              fontFamily: "'DungGeunMo', monospace",
              textShadow: "0 0 32px rgba(245,208,108,0.65), 0 0 64px rgba(245,208,108,0.2)",
              animation: "tPulse 3s ease-in-out infinite",
            }}
          >
            그날의 선택
          </h1>

          <p
            className="text-[13px] mb-12 tracking-[2px] px-4 text-center"
            style={{ color: "var(--color-game-text-dim)", fontFamily: "'DungGeunMo', monospace" }}
          >
            1980년 5월, 광주의 시민이 되어 선택을 경험하세요.
          </p>

          <nav className="flex flex-col gap-0.5 w-60">
            {menuItems.map(({ label, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => { if (settings.soundOn) playSfx("click"); action(); }}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-2.5 px-[18px] py-[11px] text-[17px] tracking-[2px] text-left cursor-pointer transition-colors"
                style={{
                  background: hovered === label ? "rgba(245,208,108,0.05)" : "transparent",
                  border: "none",
                  color: hovered === label ? "var(--color-game-accent)" : "var(--color-game-text-dim)",
                  fontFamily: "'DungGeunMo', monospace",
                }}
              >
                <span
                  className="text-[10px] transition-opacity"
                  style={{
                    color: "var(--color-game-accent)",
                    opacity: hovered === label ? 1 : 0,
                  }}
                >
                  ▶
                </span>
                <span>▸ {label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div
          className="absolute bottom-[22px] left-0 right-0 text-center text-[11px] tracking-[2px] z-[2]"
          style={{ color: "var(--color-game-border-bright)", fontFamily: "'DungGeunMo', monospace" }}
        >
          © Remember 5.18 &nbsp;·&nbsp; 우리는 기억해야 합니다
        </div>
      </div>

      {archiveOpen && (
        <ArchiveModal progress={progress} achievements={achievements} onClose={() => setArchiveOpen(false)} />
      )}
      {achievementOpen && (
        <AchievementModal achievements={achievements} onClose={() => setAchievementOpen(false)} />
      )}
      {exitHint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.88]">
          <div
            className="border-2 border-game-border-bright bg-game-panel p-8 w-80 text-center"
            style={{ boxShadow: "0 0 0 2px var(--color-game-border)" }}
          >
            <p className="text-[12px] text-game-text mb-2 font-pixel">종료</p>
            <p className="text-[12px] text-game-text-dim leading-relaxed mt-4 mb-6 font-mono">
              브라우저에서는 탭을 직접 닫아주세요.
            </p>
            <button
              type="button"
              onClick={() => setExitHint(false)}
              className="border border-game-border bg-game-panel hover:bg-[#0f2420] px-6 py-2.5 text-[12px] text-game-accent font-mono"
            >
              돌아가기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
