"use client";

import { useState } from "react";
import GameScreen from "./components/GameScreen";
import MainMenu from "./components/MainMenu";

type Screen = "menu" | "game";

export default function GameApp() {
  const [screen, setScreen] = useState<Screen>("menu");

  if (screen === "game") {
    return <GameScreen onBackToMenu={() => setScreen("menu")} />;
  }

  return <MainMenu onStart={() => setScreen("game")} />;
}
