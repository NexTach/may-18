"use client";

import type { SceneType } from "../types";

export const SCENE_IMAGES: Record<SceneType, string> = {
  street: "/scenes/street.png",
  station: "/scenes/gwangju_station.png",
  university: "/scenes/university.png",
  downtown: "/scenes/downtown.png",
  home: "/scenes/home.png",
  plaza: "/scenes/plaza.png",
  square: "/scenes/square.png",
  corridor: "/scenes/corridor.png",
  phonebooth: "/scenes/phonebooth.png",
  plaza_night: "/scenes/plaza_night.png",
  notebook: "/scenes/notebook.png",
  station_rumor: "/scenes/station_rumor.png",
  side_alley_detour: "/scenes/side_alley_detour.png",
  family_neighborhood: "/scenes/family_neighborhood.png",
  leaflet_room: "/scenes/leaflet_room.png",
  market_people: "/scenes/market_people.png",
  street_clinic: "/scenes/street_clinic.png",
  citizen_debate: "/scenes/citizen_debate.png",
  supply_run: "/scenes/supply_run.png",
  checkpoint_edge: "/scenes/checkpoint_edge.png",
  night_meeting: "/scenes/night_meeting.png",
  ending: "/scenes/ending.png",
};

const preloadedImages = new Map<string, HTMLImageElement>();
const preloadedAudio = new Map<string, HTMLAudioElement>();

export function preloadImage(src: string) {
  if (typeof window === "undefined" || preloadedImages.has(src)) return;

  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
  preloadedImages.set(src, img);
}

export function preloadSceneType(sceneType: SceneType) {
  preloadImage(SCENE_IMAGES[sceneType]);
}

export function preloadSceneTypes(sceneTypes: SceneType[]) {
  const uniqueSceneTypes = new Set(sceneTypes);
  for (const sceneType of uniqueSceneTypes) {
    preloadSceneType(sceneType);
  }
}

export function preloadAudio(src: string) {
  if (typeof window === "undefined" || preloadedAudio.has(src)) return;

  const audio = new window.Audio();
  audio.preload = "auto";
  audio.src = src;
  audio.load();
  preloadedAudio.set(src, audio);
}

export function scheduleIdlePreload(task: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const idleWindow = window as Window & {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  if (idleWindow.requestIdleCallback) {
    const handle = idleWindow.requestIdleCallback(() => task(), {
      timeout: 1200,
    });
    return () => idleWindow.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(task, 150);
  return () => window.clearTimeout(handle);
}
