import React, { useState } from 'react';

const PILLARS = [
  {
    id: 'global',
    title: 'Global Markets',
    icon: '🌐',
    tracks: [
      { id: 'gm1', title: 'Foreign Direct Investment', description: 'Connecting buyers and sellers worldwide.' },
      { id: 'gm2', title: 'Global Trade', description: 'Building resilient financial infrastructures.' },
      { id: 'gm3', title: 'Global Manufacturing', description: 'Adapting to global economic shifts.' },
    ],
  },
  {
    id: 'future-economies',
    title: 'Future Economies',
    icon: '♻️',
    tracks: [
      { id: 'sm1', title: 'Future Cities', description: 'Optimizing resource loops.' },
      { id: 'sm2', title: 'Green Infrastructure', description: 'Eco-friendly urban planning.' },
      { id: 'sm3', title: 'Future Finance', description: 'IoT and AI for sustainability.' },
    ],
  },
  {
    id: 'nextgen',
    title: 'NexGen',
    icon: '🚀',
    tracks: [
      { id: 'ie1', title: 'Startups & Unicorns', description: 'Bootcamps and mentoring.' },
      { id: 'ie2', title: 'Entrepreneurs', description: 'Investor matchmaking.' },
      { id: 'ie3', title: 'AI', description: 'Collaborative hubs.' },
    ],
  },
];

export default function PillarsTracksTabs() {
  const [active, setActive] = useState('global');

  const activePillar = PILLARS.find((p) => p.id === active)!;

  return (
    <div className="flex flex-col md:flex-row bg-white  shadow-lg overflow-hidden">
      {/* Pillar Tabs */}
      <nav className="flex md:flex-col bg-gray-50 md:w-1/4">
        {PILLARS.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setActive(pillar.id)}
            className={`flex-1 md:flex-none flex items-center justify-center px-4 py-6 transition-colors border-b md:border-b-0 md:border-r hover:bg-gray-100 ${
              active === pillar.id ? 'bg-white text-primary font-semibold' : 'text-gray-600'
            }`}
          >
            <span className="text-2xl mr-2">{pillar.icon}</span>
            <span className="hidden md:inline">{pillar.title}</span>
          </button>
        ))}
      </nav>

      {/* Tracks Content */}
      <div className="p-8 md:w-3/4">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="text-3xl mr-3">{activePillar.icon}</span>
          {activePillar.title}
        </h2>
        <div className="space-y-6">
          {activePillar.tracks.map((track) => (
            <div key={track.id} className="p-4 border-l-4 border-primary bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <h3 className="text-xl font-semibold mb-1">{track.title}</h3>
              <p className="text-gray-700">{track.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
