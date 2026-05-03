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

const STAT_COLORS: Record<StatKey, string> = {
  courage: "#cc4420",
  record: "#2080cc",
  trust: "#20aa60",
  safety: "#c8a020",
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
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
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
          <div
            key={`${line.avatar}-${line.name}-${line.line}`}
            className="flex items-start gap-2.5"
          >
            <div
              className="shrink-0 border text-[11px] px-2 py-1 leading-none mt-0.5 text-center"
              style={{
                background: av.bg,
                borderColor: av.border,
                color: av.border,
                fontFamily: "monospace",
                minWidth: 52,
              }}
            >
              {line.name}
            </div>
            <p
              className="text-[13px] text-[#9ab048] leading-relaxed flex-1"
              style={{ fontFamily: "monospace" }}
            >
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
    <div className="flex flex-col bg-game-panel border-2 border-game-border overflow-hidden flex-1 md:flex-none md:w-85 md:min-w-85">
      <button
        type="button"
        className="p-4 border-b border-[#1e2e0e] cursor-pointer text-left flex flex-col shrink-0 md:flex-none"
        onClick={() => {
          if (soundOn) playSfx("click");
          skip();
        }}
        style={{ minHeight: 110 }}
      >
        <div
          className="overflow-y-auto max-h-[38vh] md:max-h-none md:flex-none"
        >
          <p
            className="text-[14px] text-game-text leading-relaxed"
            style={{ fontFamily: "monospace" }}
          >
            {displayed}
            {!done && <span className="animate-pulse">|</span>}
          </p>
          {!done && (
            <p
              className="text-[11px] text-[#2a3a10] mt-2"
              style={{ fontFamily: "monospace" }}
            >
              클릭하면 건너뜁니다
            </p>
          )}
        </div>
      </button>

      {done && (
        <div className={`md:hidden ${situationOpen ? "flex-1 flex flex-col min-h-0" : "shrink-0"}`}>
          <button
            type="button"
            onClick={() => setSituationOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-b border-[#1e2e0e] bg-[#090d06] shrink-0 text-left cursor-pointer"
          >
            <span
              className="text-[10px] text-game-border-bright"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              눈앞의 상황
            </span>
            <span
              className="text-[12px] text-game-text-muted"
              style={{ fontFamily: "monospace" }}
            >
              {situationOpen ? "▲" : "▼"}
            </span>
          </button>

          {situationOpen && (
            <div className="flex-1 overflow-y-auto min-h-0 p-3 flex flex-col gap-3 bg-[#0d1608]">
              <div className="border border-[#243410] bg-[#0a1006] px-3 py-2.5">
                <p
                  className="text-[12px] text-[#7f9440] leading-relaxed"
                  style={{ fontFamily: "monospace" }}
                >
                  {situation}
                </p>
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
              <div
                className="text-[11px] text-game-text-muted mb-1"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                ◆ 이제 어떻게 해야 할까
              </div>
              <div
                className="text-[13px] text-game-accent"
                style={{ fontFamily: "monospace" }}
              >
                선택하기 →
              </div>
            </button>
          </div>
        </div>
      )}

      {done && (
        <div className="hidden md:flex flex-1 flex-col p-3 gap-3 overflow-y-auto min-h-0">
          <div className="border border-[#243410] bg-[#0d1608] px-3 py-2.5">
            <div
              className="text-[10px] text-game-text-dim mb-1"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              눈앞의 상황
            </div>
            <p
              className="text-[12px] text-[#7f9440] leading-relaxed"
              style={{ fontFamily: "monospace" }}
            >
              {situation}
            </p>
          </div>
          <DialogueLines dialogue={dialogue} />
        </div>
      )}

      {done && <div className="hidden md:block border-t border-game-border mx-3 mb-1" />}

      {done && (
        <div className="hidden md:flex p-3 flex-col gap-2 shrink-0">
          <div
            className="text-[11px] text-game-text-muted mb-1"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ◆ 이제 어떻게 해야 할까
          </div>
          {choices.map((choice, i) => (
            <button
              key={`${choice.nextSceneId}-${choice.text}`}
              type="button"
              disabled={choice.disabled}
              onClick={() => {
                if (soundOn) playSfx("select");
                onChoice(choice);
              }}
              className={`w-full flex items-start gap-3 px-3 py-2.5 border transition-all text-left group ${
                choice.disabled
                  ? "border-[#1f2b10] bg-[#0a1006] cursor-not-allowed opacity-60"
                  : "border-game-border bg-[#0d1608] hover:bg-[#162010] hover:border-game-border-bright cursor-pointer"
              }`}
            >
              <span
                className={`shrink-0 text-[13px] font-bold ${
                  choice.disabled ? "text-[#66752e]" : "text-game-text"
                }`}
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {i + 1}.
              </span>
              <span className="flex-1 transition-colors">
                <span
                  className={`block text-[13px] leading-relaxed ${
                    choice.disabled
                      ? "text-[#62712f]"
                      : "text-game-accent group-hover:text-game-text"
                  }`}
                  style={{ fontFamily: "monospace" }}
                >
                  {choice.text}
                </span>
                <span
                  className={`block mt-1 text-[11px] leading-relaxed ${
                    choice.disabled
                      ? "text-[#48591f]"
                      : "text-[#5d7227] group-hover:text-[#93ab4b]"
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
                  className="shrink-0 text-[11px] font-bold mt-0.5"
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
