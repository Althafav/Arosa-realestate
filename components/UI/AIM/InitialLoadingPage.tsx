import React, { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const loaderText = "AIM Congress 2026";

// Container for letters
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

// Letter animation
const letterVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Skeleton lines for content
const skeletonVariants = {
  hidden: { opacity: 0.3 },
  visible: {
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

interface InitialLoaderProps {
  onFinish: () => void;
  duration?: number;
}

const InitialLoader: React.FC<InitialLoaderProps> = ({
  onFinish,
  duration = 3500,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
    const timeout = setTimeout(onFinish, duration);
    return () => clearTimeout(timeout);
  }, [onFinish, duration, controls]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
      >
        {/* Logo or icon circle */}
        <motion.div
          className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/assets/logos/AIM Logo Vertical Blue in White.png"
            alt="Logo"
            className="w-12 h-12"
          />
        </motion.div>

        {/* Letter animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex space-x-2"
        >
          {loaderText.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-3xl md:text-7xl font-extrabold tracking-tighter text-blue-800"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Skeleton placeholders for header/nav */}
        <motion.div
          className="w-3/4 h-4 rounded-md bg-gray-200"
          variants={skeletonVariants}
          animate={controls}
        />
        <motion.div
          className="w-1/2 h-4 rounded-md bg-gray-200"
          variants={skeletonVariants}
          animate={controls}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default InitialLoader;

/*
Usage:

import React, { useState } from 'react';
import InitialLoader from './InitialLoader';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <InitialLoader onFinish={() => setLoaded(true)} />}
      {loaded && <MainApp />}
    </>
  );
}
*/
