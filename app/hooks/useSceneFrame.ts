import { useEffect, useRef, useState } from "react";

const SCENE_ASPECT_RATIO = 16 / 9;
// 슬롯 높이가 이 값 미만이면 16:9 비율 포기하고 크롭으로 채움
const CROP_HEIGHT_THRESHOLD = 400;

function getContainedFrame(width: number, height: number) {
  if (width <= 0 || height <= 0) return { width: 0, height: 0 };
  const frameWidth = Math.min(width, height * SCENE_ASPECT_RATIO);
  return { width: frameWidth, height: frameWidth / SCENE_ASPECT_RATIO };
}

export function useSceneFrame() {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [sceneFrame, setSceneFrame] = useState({ width: 0, height: 0, isCrop: false });

  useEffect(() => {
    const node = slotRef.current;
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
  }, []);

  return { slotRef, sceneFrame };
}
