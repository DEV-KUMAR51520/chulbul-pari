import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoriesTransitionScreen = ({ onNext }) => {
  useEffect(() => {
    // Automatically move to the memory gallery after 8 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 w-full relative px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        className="max-w-md flex flex-col items-center gap-6"
      >
        <h2 className="text-3xl font-serif italic text-white/95 leading-relaxed">
          Let's visit some memories...
        </h2>
        
        <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light italic font-serif bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
          "Did not have much photos but lots of memories and all those memories is trapped in u only, so lets visit some of the phases of birthday girls life"
        </p>

        <motion.div 
          className="text-pink-400 text-2xl mt-2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ✨ 📸 ✨
        </motion.div>

        <motion.button
          onClick={onNext}
          className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MemoriesTransitionScreen;
