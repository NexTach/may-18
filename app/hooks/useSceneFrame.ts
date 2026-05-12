import { useCallback, useEffect, useState } from "react";

const SCENE_ASPECT_RATIO = 16 / 9;
const CROP_HEIGHT_THRESHOLD = 260;

function getContainedFrame(width: number, height: number) {
  if (width <= 0 || height <= 0) return { width: 0, height: 0 };
  const frameWidth = Math.min(width, height * SCENE_ASPECT_RATIO);
  return { width: frameWidth, height: frameWidth / SCENE_ASPECT_RATIO };
}

export function useSceneFrame() {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [sceneFrame, setSceneFrame] = useState({
    width: 0,
    height: 0,
    isCrop: false,
  });

  const slotRef = useCallback((n: HTMLDivElement | null) => {
    setNode(n);
  }, []);

  useEffect(() => {
    if (!node) return;

    const update = () => {
      const { width, height } = node.getBoundingClientRect();
      const isCrop = height > 0 && height < CROP_HEIGHT_THRESHOLD;
      const next = getContainedFrame(width, height);
      setSceneFrame((prev) => {
        if (
          Math.abs(prev.width - next.width) < 1 &&
          Math.abs(prev.height - next.height) < 1 &&
          prev.isCrop === isCrop
        )
          return prev;
        return { ...next, isCrop };
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(node);
    update();
    return () => observer.disconnect();
  }, [node]);

  return { slotRef, sceneFrame };
}
