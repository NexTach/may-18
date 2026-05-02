"use client";

import { mapNodes } from "../data/scenes";

type Props = {
  currentSceneId: string;
  visitedSceneIds: Set<string>;
  compact?: boolean;
  onJump?: (sceneId: string) => void;
};

// 노드 사각형 경계까지 선을 클리핑
function clipLine(
  x1: number, y1: number,
  x2: number, y2: number,
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

// ─── 광주시 구 경계 배경 ───────────────────────────────────────────────────────
// 좌표계: 서(x↑) → 동, 북(y↓) → 남 (SVG 기본 방향)
// 노드 좌표 기준으로 실제 행정구역 근사 배치
//   북구: 광주역·전남대 일대 (북서)
//   동구: 금남로·전남도청 일대 (동쪽 중심)
//   서구: 집·공중전화 일대 (서남)
//   남구: 외곽 일대 (남동)
//   광산구: 지도 서쪽 가장자리
function GwangjuMapBackground() {
  const FILL   = "#2c4a18";
  const BORDER = "#3a6020";
  const OUTER  = "#4a7228";
  const LABEL  = "#507228";

  return (
    <g>
      {/* ── 구 면 (아주 연하게) ─────────────────────────────────── */}
      {/* 광산구 — 서쪽 끝 띠 */}
      <path
        d="M 0,38 L 0,118 L 20,118 L 20,70 L 10,52 Z"
        fill={FILL} fillOpacity="0.18" stroke="none"
      />
      {/* 북구 — 북서부 (광주역·전남대) */}
      <path
        d="M 10,52 L 20,70 L 20,76 L 108,76 L 108,-8 L 50,-8 Z"
        fill={FILL} fillOpacity="0.18" stroke="none"
      />
      {/* 동구 — 동쪽 중심 (금남로·도청) */}
      <path
        d="M 108,-8 L 108,76 L 165,76 L 215,62 L 238,46 L 238,-8 Z"
        fill={FILL} fillOpacity="0.18" stroke="none"
      />
      {/* 서구 — 서남부 (집·공중전화) */}
      <path
        d="M 20,70 L 20,118 L 108,118 L 108,76 L 20,76 Z"
        fill={FILL} fillOpacity="0.18" stroke="none"
      />
      {/* 남구 — 남동부 (외곽·기록관) */}
      <path
        d="M 108,76 L 108,118 L 238,118 L 238,46 L 215,62 L 165,76 Z"
        fill={FILL} fillOpacity="0.18" stroke="none"
      />

      {/* ── 구 경계선 (점선) ────────────────────────────────────── */}
      <g
        stroke={BORDER} strokeWidth="0.7"
        strokeDasharray="3,2" fill="none" opacity="0.4"
      >
        {/* 북구/동구 경계 (N-S) */}
        <line x1="108" y1="-8" x2="108" y2="76" />
        {/* 북구-서구 / 동구-남구 경계 (E-W) */}
        <polyline points="20,76 108,76 165,76 215,62 238,46" />
        {/* 광산구 경계 */}
        <polyline points="0,38 10,52 20,70 20,76" />
      </g>

      {/* ── 시 외곽 경계 ─────────────────────────────────────────── */}
      <path
        d="M 8,36 L 0,54 L 0,110 L 20,118 L 70,120
           L 132,118 L 182,112 L 222,96 L 238,66
           L 238,4 L 208,-2 L 145,-8 L 78,-8 L 36,5 Z"
        fill="none" stroke={OUTER} strokeWidth="1.1" opacity="0.38"
      />

      {/* ── 구 이름 라벨 ─────────────────────────────────────────── */}
      <g fontFamily="monospace" textAnchor="middle"
         fontSize="6" fill={LABEL} opacity="0.55">
        <text x="58"  y="28" >북구</text>
        <text x="188" y="15" >동구</text>
        <text x="58"  y="108">서구</text>
        <text x="182" y="108">남구</text>
        {/* 광산구는 좁은 띠 — 세로 텍스트 */}
        <text x="8" y="88" fontSize="5"
              transform="rotate(-90 8 88)">광산구</text>
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
  const pad    = 14;
  const labelH = compact ? 0 : 10;
  const allX   = mapNodes.map((n) => n.x);
  const allY   = mapNodes.map((n) => n.y);
  const minX   = Math.min(...allX) - pad;
  const maxX   = Math.max(...allX) + pad;
  const minY   = Math.min(...allY) - pad;
  const maxY   = Math.max(...allY) + pad + labelH;
  const vb     = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  const nodeById   = Object.fromEntries(mapNodes.map((n) => [n.id, n]));
  const drawnEdges = new Set<string>();
  const r          = compact ? 4 : 5;

  return (
    <svg viewBox={vb} className="w-full h-full">

      {/* 1. 지도 배경 (가장 아래 레이어) */}
      {!compact && <GwangjuMapBackground />}

      {/* 2. 간선 */}
      {mapNodes.flatMap((node) =>
        node.connections.map((toId) => {
          const edgeKey = [node.id, toId].sort().join("--");
          if (drawnEdges.has(edgeKey)) return null;
          drawnEdges.add(edgeKey);
          const to = nodeById[toId];
          if (!to) return null;
          const fromV = visitedSceneIds.has(node.id);
          const toV   = visitedSceneIds.has(toId);
          const [lx1, ly1, lx2, ly2] = clipLine(node.x, node.y, to.x, to.y, r);
          return (
            <line
              key={edgeKey}
              x1={lx1} y1={ly1} x2={lx2} y2={ly2}
              stroke={fromV && toV ? "#5a8a2a" : fromV || toV ? "#2e4a14" : "#1a2a0a"}
              strokeWidth={compact ? 1 : 1.5}
              strokeDasharray="3 2"
            />
          );
        }),
      )}

      {/* 3. 노드 */}
      {mapNodes.map((node) => {
        const isCurrent = node.id === currentSceneId;
        const isVisited = visitedSceneIds.has(node.id);
        const fill   = isCurrent ? "#c4d47a" : isVisited ? "#4a6a1a" : "#1a2a0c";
        const stroke = isCurrent ? "#e8f090" : isVisited ? "#6a9a2a" : "#2c3f12";
        const textFill = isCurrent ? "#c4d47a" : isVisited ? "#7ab030" : "#3a4a18";
        return (
          <g
            key={node.id}
            onClick={() => onJump?.(node.id)}
            style={onJump ? { cursor: "pointer" } : undefined}
          >
            {isCurrent && (
              <rect
                x={node.x - r - 2} y={node.y - r - 2}
                width={r * 2 + 4} height={r * 2 + 4}
                fill="none" stroke="#c4d47a" strokeWidth="1" opacity="0.5"
              />
            )}
            <rect
              x={node.x - r} y={node.y - r}
              width={r * 2} height={r * 2}
              fill={fill} stroke={stroke} strokeWidth="1"
            />
            {!compact && (
              <text
                x={node.x} y={node.y + r + 7}
                textAnchor="middle"
                fontSize="5"
                fontFamily="monospace"
                fill={textFill}
                stroke="#060a04"
                strokeWidth="2"
                paintOrder="stroke fill"
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}

      {/* 4. 현재 위치 화살표 */}
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
    </svg>
  );
}
