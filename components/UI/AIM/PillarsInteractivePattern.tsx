import React, { useState } from 'react';
// Ensure your logo file is placed in the public folder (e.g., public/aimlogo.png)
const LOGO_SRC = '/aimlogo.png';

const PILLARS = [
  {
    id: 'global',
    title: 'Global Markets',
    color: '#3b82f6',
    tracks: [
      'Foreign Direct Investment',
      'Global Trade',
      'Global Manufacturing',
    ],
  },
  {
    id: 'future-economies',
    title: 'Future Economies',
    color: '#10b981',
    tracks: [
      'Future Cities',
      'Green Infrastructure',
      'Future Finance',
    ],
  },
  {
    id: 'nextgen',
    title: 'NexGen',
    color: '#8b5cf6',
    tracks: [
      'Startups & Unicorns',
      'Entrepreneurs',
      'AI',
    ],
  },
];

export default function PillarsInteractivePattern() {
  const [active, setActive] = useState<string | null>(null);
  const radius = 150;

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {/* Center Logo */}
      <div className="absolute bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img src={"https://assets-us-01.kc-usercontent.com/615577b9-4e2b-0074-b4f8-20f11d30f5ae/5362aa1c-8ec7-4e14-84c7-85df670fd904/AIM-logo.png"} alt="AIM Logo" className="w-20 h-20 object-contain" />
      </div>

      {/* Connection Lines */}
      {PILLARS.map((_, idx) => {
        const angle = (idx / PILLARS.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <div
            key={`line-${idx}`}
            className="absolute h-[2px] bg-gray-400"
            style={{
              width: `${radius}px`,
              left: '50%',
              top: '50%',
              transform: `rotate(${angle}rad)`,
              transformOrigin: '0 50%',
            }}
          />
        );
      })}

      {/* Pillar Nodes and Tracks */}
      {PILLARS.map((pillar, idx) => {
        const angle = (idx / PILLARS.length) * Math.PI * 2 - Math.PI / 2;
        const x = `calc(50% + ${Math.cos(angle) * radius}px)`;
        const y = `calc(50% + ${Math.sin(angle) * radius}px)`;
        const isActive = active === pillar.id;

        return (
          <div
            key={pillar.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: x, top: y, zIndex: isActive ? 20 : 10 }}
            onClick={() => setActive(isActive ? null : pillar.id)}
          >
            {/* Pillar Node */}
            <div
              className="w-fit rounded-full px-3 py-2 flex items-center justify-center text-white text-lg font-bold shadow-lg"
              style={{ backgroundColor: pillar.color }}
            >
              {pillar.title}
                
            </div>

            {/* Tracks radial layout */}
            {isActive &&
              pillar.tracks.map((track, tIdx) => {
                const trackAngle =
                  (tIdx / (pillar.tracks.length - 1)) * Math.PI - Math.PI / 3;
                const tx = Math.cos(trackAngle) * 100;
                const ty = Math.sin(trackAngle) * 100;

                return (
                  <div
                    key={track}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: tx,
                      top: ty,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className="bg-white p-2 rounded shadow text-xs whitespace-nowrap">
                      {track}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
