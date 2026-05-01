"use client";

import Image from "next/image";
import type { SceneType } from "../types";

const SCENE_IMAGES: Record<SceneType, string> = {
  street:      "/scenes/street.png",
  university:  "/scenes/university.png",
  downtown:    "/scenes/downtown.png",
  home:        "/scenes/home.png",
  plaza:       "/scenes/plaza.png",
  square:      "/scenes/square.png",
  corridor:    "/scenes/corridor.png",
  phonebooth:  "/scenes/phonebooth.png",
  plaza_night: "/scenes/plaza_night.png",
  notebook:    "/scenes/notebook.png",
  ending:      "/scenes/ending.png",
};

// Per-scene image fit override — corridor uses contain so the full image (friend character) is visible
const SCENE_IMAGE_CLASS: Partial<Record<SceneType, string>> = {
  corridor: "object-contain object-bottom",
};

export default function PixelScene({ sceneType }: { sceneType: SceneType }) {
  const imgClass = SCENE_IMAGE_CLASS[sceneType] ?? "object-cover object-bottom";
  return (
    <div className="w-full h-full relative bg-[#060907]">
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
