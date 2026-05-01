"use client";

import { useState, useEffect, useCallback } from "react";
import type { Stats, Choice } from "../types";
import type { SceneType } from "../types";
import { scenes } from "../data/scenes";
import HUD from "./HUD";
import LeftPanel from "./LeftPanel";
import PixelScene from "./PixelScene";
import Character from "./Character";
import SpeechBubble from "./SpeechBubble";
import RightPanel from "./RightPanel";
import BottomBar from "./BottomBar";
import HistoryModal from "./HistoryModal";
import MapModal from "./MapModal";
import InventoryModal from "./InventoryModal";

type Props = { onBackToMenu: () => void };

const LOCATION_DESCS: Record<string, string> = {
  "광주역 앞 거리": "군인들이 곳곳을 지키고 있고, 시민들의 발걸음이 조심스럽다.",
  "전남대학교 정문 앞": "학생들을 군인들이 막아서고 있다. 팽팽한 긴장감이 감돈다.",
  "집 근처 공중전화": "집 앞 공중전화. 가족의 안부를 확인할 수 있다.",
  "광주 시내": "좁은 골목과 거리에 사람들이 모여 있다.",
  "금남로": "넓은 대로에 수많은 시민들이 모여 목소리를 높이고 있다.",
  "집": "라디오에서 흘러나오는 소식과 창밖의 현실이 다르다.",
  "전남도청 앞": "시민들이 광장에 모여 서로의 이야기를 듣고 있다.",
  "광주 외곽": "도시 밖으로 나가는 길목. 기록을 전달할 수 있는 곳.",
  "광주": "시민들이 서로를 돕고 있다. 혼란 속에도 공동체가 살아 있다.",
  "전남도청": "항쟁의 마지막 거점. 새벽 공기가 무겁게 내려앉았다.",
  "기록": "시간이 지나도 사라지지 않는 기억과 기록.",
  "우리": "그날의 선택은 지금 우리에게 묻고 있다.",
};

// Fixed player character position per scene type
const CHAR_POS: Record<SceneType, { x: number; y: number }> = {
  street:     { x: 44, y: 80 },
  university: { x: 45, y: 79 },
  downtown:   { x: 47, y: 79 },
  home:       { x: 50, y: 82 },
  plaza:      { x: 50, y: 79 },
  square:     { x: 48, y: 80 },
  corridor:   { x: 50, y: 79 },
  ending:     { x: 50, y: 76 },
};

// NPC anchor slots per scene type (tail of speech bubble points here)
// Slots ordered left → right. Player dialogue is skipped.
// university/home have no visible NPCs in background → empty
const NPC_SLOTS: Record<SceneType, { x: number; y: number }[]> = {
  street:     [{ x: 22, y: 63 }, { x: 69, y: 63 }, { x: 50, y: 58 }],
  university: [],
  downtown:   [{ x: 28, y: 70 }, { x: 62, y: 68 }, { x: 44, y: 65 }],
  home:       [],
  plaza:      [{ x: 26, y: 72 }, { x: 65, y: 70 }, { x: 45, y: 67 }],
  square:     [{ x: 22, y: 67 }, { x: 63, y: 65 }, { x: 44, y: 61 }],
  corridor:   [{ x: 25, y: 65 }, { x: 64, y: 65 }, { x: 45, y: 60 }],
  ending:     [{ x: 35, y: 68 }, { x: 62, y: 68 }],
};

const AVATAR_COLORS: Record<string, { bg: string; border: string }> = {
  player:   { bg: "#1a2a0c", border: "#4a6a1a" },
  friend:   { bg: "#0c1a1a", border: "#1a5a5a" },
  citizen:  { bg: "#1a180c", border: "#5a4a1a" },
  student:  { bg: "#0c0c1a", border: "#2a2a6a" },
  mother:   { bg: "#1a0c0c", border: "#5a2a2a" },
  elder:    { bg: "#18180c", border: "#5a5a1a" },
  youth:    { bg: "#0c1a0c", border: "#2a5a2a" },
  merchant: { bg: "#1a100c", border: "#5a3a1a" },
};

export default function GameScreen({ onBackToMenu }: Props) {
  const [currentSceneId, setCurrentSceneId] = useState("start");
  const [visitedSceneIds, setVisitedSceneIds] = useState<Set<string>>(new Set(["start"]));
  const [choiceLog, setChoiceLog] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({ courage: 0, record: 0, trust: 0, safety: 0 });
  const [hp, setHp] = useState(4);
  const [sceneIndex, setSceneIndex] = useState(1);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        if (historyOpen) { setHistoryOpen(false); return; }
        if (mapOpen) { setMapOpen(false); return; }
        if (inventoryOpen) { setInventoryOpen(false); return; }
        setMenuOpen((v) => !v);
      }
      if (e.key === "x" || e.key === "X") setHistoryOpen((v) => !v);
      if (e.key === "m" || e.key === "M") setMapOpen((v) => !v);
      if (e.key === "Tab") { e.preventDefault(); setInventoryOpen((v) => !v); }
      if (!historyOpen && !mapOpen && !inventoryOpen && !menuOpen) {
        if (e.key === "1" && currentScene?.choices[0]) handleChoice(currentScene.choices[0]);
        if (e.key === "2" && currentScene?.choices[1]) handleChoice(currentScene.choices[1]);
        if (e.key === "3" && currentScene?.choices[2]) handleChoice(currentScene.choices[2]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [historyOpen, mapOpen, inventoryOpen, menuOpen, currentScene, handleChoice]);

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

        {/* center scene */}
        <div className="flex-1 relative overflow-hidden">
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
          <Character direction="down" x={charPos.x} y={charPos.y} />

          {/* scene date/location overlay */}
          <div className="absolute top-3 left-3 border border-[#2c3f12] bg-[#0b1208]/90 px-3 py-1.5">
            <span className="text-[12px] text-[#5a7a20]" style={{ fontFamily: "monospace" }}>
              {currentScene.date} · {currentScene.location}
            </span>
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
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.85)" }}>
          <div className="border-2 border-[#4a6a1a] bg-[#0b1208] p-7 w-80" style={{ boxShadow: "0 0 0 2px #2c3f12" }}>
            <div
              className="text-[13px] text-[#c4d47a] text-center mb-5 pb-3 border-b border-[#2c3f12]"
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
              { label: "메인 메뉴", action: () => { setMenuOpen(false); onBackToMenu(); } },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-full border border-[#2c3f12] bg-[#0d1608] hover:bg-[#162010] hover:border-[#4a6a1a] py-3 mb-2.5 transition-all cursor-pointer"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <span className="text-[12px] text-[#8aa040]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
