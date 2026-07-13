import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const IntroScreen = ({ onNext }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 px-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center shadow-lg animate-float">
          <Heart className="w-16 h-16 text-white" fill="white" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
          I tried to make something special just for you...
        </h1>
        
        <p className="text-white/70 mb-8 text-sm">
          A little surprise waiting inside.
        </p>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-pulse-glow"
        >
          Let's Go
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
