import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PillarAnimatedPresence = () => {
  const [activePillar, setActivePillar] = useState(null);

  const pillarsData = [
    { id: 'global', title: 'Global Markets', tracks: ['Trade & Investment', 'Financial Systems', 'Economic Resilience'] },
    { id: 'smart', title: 'Sustainable & Smart Economies', tracks: ['Green Growth', 'Digital Transformation', 'Resource Efficiency'] },
    { id: 'innovation', title: 'Innovation & Entrepreneurship', tracks: ['Startup Ecosystems', 'R&D & Commercialization', 'Talent & Skills'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex flex-col justify-center items-center px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">Pillars & Tracks Framework</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        {pillarsData.map(pillar => (
          <motion.div
            key={pillar.id}
            className="bg-black bg-opacity-30 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
            whileHover={{ scale: 1.05 }}
            animate={{ scale: activePillar === pillar.id ? 1.05 : 1 }}
          >
            <h2 className="text-xl font-bold text-center mb-4">{pillar.title}</h2>
            <AnimatePresence>
              {activePillar === pillar.id && (
                <motion.ul
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {pillar.tracks.map(track => (
                    <li key={track} className="bg-purple-800 bg-opacity-60 p-2 rounded-lg text-center text-sm shadow-sm">
                      {track}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 max-w-md text-center text-sm">
        <p className="text-purple-300 font-semibold">Tap any pillar to explore related tracks. Designed for seamless mobile and desktop experiences with smooth animations and interactive visuals.</p>
      </div>
    </div>
  );
};

export default PillarAnimatedPresence;