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
    | "merchant";
};

export type StatKey = "courage" | "record" | "trust" | "safety";

export type Choice = {
  text: string;
  nextSceneId: string;
  stat?: StatKey;
  statDelta?: number;
};

export type SceneType =
  | "street"
  | "university"
  | "downtown"
  | "home"
  | "square"
  | "plaza"
  | "corridor"
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
