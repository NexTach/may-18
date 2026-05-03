"use client";

import { useEffect } from "react";
import { scenes } from "../data/scenes";
import { STAT_LABELS } from "../lib/constants";
import type { GameProgress, Stats } from "../types";

type AchievementView = {
  id: string;
  icon: string;
  title: string;
  unlocked: boolean;
};

type Props = {
  progress: GameProgress;
  achievements: AchievementView[];
  onClose: () => void;
};

export default function ArchiveModal({
  progress,
  achievements,
  onClose,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const currentScene = scenes.find(
    (scene) => scene.id === progress.currentSceneId,
  );
  const cumulativeChoices =
    progress.allChoiceLog.length > 0
      ? progress.allChoiceLog
      : progress.choiceLog;
  const cumulativeVisited =
    progress.allVisitedSceneIds.length > 0
      ? progress.allVisitedSceneIds
      : progress.visitedSceneIds;
  const recentChoiceStart = Math.max(0, cumulativeChoices.length - 12);
  const endingScenes = scenes.filter(
    (scene) => scene.isEnding && cumulativeVisited.includes(scene.id),
  );
  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.82)" }}
    >
      <button
        type="button"
        aria-label="기록 보기 닫기"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div
        className="relative mx-4 w-full max-w-3xl border-2 border-game-border-bright bg-game-panel p-6"
        style={{ boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208" }}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="기록 보기"
        aria-modal="true"
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between border-b border-game-border pb-3">
          <div>
            <div
              className="text-[12px] text-game-text"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ▣ 기록 보기
            </div>
            <p
              className="mt-2 text-[12px] text-game-text-dim"
              style={{ fontFamily: "monospace" }}
            >
              남겨 둔 선택과 도달한 장면을 다시 살펴봅니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-game-border-bright transition-colors hover:text-game-text"
            style={{ fontFamily: "monospace" }}
          >
            [ESC] 닫기
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            {
              label: "현재 장면",
              value: currentScene?.stageTitle ?? "시작",
            },
            {
              label: "방문 장소",
              value: `${cumulativeVisited.length} / ${scenes.length}`,
            },
            {
              label: "도달한 엔딩",
              value: `${endingScenes.length}`,
            },
            {
              label: "해금 업적",
              value: `${unlockedAchievements.length} / ${achievements.length}`,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-[#243410] bg-[#0d1608] p-3"
            >
              <div
                className="text-[10px] text-game-border-bright"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {item.label}
              </div>
              <p
                className="mt-2 text-[13px] text-game-text"
                style={{ fontFamily: "monospace" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-game-border bg-[#090d06] p-4">
            <div
              className="mb-3 text-[11px] text-game-border-bright"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              최근 선택
            </div>
            {cumulativeChoices.length === 0 ? (
              <p
                className="text-[12px] text-[#40511c]"
                style={{ fontFamily: "monospace" }}
              >
                아직 남겨진 선택이 없습니다.
              </p>
            ) : (
              <div className="flex max-h-70 flex-col gap-1.5 overflow-y-auto pr-1">
                {cumulativeChoices
                  .slice(recentChoiceStart)
                  .map((choice, index) => (
                    <div key={`${index}-${choice}`} className="flex gap-3">
                      <span
                        className="text-[12px] text-game-text-muted"
                        style={{ fontFamily: "monospace" }}
                      >
                        {String(recentChoiceStart + index + 1).padStart(2, "0")}
                      </span>
                      <p
                        className="flex-1 text-[12px] leading-relaxed text-game-accent"
                        style={{ fontFamily: "monospace" }}
                      >
                        {choice}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="border border-game-border bg-[#090d06] p-4">
              <div
                className="mb-3 text-[11px] text-game-border-bright"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                선택 성향
              </div>
              <div className="flex flex-col gap-2.5">
                {(Object.keys(progress.stats) as (keyof Stats)[]).map((key) => (
                  <div key={key}>
                    <div className="mb-1 flex items-center justify-between">
                      <span
                        className="text-[12px] text-game-accent"
                        style={{ fontFamily: "monospace" }}
                      >
                        {STAT_LABELS[key]}
                      </span>
                      <span
                        className="text-[12px] text-game-text"
                        style={{ fontFamily: "monospace" }}
                      >
                        {progress.stats[key]}
                      </span>
                    </div>
                    <div className="h-2 border border-[#1e2e0e] bg-game-panel">
                      <div
                        className="h-full bg-[#5a8a2a]"
                        style={{
                          width: `${Math.min(100, progress.stats[key] * 16)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-game-border bg-[#090d06] p-4">
              <div
                className="mb-3 text-[11px] text-game-border-bright"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                도달한 엔딩
              </div>
              {endingScenes.length === 0 ? (
                <p
                  className="text-[12px] text-[#40511c]"
                  style={{ fontFamily: "monospace" }}
                >
                  아직 엔딩에 도달하지 않았습니다.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {endingScenes.map((scene) => (
                    <div
                      key={scene.id}
                      className="border border-[#243410] bg-[#0d1608] px-3 py-2"
                    >
                      <p
                        className="text-[12px] text-game-text"
                        style={{ fontFamily: "monospace" }}
                      >
                        {scene.stageTitle}
                      </p>
                      <p
                        className="mt-1 text-[11px] text-[#6f8441]"
                        style={{ fontFamily: "monospace" }}
                      >
                        {scene.location}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
