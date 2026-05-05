import { useEffect, useRef, useState } from "react";

const SCENE_ASPECT_RATIO = 16 / 9;

function getContainedFrame(width: number, height: number) {
  if (width <= 0 || height <= 0) return { width: 0, height: 0 };
  const frameWidth = Math.min(width, height * SCENE_ASPECT_RATIO);
  return { width: frameWidth, height: frameWidth / SCENE_ASPECT_RATIO };
}

export function useSceneFrame() {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [sceneFrame, setSceneFrame] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = slotRef.current;
    if (!node) return;

    const update = () => {
      const { width, height } = node.getBoundingClientRect();
      const next = getContainedFrame(width, height);
      setSceneFrame((prev) => {
        if (Math.abs(prev.width - next.width) < 1 && Math.abs(prev.height - next.height) < 1)
          return prev;
        return next;
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(node);
    update();
    return () => observer.disconnect();
  }, []);

  return { slotRef, sceneFrame };
}
