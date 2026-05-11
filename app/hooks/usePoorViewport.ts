"use client";

import { useEffect, useState } from "react";

const POOR_HEIGHT_THRESHOLD = 650;

export function usePoorViewport() {
  const [isPoor, setIsPoor] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ratio = w / h;
      const tooShort = w >= 768 && h < POOR_HEIGHT_THRESHOLD;
      const tooWide = ratio > 2.3 && h < 720;
      const mobileLandscape = w >= 480 && ratio > 1.3 && h < 500;

      setIsPoor(tooShort || tooWide || mobileLandscape);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isPoor;
}
