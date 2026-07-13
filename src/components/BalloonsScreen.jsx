import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TopDecorations from './TopDecorations';

const BalloonsScreen = ({ onNext }) => {
  // Auto advance after 4 seconds to simulate the float animation
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 px-6 w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <TopDecorations showText={false} />
      
      <div className="flex items-center justify-center w-full relative h-[400px]">
        {/* Text */}
        <motion.div
          className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-2 text-2xl font-bold tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="flex gap-4">
            <span>You</span>
            <span>are</span>
            <span>so</span>
          </div>
          <motion.span 
            className="text-pink-400 text-3xl mt-2 italic font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Special to me ✨
          </motion.span>
        </motion.div>
        
        {/* Blue Balloon */}
        <motion.div 
          className="absolute right-[15%] top-1/2 -translate-y-1/2"
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <div className="relative w-16 h-20 bg-[#5c88b8] rounded-[50%] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.3),inset_5px_5px_10px_rgba(255,255,255,0.4)] backdrop-blur-sm before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[4px] before:border-r-[4px] before:border-b-[8px] before:border-l-transparent before:border-r-transparent before:border-b-[#5c88b8]">
            {/* Balloon shine */}
            <div className="absolute top-3 left-3 w-4 h-6 rounded-[50%] bg-white/40 rotate-[30deg]"></div>
            {/* Balloon string */}
            <div className="absolute top-[100%] left-1/2 w-px h-32 bg-white/20"></div>
          </div>
        </motion.div>
      </div>
      
    </motion.div>
  );
};

export default BalloonsScreen;
