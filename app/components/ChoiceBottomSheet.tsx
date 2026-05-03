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

const STAT_COLORS: Record<StatKey, string> = {
  courage: "#cc4420",
  record: "#2080cc",
  trust: "#20aa60",
  safety: "#c8a020",
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
        className="absolute inset-0 cursor-default"
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={handleClose}
      />

      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          background: "#0b1208",
          borderTop: "2px solid #4a6a1a",
          boxShadow: "0 -4px 32px rgba(74,106,26,0.18)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2c3f12]">
          <span
            className="text-[11px] text-[#3a5010]"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ◆ 이제 어떻게 해야 할까
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="text-[12px] text-[#4a6a1a] hover:text-[#c4d47a] transition-colors cursor-pointer"
            style={{ fontFamily: "monospace" }}
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
                  : "border-[#2c3f12] bg-[#0d1608] active:bg-[#162010] active:border-[#4a6a1a] cursor-pointer"
              }`}
            >
              <span
                className={`flex-shrink-0 text-[13px] font-bold ${
                  choice.disabled ? "text-[#66752e]" : "text-[#c4d47a]"
                }`}
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {i + 1}.
              </span>
              <span className="flex-1">
                <span
                  className={`block text-[13px] leading-relaxed ${
                    choice.disabled ? "text-[#62712f]" : "text-[#8aa040]"
                  }`}
                  style={{ fontFamily: "monospace" }}
                >
                  {choice.text}
                </span>
                <span
                  className={`block mt-1 text-[11px] leading-relaxed ${
                    choice.disabled ? "text-[#48591f]" : "text-[#5d7227]"
                  }`}
                  style={{ fontFamily: "monospace" }}
                >
                  {choice.detail}
                </span>
                {choice.disabledReason && (
                  <span
                    className="block mt-1 text-[11px] text-[#8f6e2a] leading-relaxed"
                    style={{ fontFamily: "monospace" }}
                  >
                    필요 조건: {choice.disabledReason}
                  </span>
                )}
              </span>
              {choice.stat && choice.statDelta !== undefined && (
                <span
                  className="flex-shrink-0 text-[11px] font-bold mt-0.5"
                  style={{
                    color: STAT_COLORS[choice.stat],
                    fontFamily: "monospace",
                  }}
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
