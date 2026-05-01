"use client";

import { useState, useEffect } from "react";
import type { DialogueLine, Choice, StatKey } from "../types";

type Props = {
  text: string;
  dialogue: DialogueLine[];
  choices: Choice[];
  onChoice: (choice: Choice) => void;
};

const AVATAR_COLORS: Record<string, { bg: string; border: string }> = {
  player:   { bg: "#1a2a0c", border: "#4a6a1a" },
  friend:   { bg: "#0c1a1a", border: "#1a5a5a" },
  citizen:  { bg: "#1a180c", border: "#5a4a1a" },
  student:  { bg: "#0c0c1a", border: "#2a2a6a" },
  mother:   { bg: "#1a0c0c", border: "#5a2a2a" },
  elder:    { bg: "#18180c", border: "#5a5a1a" },
  youth:    { bg: "#0c1a0c", border: "#2a5a2a" },
  merchant: { bg: "#1a100c", border: "#5a3a1a" },
};

const STAT_LABELS: Record<StatKey, string> = {
  courage: "용기",
  record: "기록",
  trust: "신뢰",
  safety: "안전",
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

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  const skip = () => {
    setDisplayed(text);
    setDone(true);
  };

  return { displayed, done, skip };
}

export default function RightPanel({ text, dialogue, choices, onChoice }: Props) {
  const { displayed, done, skip } = useTypingText(text);

  return (
    <div
      className="flex flex-col bg-[#0b1208] border-l-2 border-[#2c3f12] overflow-hidden"
      style={{ width: 340, minWidth: 340 }}
    >
      {/* narrative text */}
      <div
        className="p-4 border-b border-[#1e2e0e] cursor-pointer flex-shrink-0"
        onClick={skip}
        style={{ minHeight: 110 }}
      >
        <p
          className="text-[14px] text-[#c4d47a] leading-relaxed"
          style={{ fontFamily: "monospace" }}
        >
          {displayed}
          {!done && <span className="animate-pulse">|</span>}
        </p>
        {!done && (
          <p className="text-[11px] text-[#2a3a10] mt-2" style={{ fontFamily: "monospace" }}>
            클릭하면 건너뜁니다
          </p>
        )}
      </div>

      {/* dialogue */}
      {done && (
        <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto min-h-0">
          {dialogue.map((line, i) => {
            const av = AVATAR_COLORS[line.avatar] ?? AVATAR_COLORS.citizen;
            return (
              <div key={i} className="flex items-start gap-2.5">
                {/* avatar badge */}
                <div
                  className="flex-shrink-0 border text-[11px] px-2 py-1 leading-none mt-0.5 text-center"
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
                {/* dialogue line */}
                <p
                  className="text-[13px] text-[#9ab048] leading-relaxed flex-1"
                  style={{ fontFamily: "monospace" }}
                >
                  {line.line}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* separator */}
      {done && <div className="border-t border-[#2c3f12] mx-3 mb-1" />}

      {/* choices */}
      {done && (
        <div className="p-3 flex flex-col gap-2 flex-shrink-0">
          <div
            className="text-[11px] text-[#3a5010] mb-1"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ◆ 어떻게 행동하시겠습니까?
          </div>
          {choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => onChoice(choice)}
              className="w-full flex items-start gap-3 px-3 py-2.5 border border-[#2c3f12] bg-[#0d1608] hover:bg-[#162010] hover:border-[#4a6a1a] transition-all text-left group cursor-pointer"
            >
              <span
                className="flex-shrink-0 text-[13px] text-[#c4d47a] font-bold"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {i + 1}.
              </span>
              <span
                className="text-[13px] text-[#8aa040] group-hover:text-[#c4d47a] leading-relaxed flex-1 transition-colors"
                style={{ fontFamily: "monospace" }}
              >
                {choice.text}
              </span>
              {choice.stat && choice.statDelta !== undefined && (
                <span
                  className="flex-shrink-0 text-[11px] font-bold mt-0.5"
                  style={{ color: STAT_COLORS[choice.stat], fontFamily: "monospace" }}
                >
                  {STAT_LABELS[choice.stat]} +{choice.statDelta}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
