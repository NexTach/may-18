"use client";

import { useState } from "react";
import type { GameSettings, TextSpeed } from "../types";

type Props = {
  settings: GameSettings;
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
  onSettingsChange: (patch: Partial<GameSettings>) => void;
};

const TEXT_SPEEDS: { value: TextSpeed; label: string }[] = [
  { value: "instant", label: "즉시" },
  { value: "normal",  label: "보통" },
  { value: "slow",    label: "느리게" },
];

export default function PauseMenu({ settings, onResume, onRestart, onMainMenu, onSettingsChange }: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuItems = [
    { label: "계속하기", action: onResume },
    { label: "설정",     action: () => setSettingsOpen((v) => !v) },
    { label: "처음부터", action: onRestart },
    { label: "메인 메뉴", action: onMainMenu },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/85">
      <div
        className="border-2 border-game-border-bright bg-game-panel p-7 w-80"
        style={{ boxShadow: "0 0 0 2px var(--color-game-border)" }}
      >
        <div className="text-[13px] text-game-text text-center mb-5 pb-3 border-b border-game-border font-pixel">
          일시정지
        </div>

        {menuItems.map(({ label, action }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="w-full border bg-game-panel hover:bg-[#0f2420] py-3 mb-2.5 transition-all cursor-pointer font-pixel"
            style={{
              borderColor:
                label === "설정" && settingsOpen
                  ? "var(--color-game-border-bright)"
                  : "var(--color-game-border)",
            }}
          >
            <span className="text-[12px] text-game-accent">{label}</span>
          </button>
        ))}

        {settingsOpen && (
          <div className="border-t border-game-border pt-4 flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-game-text font-mono">효과음</span>
              <button
                type="button"
                onClick={() => onSettingsChange({ soundOn: !settings.soundOn })}
                className="border px-3 py-1 text-[11px] font-mono transition-colors"
                style={{
                  borderColor: settings.soundOn ? "var(--color-game-border-bright)" : "var(--color-game-border)",
                  color: settings.soundOn ? "var(--color-game-text)" : "var(--color-game-text-dim)",
                  background: settings.soundOn ? "#0f2420" : "var(--color-game-panel)",
                }}
              >
                {settings.soundOn ? "ON" : "OFF"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12px] text-game-text font-mono">배경 음악</span>
              <button
                type="button"
                onClick={() => onSettingsChange({ musicOn: !settings.musicOn })}
                className="border px-3 py-1 text-[11px] font-mono transition-colors"
                style={{
                  borderColor: settings.musicOn ? "var(--color-game-border-bright)" : "var(--color-game-border)",
                  color: settings.musicOn ? "var(--color-game-text)" : "var(--color-game-text-dim)",
                  background: settings.musicOn ? "#0f2420" : "var(--color-game-panel)",
                }}
              >
                {settings.musicOn ? "ON" : "OFF"}
              </button>
            </div>

            <div>
              <span className="text-[12px] text-game-text font-mono block mb-2">텍스트 속도</span>
              <div className="flex gap-1.5">
                {TEXT_SPEEDS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onSettingsChange({ textSpeed: value })}
                    className="flex-1 border py-1.5 text-[11px] font-mono transition-colors"
                    style={{
                      borderColor:
                        settings.textSpeed === value
                          ? "var(--color-game-border-bright)"
                          : "var(--color-game-border)",
                      color:
                        settings.textSpeed === value
                          ? "var(--color-game-text)"
                          : "var(--color-game-text-dim)",
                      background: settings.textSpeed === value ? "#0f2420" : "var(--color-game-panel)",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
