export type SceneId =
  | "start"
  | "observe_street"
  | "station_rumor"
  | "call_family"
  | "family_neighborhood"
  | "radio_room"
  | "leaflet_room"
  | "side_alley_detour"
  | "university_gate"
  | "talk_students"
  | "downtown"
  | "market_people"
  | "record_scene"
  | "street_clinic"
  | "citizen_voice"
  | "citizen_debate"
  | "help_people"
  | "supply_run"
  | "checkpoint_edge"
  | "outside_message"
  | "community"
  | "night_meeting"
  | "last_night"
  | "archive_ending"
  | "memory_ending";

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
  nextSceneId: SceneId;
  stat?: StatKey;
  statDelta?: number;
  requirements?: Partial<Record<StatKey, number>>;
  collectible?: string;
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
  id: SceneId;
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
  npcSlots?: Array<{ x: number; y: number }>;
  locationDesc?: string;
};

export type MapNode = {
  id: SceneId;
  label: string;
  x: number;
  y: number;
  connections: SceneId[];
};

export type Stats = {
  courage: number;
  record: number;
  trust: number;
  safety: number;
};

export type TextSpeed = "instant" | "normal" | "slow";

export type MapDefaultMode = "activity" | "city";

export type GameSettings = {
  soundOn: boolean;
  musicOn: boolean;
  textSpeed: TextSpeed;
  defaultMapMode: MapDefaultMode;
  autoSync: boolean;
};

export type GameProgress = {
  currentSceneId: SceneId;
  visitedSceneIds: SceneId[];
  choiceLog: string[];
  stats: Stats;
  sceneIndex: number;
  updatedAt: string | null;
  allVisitedSceneIds: SceneId[];
  allChoiceLog: string[];
  collectedItems: string[];
};

export type DataGsmUser = {
  id: string;
  name: string;
  role: string;
  academicState: "enrolled" | "graduate" | "dropout";
  grade?: number;
  classRoom?: number;
  number?: number;
};

export type SyncBundle = {
  progress: GameProgress;
  settings: GameSettings;
  savedAt: string;
};

export type SyncStatus = {
  authenticated: boolean;
  user: DataGsmUser | null;
  lastSyncedAt: string | null;
};
