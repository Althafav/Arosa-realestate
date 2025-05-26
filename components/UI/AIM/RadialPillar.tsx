import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RadialPillarsApp = () => {
  const [activePillarId, setActivePillarId] = useState(null);
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const pillarsData = [
    { id: 'globalMarkets', name: 'Global Markets', tracks: [
        { id: 'gm-1', name: 'Trade & Investment' },
        { id: 'gm-2', name: 'Financial Systems' },
        { id: 'gm-3', name: 'Economic Resilience' }
      ]
    },
    { id: 'sustainableSmartEconomies', name: 'Sustainable & Smart Economies', tracks: [
        { id: 'sse-1', name: 'Green Growth' },
        { id: 'sse-2', name: 'Digital Transformation' },
        { id: 'sse-3', name: 'Resource Efficiency' }
      ]
    },
    { id: 'innovationEntrepreneurship', name: 'Innovation & Entrepreneurship', tracks: [
        { id: 'ie-1', name: 'Startup Ecosystems' },
        { id: 'ie-2', name: 'R&D & Commercialization' },
        { id: 'ie-3', name: 'Talent & Skills' }
      ]
    }
  ];

  useEffect(() => {
    const updateSvg = () => {
      if (svgRef.current) {
        setSvgDimensions({
          width: svgRef.current.offsetWidth,
          height: svgRef.current.offsetHeight,
        });
      }
    };
    updateSvg();
    window.addEventListener('resize', updateSvg);
    return () => window.removeEventListener('resize', updateSvg);
  }, []);

  const centerX = svgDimensions.width / 2;
  const centerY = svgDimensions.height / 2;
  const radiusBase = Math.min(centerX, centerY);
  const centralRadius = radiusBase * 0.12;
  const pillarRadius = radiusBase * 0.45;
  const trackRadius = radiusBase * 0.85;
  const pillarSize = radiusBase * 0.08;
  const trackSize = radiusBase * 0.05;
  const textOffset = 20;

  const getPos = (angle, r) => {
    const rad = (angle * Math.PI) / 180;
    return { x: centerX + r * Math.cos(rad), y: centerY + r * Math.sin(rad) };
  };

  const handlePillarClick = id => setActivePillarId(activePillarId === id ? null : id);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen p-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">Pillars & Tracks</h1>
      <div
        ref={svgRef}
        className="relative w-full max-w-4xl aspect-square bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden"
      >
        <svg width="100%" height="100%" viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}>          
          <defs>
            <radialGradient id="centralGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </radialGradient>
          </defs>

          {/* Central */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={centralRadius}
            fill="url(#centralGrad)"
            stroke="#312e81"
            strokeWidth={3}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <motion.text
            x={centerX}
            y={centerY + 5}
            textAnchor="middle"
            className="text-white font-bold text-lg select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >Framework</motion.text>

          {/* Pillars */}
          {pillarsData.map((pillar, idx) => {
            const angle = (360 / pillarsData.length) * idx - 90;
            const { x, y } = getPos(angle, pillarRadius);

            return (
              <motion.g
                key={pillar.id}
                className="cursor-pointer"
                onClick={() => handlePillarClick(pillar.id)}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1, type: 'spring' }}
              >
                <motion.line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke={activePillarId === pillar.id ? '#10b981' : '#9ca3af'}
                  strokeWidth={activePillarId === pillar.id ? 2 : 1.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={pillarSize}
                  fill={activePillarId === pillar.id ? '#10b981' : '#6366f1'}
                  stroke={activePillarId === pillar.id ? '#059669' : '#4338ca'}
                  strokeWidth={2}
                />
                <text
                  x={x}
                  y={y + pillarSize + textOffset}
                  textAnchor="middle"
                  className={
                    `select-none transform transition-all duration-300 ${
                      activePillarId === pillar.id
                        ? 'text-green-700 font-bold text-base'
                        : 'text-indigo-800 font-medium text-sm'
                    }`
                  }
                >{pillar.name}</text>
              </motion.g>
            );
          })}

          {/* Tracks */}
          <AnimatePresence>
            {activePillarId && pillarsData.find(p => p.id === activePillarId).tracks.map((track, tIdx) => {
              const pIdx = pillarsData.findIndex(p => p.id === activePillarId);
              const baseAngle = (360 / pillarsData.length) * pIdx - 90;
              const spread = 40;
              const angle = baseAngle + (tIdx - 1) * spread;
              const { x: tx, y: ty } = getPos(angle, trackRadius);
              const { x: px, y: py } = getPos(baseAngle, pillarRadius);

              return (
                <motion.g
                  key={track.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <motion.line
                    x1={px}
                    y1={py}
                    x2={tx}
                    y2={ty}
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />
                  <circle
                    cx={tx}
                    cy={ty}
                    r={trackSize}
                    className="fill-purple-600 stroke-purple-800 stroke-2 shadow-md"
                  />
                  <text
                    x={tx}
                    y={ty + trackSize + textOffset}
                    textAnchor="middle"
                    className="text-purple-900 text-xs font-medium select-none"
                  >{track.name}</text>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>
      <div className="mt-8 bg-white p-5 rounded-xl shadow-lg text-center max-w-lg">
        <h2 className="font-semibold text-lg text-gray-800 mb-2">How to Explore</h2>
        <p className="text-gray-600">Click any pillar to reveal its key tracks. Click again to collapse.</p>
      </div>
    </div>
  );
};

export default RadialPillarsApp;
