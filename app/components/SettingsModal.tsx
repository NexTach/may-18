"use client";

import { useEffect, useState } from "react";
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
  onResetServerData: () => Promise<void>;
};

type SettingsTab = "display" | "sync" | "data";

const TABS: { id: SettingsTab; label: string; icon: string }[] = [
  { id: "display", label: "화면·사운드", icon: "◎" },
  { id: "sync", label: "동기화", icon: "⇄" },
  { id: "data", label: "데이터", icon: "◉" },
];

const TEXT_SPEED_OPTIONS: { value: TextSpeed; label: string; desc: string }[] =
  [
    { value: "instant", label: "즉시", desc: "타이핑 없이 바로 표시" },
    { value: "normal", label: "보통", desc: "기본 속도" },
    { value: "slow", label: "느리게", desc: "천천히 한 글자씩" },
  ];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] text-[#4a6a1a] mb-5 pb-2.5 border-b border-[#1e2e0e] tracking-widest"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border border-[#243410] bg-[#0d1608] px-6 py-4">
      <div>
        <p
          className="text-[14px] text-[#c4d47a]"
          style={{ fontFamily: "monospace" }}
        >
          {label}
        </p>
        <p
          className="mt-1.5 text-[12px] leading-relaxed text-[#5a7a20]"
          style={{ fontFamily: "monospace" }}
        >
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="min-w-[80px] border px-4 py-2.5 text-[13px] transition-colors"
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

function SegmentedRow({
  label,
  description,
  options,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border border-[#243410] bg-[#0d1608] px-6 py-4">
      <p
        className="text-[14px] text-[#c4d47a]"
        style={{ fontFamily: "monospace" }}
      >
        {label}
      </p>
      {description && (
        <p
          className="mt-1.5 text-[12px] text-[#5a7a20]"
          style={{ fontFamily: "monospace" }}
        >
          {description}
        </p>
      )}
      <div className="mt-4 flex gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="flex-1 border px-4 py-3 text-left transition-colors"
            style={{
              fontFamily: "monospace",
              borderColor: value === opt.value ? "#6a9a2a" : "#2c3f12",
              background: value === opt.value ? "#162010" : "#0b1208",
              color: value === opt.value ? "#c4d47a" : "#5a7a20",
            }}
          >
            <span className="block text-[13px]">{opt.label}</span>
            {opt.desc && (
              <span className="block mt-1 text-[11px] opacity-70">
                {opt.desc}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function DisplayTab({
  settings,
  onSettingsChange,
}: Pick<Props, "settings" | "onSettingsChange">) {
  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <SectionTitle>사운드</SectionTitle>
      <ToggleRow
        label="효과음"
        description="버튼 클릭, 선택지 확인 등 상호작용 효과음을 켜거나 끕니다."
        checked={settings.soundOn}
        onChange={(soundOn) => onSettingsChange({ soundOn })}
      />
      <ToggleRow
        label="배경 음악"
        description="게임 진행 중 배경 음악 재생 여부를 설정합니다."
        checked={settings.musicOn}
        onChange={(musicOn) => onSettingsChange({ musicOn })}
      />

      <div className="mt-4" />
      <SectionTitle>화면</SectionTitle>
      <SegmentedRow
        label="텍스트 속도"
        description="대사·나레이션이 화면에 표시되는 속도를 선택합니다."
        options={TEXT_SPEED_OPTIONS}
        value={settings.textSpeed}
        onChange={(v) => onSettingsChange({ textSpeed: v as TextSpeed })}
      />
      <SegmentedRow
        label="지도 기본 탭"
        description="[M] 키로 지도를 열 때 처음으로 표시할 탭을 선택합니다."
        options={[
          { value: "city", label: "광주 전도", desc: "실제 광주 전체 지도" },
          { value: "activity", label: "활동 지도", desc: "인게임 노드 그래프" },
        ]}
        value={settings.defaultMapMode}
        onChange={(v) =>
          onSettingsChange({
            defaultMapMode: v as GameSettings["defaultMapMode"],
          })
        }
      />
    </div>
  );
}

function SyncTab({
  settings,
  syncStatus,
  syncBusy,
  onSettingsChange,
  onLogin,
  onLogout,
  onPull,
  onPush,
}: Pick<
  Props,
  | "settings"
  | "syncStatus"
  | "syncBusy"
  | "onSettingsChange"
  | "onLogin"
  | "onLogout"
  | "onPull"
  | "onPush"
>) {
  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <SectionTitle>계정</SectionTitle>

      <div className="border border-[#243410] bg-[#0d1608] p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <p
              className="text-[14px] text-[#c4d47a]"
              style={{ fontFamily: "monospace" }}
            >
              DataGSM 로그인
            </p>
            <p
              className="mt-1.5 text-[12px] leading-relaxed text-[#5a7a20]"
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
              className="border border-[#5a2a2a] bg-[#180c0c] px-4 py-2.5 text-[13px] text-[#d37a7a] whitespace-nowrap"
              style={{ fontFamily: "monospace" }}
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              onClick={onLogin}
              className="min-w-[160px] border px-5 py-3 text-left"
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
              <span className="block text-[15px] font-bold">DataGSM</span>
            </button>
          )}
        </div>

        {syncStatus.authenticated && syncStatus.user ? (
          <div className="mt-4 border border-[#1e2e0e] bg-[#0b1208] px-4 py-3">
            <p
              className="text-[14px] text-[#c4d47a]"
              style={{ fontFamily: "monospace" }}
            >
              {syncStatus.user.name}
            </p>
            <p
              className="mt-1.5 text-[12px] text-[#6d8240]"
              style={{ fontFamily: "monospace" }}
            >
              {syncStatus.user.role} · {syncStatus.user.grade ?? "-"}학년{" "}
              {syncStatus.user.classRoom ?? "-"}반{" "}
              {syncStatus.user.number ?? "-"}번
            </p>
          </div>
        ) : (
          <p
            className="mt-4 text-[12px] text-[#4e6123]"
            style={{ fontFamily: "monospace" }}
          >
            로그인 전에는 기기 안에만 기록이 저장됩니다.
          </p>
        )}
      </div>

      <div className="mt-4" />
      <SectionTitle>동기화 설정</SectionTitle>

      <ToggleRow
        label="자동 동기화"
        description="로그인 상태라면 진행 상황과 설정을 변경할 때 자동으로 업로드합니다."
        checked={settings.autoSync}
        onChange={(autoSync) => onSettingsChange({ autoSync })}
      />

      <div className="border border-[#243410] bg-[#0d1608] p-6">
        <p
          className="text-[14px] text-[#c4d47a] mb-4"
          style={{ fontFamily: "monospace" }}
        >
          수동 동기화
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPull}
            disabled={!syncStatus.authenticated || syncBusy}
            className="border px-4 py-3 text-[13px] transition-colors"
            style={{
              fontFamily: "monospace",
              borderColor: "#2c3f12",
              background: "#0b1208",
              color:
                !syncStatus.authenticated || syncBusy ? "#4a5d24" : "#8aa040",
              cursor:
                !syncStatus.authenticated || syncBusy
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            서버에서 불러오기
          </button>
          <button
            type="button"
            onClick={onPush}
            disabled={!syncStatus.authenticated || syncBusy}
            className="border px-4 py-3 text-[13px] transition-colors"
            style={{
              fontFamily: "monospace",
              borderColor: "#2c3f12",
              background: "#0b1208",
              color:
                !syncStatus.authenticated || syncBusy ? "#4a5d24" : "#8aa040",
              cursor:
                !syncStatus.authenticated || syncBusy
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            서버에 저장하기
          </button>
        </div>
        <p
          className="mt-4 text-[12px] text-[#587029]"
          style={{ fontFamily: "monospace" }}
        >
          마지막 동기화: {syncStatus.lastSyncedAt ?? "없음"}
        </p>
      </div>
    </div>
  );
}

type ConfirmState = "idle" | "confirm" | "busy";

function DangerCard({
  title,
  description,
  confirmLabel,
  busyLabel,
  disabled,
  disabledReason,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  busyLabel: string;
  disabled?: boolean;
  disabledReason?: string;
  onConfirm: () => Promise<void>;
}) {
  const [state, setState] = useState<ConfirmState>("idle");

  const handleConfirm = async () => {
    setState("busy");
    try {
      await onConfirm();
    } finally {
      setState("idle");
    }
  };

  return (
    <div className="border border-[#5a2a2a] bg-[#100808] p-6">
      <p
        className="text-[14px] text-[#d37a7a]"
        style={{ fontFamily: "monospace" }}
      >
        {title}
      </p>
      <p
        className="mt-2 text-[12px] leading-relaxed text-[#8a4a4a]"
        style={{ fontFamily: "monospace" }}
      >
        {description}
      </p>
      {disabled && disabledReason && (
        <p
          className="mt-3 text-[12px] text-[#5a4a20]"
          style={{ fontFamily: "monospace" }}
        >
          {disabledReason}
        </p>
      )}
      {!disabled && (
        <div className="mt-5 flex items-center gap-3">
          {state === "idle" && (
            <button
              type="button"
              onClick={() => setState("confirm")}
              className="border border-[#5a2a2a] bg-[#1a0b0b] px-5 py-2.5 text-[13px] text-[#d37a7a] transition-colors hover:bg-[#240e0e]"
              style={{ fontFamily: "monospace" }}
            >
              초기화 진행
            </button>
          )}
          {state === "confirm" && (
            <>
              <button
                type="button"
                onClick={handleConfirm}
                className="border border-[#8a2a2a] bg-[#280e0e] px-5 py-2.5 text-[13px] text-[#f09090]"
                style={{ fontFamily: "monospace" }}
              >
                {confirmLabel}
              </button>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="border border-[#2c3f12] bg-[#0b1208] px-5 py-2.5 text-[13px] text-[#5a7a20]"
                style={{ fontFamily: "monospace" }}
              >
                취소
              </button>
            </>
          )}
          {state === "busy" && (
            <span
              className="text-[13px] text-[#8a4a4a]"
              style={{ fontFamily: "monospace" }}
            >
              {busyLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function DataTab({
  syncStatus,
  onResetProgress,
  onResetServerData,
}: Pick<Props, "syncStatus" | "onResetProgress" | "onResetServerData">) {
  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <SectionTitle>위험 구역</SectionTitle>

      <DangerCard
        title="로컬 진행 기록 초기화"
        description={`이 기기에 저장된 모든 진행 상황, 선택 기록, 획득 업적을 삭제합니다.\n서버에 동기화된 데이터는 영향을 받지 않습니다.`}
        confirmLabel="정말 초기화"
        busyLabel="초기화 중..."
        onConfirm={async () => onResetProgress()}
      />

      <DangerCard
        title="서버 저장 데이터 초기화"
        description={`서버에 저장된 계정의 진행 기록과 설정을 영구 삭제합니다.\n이 기기의 로컬 데이터는 영향을 받지 않습니다.`}
        confirmLabel="정말 삭제"
        busyLabel="삭제 중..."
        disabled={!syncStatus.authenticated}
        disabledReason="로그인 후 사용할 수 있습니다."
        onConfirm={onResetServerData}
      />
    </div>
  );
}

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
  onResetServerData,
}: Props) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("display");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#060907" }}
    >
      <div className="flex items-center justify-between px-8 py-4 border-b-2 border-[#2c3f12] bg-[#0b1208] flex-shrink-0">
        <div
          className="text-[13px] text-[#c4d47a]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          ◈ 설정
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

      <div className="flex flex-1 min-h-0">
        <div className="w-56 flex-shrink-0 border-r border-[#2c3f12] bg-[#090d06] flex flex-col p-4 gap-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 px-4 py-3 text-left border transition-colors"
              style={{
                fontFamily: "monospace",
                borderColor:
                  activeTab === tab.id ? "#4a6a1a" : "transparent",
                background:
                  activeTab === tab.id ? "#0f1a08" : "transparent",
                color: activeTab === tab.id ? "#c4d47a" : "#5a7a20",
              }}
            >
              <span className="text-[15px] w-5 text-center">{tab.icon}</span>
              <span className="text-[13px]">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="ml-auto text-[10px] text-[#4a6a1a]">▶</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          {activeTab === "display" && (
            <DisplayTab
              settings={settings}
              onSettingsChange={onSettingsChange}
            />
          )}
          {activeTab === "sync" && (
            <SyncTab
              settings={settings}
              syncStatus={syncStatus}
              syncBusy={syncBusy}
              onSettingsChange={onSettingsChange}
              onLogin={onLogin}
              onLogout={onLogout}
              onPull={onPull}
              onPush={onPush}
            />
          )}
          {activeTab === "data" && (
            <DataTab
              syncStatus={syncStatus}
              onResetProgress={onResetProgress}
              onResetServerData={onResetServerData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
