"use client";

import { useCallback, useEffect, useState } from "react";
import { scenes, TOTAL_STAGES } from "../data/scenes";
import { TEXT_SPEED_MS } from "../lib/game-state";
import type {
  Choice,
  GameProgress,
  GameSettings,
  SceneType,
  StatKey,
  Stats,
} from "../types";
import BottomBar from "./BottomBar";
import Character, { type Direction } from "./Character";
import HistoryModal from "./HistoryModal";
import HUD from "./HUD";
import InventoryModal from "./InventoryModal";
import MapModal from "./MapModal";
import MiniMap from "./MiniMap";
import PixelScene from "./PixelScene";
import RightPanel from "./RightPanel";
import SpeechBubble from "./SpeechBubble";

type Props = {
  onBackToMenu: () => void;
  initialProgress: GameProgress;
  settings: GameSettings;
  onProgressChange: (progress: GameProgress) => void;
};

const LOCATION_DESCS: Record<string, string> = {
  "광주역 앞 거리":
    "군인들이 곳곳을 지키고 있고, 시민들의 발걸음이 조심스럽다.",
  "광주역 광장":
    "역 광장과 인근 상점 앞에 멈춰 선 시민들 사이로 불안한 말이 번지고 있다.",
  "용봉동 골목":
    "전남대 정문을 비껴 가는 골목이다. 담장 너머로도 긴장이 배어 나온다.",
  "전남대학교 정문 앞":
    "학생들을 군인들이 막아서고 있다. 팽팽한 긴장감이 감돈다.",
  "양동시장 인근 공중전화":
    "양동시장 쪽으로 난 공중전화 앞이다. 집 안의 걱정과 바깥 소식이 맞닿는다.",
  "양동 골목":
    "양동 주택가 골목마다 이웃들이 문밖으로 나와 조심스럽게 소식을 묻고 있다.",
  "양동 주택가":
    "골목 안쪽 작은 집들 사이로 라디오 소리와 낮은 목소리가 엇갈린다.",
  "충장로 골목":
    "충장로 안쪽 골목이다. 지나가는 말과 표정까지 기록으로 붙잡고 싶어진다.",
  대인시장:
    "대인시장 골목마다 상인과 주민들이 장사를 멈추고 시내 분위기를 주고받고 있다.",
  "수기동 골목":
    "임시 돌봄 자리가 꾸려진 골목이다. 물과 수건, 사람들의 손길이 분주하다.",
  금남로: "넓은 대로에 수많은 시민들이 모여 목소리를 높이고 있다.",
  "수기동 일대":
    "돌봄과 물자 전달이 이어지는 구역이다. 시민들의 손길이 질서를 만들고 있다.",
  "불로동 골목":
    "광장과 골목을 잇는 동선이다. 물자와 짧은 쪽지가 사람들 손을 따라 움직인다.",
  "전남도청 앞": "시민들이 광장에 모여 서로의 이야기를 듣고 있다.",
  "광주 YMCA 앞":
    "도청 인근 YMCA 앞 공간이다. 시민들이 작은 원을 이뤄 앞으로의 일을 의논하고 있다.",
  "지원동 길목":
    "광주 외곽으로 빠지는 지원동 쪽 길목이다. 검문과 우회로를 함께 살펴야 한다.",
  "지원동 외곽":
    "도시 밖으로 이어지는 가장자리다. 기록과 소식을 바깥으로 잇는 길이 된다.",
  "금남로 일대":
    "광장과 골목이 이어진 공동체의 중심이다. 서로를 돕는 손길이 끊이지 않는다.",
  "광주 YMCA": "희미한 불빛 아래 마지막 논의를 이어 가는 실내 공간이다.",
  전남도청: "항쟁의 마지막 거점. 새벽 공기가 무겁게 내려앉았다.",
  "5·18민주화운동기록관":
    "남겨진 기록이 훗날 역사를 증언하는 장소다. 기억을 지키는 힘이 모여 있다.",
  국립5·18민주묘지:
    "오늘의 우리가 5·18을 기억하고 되새기는 자리다. 시간이 지나도 질문은 남아 있다.",
};

const STAT_LABELS: Record<StatKey, string> = {
  courage: "용기",
  record: "기록",
  trust: "신뢰",
  safety: "안전",
};

// Fixed player character position + facing direction per scene type
const CHAR_POS: Record<
  SceneType,
  { x: number; y: number; direction: Direction }
> = {
  street: { x: 44, y: 80, direction: "up" },
  station: { x: 44, y: 82, direction: "up" },
  university: { x: 45, y: 79, direction: "up" },
  downtown: { x: 47, y: 79, direction: "up" },
  home: { x: 50, y: 82, direction: "down" },
  plaza: { x: 50, y: 79, direction: "up" },
  square: { x: 48, y: 80, direction: "down" },
  corridor: { x: 50, y: 80, direction: "up" },
  phonebooth: { x: 36, y: 83, direction: "down" },
  plaza_night: { x: 50, y: 80, direction: "up" },
  notebook: { x: 45, y: 82, direction: "down" },
  station_rumor: { x: 44, y: 82, direction: "up" },
  side_alley_detour: { x: 43, y: 82, direction: "up" },
  family_neighborhood: { x: 42, y: 84, direction: "down" },
  leaflet_room: { x: 49, y: 82, direction: "down" },
  market_people: { x: 48, y: 79, direction: "up" },
  street_clinic: { x: 46, y: 82, direction: "down" },
  citizen_debate: { x: 48, y: 79, direction: "up" },
  supply_run: { x: 47, y: 82, direction: "down" },
  checkpoint_edge: { x: 49, y: 80, direction: "up" },
  night_meeting: { x: 50, y: 80, direction: "down" },
  ending: { x: 50, y: 76, direction: "down" },
};

// NPC anchor slots per scene type (tail of speech bubble points here)
// Slots ordered left → right. Player dialogue is skipped.
// university/home have no visible NPCs in background → empty
const NPC_SLOTS: Record<SceneType, { x: number; y: number }[]> = {
  street: [
    { x: 16, y: 56 },
    { x: 69, y: 58 },
    { x: 50, y: 54 },
  ],
  station: [
    { x: 67.4, y: 42 },
    { x: 18.3, y: 48 },
  ],
  university: [],
  downtown: [
    { x: 12.4, y: 53.4 },
    { x: 51, y: 47 },
    { x: 42, y: 60 },
  ],
  home: [],
  plaza: [
    { x: 28, y: 62.4 },
    { x: 75, y: 60 },
    { x: 44, y: 62 },
  ],
  square: [
    { x: 12, y: 63 },
    { x: 63.4, y: 60 },
    { x: 44, y: 61 },
  ],
  station_rumor: [
    { x: 18.7, y: 50.3 },
    { x: 74.4, y: 49.3 },
  ],
  side_alley_detour: [
    { x: 32, y: 45 },
    { x: 72, y: 60 },
  ],
  family_neighborhood: [
    { x: 31, y: 46 },
    { x: 77, y: 36 },
  ],
  leaflet_room: [{ x: 51, y: 40 }],
  market_people: [
    { x: 18.5, y: 47 },
    { x: 75, y: 50 },
    { x: 46, y: 56 },
  ],
  street_clinic: [
    { x: 20.7, y: 37.9 },
    { x: 70, y: 60 },
  ],
  citizen_debate: [
    { x: 25, y: 56.5 },
    { x: 49, y: 54 },
    { x: 50, y: 56 },
  ],
  supply_run: [
    { x: 16, y: 48 },
    { x: 70, y: 64 },
  ],
  checkpoint_edge: [
    { x: 16.5, y: 48 },
    { x: 72, y: 60 },
  ],
  night_meeting: [
    { x: 29, y: 40 },
    { x: 70, y: 43 },
  ],
  // 광주 외곽 검문소: 친구 1명, 도로 좌측
  corridor: [
    { x: 28, y: 65 },
    { x: 65, y: 62 },
  ],
  // 골목 기록 씬: 곁에 있는 시민 1명
  notebook: [{ x: 13, y: 23 }],
  // 공중전화: 어머니 목소리가 수화기에서 들려오는 위치
  phonebooth: [
    { x: 52, y: 40 },
    { x: 52, y: 50 },
  ],
  // 도청 새벽: 남은 시민 한 명, 광장 우측
  plaza_night: [
    { x: 72.2, y: 53 },
    { x: 35, y: 68 },
  ],
  ending: [
    { x: 35, y: 68 },
    { x: 62, y: 68 },
  ],
};

const AVATAR_COLORS: Record<string, { bg: string; border: string }> = {
  player: { bg: "#1a2a0c", border: "#4a6a1a" },
  friend: { bg: "#0c1a1a", border: "#1a5a5a" },
  citizen: { bg: "#1a180c", border: "#5a4a1a" },
  student: { bg: "#0c0c1a", border: "#2a2a6a" },
  mother: { bg: "#1a0c0c", border: "#5a2a2a" },
  elder: { bg: "#18180c", border: "#5a5a1a" },
  youth: { bg: "#0c1a0c", border: "#2a5a2a" },
  merchant: { bg: "#1a100c", border: "#5a3a1a" },
  soldier: { bg: "#0c1208", border: "#3a5a1a" },
};

function getChoiceDisabledReason(choice: Choice, stats: Stats) {
  if (!choice.requirements) return null;

  for (const key of Object.keys(choice.requirements) as StatKey[]) {
    const min = choice.requirements[key];
    if (min !== undefined && stats[key] < min) {
      return `${STAT_LABELS[key]} ${min}`;
    }
  }

  return null;
}

export default function GameScreen({
  onBackToMenu,
  initialProgress,
  settings,
  onProgressChange,
}: Props) {
  const [currentSceneId, setCurrentSceneId] = useState(
    initialProgress.currentSceneId,
  );
  const [visitedSceneIds, setVisitedSceneIds] = useState<Set<string>>(
    new Set(initialProgress.visitedSceneIds),
  );
  const [choiceLog, setChoiceLog] = useState<string[]>(
    initialProgress.choiceLog,
  );
  const [stats, setStats] = useState<Stats>(initialProgress.stats);
  const [sceneIndex, setSceneIndex] = useState(initialProgress.sceneIndex);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentScene = scenes.find((s) => s.id === currentSceneId);

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (getChoiceDisabledReason(choice, stats)) return;

      setChoiceLog((prev) => [...prev, choice.text]);
      if (choice.stat && choice.statDelta) {
        const statKey = choice.stat;
        setStats((prev) => ({
          ...prev,
          [statKey]: prev[statKey] + (choice.statDelta ?? 1),
        }));
      }
      setCurrentSceneId(choice.nextSceneId);
      setVisitedSceneIds((prev) => new Set([...prev, choice.nextSceneId]));
      setSceneIndex((prev) => prev + 1);
    },
    [stats],
  );

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (historyOpen) {
          setHistoryOpen(false);
          return;
        }
        if (mapOpen) {
          setMapOpen(false);
          return;
        }
        if (inventoryOpen) {
          setInventoryOpen(false);
          return;
        }
        setMenuOpen((v) => !v);
      }
      if (e.key === "x" || e.key === "X") setHistoryOpen((v) => !v);
      if (e.key === "m" || e.key === "M") setMapOpen((v) => !v);
      if (e.key === "Tab") {
        e.preventDefault();
        setInventoryOpen((v) => !v);
      }
      if (!historyOpen && !mapOpen && !inventoryOpen && !menuOpen) {
        const canUseChoice = (choice?: Choice): choice is Choice =>
          choice !== undefined && !getChoiceDisabledReason(choice, stats);
        const firstChoice = currentScene?.choices[0];
        const secondChoice = currentScene?.choices[1];
        const thirdChoice = currentScene?.choices[2];

        if (e.key === "1" && canUseChoice(firstChoice))
          handleChoice(firstChoice);
        if (e.key === "2" && canUseChoice(secondChoice))
          handleChoice(secondChoice);
        if (e.key === "3" && canUseChoice(thirdChoice))
          handleChoice(thirdChoice);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    historyOpen,
    mapOpen,
    inventoryOpen,
    menuOpen,
    currentScene,
    handleChoice,
    stats,
  ]);

  useEffect(() => {
    onProgressChange({
      currentSceneId,
      visitedSceneIds: Array.from(visitedSceneIds),
      choiceLog,
      stats,
      sceneIndex,
      updatedAt: new Date().toISOString(),
    });
  }, [
    choiceLog,
    currentSceneId,
    onProgressChange,
    sceneIndex,
    stats,
    visitedSceneIds,
  ]);

  if (!currentScene) return null;

  const charPos = CHAR_POS[currentScene.sceneType];
  const slots = NPC_SLOTS[currentScene.sceneType] ?? [];
  const choiceViews = currentScene.choices.map((choice) => ({
    ...choice,
    disabled: Boolean(getChoiceDisabledReason(choice, stats)),
    disabledReason: getChoiceDisabledReason(choice, stats) ?? undefined,
  }));
  // Only non-player dialogue lines get speech bubbles
  const npcLines = currentScene.dialogue.filter((d) => d.avatar !== "player");
  const locationDesc = LOCATION_DESCS[currentScene.location] ?? "";

  return (
    <div
      className="flex flex-col w-full h-screen overflow-hidden"
      style={{
        fontFamily: "monospace",
        padding: "20px",
        gap: "16px",
        background: "#000000",
      }}
    >
      <HUD
        stageNum={currentScene.stageNum}
        stageTitle={currentScene.stageTitle}
        date={currentScene.date}
        location={currentScene.location}
        sceneIndex={sceneIndex}
        totalScenes={TOTAL_STAGES}
        onHistory={() => setHistoryOpen(true)}
        onMap={() => setMapOpen(true)}
        onInventory={() => setInventoryOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />

      <div className="flex flex-1 min-h-0 gap-4">
        {/* ── 왼쪽 열: 씬(상단 16:9) + 정보(하단) ── */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 gap-4">
          {/* 씬 — 너비에 맞춰 16:9 비율 유지 */}
          <div
            className="relative overflow-hidden bg-[#060907] flex-shrink-0 border border-[#2c3f12]"
            style={{ width: "100%", aspectRatio: "16/9" }}
          >
            <PixelScene sceneType={currentScene.sceneType} />

            {npcLines.map((d, i) => {
              const slot = slots[i];
              if (!slot) return null;
              const color = AVATAR_COLORS[d.avatar] ?? AVATAR_COLORS.citizen;
              return (
                <SpeechBubble
                  key={`${currentSceneId}-${d.avatar}-${d.name}-${d.line}`}
                  x={slot.x}
                  y={slot.y}
                  name={d.name}
                  line={d.line}
                  borderColor={color.border}
                  bgColor={color.bg}
                />
              );
            })}

            <Character
              direction={charPos.direction}
              x={charPos.x}
              y={charPos.y}
              size={120}
            />

            <div className="absolute top-3 left-3 border border-[#2c3f12] bg-[#0b1208]/90 px-3 py-1.5">
              <span
                className="text-[12px] text-[#5a7a20]"
                style={{ fontFamily: "monospace" }}
              >
                {currentScene.date} · {currentScene.location}
              </span>
            </div>
          </div>

          {/* 하단 정보: 목표+위치(좌) + 지역 지도(우) */}
          <div className="flex flex-1 min-h-0 border border-[#2c3f12] overflow-hidden">
            {/* 목표 + 현재 위치 */}
            <div
              className="flex flex-col gap-4 p-4 border-r border-[#2c3f12] bg-[#0b1208] overflow-y-auto"
              style={{ minWidth: 0, flex: "0 0 38%" }}
            >
              <div>
                <div
                  className="text-[10px] text-[#4a6a1a] mb-2 pb-1.5 border-b border-[#1e2e0e]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  해야 할 일
                </div>
                <p
                  className="text-[12px] text-[#8aa040] leading-relaxed mt-1"
                  style={{ fontFamily: "monospace" }}
                >
                  {currentScene.objective}
                </p>
              </div>
              <div>
                <div
                  className="text-[10px] text-[#4a6a1a] mb-2 pb-1.5 border-b border-[#1e2e0e]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  현재 위치
                </div>
                <p
                  className="text-[12px] text-[#6a8a30] font-bold mt-1 mb-1.5"
                  style={{ fontFamily: "monospace" }}
                >
                  {currentScene.location}
                </p>
                <p
                  className="text-[11px] text-[#4a6a20] leading-relaxed"
                  style={{ fontFamily: "monospace" }}
                >
                  {locationDesc}
                </p>
              </div>
              <div>
                <div
                  className="text-[10px] text-[#4a6a1a] mb-2 pb-1.5 border-b border-[#1e2e0e]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  눈앞의 상황
                </div>
                <p
                  className="text-[11px] text-[#7f9440] leading-relaxed mt-1"
                  style={{ fontFamily: "monospace" }}
                >
                  {currentScene.situation}
                </p>
              </div>
            </div>

            {/* 지역 지도 — compact 해제로 노드 라벨 표시 */}
            <div className="flex flex-col p-4 bg-[#090d06] flex-1 min-w-0">
              <div
                className="text-[10px] text-[#4a6a1a] mb-2 pb-1.5 border-b border-[#1e2e0e] flex-shrink-0"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                지역 지도
              </div>
              <div className="flex-1 min-h-0">
                <MiniMap
                  currentSceneId={currentSceneId}
                  visitedSceneIds={visitedSceneIds}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── 오른쪽 열: 내러티브 + 대화 + 선택지 ── */}
        <RightPanel
          key={currentSceneId}
          text={currentScene.text}
          situation={currentScene.situation}
          dialogue={currentScene.dialogue}
          choices={choiceViews}
          typingSpeed={TEXT_SPEED_MS[settings.textSpeed]}
          onChoice={handleChoice}
        />
      </div>

      <BottomBar />

      {historyOpen && (
        <HistoryModal
          history={currentScene.history}
          location={currentScene.location}
          date={currentScene.date}
          onClose={() => setHistoryOpen(false)}
        />
      )}
      {mapOpen && (
        <MapModal
          currentSceneId={currentSceneId}
          visitedSceneIds={visitedSceneIds}
          choiceLog={choiceLog}
          defaultMode={settings.defaultMapMode}
          onClose={() => setMapOpen(false)}
          onJump={(id) => {
            setCurrentSceneId(id);
            setVisitedSceneIds((prev) => new Set([...prev, id]));
          }}
        />
      )}
      {inventoryOpen && (
        <InventoryModal
          stats={stats}
          choiceLog={choiceLog}
          onClose={() => setInventoryOpen(false)}
        />
      )}

      {menuOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.85)" }}
        >
          <div
            className="border-2 border-game-border-bright bg-game-panel p-7 w-80"
            style={{ boxShadow: "0 0 0 2px #2c3f12" }}
          >
            <div
              className="text-[13px] text-game-text text-center mb-5 pb-3 border-b border-game-border"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              일시정지
            </div>
            {[
              { label: "계속하기", action: () => setMenuOpen(false) },
              {
                label: "처음부터",
                action: () => {
                  setCurrentSceneId("start");
                  setVisitedSceneIds(new Set(["start"]));
                  setChoiceLog([]);
                  setStats({ courage: 0, record: 0, trust: 0, safety: 0 });
                  setSceneIndex(1);
                  setMenuOpen(false);
                },
              },
              {
                label: "메인 메뉴",
                action: () => {
                  setMenuOpen(false);
                  onBackToMenu();
                },
              },
            ].map(({ label, action }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className="w-full border border-game-border bg-[#0d1608] hover:bg-[#162010] hover:border-[#4a6a1a] py-3 mb-2.5 transition-all cursor-pointer"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <span className="text-[12px] text-game-accent">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
