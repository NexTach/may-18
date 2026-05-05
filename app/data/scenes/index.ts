import type { MapNode } from "../../types";
import { stage1Scenes } from "./stage1";
import { stage2Scenes } from "./stage2";
import { stage3Scenes } from "./stage3";
import { stage4Scenes } from "./stage4";
import { stage5Scenes } from "./stage5";
import { stage6Scenes } from "./stage6";

export const scenes = [
  ...stage1Scenes,
  ...stage2Scenes,
  ...stage3Scenes,
  ...stage4Scenes,
  ...stage5Scenes,
  ...stage6Scenes,
];

// OSM 위경도 기반 실제 좌표 (MapModal GAME_NODE_SVG → 선형 변환)
// new_x = (svg_x - 301.0) * 4.5 + 15,  new_y = (svg_y - 108.2) * 1.8 + 15
// x 스케일을 크게, y 스케일을 작게 → landscape 비율 (~1.75:1) 유지
// x: 서(小) → 동(大),  y: 북(小) → 남(大)
export const mapNodes: MapNode[] = [
  // ── 북구: 광주역·전남대 일대 ────────────────────────────────────
  { id: "start",               label: "광주역",   x: 197, y: 107, connections: ["station_rumor", "call_family", "observe_street"] },
  { id: "observe_street",      label: "거리",     x: 212, y: 115, connections: ["station_rumor", "radio_room"] },
  { id: "station_rumor",       label: "역광장",   x: 223, y: 119, connections: ["side_alley_detour", "call_family", "radio_room"] },
  { id: "side_alley_detour",   label: "용봉골목", x: 168, y:  81, connections: ["university_gate", "record_scene"] },
  { id: "university_gate",     label: "전남대",   x: 184, y:  75, connections: ["record_scene", "downtown", "talk_students"] },
  { id: "talk_students",       label: "학생들",   x: 174, y:  69, connections: ["downtown", "record_scene"] },
  // ── 서구: 양동시장·주택가 일대 ──────────────────────────────────
  { id: "call_family",         label: "양동전화", x:  58, y: 144, connections: ["family_neighborhood", "downtown"] },
  { id: "family_neighborhood", label: "양동골목", x:  32, y: 155, connections: ["radio_room", "station_rumor", "downtown"] },
  { id: "radio_room",          label: "양동주택", x:  15, y: 163, connections: ["leaflet_room", "citizen_voice"] },
  { id: "leaflet_room",        label: "양동방",   x:  31, y: 169, connections: ["record_scene", "citizen_voice"] },
  // ── 동구: 충장로·금남로·전남도청 일대 ───────────────────────────
  { id: "record_scene",        label: "충장로",   x: 203, y: 130, connections: ["street_clinic", "citizen_voice"] },
  { id: "downtown",            label: "금남로",   x: 218, y: 140, connections: ["market_people", "help_people", "record_scene"] },
  { id: "market_people",       label: "대인시장", x: 248, y: 124, connections: ["record_scene", "street_clinic", "citizen_voice"] },
  { id: "street_clinic",       label: "수기동",   x: 210, y: 155, connections: ["help_people", "supply_run"] },
  { id: "citizen_voice",       label: "도청앞",   x: 283, y: 159, connections: ["citizen_debate", "help_people"] },
  { id: "citizen_debate",      label: "YMCA앞",   x: 276, y: 145, connections: ["community", "checkpoint_edge", "help_people"] },
  { id: "help_people",         label: "수기일대", x: 228, y: 163, connections: ["supply_run", "checkpoint_edge"] },
  { id: "supply_run",          label: "불로동",   x: 269, y: 135, connections: ["community", "citizen_debate"] },
  { id: "community",           label: "금남로",   x: 234, y: 131, connections: ["night_meeting", "archive_ending"] },
  { id: "night_meeting",       label: "YMCA",     x: 295, y: 149, connections: ["last_night", "archive_ending"] },
  { id: "last_night",          label: "도청",     x: 252, y: 156, connections: ["memory_ending"] },
  { id: "archive_ending",      label: "기록관",   x: 237, y: 155, connections: [] },
  // ── 남구: 지원동 일대 ───────────────────────────────────────────
  { id: "checkpoint_edge",     label: "지원동",   x: 316, y: 187, connections: ["outside_message", "community"] },
  { id: "outside_message",     label: "지원외곽", x: 337, y: 199, connections: ["archive_ending", "night_meeting"] },
  // ── 북구 북부: 국립5·18민주묘지 ────────────────────────────────
  { id: "memory_ending",       label: "묘지",     x:  36, y:  15, connections: [] },
];

export const TOTAL_STAGES = scenes.length;
