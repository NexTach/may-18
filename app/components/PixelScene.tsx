"use client";

import Image from "next/image";
import { SCENE_IMAGES } from "../lib/asset-cache";
import type { SceneType } from "../types";

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
