"use client";

export type ToastItem = {
  id: number;
  message: string;
  tone: "info" | "success" | "error" | "achievement";
  achievementIcon?: string;
};

const TOAST_STYLES: Record<
  ToastItem["tone"],
  { border: string; glow: string; text: string; bg: string; label?: string; labelColor?: string }
> = {
  info: {
    border: "var(--color-game-border-bright)",
    glow: "rgba(138,160,64,0.22)",
    text: "var(--color-game-text)",
    bg: "rgba(11,18,8,0.94)",
  },
  success: {
    border: "#5a8a2a",
    glow: "rgba(138,180,72,0.22)",
    text: "#d4e89a",
    bg: "rgba(12,22,8,0.95)",
  },
  error: {
    border: "#8a4a32",
    glow: "rgba(168,96,72,0.22)",
    text: "#f0c0b0",
    bg: "rgba(24,11,11,0.95)",
  },
  achievement: {
    border: "#b08820",
    glow: "rgba(200,160,32,0.35)",
    text: "#f0d070",
    bg: "rgba(18,13,2,0.97)",
    label: "업적 해금",
    labelColor: "var(--color-game-gold)",
  },
};

type Props = {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
};

export default function ToastLayer({ toasts, onDismiss }: Props) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-80 flex w-[min(92vw,360px)] flex-col gap-2">
      {toasts.map((toast) => {
        const s = TOAST_STYLES[toast.tone];
        return (
          <div
            key={toast.id}
            className="pointer-events-auto border px-4 py-3 backdrop-blur-sm"
            style={{ borderColor: s.border, background: s.bg, boxShadow: `0 0 18px ${s.glow}` }}
          >
            {toast.tone === "achievement" ? (
              <div className="flex items-center gap-3">
                {toast.achievementIcon && (
                  <span className="shrink-0 text-[22px] leading-none" style={{ color: s.text }}>
                    {toast.achievementIcon}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  {s.label && (
                    <p
                      className="text-[10px] mb-0.5 tracking-widest font-pixel"
                      style={{ color: s.labelColor }}
                    >
                      {s.label}
                    </p>
                  )}
                  <p className="text-[13px] font-bold leading-snug font-mono" style={{ color: s.text }}>
                    {toast.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDismiss(toast.id)}
                  className="shrink-0 text-[11px] opacity-60 hover:opacity-100 transition-opacity font-pixel"
                  style={{ color: s.text }}
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <p className="flex-1 text-[12px] leading-relaxed font-mono" style={{ color: s.text }}>
                  {toast.message}
                </p>
                <button
                  type="button"
                  onClick={() => onDismiss(toast.id)}
                  className="text-[11px] opacity-70 hover:opacity-100 transition-opacity font-pixel"
                  style={{ color: s.text }}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
