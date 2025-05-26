import React from "react";
import { motion } from "framer-motion";

/**
 * TriangularPillars component using Framer Motion and image patterns for fills
 * - SVG triangle split into three segments
 * - Each segment filled with a blended background image
 * - Detail cards animated in on mount
 */
export default function TriangularPillars2() {
  const pillars = [
    {
      id: "global",
      title: "Global Investment",
      description:
        "Unlock cross-border capital flows and build resilient investment ecosystems.",
      patternUrl: "https://source.unsplash.com/600x520/?finance,investment",
      points: ["300,10", "590,510", "300,260"],
      labelPos: { x: 450, y: 200 },
      tracks: [
        {
          id: "gm1",
          title: "Foreign Direct Investment",
          description: "Connecting buyers and sellers worldwide.",
        },
        {
          id: "gm2",
          title: "Global Trade",
          description: "Building resilient financial infrastructures.",
        },
        {
          id: "gm3",
          title: "Global Manufacturing",
          description: "Adapting to global economic shifts.",
        },
      ],
    },
    {
      id: "future",
      title: "Future Economies",
      description:
        "Design sustainable, inclusive urban environments and drive digital transformation.",
      patternUrl: "https://source.unsplash.com/600x520/?city,urban",
      points: ["590,510", "10,510", "300,260"],
      labelPos: { x: 300, y: 460 },
      tracks: [
        {
          id: "sm1",
          title: "Future Cities",
          description: "Optimizing resource loops.",
        },
        {
          id: "sm2",
          title: "Green Infrastructure",
          description: "Eco-friendly urban planning.",
        },
        {
          id: "sm3",
          title: "Future Finance",
          description: "IoT and AI for sustainability.",
        },
      ],
    },
    {
      id: "nexgen",
      title: "NexGen",
      description:
        "Empower startups, entrepreneurs, and AI innovation that reshape the global economy.",
      patternUrl: "https://source.unsplash.com/600x520/?technology,futuristic",
      points: ["10,510", "300,10", "300,260"],
      labelPos: { x: 150, y: 300 },
      tracks: [
        {
          id: "ie1",
          title: "Startups & Unicorns",
          description: "Bootcamps and mentoring.",
        },
        {
          id: "ie2",
          title: "Entrepreneurs",
          description: "Investor matchmaking.",
        },
        { id: "ie3", title: "AI", description: "Collaborative hubs." },
      ],
    },
  ];

  // Variants for SVG segments
  const segmentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  // Variants for detail cards
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.5 + i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-900 text-white min-h-screen p-8 space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Left: Animated Triangle Visualization with image patterns */}
      <div className="relative w-full lg:w-1/2 max-w-md">
        <svg viewBox="0 0 600 520" className="w-full h-auto">
          <defs>
            {pillars.map((p) => (
              <pattern
                key={p.id}
                id={`pattern-${p.id}`}
                patternUnits="userSpaceOnUse"
                width={600}
                height={520}
              >
                <image
                  href={p.patternUrl}
                  x="0"
                  y="0"
                  width={600}
                  height={520}
                  preserveAspectRatio="xMidYMid slice"
                />
                <rect
                  x="0"
                  y="0"
                  width={600}
                  height={520}
                  opacity="0.3"
                  fill="#000"
                />
              </pattern>
            ))}
          </defs>

          {pillars.map((p, i) => (
            <motion.polygon
              key={p.id}
              custom={i}
              variants={segmentVariants}
              initial="hidden"
              animate="visible"
              points={p.points.join(" ")}
              fill={`url(#pattern-${p.id})`}
              opacity="0.9"
            />
          ))}

          {/* Center circles */}
          <motion.circle
            cx="300"
            cy="260"
            r="60"
            fill="#fff"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { delay: 0.6, duration: 0.6 },
            }}
          />
          <motion.circle
            cx="300"
            cy="260"
            r="40"
            fill="#111827"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { delay: 0.7, duration: 0.6 },
            }}
          />

          {/* Labels inside segments */}
          {pillars.map((p) => (
            <motion.text
              key={`${p.id}-label`}
              x={p.labelPos.x}
              y={p.labelPos.y}
              fill="#fff"
              fontSize="20"
              fontWeight="600"
              textAnchor="middle"
              alignmentBaseline="middle"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.8, duration: 0.8 },
              }}
            >
              {p.title}
            </motion.text>
          ))}
        </svg>
      </div>

      {/* Right: Animated Detail Cards */}
      <div className="w-full lg:w-1/2 space-y-6">
        {pillars.map((p, i) => (
          <motion.div
            key={p.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-2xl font-semibold mb-2 text-white">
              {p.title}
            </h3>

            <p className="text-gray-200 mb-5">{p.description}</p>

            <div className="flex gap-3 items-center">
              {p.tracks.map((track: any, index: number) => {
                return (
                  <div className="bg-white/50 px-3 py-1 rounded-full">
                    {track.title}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
