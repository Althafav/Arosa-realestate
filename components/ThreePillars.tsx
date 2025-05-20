import { Pillar, PILLARS } from "@/data/pillar";
import { useState } from "react";

const WIDTH = 400;
const HEIGHT = (Math.sqrt(3) / 2) * WIDTH;
const CX = WIDTH / 2;
const CY = (0 + HEIGHT + HEIGHT) / 3; // triangle centroid

// midpoint of top & bottom-right
const midTR = { x: (CX + WIDTH) / 2, y: (0 + HEIGHT) / 2 };
// halfway between centroid & that midpoint
const labelR = {
  x: (midTR.x + CX) / 1.9,
  y: (midTR.y + CY) / 2,
};

export default function ThreePillars() {
  const [active, setActive] = useState<Pillar>(PILLARS[0]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width={WIDTH}
        height={HEIGHT}
        className="cursor-pointer"
      >
        {/* background */}
        <polygon
          points={`${CX},0 0,${HEIGHT} ${WIDTH},${HEIGHT}`}
          fill="#0a0e2e"
        />

        {/* left slice */}
        <path
          d={`
            M ${CX},0
            L 0,${HEIGHT}
            L ${CX},${CY}
            Z
          `}
          fill={active.key === "dialogue" ? "#005eff" : "#1a2475"}
          onClick={() => setActive(PILLARS[0])}
        />

        {/* right slice */}
        <path
          d={`
            M ${CX},0
            L ${WIDTH},${HEIGHT}
            L ${CX},${CY}
            Z
          `}
          fill={active.key === "communities" ? "#005eff" : "#1a2475"}
          onClick={() => setActive(PILLARS[1])}
        />

        {/* bottom slice */}
        <path
          d={`
            M 0,${HEIGHT}
            L ${WIDTH},${HEIGHT}
            L ${CX},${CY}
            Z
          `}
          fill={active.key === "marketplace" ? "#005eff" : "#1a2475"}
          onClick={() => setActive(PILLARS[2])}
        />

        {/* center logo */}
        <circle cx={CX} cy={CY} r={40} fill="white" />
        <text
          x={CX}
          y={CY + 6}
          textAnchor="middle"
          fontSize="24"
          fill="#005eff"
          style={{ fontFamily: "sans-serif", pointerEvents: "none" }}
        >
          ⦿
        </text>

        {/* Dialogue label (adjust similarly if it needs fine-tuning) */}
        <text
          x={(0 + CX) / 2}
          y={(HEIGHT + CY) / 2 - 10}
          fill="white"
          fontSize="14"
          transform={`rotate(-60 ${(0 + CX) / 2},${(HEIGHT + CY) / 2 - 10})`}
          style={{ pointerEvents: "none" }}
        >
          Dialogue
        </text>

        {/* Communities label now on true bisector */}
        <text
          x={labelR.x}
          y={labelR.y}
          fill="white"
          fontSize="14"
          textAnchor="middle"
          transform={`rotate(60 ${labelR.x},${labelR.y})`}
          style={{ pointerEvents: "none" }}
        >
          Communities
        </text>

        {/* Marketplace label */}
        <text
          x={CX}
          y={HEIGHT - 20}
          fill="white"
          fontSize="14"
          textAnchor="middle"
          style={{ pointerEvents: "none" }}
        >
          Marketplace
        </text>
      </svg>

      {/* info panel */}
      <div className="space-y-4 max-w-md">
        <h3 className="text-2xl font-semibold text-white">{active.title}</h3>
        <p className="text-white/80">{active.description}</p>
      </div>
    </div>
  );
}
