"use client";

import { useEffect, useState } from "react";

export function useIsFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const update = () => setIsFullscreen(!!document.fullscreenElement);
    update();
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  return isFullscreen;
}
