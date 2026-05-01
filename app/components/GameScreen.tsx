"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scenes } from "../data/scenes";
import type { Choice, SceneType, Stats } from "../types";
import BottomBar from "./BottomBar";
import Character, { type Direction } from "./Character";
import HistoryModal from "./HistoryModal";
import HUD from "./HUD";
import InventoryModal from "./InventoryModal";
import LeftPanel from "./LeftPanel";
import MapModal from "./MapModal";
import PixelScene from "./PixelScene";
import RightPanel from "./RightPanel";
import SpeechBubble from "./SpeechBubble";

type Props = { onBackToMenu: () => void };

const LOCATION_DESCS: Record<string, string> = {
  "광주역 앞 거리":
    "군인들이 곳곳을 지키고 있고, 시민들의 발걸음이 조심스럽다.",
  "전남대학교 정문 앞":
    "학생들을 군인들이 막아서고 있다. 팽팽한 긴장감이 감돈다.",
  "집 근처 공중전화": "집 앞 공중전화. 가족의 안부를 확인할 수 있다.",
  "광주 시내": "좁은 골목과 거리에 사람들이 모여 있다.",
  금남로: "넓은 대로에 수많은 시민들이 모여 목소리를 높이고 있다.",
  집: "라디오에서 흘러나오는 소식과 창밖의 현실이 다르다.",
  "전남도청 앞": "시민들이 광장에 모여 서로의 이야기를 듣고 있다.",
  "광주 외곽": "도시 밖으로 나가는 길목. 기록을 전달할 수 있는 곳.",
  광주: "시민들이 서로를 돕고 있다. 혼란 속에도 공동체가 살아 있다.",
  전남도청: "항쟁의 마지막 거점. 새벽 공기가 무겁게 내려앉았다.",
  기록: "시간이 지나도 사라지지 않는 기억과 기록.",
  우리: "그날의 선택은 지금 우리에게 묻고 있다.",
};

// Fixed player character position + facing direction per scene type
const CHAR_POS: Record<SceneType, { x: number; y: number; direction: Direction }> = {
  street:      { x: 44, y: 80, direction: "up" },
  university:  { x: 45, y: 79, direction: "up" },
  downtown:    { x: 47, y: 79, direction: "up" },
  home:        { x: 50, y: 82, direction: "down" },
  plaza:       { x: 50, y: 79, direction: "up" },
  square:      { x: 48, y: 80, direction: "down" },
  corridor:    { x: 50, y: 80, direction: "up" },
  phonebooth:  { x: 36, y: 83, direction: "down" },
  plaza_night: { x: 50, y: 80, direction: "up" },
  notebook:    { x: 45, y: 82, direction: "down" },
  ending:      { x: 50, y: 76, direction: "down" },
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
  university: [],
  downtown: [
    { x: 19.5, y: 58 },
    { x: 61, y: 55 },
    { x: 42, y: 60 },
  ],
  home: [],
  plaza: [
    { x: 28, y: 59 },
    { x: 75, y: 60 },
    { x: 44, y: 62 },
  ],
  square: [
    { x: 12, y: 61 },
    { x: 62, y: 69 },
    { x: 44, y: 61 },
  ],
  // 광주 외곽 검문소: 친구 1명, 도로 좌측
  corridor: [
    { x: 18, y: 65 },
    { x: 65, y: 62 },
  ],
  // 골목 기록 씬: 곁에 있는 시민 1명
  notebook: [
    { x: 25, y: 62 },
  ],
  // 공중전화: 어머니 목소리가 수화기에서 들려오는 위치
  phonebooth: [
    { x: 52, y: 62 },
    { x: 52, y: 52 },
  ],
  // 도청 새벽: 남은 시민 한 명, 광장 우측
  plaza_night: [
    { x: 62, y: 70 },
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
  soldier:  { bg: "#0c1208", border: "#3a5a1a" },
};

export default function GameScreen({ onBackToMenu }: Props) {
  const [currentSceneId, setCurrentSceneId] = useState("start");
  const [visitedSceneIds, setVisitedSceneIds] = useState<Set<string>>(
    new Set(["start"]),
  );
  const [choiceLog, setChoiceLog] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({
    courage: 0,
    record: 0,
    trust: 0,
    safety: 0,
  });
  const [hp, setHp] = useState(4);
  const [sceneIndex, setSceneIndex] = useState(1);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fixed 16:9 scene viewport — measured in JS so % positions never drift
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = sceneWrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const ratio = 16 / 9;
      if (width / height >= ratio) {
        setViewport({ w: Math.round(height * ratio), h: Math.round(height) });
      } else {
        setViewport({ w: Math.round(width), h: Math.round(width / ratio) });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const currentScene = scenes.find((s) => s.id === currentSceneId);

  const handleChoice = useCallback((choice: Choice) => {
    setChoiceLog((prev) => [...prev, choice.text]);
    if (choice.stat && choice.statDelta) {
      setStats((prev) => ({
        ...prev,
        [choice.stat!]: prev[choice.stat!] + (choice.statDelta ?? 1),
      }));
    }
    setCurrentSceneId(choice.nextSceneId);
    setVisitedSceneIds((prev) => new Set([...prev, choice.nextSceneId]));
    setSceneIndex((prev) => prev + 1);
  }, []);

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
        if (e.key === "1" && currentScene?.choices[0])
          handleChoice(currentScene.choices[0]);
        if (e.key === "2" && currentScene?.choices[1])
          handleChoice(currentScene.choices[1]);
        if (e.key === "3" && currentScene?.choices[2])
          handleChoice(currentScene.choices[2]);
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
  ]);

  if (!currentScene) return null;

  const charPos = CHAR_POS[currentScene.sceneType];
  const slots = NPC_SLOTS[currentScene.sceneType] ?? [];
  // Only non-player dialogue lines get speech bubbles
  const npcLines = currentScene.dialogue.filter((d) => d.avatar !== "player");
  const locationDesc = LOCATION_DESCS[currentScene.location] ?? "";

  return (
    <div
      className="flex flex-col w-full h-screen bg-[#090d06] overflow-hidden"
      style={{ fontFamily: "monospace" }}
    >
      <HUD
        stageNum={currentScene.stageNum}
        stageTitle={currentScene.stageTitle}
        date={currentScene.date}
        location={currentScene.location}
        hp={hp}
        stats={stats}
        sceneIndex={sceneIndex}
        totalScenes={12}
        onHistory={() => setHistoryOpen(true)}
        onMap={() => setMapOpen(true)}
        onInventory={() => setInventoryOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />

      <div className="flex flex-1 min-h-0">
        <LeftPanel
          objective={currentScene.objective}
          location={currentScene.location}
          locationDesc={locationDesc}
          currentSceneId={currentSceneId}
          visitedSceneIds={visitedSceneIds}
        />

        {/* center scene — outer div measured by ResizeObserver to compute 16:9 viewport */}
        <div ref={sceneWrapRef} className="flex-1 overflow-hidden flex items-center justify-center bg-[#090d06]">
          {/* fixed px viewport: NPC/character % positions never drift regardless of screen size */}
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{ width: viewport.w || "100%", height: viewport.h || "100%" }}
          >
            <PixelScene sceneType={currentScene.sceneType} />

            {/* NPC speech bubbles */}
            {npcLines.map((d, i) => {
              const slot = slots[i];
              if (!slot) return null;
              const color = AVATAR_COLORS[d.avatar] ?? AVATAR_COLORS.citizen;
              return (
                <SpeechBubble
                  key={`${currentSceneId}-${i}`}
                  x={slot.x}
                  y={slot.y}
                  name={d.name}
                  line={d.line}
                  borderColor={color.border}
                  bgColor={color.bg}
                />
              );
            })}

            {/* player character */}
            <Character direction={charPos.direction} x={charPos.x} y={charPos.y} size={120} />

            {/* scene date/location overlay */}
            <div className="absolute top-3 left-3 border border-game-border bg-game-panel/90 px-3 py-1.5">
              <span
                className="text-[12px] text-game-text-dim"
                style={{ fontFamily: "monospace" }}
              >
                {currentScene.date} · {currentScene.location}
              </span>
            </div>
          </div>
        </div>

        <RightPanel
          key={currentSceneId}
          text={currentScene.text}
          dialogue={currentScene.dialogue}
          choices={currentScene.choices}
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
                  setHp(4);
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
