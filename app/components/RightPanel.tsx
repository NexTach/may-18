"use client";

import { useEffect, useRef, useState } from "react";
import { AVATAR_COLORS, STAT_LABELS } from "../lib/constants";
import { playSfx } from "../lib/sfx";
import type { Choice, DialogueLine, StatKey } from "../types";
import ChoiceBottomSheet from "./ChoiceBottomSheet";

type ChoiceView = Choice & {
  disabled?: boolean;
  disabledReason?: string;
};

type Props = {
  text: string;
  situation: string;
  dialogue: DialogueLine[];
  choices: ChoiceView[];
  typingSpeed: number;
  soundOn: boolean;
  onChoice: (choice: Choice) => void;
};

const STAT_COLOR_VAR: Record<StatKey, string> = {
  courage: "var(--color-stat-courage)",
  record:  "var(--color-stat-record)",
  trust:   "var(--color-stat-trust)",
  safety:  "var(--color-stat-safety)",
};

function useTypingText(text: string, speed = 22) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (speed <= 0) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setDone(true);
      }
    }, speed);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, speed]);

  const skip = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDisplayed(text);
    setDone(true);
  };

  return { displayed, done, skip };
}

function DialogueLines({ dialogue }: { dialogue: DialogueLine[] }) {
  return (
    <>
      {dialogue.map((line) => {
        const av = AVATAR_COLORS[line.avatar] ?? AVATAR_COLORS.citizen;
        return (
          <div key={`${line.avatar}-${line.name}-${line.line}`} className="flex items-start gap-2.5">
            <div
              className="shrink-0 border text-[11px] xl:text-[12px] px-2 py-1 leading-none mt-0.5 text-center font-mono min-w-[52px] xl:min-w-[60px]"
              style={{ background: av.bg, borderColor: av.border, color: av.border }}
            >
              {line.name}
            </div>
            <p className="text-[13px] xl:text-[14px] text-game-accent leading-relaxed flex-1 font-mono">
              {line.line}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default function RightPanel({
  text,
  situation,
  dialogue,
  choices,
  typingSpeed,
  soundOn,
  onChoice,
}: Props) {
  const { displayed, done, skip } = useTypingText(text, typingSpeed);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [situationOpen, setSituationOpen] = useState(false);

  return (
    <div className="flex flex-col bg-game-panel border-2 border-game-border overflow-hidden flex-1 md:flex-none md:w-85 md:min-w-85 xl:w-[380px] xl:min-w-[380px] 2xl:w-[440px] 2xl:min-w-[440px]">
      <button
        type="button"
        className="p-4 xl:p-5 border-b border-[#1e2e0e] cursor-pointer text-left flex flex-col shrink-0 md:flex-none min-h-[110px] xl:min-h-[130px]"
        onClick={() => {
          if (soundOn) playSfx("click");
          skip();
        }}
      >
        <div className="overflow-y-auto max-h-[38vh] md:max-h-none md:flex-none">
          <p className="text-[14px] xl:text-[15px] text-game-text leading-relaxed font-mono">
            {displayed}
            {!done && <span className="animate-pulse">|</span>}
          </p>
          {!done && (
            <p className="text-[11px] xl:text-[12px] text-[#2a3a10] mt-2 font-mono">클릭하면 건너뜁니다</p>
          )}
        </div>
      </button>

      {done && (
        <div className={`md:hidden ${situationOpen ? "flex-1 flex flex-col min-h-0" : "shrink-0"}`}>
          <button
            type="button"
            onClick={() => setSituationOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-b border-[#1e2e0e] bg-game-panel-dark shrink-0 text-left cursor-pointer"
          >
            <span className="text-[10px] text-game-border-bright font-pixel">눈앞의 상황</span>
            <span className="text-[12px] text-game-text-muted font-mono">{situationOpen ? "▲" : "▼"}</span>
          </button>

          {situationOpen && (
            <div className="flex-1 overflow-y-auto min-h-0 p-3 flex flex-col gap-3 bg-game-panel">
              <div className="border border-[#243410] bg-[#0a1006] px-3 py-2.5">
                <p className="text-[12px] text-[#7f9440] leading-relaxed font-mono">{situation}</p>
              </div>
              <DialogueLines dialogue={dialogue} />
            </div>
          )}
        </div>
      )}

      {done && (
        <div
          className={`md:hidden flex flex-col ${situationOpen ? "shrink-0" : "flex-1"}`}
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
        >
          <div className="mt-auto border-t border-game-border">
            <button
              type="button"
              onClick={() => {
                if (soundOn) playSfx("click");
                setSheetOpen(true);
              }}
              className="w-full px-4 py-3.5 active:bg-[#162010] transition-colors cursor-pointer text-left"
            >
              <div className="text-[11px] text-game-text-muted mb-1 font-pixel">◆ 이제 어떻게 해야 할까</div>
              <div className="text-[13px] text-game-accent font-mono">선택하기 →</div>
            </button>
          </div>
        </div>
      )}

      {done && (
        <div className="hidden md:flex flex-1 flex-col p-3 xl:p-4 gap-3 overflow-y-auto min-h-0">
          <div className="border border-[#243410] bg-game-panel px-3 py-2.5 xl:px-4 xl:py-3">
            <div className="text-[10px] xl:text-[11px] text-game-text-dim mb-1 font-pixel">눈앞의 상황</div>
            <p className="text-[12px] xl:text-[13px] text-[#7f9440] leading-relaxed font-mono">{situation}</p>
          </div>
          <DialogueLines dialogue={dialogue} />
        </div>
      )}

      {done && <div className="hidden md:block border-t border-game-border mx-3 mb-1" />}

      {done && (
        <div className="hidden md:flex p-3 xl:p-4 flex-col gap-2 xl:gap-2.5 shrink-0">
          <div className="text-[11px] xl:text-[12px] text-game-text-muted mb-1 font-pixel">◆ 이제 어떻게 해야 할까</div>
          {choices.map((choice, i) => (
            <button
              key={`${choice.nextSceneId}-${choice.text}`}
              type="button"
              disabled={choice.disabled}
              onClick={() => {
                if (soundOn) playSfx("select");
                onChoice(choice);
              }}
              className={`w-full flex items-start gap-3 px-3 py-2.5 xl:px-4 xl:py-3 border transition-all text-left group ${
                choice.disabled
                  ? "border-[#1f2b10] bg-[#0a1006] cursor-not-allowed opacity-60"
                  : "border-game-border bg-game-panel hover:bg-[#162010] hover:border-game-border-bright cursor-pointer"
              }`}
            >
              <span
                className={`shrink-0 text-[13px] xl:text-[14px] font-bold font-pixel ${
                  choice.disabled ? "text-[#66752e]" : "text-game-text"
                }`}
              >
                {i + 1}.
              </span>
              <span className="flex-1 transition-colors">
                <span
                  className={`block text-[13px] xl:text-[14px] leading-relaxed font-mono ${
                    choice.disabled ? "text-[#62712f]" : "text-game-accent group-hover:text-game-text"
                  }`}
                >
                  {choice.text}
                </span>
                <span
                  className={`block mt-1 text-[11px] xl:text-[12px] leading-relaxed font-mono ${
                    choice.disabled ? "text-[#48591f]" : "text-[#5d7227] group-hover:text-[#93ab4b]"
                  }`}
                >
                  {choice.detail}
                </span>
                {choice.disabledReason && (
                  <span className="block mt-1 text-[11px] xl:text-[12px] text-[#8f6e2a] leading-relaxed font-mono">
                    필요 조건: {choice.disabledReason}
                  </span>
                )}
              </span>
              {choice.stat && choice.statDelta !== undefined && (
                <span
                  className="shrink-0 text-[11px] xl:text-[12px] font-bold mt-0.5 font-mono"
                  style={{ color: STAT_COLOR_VAR[choice.stat] }}
                >
                  {STAT_LABELS[choice.stat]} +{choice.statDelta}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {sheetOpen && (
        <ChoiceBottomSheet
          choices={choices}
          soundOn={soundOn}
          onChoice={onChoice}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </div>
  );
}
