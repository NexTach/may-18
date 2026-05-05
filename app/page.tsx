"use client";

import GameApp from "./components/GameApp";
import { GameProvider } from "./context/GameContext";

export default function Page() {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
}
