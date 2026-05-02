export type DialogueLine = {
  name: string;
  line: string;
  avatar:
    | "player"
    | "friend"
    | "citizen"
    | "student"
    | "mother"
    | "elder"
    | "youth"
    | "merchant"
    | "soldier";
};

export type StatKey = "courage" | "record" | "trust" | "safety";

export type Choice = {
  text: string;
  detail: string;
  nextSceneId: string;
  stat?: StatKey;
  statDelta?: number;
  requirements?: Partial<Record<StatKey, number>>;
};

export type SceneType =
  | "street"
  | "station"
  | "university"
  | "downtown"
  | "home"
  | "square"
  | "plaza"
  | "corridor"
  | "phonebooth"
  | "plaza_night"
  | "notebook"
  | "station_rumor"
  | "side_alley_detour"
  | "family_neighborhood"
  | "leaflet_room"
  | "market_people"
  | "street_clinic"
  | "citizen_debate"
  | "supply_run"
  | "checkpoint_edge"
  | "night_meeting"
  | "ending";

export type Scene = {
  id: string;
  stageNum: number;
  stageTitle: string;
  date: string;
  location: string;
  objective: string;
  sceneType: SceneType;
  text: string;
  situation: string;
  dialogue: DialogueLine[];
  history: string;
  choices: Choice[];
  isEnding?: boolean;
};

export type MapNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
};

export type Stats = {
  courage: number;
  record: number;
  trust: number;
  safety: number;
};

export type GameScreen = "menu" | "game";
