"use client";

import { useEffect } from "react";

type AchievementView = {
  id: string;
  icon: string;
  title: string;
  description: string;
  hint: string;
  unlocked: boolean;
};

type Props = {
  achievements: AchievementView[];
  onClose: () => void;
};

export default function AchievementModal({ achievements, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "z" || e.key === "Z") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <button type="button" aria-label="업적 닫기" className="absolute inset-0" onClick={onClose} />
      <div
        className="relative mx-4 w-full max-w-2xl xl:max-w-3xl border-2 border-game-border-bright bg-game-panel p-3 md:p-6 xl:p-7"
        style={{ boxShadow: "0 0 0 2px var(--color-game-border), 0 0 0 4px var(--color-game-panel)" }}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="업적"
        aria-modal="true"
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between border-b border-game-border pb-3">
          <div>
            <div className="text-[12px] xl:text-[13px] text-game-text font-pixel">★ 업적</div>
            <p className="mt-2 text-[12px] xl:text-[13px] text-game-text-dim font-mono">
              해금 {unlockedCount} / {achievements.length}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-game-border-bright transition-colors hover:text-game-text font-mono"
          >
            <span className="hidden md:inline">[Z] </span>닫기
          </button>
        </div>

        <div className="grid max-h-[60vh] grid-cols-1 gap-3 overflow-y-auto pr-1">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border p-3 md:p-4 xl:p-5"
              style={{
                borderColor: achievement.unlocked ? "var(--color-game-border-bright)" : "#1f2b10",
                background: achievement.unlocked ? "var(--color-game-panel)" : "var(--color-game-panel-dark)",
                opacity: achievement.unlocked ? 1 : 0.7,
              }}
            >
              <div className="mb-2 flex items-start gap-3">
                <div
                  className="flex h-10 w-10 xl:h-12 xl:w-12 items-center justify-center border text-[18px] xl:text-[22px]"
                  style={{
                    borderColor: achievement.unlocked ? "var(--color-game-border-bright)" : "var(--color-game-border)",
                    color: achievement.unlocked ? "var(--color-game-text)" : "var(--color-game-border-bright)",
                    background: achievement.unlocked ? "#0f2420" : "var(--color-game-panel)",
                  }}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className="text-[14px] xl:text-[15px] font-mono"
                      style={{ color: achievement.unlocked ? "var(--color-game-text)" : "#708544" }}
                    >
                      {achievement.title}
                    </h3>
                    <span
                      className="text-[11px] xl:text-[12px] font-mono"
                      style={{ color: achievement.unlocked ? "#8dcf62" : "#46561f" }}
                    >
                      {achievement.unlocked ? "해금됨" : "미해금"}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[12px] xl:text-[13px] leading-relaxed font-mono"
                    style={{ color: achievement.unlocked ? "var(--color-game-accent)" : "#62712f" }}
                  >
                    {achievement.description}
                  </p>
                </div>
              </div>
              {!achievement.unlocked && (
                <p className="text-[11px] leading-relaxed text-[#4e6123] font-mono">
                  힌트: {achievement.hint}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
