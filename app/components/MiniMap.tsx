"use client";

import { mapNodes } from "../data/scenes";

type Props = {
  currentSceneId: string;
  visitedSceneIds: Set<string>;
  compact?: boolean;
  onJump?: (sceneId: string) => void;
};

type LabelLayout = {
  dx: number;
  dy: number;
};

type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type LabelPlacement = {
  id: string;
  isCurrent: boolean;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nodeX: number;
  nodeY: number;
};

const LABEL_LAYOUTS: Record<string, LabelLayout> = {
  start: { dx: 0, dy: -10 },
  observe_street: { dx: 14, dy: -8 },
  station_rumor: { dx: 0, dy: 14 },
  call_family: { dx: -14, dy: -8 },
  family_neighborhood: { dx: 18, dy: 0 },
  radio_room: { dx: 18, dy: 0 },
  leaflet_room: { dx: 18, dy: 8 },
  side_alley_detour: { dx: -18, dy: -6 },
  university_gate: { dx: 0, dy: -10 },
  talk_students: { dx: 16, dy: -8 },
  record_scene: { dx: -16, dy: -8 },
  downtown: { dx: 0, dy: 16 },
  market_people: { dx: 16, dy: -4 },
  street_clinic: { dx: -16, dy: 0 },
  citizen_voice: { dx: 16, dy: 8 },
  citizen_debate: { dx: 18, dy: -8 },
  help_people: { dx: 0, dy: 16 },
  supply_run: { dx: -16, dy: -8 },
  checkpoint_edge: { dx: 16, dy: 14 },
  outside_message: { dx: -18, dy: -8 },
  community: { dx: 18, dy: -8 },
  night_meeting: { dx: 18, dy: -8 },
  last_night: { dx: 18, dy: 8 },
  archive_ending: { dx: 0, dy: 14 },
  memory_ending: { dx: 16, dy: 0 },
};

const FALLBACK_LABEL_LAYOUTS: LabelLayout[] = [
  { dx: 0, dy: -12 },
  { dx: 0, dy: 16 },
  { dx: -18, dy: -8 },
  { dx: 18, dy: -8 },
  { dx: -18, dy: 16 },
  { dx: 18, dy: 16 },
  { dx: -24, dy: 0 },
  { dx: 24, dy: 0 },
];

function makeRect(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
): Rect {
  return {
    left: centerX - width / 2,
    top: centerY - height / 2,
    right: centerX + width / 2,
    bottom: centerY + height / 2,
  };
}

function intersectsRect(a: Rect, b: Rect, pad = 0) {
  return !(
    a.right + pad < b.left ||
    a.left - pad > b.right ||
    a.bottom + pad < b.top ||
    a.top - pad > b.bottom
  );
}

function getNodeHalf(
  isCurrent: boolean,
  isFrontier: boolean,
  isVisited: boolean,
  r: number,
) {
  if (isCurrent) return r;
  if (isFrontier) return r - 0.3;
  if (isVisited) return r - 1;
  return r - 1.6;
}

function getLabelCandidates(nodeId: string) {
  const preferred = LABEL_LAYOUTS[nodeId];
  const candidates = preferred
    ? [preferred, ...FALLBACK_LABEL_LAYOUTS]
    : FALLBACK_LABEL_LAYOUTS;

  return candidates.filter(
    (layout, index, arr) =>
      arr.findIndex(
        (item) => item.dx === layout.dx && item.dy === layout.dy,
      ) === index,
  );
}

function clipLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r: number,
  gap = 2,
): [number, number, number, number] {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 0.001) return [x1, y1, x2, y2];
  const ux = dx / len;
  const uy = dy / len;
  const t = (r + gap) / Math.max(Math.abs(ux), Math.abs(uy));
  return [x1 + ux * t, y1 + uy * t, x2 - ux * t, y2 - uy * t];
}

function GwangjuMapBackground() {
  const FILL = "#1e3418";
  const BORDER = "#2a4c1c";
  const LABEL = "#3a5a1e";

  return (
    <g>
      <path d="M 1,1 L 352,1 L 352,122 L 1,122 Z"
        fill={FILL} fillOpacity="0.16" stroke="none" />
      <path d="M 1,122 L 120,122 L 120,224 L 1,224 Z"
        fill={FILL} fillOpacity="0.14" stroke="none" />
      <path d="M 120,122 L 352,122 L 352,172 L 120,172 Z"
        fill={FILL} fillOpacity="0.18" stroke="none" />
      <path d="M 120,172 L 352,172 L 352,224 L 120,224 Z"
        fill={FILL} fillOpacity="0.14" stroke="none" />

      <g stroke={BORDER} strokeWidth="0.7" strokeDasharray="3,2" fill="none" opacity="0.38">
        <line x1="1" y1="122" x2="352" y2="122" />
        <line x1="120" y1="122" x2="120" y2="224" />
        <line x1="120" y1="172" x2="352" y2="172" />
      </g>

      <g fontFamily="monospace" textAnchor="middle" fontSize="6" fill={LABEL} opacity="0.5">
        <text x="180" y="42">북구</text>
        <text x="60" y="160">서구</text>
        <text x="315" y="145">동구</text>
        <text x="315" y="190">남구</text>
      </g>
    </g>
  );
}

export default function MiniMap({
  currentSceneId,
  visitedSceneIds,
  compact = false,
  onJump,
}: Props) {
  const pad = 14;
  const labelH = compact ? 0 : 20;
  const allX = mapNodes.map((n) => n.x);
  const allY = mapNodes.map((n) => n.y);
  const minX = Math.min(...allX) - pad;
  const maxX = Math.max(...allX) + pad;
  const minY = Math.min(...allY) - pad;
  const maxY = Math.max(...allY) + pad + labelH;
  const vb = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  const nodeById = Object.fromEntries(mapNodes.map((n) => [n.id, n]));
  const drawnEdges = new Set<string>();
  const r = compact ? 4 : 5;
  const currentNode = nodeById[currentSceneId];
  const frontierNodeIds = new Set(
    mapNodes
      .filter(
        (node) =>
          node.id === currentSceneId ||
          node.connections.includes(currentSceneId) ||
          currentNode?.connections.includes(node.id),
      )
      .map((node) => node.id),
  );
  const nodeRects = mapNodes.map((node) => {
    const isCurrent = node.id === currentSceneId;
    const isVisited = visitedSceneIds.has(node.id);
    const isFrontier = frontierNodeIds.has(node.id) && !isCurrent;
    const half = getNodeHalf(isCurrent, isFrontier, isVisited, r);
    return {
      id: node.id,
      rect: makeRect(node.x, node.y, half * 2 + 3, half * 2 + 3),
    };
  });
  const labelPlacements: LabelPlacement[] = [];

  if (!compact) {
    const labelNodes = mapNodes.filter((node) => {
      const isCurrent = node.id === currentSceneId;
      const isFrontier = frontierNodeIds.has(node.id) && !isCurrent;
      return isCurrent || isFrontier;
    });

    const orderedLabelNodes = [
      ...labelNodes.filter((node) => node.id === currentSceneId),
      ...labelNodes.filter((node) => node.id !== currentSceneId),
    ];

    for (const node of orderedLabelNodes) {
      const isCurrent = node.id === currentSceneId;
      const width = Math.max(44, node.label.length * 7.5 + 16);
      const height = 18;
      const candidates = getLabelCandidates(node.id);

      let chosenRect: Rect | null = null;
      let chosenX = node.x;
      let chosenY = node.y + (isCurrent ? -10 : 14);

      for (const candidate of candidates) {
        const centerX = node.x + candidate.dx;
        const centerY = node.y + candidate.dy;
        const rect = makeRect(centerX, centerY - 1.5, width, height);
        const overlapsNode = nodeRects.some(
          (nodeRect) =>
            nodeRect.id !== node.id && intersectsRect(rect, nodeRect.rect, 2),
        );
        const overlapsLabel = labelPlacements.some((label) =>
          intersectsRect(
            rect,
            makeRect(label.x, label.y - 1.5, label.width, label.height),
            2,
          ),
        );

        if (!overlapsNode && !overlapsLabel) {
          chosenRect = rect;
          chosenX = centerX;
          chosenY = centerY;
          break;
        }
      }

      if (!chosenRect) {
        const fallback = candidates[0] ?? { dx: 0, dy: isCurrent ? -10 : 14 };
        chosenX = node.x + fallback.dx;
        chosenY = node.y + fallback.dy;
      }

      labelPlacements.push({
        id: node.id,
        isCurrent,
        label: node.label,
        x: chosenX,
        y: chosenY,
        width,
        height,
        nodeX: node.x,
        nodeY: node.y,
      });
    }
  }

  return (
    <svg viewBox={vb} className="w-full h-full">
      <title>게임 활동 지도</title>
      {!compact && <GwangjuMapBackground />}

      {mapNodes.flatMap((node) =>
        node.connections.map((toId) => {
          const edgeKey = [node.id, toId].sort().join("--");
          if (drawnEdges.has(edgeKey)) return null;
          drawnEdges.add(edgeKey);
          const to = nodeById[toId];
          if (!to) return null;
          const fromV = visitedSceneIds.has(node.id);
          const toV = visitedSceneIds.has(toId);
          const isTraversed = fromV && toV;
          const isCurrentEdge =
            node.id === currentSceneId || toId === currentSceneId;
          if (!isTraversed && !isCurrentEdge) return null;

          const [lx1, ly1, lx2, ly2] = clipLine(node.x, node.y, to.x, to.y, r);
          return (
            <line
              key={edgeKey}
              x1={lx1}
              y1={ly1}
              x2={lx2}
              y2={ly2}
              stroke={isTraversed ? "#5a8a2a" : "#7d8f3a"}
              strokeWidth={
                isTraversed ? (compact ? 1 : 1.6) : compact ? 1 : 1.2
              }
              strokeDasharray={isTraversed ? "4 2" : "2 3"}
              opacity={isTraversed ? 0.95 : 0.75}
            />
          );
        }),
      )}

      {mapNodes.map((node) => {
        const isCurrent = node.id === currentSceneId;
        const isVisited = visitedSceneIds.has(node.id);
        const isFrontier = frontierNodeIds.has(node.id) && !isCurrent;
        const nodeHalf = getNodeHalf(isCurrent, isFrontier, isVisited, r);
        const fill = isCurrent
          ? "#c4d47a"
          : isFrontier
            ? "#7d8f3a"
            : isVisited
              ? "#4a6a1a"
              : "#16210a";
        const stroke = isCurrent
          ? "#e8f090"
          : isFrontier
            ? "#b8c86a"
            : isVisited
              ? "#6a9a2a"
              : "#233112";
        const content = (
          <g style={onJump ? { cursor: "pointer" } : undefined}>
            {isCurrent && (
              <rect
                x={node.x - r - 2}
                y={node.y - r - 2}
                width={r * 2 + 4}
                height={r * 2 + 4}
                fill="none"
                stroke="#c4d47a"
                strokeWidth="1"
                opacity="0.5"
              />
            )}
            <rect
              x={node.x - nodeHalf}
              y={node.y - nodeHalf}
              width={nodeHalf * 2}
              height={nodeHalf * 2}
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
            />
          </g>
        );

        if (!onJump) {
          return <g key={node.id}>{content}</g>;
        }

        return (
          <a
            key={node.id}
            href={`#${node.id}`}
            onClick={(e) => {
              e.preventDefault();
              onJump(node.id);
            }}
          >
            {content}
          </a>
        );
      })}

      {(() => {
        const cur = nodeById[currentSceneId];
        if (!cur) return null;
        return (
          <polygon
            points={`${cur.x},${cur.y - r - 4} ${cur.x - 3},${cur.y - r - 9} ${cur.x + 3},${cur.y - r - 9}`}
            fill="#c4d47a"
          />
        );
      })()}

      {labelPlacements.map((label) => (
        <g key={`${label.id}-label`}>
          <line
            x1={label.nodeX}
            y1={label.nodeY}
            x2={label.x}
            y2={label.y - 1.5}
            stroke={label.isCurrent ? "#c4d47a" : "#5b7430"}
            strokeWidth="0.8"
            opacity="0.65"
          />
          <rect
            x={label.x - label.width / 2}
            y={label.y - 13}
            width={label.width}
            height={label.height}
            rx="1.5"
            fill="#0b1208"
            stroke={label.isCurrent ? "#c4d47a" : "#4a6a1a"}
            strokeWidth="0.9"
            opacity="0.97"
          />
          <text
            x={label.x}
            y={label.y}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={label.isCurrent ? "#d9e58c" : "#c4d47a"}
            stroke="#0b1208"
            strokeWidth="2"
            paintOrder="stroke fill"
          >
            {label.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
