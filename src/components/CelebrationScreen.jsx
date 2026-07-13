import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const CelebrationScreen = ({ onNext, playMusic }) => {
  const [lightsOn, setLightsOn] = useState(false);

  const handleTurnOnLights = () => {
    setLightsOn(true);
    if (playMusic) {
      playMusic();
    }
    // Play a subtle switch sound here if needed
    setTimeout(() => {
      onNext();
    }, 3000); // Wait for 3 seconds of lights before moving to next
  };

  const lights = Array.from({ length: 8 });

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-10 left-0 right-0 flex justify-around px-4">
        {lights.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: lightsOn ? 1 : 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`w-4 h-4 rounded-full ${
              ['bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-purple-500', 'bg-orange-500', 'bg-cyan-500'][i % 8]
            }`}
            style={{
              boxShadow: lightsOn 
                ? `0 0 15px ${['#ef4444', '#facc15', '#3b82f6', '#22c55e', '#ec4899', '#a855f7', '#f97316', '#06b6d4'][i % 8]}`
                : 'none'
            }}
          />
        ))}
      </div>

      <motion.h2 
        className={`text-4xl font-bold mb-12 transition-all duration-1000 ${lightsOn ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400' : 'text-white/50'}`}
      >
        Let's Celebrate!
      </motion.h2>

      {!lightsOn && (
        <motion.button
          onClick={handleTurnOnLights}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[85%] max-w-sm py-4 bg-gradient-to-r from-[#e84188] to-[#8b5cf6] rounded-full text-white font-bold text-lg shadow-[0_4px_15px_rgba(236,72,153,0.4)] transition-transform flex justify-center items-center gap-2"
        >
          <Lightbulb className="w-5 h-5" />
          Turn On the Lights
        </motion.button>
      )}
    </motion.div>
  );
};

export default CelebrationScreen;
