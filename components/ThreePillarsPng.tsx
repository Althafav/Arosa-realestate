import { useState } from "react";

// Hardcoded pillar data for the info panel
type Key = "innovation" | "sustainable" | "global";
const INFO: Record<Key, { title: string; description: string }> = {
  innovation: {
    title: "Innovation & Entrepreneurship",
    description:
      "A dedicated space to showcase and support startups, scale-ups and creative innovators, accelerating new ventures and partnerships.",
  },
  sustainable: {
    title: "Sustainable & Smart Economies",
    description:
      "Panels, workshops and showcases on how tech-driven and green solutions are powering the next generation of economic growth.",
  },
  global: {
    title: "Global Markets",
    description:
      "Roundtables and matchmaking sessions connecting regional talent with international investors and market-entry opportunities.",
  },
};

export default function ThreePillarsSvg() {
  const [activeKey, setActiveKey] = useState<Key>("innovation");

  const WIDTH = 350;
  const HEIGHT = (Math.sqrt(3) / 2) * WIDTH; // ≈259.8
  const CX = WIDTH / 2; // 150
  const CY = (2 / 3) * HEIGHT; // ≈173.2
  const LOGO_SIZE = 60;

  return (
    <div className="wrapper flex flex-col">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width={WIDTH}
        height={HEIGHT}
        className="triangle"
      >
        {/* Base triangle */}
        <polygon
          points={`${CX},0 0,${HEIGHT} ${WIDTH},${HEIGHT}`}
          fill="#0a0e2e"
        />

        {/* Bottom slice: Innovation */}
        <path
          d={`M 0,${HEIGHT} L ${WIDTH},${HEIGHT} L ${CX},${CY} Z`}
          fill={activeKey === "innovation" ? "#0fb9ff" : "#006fbf"}
          onClick={() => setActiveKey("innovation")}
        />

        {/* Right slice: Sustainable */}
        <path
          d={`M ${CX},${CY} L ${WIDTH},${HEIGHT} L ${CX},0 Z`}
          fill={activeKey === "sustainable" ? "#0fb9ff" : "#006fbf"}
          onClick={() => setActiveKey("sustainable")}
        />

        {/* Left slice: Global */}
        <path
          d={`M ${CX},${CY} L ${CX},0 L 0,${HEIGHT} Z`}
          fill={activeKey === "global" ? "#0fb9ff" : "#006fbf"}
          onClick={() => setActiveKey("global")}
        />

        {/* Center logo */}
        <image
          href="/assets/test/aimlogo.png"
          x={CX - LOGO_SIZE / 2}
          y={CY - LOGO_SIZE / 2}
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          style={{ cursor: "pointer" }}
          onClick={() => setActiveKey("innovation")}
        />

        {/* Static labels with fixed positions and line wraps */}
        <text
          x="180"
          y="268.5"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          pointerEvents="none"
        >
          <tspan x="180" dy="0">
            Innovation &
          </tspan>
          <tspan x="180" dy="16">
            Entrepreneurship
          </tspan>
        </text>

        <text
          x="217.5"
          y="121.5"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          transform="rotate(60 187.5 151.5)"
          pointerEvents="none"
        >
          <tspan x="217.5" dy="0">
            Sustainable &
          </tspan>
          <tspan x="217.5" dy="16">
            Smart Economies
          </tspan>
        </text>

        <text
          x="112.5"
          y="164.5"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          transform="rotate(-60 112.5 151.5)"
          pointerEvents="none"
        >
          <tspan x="112.5" dy="0">
            Global
          </tspan>
          <tspan x="112.5" dy="16">
            Markets
          </tspan>
        </text>
      </svg>

      <div className="info">
        <h3>{INFO[activeKey].title}</h3>
        <p>{INFO[activeKey].description}</p>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .triangle {
          user-select: none;
        }
        .triangle path {
          cursor: pointer;
          transition: fill 0.3s ease;
        }
        .info {
          max-width: 360px;
        }
        .info h3 {
          margin: 0 0 8px;
          font-size: 1.5rem;
          color: #0a0e2e;
        }
        .info p {
          margin: 0;
          color: #333;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
