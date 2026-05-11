"use client";

import { useEffect, useState } from "react";
import { STAT_LABELS } from "../lib/constants";
import { playSfx } from "../lib/sfx";
import type { Choice, StatKey } from "../types";

type ChoiceView = Choice & {
  disabled?: boolean;
  disabledReason?: string;
};

type Props = {
  choices: ChoiceView[];
  soundOn: boolean;
  onChoice: (choice: Choice) => void;
  onClose: () => void;
};

const STAT_COLOR_VAR: Record<StatKey, string> = {
  courage: "var(--color-stat-courage)",
  record: "var(--color-stat-record)",
  trust: "var(--color-stat-trust)",
  safety: "var(--color-stat-safety)",
};

export default function ChoiceBottomSheet({
  choices,
  soundOn,
  onChoice,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  const handleChoice = (choice: ChoiceView) => {
    if (choice.disabled) return;
    if (soundOn) playSfx("select");
    setVisible(false);
    setTimeout(() => onChoice(choice), 180);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
      <button
        type="button"
        aria-label="선택지 닫기"
        className="absolute inset-0 cursor-default bg-black/65"
        onClick={handleClose}
      />

      <div
        className="relative transition-transform duration-300 ease-out bg-game-panel border-t-2 border-game-border-bright"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          boxShadow: "0 -4px 32px rgba(74,106,26,0.18)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-game-border">
          <span className="text-[11px] text-game-text-muted font-pixel">
            ◆ 이제 어떻게 해야 할까
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="text-[12px] text-game-border-bright hover:text-game-text transition-colors cursor-pointer font-mono"
          >
            닫기
          </button>
        </div>

        <div
          className="p-3 flex flex-col gap-2"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          {choices.map((choice, i) => (
            <button
              key={`${choice.nextSceneId}-${choice.text}`}
              type="button"
              disabled={choice.disabled}
              onClick={() => handleChoice(choice)}
              className={`w-full flex items-start gap-3 px-3 py-3 border transition-all text-left group ${
                choice.disabled
                  ? "border-[#1f2b10] bg-[#0a1006] cursor-not-allowed opacity-60"
                  : "border-game-border bg-game-panel active:bg-[#162010] active:border-game-border-bright cursor-pointer"
              }`}
            >
              <span
                className={`shrink-0 text-[13px] font-bold font-pixel ${
                  choice.disabled ? "text-[#66752e]" : "text-game-text"
                }`}
              >
                {i + 1}.
              </span>
              <span className="flex-1">
                <span
                  className={`block text-[13px] leading-relaxed font-mono ${
                    choice.disabled ? "text-[#62712f]" : "text-game-accent"
                  }`}
                >
                  {choice.text}
                </span>
                <span
                  className={`block mt-1 text-[11px] leading-relaxed font-mono ${
                    choice.disabled ? "text-[#48591f]" : "text-[#5d7227]"
                  }`}
                >
                  {choice.detail}
                </span>
                {choice.disabledReason && (
                  <span className="block mt-1 text-[11px] text-[#8f6e2a] leading-relaxed font-mono">
                    필요 조건: {choice.disabledReason}
                  </span>
                )}
              </span>
              {choice.stat && choice.statDelta !== undefined && (
                <span
                  className="shrink-0 text-[11px] font-bold mt-0.5 font-mono"
                  style={{ color: STAT_COLOR_VAR[choice.stat] }}
                >
                  {STAT_LABELS[choice.stat]} +{choice.statDelta}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
