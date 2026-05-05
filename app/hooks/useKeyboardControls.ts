import { useEffect } from "react";
import type { Choice, Stats } from "../types";

type Opts = {
  historyOpen: boolean;
  mapOpen: boolean;
  inventoryOpen: boolean;
  menuOpen: boolean;
  choices: Choice[] | undefined;
  stats: Stats;
  isChoiceDisabled: (choice: Choice) => boolean;
  onChoice: (choice: Choice) => void;
  onToggleHistory: () => void;
  onToggleMap: () => void;
  onToggleInventory: () => void;
  onToggleMenu: () => void;
  onCloseHistory: () => void;
  onCloseMap: () => void;
  onCloseInventory: () => void;
};

export function useKeyboardControls({
  historyOpen,
  mapOpen,
  inventoryOpen,
  menuOpen,
  choices,
  isChoiceDisabled,
  onChoice,
  onToggleHistory,
  onToggleMap,
  onToggleInventory,
  onToggleMenu,
  onCloseHistory,
  onCloseMap,
  onCloseInventory,
}: Opts) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (historyOpen) { onCloseHistory(); return; }
        if (mapOpen) { onCloseMap(); return; }
        if (inventoryOpen) { onCloseInventory(); return; }
        onToggleMenu();
        return;
      }
      if (e.key === "x" || e.key === "X") { onToggleHistory(); return; }
      if (e.key === "m" || e.key === "M") { onToggleMap(); return; }
      if (e.key === "Tab") { e.preventDefault(); onToggleInventory(); return; }

      if (!historyOpen && !mapOpen && !inventoryOpen && !menuOpen && choices) {
        const tryChoice = (c?: Choice) => {
          if (c && !isChoiceDisabled(c)) onChoice(c);
        };
        if (e.key === "1") tryChoice(choices[0]);
        if (e.key === "2") tryChoice(choices[1]);
        if (e.key === "3") tryChoice(choices[2]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    historyOpen, mapOpen, inventoryOpen, menuOpen, choices,
    isChoiceDisabled, onChoice,
    onToggleHistory, onToggleMap, onToggleInventory, onToggleMenu,
    onCloseHistory, onCloseMap, onCloseInventory,
  ]);
}
