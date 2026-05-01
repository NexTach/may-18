"use client";

import { useEffect, useState } from "react";

export type Direction = "down" | "up" | "right" | "left";

// top-left: front(down), top-right: right, bottom-left: back(up), bottom-right: left
const OFFSETS: Record<Direction, [number, number]> = {
  down: [0, 0],
  right: [0.5, 0],
  up: [0, 0.5],
  left: [0.5, 0.5],
};

// module-level so cache survives React re-renders
const cache = new Map<Direction, string>();
let loadedImg: HTMLImageElement | null = null;

function extractSprite(dir: Direction, size: number): string {
  if (cache.has(dir)) return cache.get(dir)!;
  const img = loadedImg!;
  const [ox, oy] = OFFSETS[dir];
  const half = img.width / 2;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    img,
    ox * img.width,
    oy * img.height,
    half,
    half,
    0,
    0,
    size,
    size,
  );

  const imgData = ctx.getImageData(0, 0, size, size);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    // make near-white pixels transparent
    if (d[i] > 220 && d[i + 1] > 220 && d[i + 2] > 220) d[i + 3] = 0;
  }
  ctx.putImageData(imgData, 0, 0);

  const url = canvas.toDataURL("image/png");
  cache.set(dir, url);
  return url;
}

async function loadAndProcess(size: number): Promise<void> {
  if (loadedImg) return;
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      loadedImg = img;
      resolve();
    };
    img.onerror = reject;
    img.src = "/sprites/character.png";
  });
  // pre-process all 4 directions at once
  (Object.keys(OFFSETS) as Direction[]).forEach((d) => extractSprite(d, size));
}

export default function Character({
  direction,
  x,
  y,
  size = 88,
}: {
  direction: Direction;
  x: number; // 0–100 percent
  y: number; // 0–100 percent
  size?: number;
}) {
  const [url, setUrl] = useState<string | null>(
    () => cache.get(direction) ?? null,
  );

  useEffect(() => {
    const cached = cache.get(direction);
    if (cached) {
      setUrl(cached);
      return;
    }
    loadAndProcess(size).then(() => setUrl(cache.get(direction) ?? null));
  }, [direction, size]);

  if (!url) return null;

  return (
    <img
      src={url}
      alt=""
      draggable={false}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        imageRendering: "pixelated",
        transform: "translate(-50%, -100%)",
        zIndex: 10,
        pointerEvents: "none",
        filter:
          "drop-shadow(0 6px 14px rgba(0,0,0,0.95)) drop-shadow(0 2px 4px rgba(0,0,0,0.7))",
      }}
    />
  );
}
