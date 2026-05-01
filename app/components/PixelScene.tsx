"use client";

import Image from "next/image";
import type { SceneType } from "../types";

const SCENE_IMAGES: Record<SceneType, string> = {
  street:     "/scenes/street.png",
  university: "/scenes/university.png",
  downtown:   "/scenes/downtown.png",
  home:       "/scenes/home.png",
  plaza:      "/scenes/plaza.png",
  square:     "/scenes/square.png",
  corridor:   "/scenes/square.png",
  ending:     "/scenes/ending.png",
};

export default function PixelScene({ sceneType }: { sceneType: SceneType }) {
  return (
    <div className="w-full h-full relative bg-[#060907]">
      <Image
        src={SCENE_IMAGES[sceneType]}
        alt=""
        fill
        priority
        quality={100}
        className="object-cover object-bottom"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
