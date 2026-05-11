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
  /** 씬 변경 시 NPC 말풍선 동기화를 위해 GameScreen에 알림 */
  onDialogueProgress?: (npcCount: number) => void;
};

const STAT_COLOR_VAR: Record<StatKey, string> = {
  courage: "var(--color-stat-courage)",
  record: "var(--color-stat-record)",
  trust: "var(--color-stat-trust)",
  safety: "var(--color-stat-safety)",
};

// ── 타이핑 훅 ──────────────────────────────────────────────
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

// ── 대화 한 줄: 마운트 시 slide-up 애니메이션 ──────────────
function DialLine({ line }: { line: DialogueLine }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const av = AVATAR_COLORS[line.avatar] ?? AVATAR_COLORS.citizen;

  return (
    <div
      className="flex items-start gap-2.5"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.32s ease, transform 0.32s ease",
      }}
    >
      <div
        className="shrink-0 border text-[11px] xl:text-[12px] px-2 py-1 leading-none mt-0.5 text-center font-mono min-w-13 xl:min-w-15"
        style={{ background: av.bg, borderColor: av.border, color: av.border }}
      >
        {line.name}
      </div>
      <p className="text-[13px] xl:text-[14px] text-game-text leading-relaxed flex-1 font-mono">
        {line.line}
      </p>
    </div>
  );
}

// ── 선택지 버튼 ────────────────────────────────────────────
function ChoiceBtn({
  index,
  choice,
  soundOn,
  onChoice,
}: {
  index: number;
  choice: ChoiceView;
  soundOn: boolean;
  onChoice: (c: Choice) => void;
}) {
  const [hov, setHov] = useState(false);
  const active = !choice.disabled;
  return (
    <button
      type="button"
      disabled={choice.disabled}
      onClick={() => {
        if (soundOn) playSfx("select");
        onChoice(choice);
      }}
      onMouseEnter={() => active && setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-full flex items-center gap-3 text-left transition-all min-h-11"
      style={{
        background: hov
          ? "rgba(245,208,108,0.08)"
          : "var(--color-game-panel-dark)",
        border: "1.5px solid",
        borderColor: choice.disabled
          ? "var(--color-game-border)"
          : hov
            ? "var(--color-game-accent)"
            : "var(--color-game-border-bright)",
        padding: "11px 14px",
        opacity: choice.disabled ? 0.55 : 1,
        cursor: choice.disabled ? "not-allowed" : "pointer",
        boxShadow: hov ? "0 0 14px rgba(245,208,108,0.18)" : "none",
      }}
    >
      <span
        className="shrink-0 w-6.5 h-6.5 flex items-center justify-center text-[13px]"
        style={{
          border: "1.5px solid var(--color-game-border-bright)",
          background: "var(--color-game-bg)",
          color: "var(--color-game-text)",
          fontFamily: "'DungGeunMo', monospace",
        }}
      >
        {index + 1}
      </span>
      <span className="flex-1">
        <span
          className="block text-[13px] xl:text-[14px] leading-relaxed font-mono"
          style={{
            color: choice.disabled
              ? "var(--color-game-border-bright)"
              : "var(--color-game-text)",
          }}
        >
          {choice.text}
        </span>
        <span
          className="block mt-0.5 text-[11px] xl:text-[12px] leading-relaxed font-mono"
          style={{ color: "var(--color-game-text-dim)" }}
        >
          {choice.detail}
        </span>
        {choice.disabledReason && (
          <span
            className="block mt-0.5 text-[11px] xl:text-[12px] font-mono"
            style={{ color: "var(--color-game-heart)" }}
          >
            필요: {choice.disabledReason}
          </span>
        )}
      </span>
      {choice.stat && choice.statDelta !== undefined && (
        <span
          className="shrink-0 text-[12px] xl:text-[13px] font-bold font-mono"
          style={{ color: STAT_COLOR_VAR[choice.stat] }}
        >
          {STAT_LABELS[choice.stat]} +{choice.statDelta}
        </span>
      )}
    </button>
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
  onDialogueProgress,
}: Props) {
  const { displayed, done, skip } = useTypingText(text, typingSpeed);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [situationOpen, setSituationOpen] = useState(false);

  const [revealIndex, setRevealIndex] = useState(-1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: text 변경 시 인덱스 리셋이 목적
  useEffect(() => {
    setRevealIndex(-1);
  }, [text]);

  const isInstant = typingSpeed <= 0;
  useEffect(() => {
    if (!done || dialogue.length === 0) return;
    if (isInstant) {
      setRevealIndex(dialogue.length - 1);
      return;
    }
    const id = setTimeout(() => setRevealIndex(0), 350);
    return () => clearTimeout(id);
  }, [done, dialogue.length, isInstant]);
  useEffect(() => {
    if (isInstant || revealIndex < 0 || revealIndex >= dialogue.length - 1)
      return;
    const id = setTimeout(() => setRevealIndex((v) => v + 1), 1400);
    return () => clearTimeout(id);
  }, [isInstant, revealIndex, dialogue.length]);

  const npcRevealCount =
    revealIndex < 0
      ? 0
      : dialogue.slice(0, revealIndex + 1).filter((l) => l.avatar !== "player")
          .length;

  useEffect(() => {
    onDialogueProgress?.(npcRevealCount);
  }, [npcRevealCount, onDialogueProgress]);

  const allRevealed =
    dialogue.length === 0 || revealIndex >= dialogue.length - 1;
  const showChoices = done && allRevealed;

  const handleAreaClick = () => {
    if (!done) {
      if (soundOn) playSfx("click");
      skip();
      return;
    }
    if (!allRevealed) {
      setRevealIndex((v) => Math.min(v + 1, dialogue.length - 1));
    }
  };

  // 현재까지 보여줄 대화 (desktop)
  const visibleDialogue = dialogue.slice(0, Math.max(0, revealIndex + 1));

  return (
    <div
      className="flex flex-col bg-game-panel border-2 border-game-border overflow-hidden flex-1 md:flex-none md:w-85 md:min-w-85 xl:w-95 xl:min-w-95 2xl:w-110 2xl:min-w-110"
      style={{ boxShadow: "0 0 12px rgba(245,208,108,0.08)" }}
    >
      {/* 나레이션 (클릭으로 스킵/대화 진행) */}
      <button
        type="button"
        className="p-4 xl:p-5 border-b border-game-border cursor-pointer text-left flex flex-col shrink-0 md:flex-none min-h-27.5 xl:min-h-32.5"
        onClick={handleAreaClick}
      >
        <div className="overflow-y-auto max-h-[38vh] md:max-h-none md:flex-none">
          <p className="text-[14px] xl:text-[15px] text-game-text leading-relaxed font-mono">
            {displayed}
            {!done && <span className="animate-pulse">|</span>}
          </p>
          {!done && (
            <p className="text-[11px] xl:text-[12px] text-game-text-muted mt-2 font-mono">
              클릭하면 건너뜁니다
            </p>
          )}
        </div>
      </button>

      {/* ── 모바일 눈앞의 상황 토글 ── */}
      {done && (
        <div
          className={`md:hidden ${situationOpen ? "flex-1 flex flex-col min-h-0" : "shrink-0"}`}
        >
          <button
            type="button"
            onClick={() => setSituationOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-b border-game-border bg-game-panel-dark shrink-0 text-left cursor-pointer"
          >
            <span className="text-[10px] text-game-border-bright font-pixel">
              눈앞의 상황
            </span>
            <span className="text-[12px] text-game-text-muted font-mono">
              {situationOpen ? "▲" : "▼"}
            </span>
          </button>
          {situationOpen && (
            <div className="flex-1 overflow-y-auto min-h-0 p-3 flex flex-col gap-3 bg-game-panel">
              <div className="border border-game-border bg-game-panel-dark px-3 py-2.5">
                <p className="text-[12px] text-game-text-dim leading-relaxed font-mono">
                  {situation}
                </p>
              </div>
              {visibleDialogue.map((l, i) => (
                <DialLine key={`${l.avatar}-${l.name}-${i}`} line={l} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 모바일 선택하기 버튼 ── */}
      {showChoices && (
        <div
          className="md:hidden flex flex-col shrink-0"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
        >
          <div className="mt-auto border-t border-game-border">
            <button
              type="button"
              onClick={() => {
                if (soundOn) playSfx("click");
                setSheetOpen(true);
              }}
              className="w-full px-4 py-3.5 active:bg-[#0f2420] transition-colors cursor-pointer text-left"
            >
              <div className="text-[11px] text-game-text-muted mb-1 font-pixel">
                ◆ 이제 어떻게 해야 할까
              </div>
              <div className="text-[13px] text-game-accent font-mono">
                선택하기 →
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ── 데스크톱: 눈앞의 상황 + 대화 ── */}
      {done && (
        // biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: 대화 클릭 진행 영역
        <div
          className="hidden md:flex flex-1 flex-col p-3 xl:p-4 gap-3 overflow-y-auto min-h-0"
          onClick={handleAreaClick}
          style={{ cursor: allRevealed ? "default" : "pointer" }}
        >
          <div className="border border-game-border bg-game-panel px-3 py-2.5 xl:px-4 xl:py-3 shrink-0">
            <div className="text-[10px] xl:text-[11px] text-game-text-dim mb-1 font-pixel">
              눈앞의 상황
            </div>
            <p className="text-[12px] xl:text-[13px] text-game-text-dim leading-relaxed font-mono">
              {situation}
            </p>
          </div>
          {visibleDialogue.map((l, i) => (
            <DialLine key={`${l.avatar}-${l.name}-${i}`} line={l} />
          ))}
          {!allRevealed && (
            <p className="text-[11px] xl:text-[12px] text-game-text-muted font-mono shrink-0">
              클릭하면 다음으로
            </p>
          )}
        </div>
      )}

      {done && (
        <div className="hidden md:block border-t border-game-border mx-3 mb-1" />
      )}

      {/* ── 데스크톱: 선택지 ── */}
      {showChoices && (
        <div className="hidden md:flex p-3 xl:p-4 flex-col gap-2 xl:gap-2.5 shrink-0">
          <div className="text-[11px] xl:text-[12px] text-game-text-muted mb-1 font-pixel">
            ◆ 이제 어떻게 해야 할까
          </div>
          {choices.map((choice, i) => (
            <ChoiceBtn
              key={`${choice.nextSceneId}-${choice.text}`}
              index={i}
              choice={choice}
              soundOn={soundOn}
              onChoice={onChoice}
            />
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
