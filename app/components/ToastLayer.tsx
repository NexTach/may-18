"use client";

export type ToastItem = {
  id: number;
  message: string;
  tone: "info" | "success" | "error";
};

const TOAST_STYLES: Record<
  ToastItem["tone"],
  { border: string; glow: string; text: string; bg: string }
> = {
  info: {
    border: "#4a6a1a",
    glow: "rgba(138,160,64,0.22)",
    text: "#c4d47a",
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
};

type Props = {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
};

export default function ToastLayer({ toasts, onDismiss }: Props) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[80] flex w-[min(92vw,360px)] flex-col gap-2">
      {toasts.map((toast) => {
        const style = TOAST_STYLES[toast.tone];

        return (
          <div
            key={toast.id}
            className="pointer-events-auto border px-4 py-3 backdrop-blur-sm"
            style={{
              borderColor: style.border,
              background: style.bg,
              boxShadow: `0 0 18px ${style.glow}`,
            }}
          >
            <div className="flex items-start gap-3">
              <p
                className="flex-1 text-[12px] leading-relaxed"
                style={{ fontFamily: "monospace", color: style.text }}
              >
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="text-[11px] transition-opacity hover:opacity-100"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  color: style.text,
                  opacity: 0.7,
                }}
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
