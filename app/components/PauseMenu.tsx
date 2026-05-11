"use client";

type Props = {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
};

export default function PauseMenu({ onResume, onRestart, onMainMenu }: Props) {
  const items = [
    { label: "계속하기", action: onResume },
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
        {items.map(({ label, action }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="w-full border border-game-border bg-game-panel hover:bg-[#0f2420] hover:border-game-border-bright py-3 mb-2.5 transition-all cursor-pointer font-pixel"
          >
            <span className="text-[12px] text-game-accent">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
