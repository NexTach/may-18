"use client";

const STARS: [number, number, number][] = [
  [40, 20, 2],
  [80, 40, 1],
  [140, 15, 1],
  [200, 35, 1],
  [260, 22, 2],
  [320, 45, 1],
  [400, 12, 1],
  [460, 38, 1],
  [520, 18, 1],
  [580, 30, 2],
  [640, 8, 1],
  [700, 42, 1],
  [760, 25, 2],
  [30, 60, 1],
  [100, 75, 1],
  [180, 55, 1],
  [280, 68, 1],
  [380, 50, 2],
  [480, 72, 1],
  [560, 48, 1],
  [660, 65, 1],
  [740, 55, 1],
  [60, 100, 1],
  [160, 90, 2],
  [240, 110, 1],
  [360, 85, 1],
  [440, 105, 1],
  [540, 95, 2],
  [620, 115, 1],
  [720, 88, 1],
];

export default function CityscapeBg() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: "pixelated" }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* sky */}
      <rect x="0" y="0" width="800" height="500" fill="#060907" />

      {/* stars */}
      {STARS.map(([x, y, w]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={w}
          fill="#4a6a2a"
        />
      ))}

      {/* moon */}
      <rect x="680" y="40" width="28" height="28" fill="#d4c870" />
      <rect x="676" y="44" width="36" height="20" fill="#d4c870" />
      <rect x="686" y="36" width="16" height="4" fill="#d4c870" />

      {/* left distant buildings */}
      <rect x="0" y="200" width="80" height="300" fill="#0a1206" />
      <rect x="0" y="180" width="40" height="20" fill="#0a1206" />
      <rect x="20" y="170" width="20" height="10" fill="#0a1206" />
      {(
        [
          [5, 210, true],
          [20, 210, false],
          [35, 210, true],
          [55, 210, false],
          [5, 240, false],
          [20, 240, true],
          [35, 240, false],
          [55, 240, true],
          [5, 270, true],
          [20, 270, false],
          [35, 270, true],
          [55, 270, false],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`bld-l-${x}-${y}`}
          x={x}
          y={y}
          width="10"
          height="8"
          fill={lit ? "#c8a020" : "#1a2a0c"}
        />
      ))}

      {/* left-center buildings */}
      <rect x="82" y="240" width="65" height="260" fill="#0d1608" />
      <rect x="100" y="220" width="30" height="20" fill="#0d1608" />
      {(
        [
          [88, 250, false],
          [105, 250, true],
          [120, 250, false],
          [88, 270, true],
          [105, 270, false],
          [120, 270, true],
          [88, 290, true],
          [105, 290, true],
          [120, 290, false],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`bld-lc-${x}-${y}`}
          x={x}
          y={y}
          width="12"
          height="10"
          fill={lit ? "#c8a020" : "#1a2a0c"}
        />
      ))}

      {/* tall center-left tower */}
      <rect x="155" y="120" width="50" height="380" fill="#0b1406" />
      <rect x="158" y="100" width="44" height="22" fill="#0b1406" />
      <rect x="170" y="88" width="20" height="14" fill="#0b1406" />
      <rect x="178" y="78" width="4" height="12" fill="#1a2a0c" />
      {(
        [
          [160, 130, true],
          [180, 130, false],
          [160, 155, false],
          [180, 155, true],
          [160, 180, true],
          [180, 180, true],
          [160, 205, false],
          [180, 205, false],
          [160, 230, true],
          [180, 230, true],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`twr-${x}-${y}`}
          x={x}
          y={y}
          width="16"
          height="14"
          fill={lit ? "#c8a020" : "#0f1c08"}
        />
      ))}

      {/* center building */}
      <rect x="215" y="160" width="70" height="340" fill="#0d1a08" />
      <rect x="220" y="140" width="60" height="22" fill="#0d1a08" />
      {(
        [
          [220, 170, true],
          [240, 170, false],
          [260, 170, true],
          [220, 198, false],
          [240, 198, true],
          [260, 198, false],
          [220, 226, true],
          [240, 226, true],
          [260, 226, false],
          [220, 254, false],
          [240, 254, true],
          [260, 254, true],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`ctr-${x}-${y}`}
          x={x}
          y={y}
          width="16"
          height="14"
          fill={lit ? "#d4a820" : "#0f1c08"}
        />
      ))}

      {/* center-right tall building */}
      <rect x="295" y="100" width="55" height="400" fill="#0a1206" />
      <rect x="300" y="82" width="45" height="20" fill="#0a1206" />
      <rect x="312" y="70" width="22" height="14" fill="#0a1206" />
      {(
        [
          [300, 110, false],
          [320, 110, true],
          [300, 138, true],
          [320, 138, false],
          [300, 166, false],
          [320, 166, true],
          [300, 194, true],
          [320, 194, true],
          [300, 222, false],
          [320, 222, false],
          [300, 250, true],
          [320, 250, true],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`cr-${x}-${y}`}
          x={x}
          y={y}
          width="18"
          height="16"
          fill={lit ? "#c8a020" : "#0c1606"}
        />
      ))}

      {/* right-center buildings */}
      <rect x="360" y="200" width="60" height="300" fill="#0d1608" />
      {(
        [
          [365, 210, true],
          [385, 210, false],
          [365, 235, false],
          [385, 235, true],
          [365, 260, true],
          [385, 260, true],
          [365, 285, false],
          [385, 285, false],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`rc-${x}-${y}`}
          x={x}
          y={y}
          width="14"
          height="12"
          fill={lit ? "#c8a020" : "#0f1c08"}
        />
      ))}

      <rect x="428" y="170" width="75" height="330" fill="#0b1406" />
      {(
        [
          [433, 180, false],
          [453, 180, true],
          [473, 180, false],
          [433, 210, true],
          [453, 210, false],
          [473, 210, true],
          [433, 240, false],
          [453, 240, true],
          [473, 240, true],
          [433, 270, true],
          [453, 270, false],
          [473, 270, false],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`rc2-${x}-${y}`}
          x={x}
          y={y}
          width="16"
          height="14"
          fill={lit ? "#d4a820" : "#0e1a06"}
        />
      ))}

      {/* right distant buildings */}
      <rect x="510" y="220" width="55" height="280" fill="#0a1206" />
      {(
        [
          [515, 230, true],
          [535, 230, false],
          [515, 258, false],
          [535, 258, true],
          [515, 286, true],
          [535, 286, false],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`rd-${x}-${y}`}
          x={x}
          y={y}
          width="14"
          height="12"
          fill={lit ? "#c8a020" : "#0d1806"}
        />
      ))}

      <rect x="572" y="180" width="45" height="320" fill="#0d1608" />
      {(
        [
          [577, 190, true],
          [597, 190, false],
          [577, 218, false],
          [597, 218, true],
          [577, 246, true],
          [597, 246, true],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`rd2-${x}-${y}`}
          x={x}
          y={y}
          width="14"
          height="16"
          fill={lit ? "#c8a020" : "#0f1c08"}
        />
      ))}

      {/* far right */}
      <rect x="625" y="210" width="80" height="290" fill="#0a1206" />
      <rect x="650" y="190" width="30" height="22" fill="#0a1206" />
      {(
        [
          [630, 220, false],
          [655, 220, true],
          [685, 220, false],
          [630, 250, true],
          [655, 250, false],
          [685, 250, true],
          [630, 280, false],
          [655, 280, true],
          [685, 280, false],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`fr-${x}-${y}`}
          x={x}
          y={y}
          width="14"
          height="12"
          fill={lit ? "#c8a020" : "#1a2a0c"}
        />
      ))}

      <rect x="715" y="230" width="85" height="270" fill="#0d1608" />
      {(
        [
          [720, 240, true],
          [745, 240, false],
          [770, 240, true],
          [720, 268, false],
          [745, 268, true],
          [770, 268, false],
          [720, 296, true],
          [745, 296, true],
          [770, 296, false],
        ] as [number, number, boolean][]
      ).map(([x, y, lit]) => (
        <rect
          key={`fr2-${x}-${y}`}
          x={x}
          y={y}
          width="16"
          height="14"
          fill={lit ? "#c8a020" : "#0f1c08"}
        />
      ))}

      {/* street lamps */}
      {([60, 180, 340, 490, 630, 760] as number[]).map((x) => (
        <g key={`lamp-${x}`}>
          <rect x={x} y="330" width="4" height="170" fill="#1a2a0c" />
          <rect x={x - 10} y="322" width="24" height="10" fill="#2a3a18" />
          <rect x={x - 14} y="316" width="32" height="8" fill="#7a8a30" />
        </g>
      ))}

      {/* ground / street */}
      <rect x="0" y="420" width="800" height="80" fill="#0a1006" />
      <rect x="0" y="418" width="800" height="4" fill="#141e0a" />

      {/* trees */}
      {([30, 100, 260, 420, 550, 680, 760] as number[]).map((x) => (
        <g key={`tree-${x}`}>
          <rect x={x + 4} y="340" width="8" height="82" fill="#0c1606" />
          <rect x={x} y="300" width="16" height="46" fill="#0f1e08" />
          <rect x={x + 3} y="280" width="10" height="26" fill="#142008" />
          <rect x={x + 5} y="266" width="6" height="18" fill="#162408" />
        </g>
      ))}
    </svg>
  );
}
