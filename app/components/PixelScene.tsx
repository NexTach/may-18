"use client";

import Image from "next/image";
import { SCENE_IMAGES } from "../lib/asset-cache";
import type { SceneType } from "../types";

const SCENE_IMAGE_CLASS: Partial<Record<SceneType, string>> = {
  corridor: "object-contain object-bottom",
  notebook: "object-cover object-top",
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
