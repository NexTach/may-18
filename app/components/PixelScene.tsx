"use client";

import Image from "next/image";
import type { SceneType } from "../types";

const SCENE_IMAGES: Record<SceneType, string> = {
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

// Per-scene image fit override — corridor uses contain so the full image (friend character) is visible
const SCENE_IMAGE_CLASS: Partial<Record<SceneType, string>> = {
  corridor: "object-contain object-bottom",
};

export default function PixelScene({ sceneType }: { sceneType: SceneType }) {
  const imgClass = SCENE_IMAGE_CLASS[sceneType] ?? "object-cover object-bottom";
  return (
    <div className="w-full h-full relative bg-game-bg">
      <Image
        src={SCENE_IMAGES[sceneType]}
        alt=""
        fill
        priority
        quality={100}
        className={imgClass}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
