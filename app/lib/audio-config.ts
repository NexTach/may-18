import type { SceneId } from "../types";

export const SOUNDS = {
  march: "/sounds/march.mp3",
  may: "/sounds/may.mp3",
} as const;

export const SCENE_BGM: Record<SceneId, string> = {
  start: SOUNDS.may,
  observe_street: SOUNDS.may,
  station_rumor: SOUNDS.may,
  call_family: SOUNDS.may,
  family_neighborhood: SOUNDS.may,
  side_alley_detour: SOUNDS.may,
  radio_room: SOUNDS.may,
  leaflet_room: SOUNDS.may,
  university_gate: SOUNDS.march,
  talk_students: SOUNDS.march,
  downtown: SOUNDS.march,
  market_people: SOUNDS.march,
  record_scene: SOUNDS.march,
  street_clinic: SOUNDS.march,
  citizen_voice: SOUNDS.march,
  citizen_debate: SOUNDS.march,
  help_people: SOUNDS.march,
  supply_run: SOUNDS.march,
  checkpoint_edge: SOUNDS.march,
  outside_message: SOUNDS.march,
  community: SOUNDS.march,
  night_meeting: SOUNDS.march,
  last_night: SOUNDS.may,
  archive_ending: SOUNDS.may,
  memory_ending: SOUNDS.may,
};
