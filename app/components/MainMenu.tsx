"use client";

import Image from "next/image";
import { useState } from "react";
import { playSfx } from "../lib/sfx";
import type { GameProgress, GameSettings, SyncStatus } from "../types";
import AchievementModal from "./AchievementModal";
import ArchiveModal from "./ArchiveModal";
import SettingsModal from "./SettingsModal";

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
  onLogin: () => void;
  onLogout: () => void;
  onPull: () => void;
  onPush: () => void;
  onResetProgress: () => void;
  onResetServerData: () => Promise<void>;
};
type MenuItem = {
  label: string;
  icon: string;
  action: () => void;
};

export default function MainMenu({
  onStart,
  canContinue,
  progress,
  settings,
  achievements,
  syncStatus,
  syncBusy,
  onSettingsChange,
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exitHint, setExitHint] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: canContinue ? "이어하기" : "시작하기",
      icon: "▶",
      action: onStart,
    },
    { label: "기록 보기", icon: "▣", action: () => setArchiveOpen(true) },
    { label: "업적", icon: "★", action: () => setAchievementOpen(true) },
    { label: "설정", icon: "◈", action: () => setSettingsOpen(true) },
    {
      label: "종료",
      icon: "✕",
      action: () => {
        window.close();
        setExitHint(true);
      },
    },
  ];

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-[#060907]">
        <Image
          src="/menu-bg.png"
          alt=""
          fill
          priority
          quality={100}
          className="object-cover object-bottom"
          style={{ imageRendering: "pixelated" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,6,4,0.72) 0%, rgba(4,6,4,0.55) 40%, rgba(4,6,4,0.30) 65%, rgba(4,6,4,0.70) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <p
            className="text-[12px] tracking-widest mb-5"
            style={{ fontFamily: "monospace", color: "#7a9a40" }}
          >
            · 5·18민주화운동 인터랙티브 스토리 ·
          </p>

          <div className="relative mb-3">
            <div
              className="px-10 py-5 border-2 border-[#4a6a1a]"
              style={{
                background: "rgba(6,9,4,0.82)",
                boxShadow:
                  "0 0 0 2px #2c3f12, 0 0 0 5px #0b1208, inset 0 0 30px rgba(74,106,26,0.12)",
              }}
            >
              <h1
                className="text-5xl font-bold text-center text-[#c4d47a]"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow:
                    "0 0 24px rgba(196,212,122,0.5), 3px 3px 0 #1a2a0c",
                  letterSpacing: "0.06em",
                }}
              >
                그날의 선택
              </h1>
            </div>
            {(
              [
                "top-0 left-0 border-t-4 border-l-4",
                "top-0 right-0 border-t-4 border-r-4",
                "bottom-0 left-0 border-b-4 border-l-4",
                "bottom-0 right-0 border-b-4 border-r-4",
              ] as const
            ).map((cls) => (
              <div
                key={cls}
                className={`absolute w-5 h-5 border-[#c4d47a] ${cls}`}
                style={{ margin: -7 }}
              />
            ))}
          </div>

          <p
            className="text-[13px] mb-12 tracking-widest"
            style={{ fontFamily: "monospace", color: "#5a7a20" }}
          >
            ◈ 1980년 5월 광주의 시간을 따라가며, 시민들의 선택과 기록을
            마주합니다. ◈
          </p>

          <div className="flex flex-col items-center gap-2.5 w-96">
            {menuItems.map(({ label, icon, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => { if (settings.soundOn) playSfx("click"); action(); }}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className="w-full flex items-center gap-4 px-6 py-4 border transition-all"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  background:
                    hovered === label
                      ? "rgba(22,32,16,0.95)"
                      : "rgba(6,9,4,0.88)",
                  borderColor: hovered === label ? "#6a9a2a" : "#2c3f12",
                  boxShadow: hovered === label ? "0 0 0 1px #4a6a1a" : "none",
                  cursor: "pointer",
                }}
              >
                <span
                  className="text-[14px] w-5"
                  style={{ color: hovered === label ? "#c4d47a" : "#4a6a1a" }}
                >
                  {icon}
                </span>
                <span
                  className="text-[14px]"
                  style={{ color: hovered === label ? "#c4d47a" : "#8aa040" }}
                >
                  {label}
                </span>
                {hovered === label && (
                  <span className="ml-auto text-[12px] text-[#4a6a1a]">▶</span>
                )}
              </button>
            ))}
          </div>

          <div className="absolute bottom-7 flex flex-col items-center gap-1.5">
            <p
              className="text-[11px]"
              style={{ fontFamily: "monospace", color: "#4a6a20" }}
            >
              역사를 기억하는 일은 오늘을 지키는 일입니다
            </p>
            <p
              className="text-[10px]"
              style={{ fontFamily: "monospace", color: "#344e16" }}
            >
              — 5.18 민주화운동 —
            </p>
            <p
              className="text-[10px] mt-1"
              style={{ fontFamily: "monospace", color: "#263810" }}
            >
              © Remember 5.18
            </p>
          </div>
        </div>
      </div>
      {archiveOpen && (
        <ArchiveModal
          progress={progress}
          achievements={achievements}
          onClose={() => setArchiveOpen(false)}
        />
      )}
      {achievementOpen && (
        <AchievementModal
          achievements={achievements}
          onClose={() => setAchievementOpen(false)}
        />
      )}
      {settingsOpen && (
        <SettingsModal
          settings={settings}
          syncStatus={syncStatus}
          syncBusy={syncBusy}
          onClose={() => setSettingsOpen(false)}
          onSettingsChange={onSettingsChange}
          onLogin={onLogin}
          onLogout={onLogout}
          onPull={onPull}
          onPush={onPush}
          onResetProgress={onResetProgress}
          onResetServerData={onResetServerData}
        />
      )}
      {exitHint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.88)" }}
        >
          <div
            className="border-2 border-[#4a6a1a] bg-[#0b1208] p-8 w-80 text-center"
            style={{ boxShadow: "0 0 0 2px #2c3f12" }}
          >
            <p
              className="text-[12px] text-[#c4d47a] mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              종료
            </p>
            <p
              className="text-[12px] text-[#5a7a20] leading-relaxed mt-4 mb-6"
              style={{ fontFamily: "monospace" }}
            >
              브라우저에서는 탭을 직접 닫아주세요.
            </p>
            <button
              type="button"
              onClick={() => setExitHint(false)}
              className="border border-[#2c3f12] bg-[#0d1608] hover:bg-[#162010] px-6 py-2.5 text-[12px] text-[#8aa040]"
              style={{ fontFamily: "monospace" }}
            >
              돌아가기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
