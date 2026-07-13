import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import TopDecorations from './TopDecorations';

const BALLOON_COLORS = [
  'from-pink-400 to-rose-500 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.2)]',
  'from-yellow-300 to-amber-500 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.2)]',
  'from-cyan-400 to-blue-500 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.2)]',
  'from-purple-400 to-indigo-500 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.2)]',
  'from-emerald-400 to-teal-500 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.2)]',
  'from-orange-400 to-red-500 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.2)]',
  'from-fuchsia-400 to-pink-600 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.2)]',
];

const BalloonsScreen = ({ onNext }) => {
  const [poppedCount, setPoppedCount] = useState(0);
  const [balloons, setBalloons] = useState([]);

  // Initialize 7 balloons
  useEffect(() => {
    const initialBalloons = Array.from({ length: 7 }).map((_, idx) => ({
      id: idx,
      color: BALLOON_COLORS[idx % BALLOON_COLORS.length],
      left: 10 + idx * 12 + Math.random() * 5, 
      bottom: -150 - Math.random() * 150, 
      speed: 1.5 + Math.random() * 1.5,
      scale: 0.8 + Math.random() * 0.4,
      popped: false,
    }));
    setBalloons(initialBalloons);
  }, []);

  // Make balloons float up continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prevBalloons) =>
        prevBalloons.map((b) => {
          if (b.popped) return b;
          let nextBottom = b.bottom + b.speed;
          if (nextBottom > window.innerHeight + 100) {
            nextBottom = -150 - Math.random() * 100;
          }
          return { ...b, bottom: nextBottom };
        })
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handlePop = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#ff69b4', '#ffd700', '#87ceeb', '#dda0dd', '#98fb98'],
    });

    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setPoppedCount((c) => c + 1);
  };

  const allPopped = poppedCount >= 7;

  return (
    <motion.div
      className="flex flex-col items-center justify-between min-h-screen z-10 px-6 w-full relative pb-12 pt-24 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <TopDecorations showText={false} />
      
      {/* Title section */}
      <div className="text-center max-w-sm z-20">
        <motion.h2 
          className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 tracking-wide font-serif mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {allPopped ? "Yay! Popped them all! 🎉" : "Tap the balloons to pop! 🎈"}
        </motion.h2>
        <p className="text-white/60 text-sm">
          {allPopped ? "You are ready for the cake!" : `Popped: ${poppedCount} of 7`}
        </p>
      </div>

      {/* Floating balloons container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
        <AnimatePresence>
          {balloons.map((b) => {
            if (b.popped) return null;
            return (
              <motion.div
                key={b.id}
                onClick={(e) => handlePop(b.id, e)}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
                className="absolute cursor-pointer flex flex-col items-center"
                style={{
                  left: `${b.left}%`,
                  bottom: `${b.bottom}px`,
                  transform: `scale(${b.scale})`,
                }}
                whileHover={{ scale: b.scale * 1.1 }}
                whileTap={{ scale: b.scale * 0.9 }}
              >
                {/* Balloon Body */}
                <div className={`relative w-20 h-24 bg-gradient-to-tr rounded-[50%] ${b.color}`}>
                  {/* Balloon highlight */}
                  <div className="absolute top-4 left-4 w-5 h-8 bg-white/30 rounded-[50%] rotate-[25deg]"></div>
                  {/* Knot */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#f43f5e] opacity-80"></div>
                </div>
                {/* String */}
                <div className="w-0.5 h-20 bg-white/20 blur-[0.5px]"></div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Continue button */}
      <div className="z-20 w-full flex justify-center">
        {allPopped ? (
          <motion.button
            onClick={onNext}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="w-[85%] max-w-sm py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_4px_20px_rgba(236,72,153,0.5)] cursor-pointer"
          >
            Continue to Cake 🍰
          </motion.button>
        ) : (
          <div className="h-14"></div>
        )}
      </div>
    </motion.div>
  );
};

export default BalloonsScreen;
