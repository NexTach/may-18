"use client";

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
  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <button
        type="button"
        aria-label="업적 닫기"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div
        className="relative mx-4 w-full max-w-2xl border-2 border-[#4a6a1a] bg-[#0b1208] p-6"
        style={{ boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208" }}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="업적"
        aria-modal="true"
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between border-b border-[#2c3f12] pb-3">
          <div>
            <div
              className="text-[12px] text-[#c4d47a]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ★ 업적
            </div>
            <p
              className="mt-2 text-[12px] text-[#5a7a20]"
              style={{ fontFamily: "monospace" }}
            >
              해금 {unlockedCount} / {achievements.length}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-[#4a6a1a] transition-colors hover:text-[#c4d47a]"
            style={{ fontFamily: "monospace" }}
          >
            [ESC] 닫기
          </button>
        </div>

        <div className="grid max-h-[60vh] grid-cols-1 gap-3 overflow-y-auto pr-1">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border p-4"
              style={{
                borderColor: achievement.unlocked ? "#4a6a1a" : "#1f2b10",
                background: achievement.unlocked ? "#0d1608" : "#090d06",
                opacity: achievement.unlocked ? 1 : 0.7,
              }}
            >
              <div className="mb-2 flex items-start gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center border text-[18px]"
                  style={{
                    borderColor: achievement.unlocked ? "#6a9a2a" : "#2c3f12",
                    color: achievement.unlocked ? "#c4d47a" : "#4a6a1a",
                    background: achievement.unlocked ? "#162010" : "#0b1208",
                  }}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className="text-[14px]"
                      style={{
                        fontFamily: "monospace",
                        color: achievement.unlocked ? "#c4d47a" : "#708544",
                      }}
                    >
                      {achievement.title}
                    </h3>
                    <span
                      className="text-[11px]"
                      style={{
                        fontFamily: "monospace",
                        color: achievement.unlocked ? "#8dcf62" : "#46561f",
                      }}
                    >
                      {achievement.unlocked ? "해금됨" : "미해금"}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[12px] leading-relaxed"
                    style={{
                      fontFamily: "monospace",
                      color: achievement.unlocked ? "#8aa040" : "#62712f",
                    }}
                  >
                    {achievement.description}
                  </p>
                </div>
              </div>
              {!achievement.unlocked && (
                <p
                  className="text-[11px] leading-relaxed text-[#4e6123]"
                  style={{ fontFamily: "monospace" }}
                >
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
