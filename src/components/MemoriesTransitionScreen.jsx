import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoriesTransitionScreen = ({ onNext }) => {
  useEffect(() => {
    // Automatically move to the memory gallery after 4 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 4000);
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
      >
        <h2 className="text-3xl font-serif italic text-white/90 leading-relaxed mb-4">
          Let's visit some of our beautiful memories...
        </h2>
        <motion.div 
          className="text-pink-400 text-2xl mt-4"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ✨ 📸 ✨
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MemoriesTransitionScreen;
