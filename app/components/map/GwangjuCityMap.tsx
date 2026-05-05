"use client";

import { mapNodes } from "../../data/scenes";
import type { SceneId } from "../../types";
import { GAME_NODE_SVG, MAP_COLORS } from "./map-constants";

type Props = {
  visitedSceneIds: Set<SceneId>;
  currentSceneId: SceneId;
};

export default function GwangjuCityMap({ visitedSceneIds, currentSceneId }: Props) {
  const gxs = Object.values(GAME_NODE_SVG).map(([x]) => x);
  const gys = Object.values(GAME_NODE_SVG).map(([, y]) => y);
  const gx1 = Math.min(...gxs) - 6, gy1 = Math.min(...gys) - 6;
  const gx2 = Math.max(...gxs) + 6, gy2 = Math.max(...gys) + 6;

  const { pinVisited, pinUnvisit, pinFrontier, stkVisited, stkUnvisit, stkFrontier } = MAP_COLORS;
  const currentNode = mapNodes.find((node) => node.id === currentSceneId);
  const frontierNodeIds = new Set(
    mapNodes
      .filter(
        (node) =>
          node.id !== currentSceneId &&
          (node.connections.includes(currentSceneId) ||
            currentNode?.connections.includes(node.id)),
      )
      .map((node) => node.id),
  );

  return (
    <svg viewBox="0 0 500 346" className="h-full w-full">
      <title>광주 전도 위의 게임 위치</title>

      <path
        d="M 20.0,186.4 L 30.5,190.3 L 28.8,226.4 L 32.8,233.5 L 49.1,238.1
           L 47.5,247.5 L 67.4,244.0 L 68.4,237.5 L 82.1,244.1 L 91.8,236.4
           L 118.9,244.1 L 126.7,236.8 L 146.0,252.5 L 151.7,266.7 L 162.3,269.5
           L 173.9,299.7 L 183.3,297.6 L 211.4,267.9 L 209.5,254.5 L 216.3,251.2
           L 212.0,237.4 L 230.0,230.0 L 235.8,216.0 L 231.7,207.2 L 244.5,195.0
           L 239.2,157.9 L 254.1,150.6 L 258.9,134.2 L 269.8,137.4 L 282.1,128.5
           L 280.3,115.6 L 271.8,109.8 L 278.0,81.4 L 239.5,59.9 L 237.8,69.1
           L 215.2,80.2 L 214.0,75.7 L 203.1,78.0 L 172.6,58.6 L 154.3,56.0
           L 153.9,45.3 L 164.6,28.4 L 161.2,20.1 L 137.9,32.0 L 132.4,28.9
           L 111.4,67.7 L 108.6,89.0 L 90.3,96.1 L 71.5,84.7 L 60.0,103.4
           L 59.0,120.7 L 50.8,115.6 L 30.4,118.5 L 53.3,148.2 L 32.0,159.3
           L 30.7,177.3 Z"
        fill="#1e3818" fillOpacity="0.55" stroke="#2e5020" strokeWidth="0.8"
      />
      <path
        d="M 251.1,64.0 L 254.9,71.7 L 263.0,68.9 L 278.0,81.4 L 271.8,109.8
           L 280.3,115.6 L 282.1,128.5 L 255.8,139.2 L 310.3,151.6 L 316.0,164.2
           L 338.9,179.2 L 350.1,158.5 L 367.5,166.2 L 377.4,163.9 L 397.3,178.1
           L 395.3,192.8 L 431.4,200.9 L 442.8,221.8 L 464.6,219.4 L 463.9,161.1
           L 477.1,155.9 L 477.7,147.2 L 451.7,123.8 L 430.8,130.2 L 420.6,126.9
           L 413.7,135.7 L 400.7,118.4 L 410.1,102.0 L 394.7,90.1 L 390.7,68.0
           L 369.3,46.8 L 365.8,29.7 L 348.1,20.1 L 334.5,21.5 L 316.9,38.5
           L 304.9,36.1 L 305.4,30.9 L 298.3,33.3 Z"
        fill="#243c14" fillOpacity="0.55" stroke="#2e5020" strokeWidth="0.8"
      />
      <path
        d="M 209.4,259.5 L 211.8,265.1 L 216.5,259.2 L 222.1,268.9 L 233.0,268.9
           L 255.0,252.2 L 294.4,240.4 L 297.8,225.9 L 315.2,230.3 L 312.5,186.5
           L 327.2,177.6 L 341.9,182.4 L 316.0,164.2 L 310.3,151.6 L 255.8,139.2
           L 254.1,150.6 L 239.2,157.9 L 244.5,195.0 L 231.7,207.2 L 235.8,216.0
           L 230.0,230.0 L 212.0,237.4 L 216.3,251.2 Z"
        fill="#1a3010" fillOpacity="0.55" stroke="#2e5020" strokeWidth="0.8"
      />
      <path
        d="M 338.9,179.2 L 366.3,216.4 L 344.7,233.1 L 355.9,260.0 L 353.8,269.0
           L 369.2,293.2 L 392.7,295.4 L 406.7,274.4 L 437.2,263.8 L 435.2,247.0
           L 451.3,236.1 L 456.9,224.2 L 442.8,221.8 L 431.4,200.9 L 395.3,192.8
           L 397.3,178.1 L 377.4,163.9 L 367.5,166.2 L 350.1,158.5 Z"
        fill="#28401a" fillOpacity="0.55" stroke="#2e5020" strokeWidth="0.8"
      />
      <path
        d="M 151.7,307.0 L 156.1,317.3 L 167.8,309.0 L 175.2,325.4 L 202.9,312.9
           L 215.1,325.8 L 231.4,325.7 L 236.3,314.3 L 262.0,306.8 L 276.3,288.1
           L 293.5,292.7 L 312.5,282.6 L 320.1,287.3 L 337.3,282.1 L 355.9,260.0
           L 344.7,233.1 L 366.3,216.4 L 341.9,182.4 L 325.9,178.1 L 312.5,186.5
           L 315.2,230.3 L 297.8,225.9 L 294.4,240.4 L 255.0,252.2 L 233.0,268.9
           L 222.1,268.9 L 216.5,259.2 L 191.2,293.4 Z"
        fill="#1c3410" fillOpacity="0.55" stroke="#2e5020" strokeWidth="0.8"
      />

      <path
        d="M 104.2,80.6 Q 118,93 133.4,107.3 Q 150,120 150.4,129.5
           Q 158,142 169.8,154.7 Q 180,168 184.4,181.4
           Q 189,197 190.5,211.0 Q 191,225 190.5,240
           Q 190,252 185.5,260.0"
        fill="none" stroke="#0e2230" strokeWidth="3.5" strokeLinecap="round" opacity="0.8"
      />
      <path
        d="M 26.4,270.3 Q 56,274 87.2,277.7 Q 118,285 147.9,292.5
           Q 178,292 208.7,292.5 Q 221,288 233.0,282.2
           Q 245,275 257.3,265.9"
        fill="none" stroke="#0e2230" strokeWidth="3" strokeLinecap="round" opacity="0.7"
      />

      <line x1="341" y1="120" x2="341" y2="270" stroke="#1e3010" strokeWidth="1" opacity="0.5" />
      <line x1="288" y1="184" x2="400" y2="184" stroke="#1e3010" strokeWidth="1" opacity="0.5" />
      <line x1="200" y1="165" x2="345" y2="165" stroke="#1a2c0c" strokeWidth="0.8" opacity="0.35" />

      <g fontFamily="monospace" textAnchor="middle" fill="#5a8a30" opacity="0.9"
         stroke="#060a04" strokeWidth="2" paintOrder="stroke fill">
        <text x="138" y="172" fontSize="15">광산구</text>
        <text x="370" y="80" fontSize="15">북구</text>
        <text x="280" y="210" fontSize="15">서구</text>
        <text x="415" y="230" fontSize="15">동구</text>
        <text x="295" y="300" fontSize="15">남구</text>
      </g>

      <rect x={gx1} y={gy1} width={gx2 - gx1} height={gy2 - gy1}
        fill="none" stroke="#4a6a1a" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.5" />
      <text x={gx1 + 2} y={gy1 - 2} fontSize="5" fontFamily="monospace"
        fill="#4a6a1a" opacity="0.65">게임 무대</text>

      {mapNodes.map((node) => {
        const pos = GAME_NODE_SVG[node.id];
        if (!pos || node.id === currentSceneId) return null;
        const [px, py] = pos;
        const isVisited = visitedSceneIds.has(node.id);
        const isFrontier = frontierNodeIds.has(node.id);
        const pinFill = isFrontier ? pinFrontier : isVisited ? pinVisited : pinUnvisit;
        const pinStroke = isFrontier ? stkFrontier : isVisited ? stkVisited : stkUnvisit;
        const r = isFrontier ? 2.8 : isVisited ? 2.2 : 1.5;
        return (
          <g key={node.id}>
            <circle cx={px} cy={py} r={r} fill={pinFill} stroke={pinStroke} strokeWidth="0.6" />
            {isFrontier && (
              <text x={px} y={py + r + 9} textAnchor="middle" fontSize="8.5" fontFamily="monospace"
                fill={stkFrontier} stroke="#060a04" strokeWidth="1.8" paintOrder="stroke fill">
                {node.label}
              </text>
            )}
          </g>
        );
      })}

      {(() => {
        const pos = GAME_NODE_SVG[currentSceneId];
        const node = mapNodes.find((n) => n.id === currentSceneId);
        if (!pos || !node) return null;
        const [px, py] = pos;
        const LW = 42, LH = 15;
        return (
          <g>
            <circle cx={px} cy={py} r={13} fill="none" stroke="#c4d47a" strokeWidth="1.2">
              <animate attributeName="r" values="11;18;11" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={px} cy={py} r={10} fill="none" stroke="#c4d47a" strokeWidth="1" opacity="0.35" />
            <circle cx={px} cy={py} r={6.5} fill="#c4d47a" stroke="#e8f090" strokeWidth="1.2" />
            <polygon points={`${px},${py - 19} ${px - 4},${py - 27} ${px + 4},${py - 27}`} fill="#c4d47a" />
            <line x1={px} y1={py - 8} x2={px} y2={py - 19} stroke="#c4d47a" strokeWidth="1.5" />
            <rect x={px - LW} y={py + 9} width={LW * 2} height={LH} rx="1.5"
              fill="#0b1208" stroke="#4a6a1a" strokeWidth="0.8" />
            <text x={px} y={py + 9 + LH - 3} textAnchor="middle" fontSize="10"
              fontFamily="monospace" fill="#c4d47a" stroke="#060a04" strokeWidth="1.8"
              paintOrder="stroke fill">
              {node.label}
            </text>
          </g>
        );
      })()}

      <g opacity="0.4">
        <rect x="217" y="192" width="9" height="7" fill="none" stroke="#3a6020" strokeWidth="0.7" />
        <text x="221.5" y="206" fontSize="4" fontFamily="monospace" fill="#3a6020" textAnchor="middle">
          공항
        </text>
      </g>
    </svg>
  );
}
