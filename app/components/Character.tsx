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

const WHITE_THRESHOLD = 220;
const TARGET_FILL_RATIO = 0.88;
const BOTTOM_PADDING_RATIO = 0.04;

// module-level so cache survives React re-renders
const cache = new Map<string, string>();
let loadedImg: HTMLImageElement | null = null;

function getCacheKey(dir: Direction, size: number) {
  return `${dir}:${size}`;
}

function extractSprite(dir: Direction, size: number): string {
  const cacheKey = getCacheKey(dir, size);
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  const img = loadedImg!;
  const [ox, oy] = OFFSETS[dir];
  const half = img.width / 2;

  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = half;
  sourceCanvas.height = half;
  const sourceCtx = sourceCanvas.getContext("2d")!;
  sourceCtx.imageSmoothingEnabled = false;
  sourceCtx.drawImage(
    img,
    ox * img.width,
    oy * img.height,
    half,
    half,
    0,
    0,
    half,
    half,
  );

  const imgData = sourceCtx.getImageData(0, 0, half, half);
  const d = imgData.data;
  let minX = half;
  let minY = half;
  let maxX = -1;
  let maxY = -1;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const x = (i / 4) % half;
    const y = Math.floor(i / 4 / half);

    // Strip the generated white background while preserving sprite edges.
    if (r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD) {
      d[i + 3] = 0;
      continue;
    }

    if (d[i + 3] === 0) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  sourceCtx.putImageData(imgData, 0, 0);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;

  if (maxX < minX || maxY < minY) {
    const emptyUrl = canvas.toDataURL("image/png");
    cache.set(cacheKey, emptyUrl);
    return emptyUrl;
  }

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  const targetHeight = size * TARGET_FILL_RATIO;
  const scale = targetHeight / cropHeight;
  const drawWidth = cropWidth * scale;
  const drawHeight = cropHeight * scale;
  const drawX = (size - drawWidth) / 2;
  const drawY = size - drawHeight - size * BOTTOM_PADDING_RATIO;

  ctx.drawImage(
    sourceCanvas,
    minX,
    minY,
    cropWidth,
    cropHeight,
    drawX,
    drawY,
    drawWidth,
    drawHeight,
  );

  const url = canvas.toDataURL("image/png");
  cache.set(cacheKey, url);
  return url;
}

async function loadAndProcess(size: number): Promise<void> {
  if (!loadedImg) {
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        loadedImg = img;
        resolve();
      };
      img.onerror = reject;
      img.src = "/sprites/character.png";
    });
  }

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
    () => cache.get(getCacheKey(direction, size)) ?? null,
  );

  useEffect(() => {
    const cacheKey = getCacheKey(direction, size);
    const cached = cache.get(cacheKey);
    if (cached) {
      setUrl(cached);
      return;
    }

    loadAndProcess(size).then(() => setUrl(cache.get(cacheKey) ?? null));
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
