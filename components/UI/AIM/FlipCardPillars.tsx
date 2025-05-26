import React, { useState } from "react";

const pillarsData = [
  {
    id: "global",
    title: "Global Markets",
    description: "Connecting economies worldwide",
    tracks: ["Trade & Investment", "Financial Systems", "Economic Resilience"],
  },
  {
    id: "smart",
    title: "Sustainable & Smart Economies",
    description: "Building green and digital futures",
    tracks: ["Green Growth", "Digital Transformation", "Resource Efficiency"],
  },
  {
    id: "innovation",
    title: "Innovation & Entrepreneurship",
    description: "Fueling startups and talent",
    tracks: [
      "Startup Ecosystems",
      "R&D & Commercialization",
      "Talent & Skills",
    ],
  },
];

const FlipCardPillars = () => {
  const [flipped, setFlipped] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Pillars & Tracks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {pillarsData.map((pillar) => (
          <div
            key={pillar.id}
            className="group perspective"
            onClick={() => setFlipped(flipped === pillar.id ? null : pillar.id)}
          >
            <div
              className={`relative w-full h-64 transition-transform duration-700 transform-gpu ${
                flipped === pillar.id ? "rotate-y-180" : ""
              }`}
            >
              {/* Front Side */}
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between backface-hidden">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {pillar.title}
                  </h2>
                  <p className="text-gray-500 mt-2">{pillar.description}</p>
                </div>
                <p className="text-sm text-gray-400">Tap to view tracks</p>
              </div>
              {/* Back Side */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white transform rotate-y-180 backface-hidden">
                <h2 className="text-2xl font-bold mb-4">
                  {pillar.title} Tracks
                </h2>
                <ul className="space-y-2">
                  {pillar.tracks.map((track) => (
                    <li
                      key={track}
                      className="bg-white bg-opacity-20 rounded-md p-2 hover:bg-opacity-30 transition"
                    >
                      {track}
                    </li>
                  ))}
                </ul>
                <p className="text-sm mt-4">Tap to flip back</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 max-w-md text-center text-gray-600">
        <p>
          This flip-card layout adapts seamlessly between desktop and mobile.
          Click or tap to reveal associated tracks.
        </p>
      </div>
    </div>
  );
};

export default FlipCardPillars;
