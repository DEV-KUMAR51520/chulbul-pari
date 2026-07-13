import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const IntroScreen = ({ onNext }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 px-6 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(236,72,153,0.15)] flex flex-col items-center max-w-sm w-full overflow-hidden"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
        whileHover={{ y: -5, boxShadow: "0 25px 60px rgba(236,72,153,0.25)" }}
      >
        {/* Glow background behind the heart */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Heart Button */}
        <motion.div 
          className="w-32 h-32 mb-8 rounded-full bg-gradient-to-tr from-pink-500 via-pink-400 to-purple-600 flex items-center justify-center shadow-[0_10px_30px_rgba(236,72,153,0.5)] cursor-pointer"
          style={{ animation: 'float 5s ease-in-out infinite' }}
          whileHover={{ scale: 1.08, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-16 h-16 text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.4)]" fill="white" />
        </motion.div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-pink-200 to-purple-300 tracking-wide font-serif leading-tight">
          I tried to make something special just for you...
        </h1>
        
        <p className="text-white/60 mb-8 text-sm tracking-wide font-light">
          A little surprise waiting inside.
        </p>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.8)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold text-white tracking-widest uppercase shadow-[0_4px_20px_rgba(236,72,153,0.4)] hover:brightness-110 transition-all cursor-pointer"
        >
          Let's Go
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
