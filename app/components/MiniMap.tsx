"use client";

import { mapNodes } from "../data/scenes";

type Props = {
  currentSceneId: string;
  visitedSceneIds: Set<string>;
  compact?: boolean;
};

export default function MiniMap({
  currentSceneId,
  visitedSceneIds,
  compact = false,
}: Props) {
  const minX = Math.min(...mapNodes.map((n) => n.x)) - 10;
  const maxX = Math.max(...mapNodes.map((n) => n.x)) + 30;
  const minY = Math.min(...mapNodes.map((n) => n.y)) - 10;
  const maxY = Math.max(...mapNodes.map((n) => n.y)) + 20;
  const vb = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  const nodeById = Object.fromEntries(mapNodes.map((n) => [n.id, n]));

  const drawnEdges = new Set<string>();

  return (
    <svg
      viewBox={vb}
      className="w-full h-full"
      style={{ imageRendering: "pixelated" }}
    >
      {/* connection lines */}
      {mapNodes.map((node) =>
        node.connections.map((toId) => {
          const edgeKey = [node.id, toId].sort().join("--");
          if (drawnEdges.has(edgeKey)) return null;
          drawnEdges.add(edgeKey);
          const to = nodeById[toId];
          if (!to) return null;
          const bothVisited =
            visitedSceneIds.has(node.id) && visitedSceneIds.has(toId);
          return (
            <line
              key={edgeKey}
              x1={node.x}
              y1={node.y}
              x2={to.x}
              y2={to.y}
              stroke={bothVisited ? "#4a6a1a" : "#1e2e0e"}
              strokeWidth={compact ? 1 : 1.5}
              strokeDasharray="3 2"
            />
          );
        }),
      )}

      {/* nodes */}
      {mapNodes.map((node) => {
        const isCurrent = node.id === currentSceneId;
        const isVisited = visitedSceneIds.has(node.id);
        const r = compact ? 4 : 5;
        const fill = isCurrent ? "#c4d47a" : isVisited ? "#4a6a1a" : "#1a2a0c";
        const stroke = isCurrent
          ? "#e8f090"
          : isVisited
            ? "#6a9a2a"
            : "#2c3f12";
        const textColor = isCurrent
          ? "#c4d47a"
          : isVisited
            ? "#6a9a2a"
            : "#2a3a12";
        return (
          <g key={node.id}>
            <rect
              x={node.x - r}
              y={node.y - r}
              width={r * 2}
              height={r * 2}
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
            />
            {isCurrent && (
              <rect
                x={node.x - r - 2}
                y={node.y - r - 2}
                width={r * 2 + 4}
                height={r * 2 + 4}
                fill="none"
                stroke="#c4d47a"
                strokeWidth="1"
                opacity="0.6"
              />
            )}
            {!compact && (
              <text
                x={node.x}
                y={node.y + r + 8}
                textAnchor="middle"
                fontSize="5"
                fill={textColor}
                fontFamily="monospace"
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}

      {/* current location arrow */}
      {(() => {
        const cur = nodeById[currentSceneId];
        if (!cur) return null;
        const r = compact ? 4 : 5;
        return (
          <polygon
            points={`${cur.x},${cur.y - r - 5} ${cur.x - 3},${cur.y - r - 10} ${cur.x + 3},${cur.y - r - 10}`}
            fill="#c4d47a"
          />
        );
      })()}
    </svg>
  );
}
