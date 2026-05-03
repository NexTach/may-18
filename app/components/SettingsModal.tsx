"use client";

import type { GameSettings, SyncStatus, TextSpeed } from "../types";

type Props = {
  settings: GameSettings;
  syncStatus: SyncStatus;
  syncBusy: boolean;
  onClose: () => void;
  onSettingsChange: (patch: Partial<GameSettings>) => void;
  onLogin: () => void;
  onLogout: () => void;
  onPull: () => void;
  onPush: () => void;
  onResetProgress: () => void;
};

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-[#243410] bg-[#0d1608] px-4 py-3">
      <div>
        <p
          className="text-[13px] text-[#c4d47a]"
          style={{ fontFamily: "monospace" }}
        >
          {label}
        </p>
        <p
          className="mt-1 text-[11px] leading-relaxed text-[#5a7a20]"
          style={{ fontFamily: "monospace" }}
        >
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="min-w-[72px] border px-3 py-2 text-[12px] transition-colors"
        style={{
          fontFamily: "monospace",
          borderColor: checked ? "#6a9a2a" : "#2c3f12",
          background: checked ? "#162010" : "#0b1208",
          color: checked ? "#c4d47a" : "#5a7a20",
        }}
      >
        {checked ? "ON" : "OFF"}
      </button>
    </div>
  );
}

const TEXT_SPEED_OPTIONS: { value: TextSpeed; label: string }[] = [
  { value: "instant", label: "즉시" },
  { value: "normal", label: "보통" },
  { value: "slow", label: "느리게" },
];

export default function SettingsModal({
  settings,
  syncStatus,
  syncBusy,
  onClose,
  onSettingsChange,
  onLogin,
  onLogout,
  onPull,
  onPush,
  onResetProgress,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.82)" }}
    >
      <button
        type="button"
        aria-label="설정 닫기"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div
        className="relative mx-4 w-full max-w-2xl border-2 border-[#4a6a1a] bg-[#0b1208] p-6"
        style={{ boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208" }}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="설정"
        aria-modal="true"
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between border-b border-[#2c3f12] pb-3">
          <div>
            <div
              className="text-[12px] text-[#c4d47a]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ◈ 설정
            </div>
            <p
              className="mt-2 text-[12px] text-[#5a7a20]"
              style={{ fontFamily: "monospace" }}
            >
              화면 표현과 동기화 방식을 조정합니다.
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-3">
            <ToggleRow
              label="효과음"
              description="상호작용 효과음을 켜거나 끕니다."
              checked={settings.soundOn}
              onChange={(soundOn) => onSettingsChange({ soundOn })}
            />
            <ToggleRow
              label="음악"
              description="배경 음악 재생 여부를 저장합니다."
              checked={settings.musicOn}
              onChange={(musicOn) => onSettingsChange({ musicOn })}
            />

            <div className="border border-[#243410] bg-[#0d1608] px-4 py-3">
              <p
                className="text-[13px] text-[#c4d47a]"
                style={{ fontFamily: "monospace" }}
              >
                텍스트 속도
              </p>
              <div className="mt-3 flex gap-2">
                {TEXT_SPEED_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onSettingsChange({
                        textSpeed: option.value,
                      })
                    }
                    className="flex-1 border px-3 py-2 text-[12px]"
                    style={{
                      fontFamily: "monospace",
                      borderColor:
                        settings.textSpeed === option.value
                          ? "#6a9a2a"
                          : "#2c3f12",
                      background:
                        settings.textSpeed === option.value
                          ? "#162010"
                          : "#0b1208",
                      color:
                        settings.textSpeed === option.value
                          ? "#c4d47a"
                          : "#5a7a20",
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#243410] bg-[#0d1608] px-4 py-3">
              <p
                className="text-[13px] text-[#c4d47a]"
                style={{ fontFamily: "monospace" }}
              >
                지도 기본 탭
              </p>
              <div className="mt-3 flex gap-2">
                {[
                  { value: "city", label: "광주 전도" },
                  { value: "activity", label: "활동 지도" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onSettingsChange({
                        defaultMapMode:
                          option.value as GameSettings["defaultMapMode"],
                      })
                    }
                    className="flex-1 border px-3 py-2 text-[12px]"
                    style={{
                      fontFamily: "monospace",
                      borderColor:
                        settings.defaultMapMode === option.value
                          ? "#6a9a2a"
                          : "#2c3f12",
                      background:
                        settings.defaultMapMode === option.value
                          ? "#162010"
                          : "#0b1208",
                      color:
                        settings.defaultMapMode === option.value
                          ? "#c4d47a"
                          : "#5a7a20",
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="border border-[#243410] bg-[#0d1608] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-[13px] text-[#c4d47a]"
                    style={{ fontFamily: "monospace" }}
                  >
                    DataGSM 로그인
                  </p>
                  <p
                    className="mt-1 text-[11px] leading-relaxed text-[#5a7a20]"
                    style={{ fontFamily: "monospace" }}
                  >
                    로그인하면 현재 기기의 기록과 설정을 사용자 계정 기준으로
                    동기화할 수 있습니다.
                  </p>
                </div>
                {syncStatus.authenticated ? (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="border border-[#5a2a2a] bg-[#180c0c] px-3 py-2 text-[12px] text-[#d37a7a]"
                    style={{ fontFamily: "monospace" }}
                  >
                    로그아웃
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onLogin}
                    className="min-w-[156px] border px-4 py-2.5 text-left"
                    style={{
                      fontFamily: "monospace",
                      borderColor: "#dfe7f2",
                      background: "#f3f7fb",
                      color: "#12263f",
                    }}
                  >
                    <span className="block text-[10px] tracking-wide opacity-70">
                      CONNECT
                    </span>
                    <span className="block text-[14px] font-bold">DataGSM</span>
                  </button>
                )}
              </div>

              {syncStatus.authenticated && syncStatus.user ? (
                <div className="border border-[#1e2e0e] bg-[#0b1208] px-3 py-2">
                  <p
                    className="text-[13px] text-[#c4d47a]"
                    style={{ fontFamily: "monospace" }}
                  >
                    {syncStatus.user.name}
                  </p>
                  <p
                    className="mt-1 text-[11px] text-[#6d8240]"
                    style={{ fontFamily: "monospace" }}
                  >
                    {syncStatus.user.role} · {syncStatus.user.grade ?? "-"}학년{" "}
                    {syncStatus.user.classRoom ?? "-"}반{" "}
                    {syncStatus.user.number ?? "-"}번
                  </p>
                </div>
              ) : (
                <p
                  className="text-[11px] text-[#4e6123]"
                  style={{ fontFamily: "monospace" }}
                >
                  로그인 전에는 기기 안에만 기록이 저장됩니다.
                </p>
              )}
            </div>

            <ToggleRow
              label="자동 동기화"
              description="로그인 상태라면 진행 상황과 설정을 변경할 때 자동으로 업로드합니다."
              checked={settings.autoSync}
              onChange={(autoSync) => onSettingsChange({ autoSync })}
            />

            <div className="border border-[#243410] bg-[#0d1608] p-4">
              <p
                className="text-[13px] text-[#c4d47a]"
                style={{ fontFamily: "monospace" }}
              >
                동기화
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onPull}
                  disabled={!syncStatus.authenticated || syncBusy}
                  className="border px-3 py-2 text-[12px]"
                  style={{
                    fontFamily: "monospace",
                    borderColor: "#2c3f12",
                    background: "#0b1208",
                    color:
                      !syncStatus.authenticated || syncBusy
                        ? "#4a5d24"
                        : "#8aa040",
                  }}
                >
                  서버에서 불러오기
                </button>
                <button
                  type="button"
                  onClick={onPush}
                  disabled={!syncStatus.authenticated || syncBusy}
                  className="border px-3 py-2 text-[12px]"
                  style={{
                    fontFamily: "monospace",
                    borderColor: "#2c3f12",
                    background: "#0b1208",
                    color:
                      !syncStatus.authenticated || syncBusy
                        ? "#4a5d24"
                        : "#8aa040",
                  }}
                >
                  서버에 저장하기
                </button>
              </div>
              <p
                className="mt-3 text-[11px] leading-relaxed text-[#587029]"
                style={{ fontFamily: "monospace" }}
              >
                마지막 동기화: {syncStatus.lastSyncedAt ?? "없음"}
              </p>
            </div>

            <button
              type="button"
              onClick={onResetProgress}
              className="border border-[#5a2a2a] bg-[#160b0b] px-4 py-3 text-[12px] text-[#d37a7a]"
              style={{ fontFamily: "monospace" }}
            >
              로컬 진행 기록 초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
