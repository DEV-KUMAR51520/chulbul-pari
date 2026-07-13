import React from 'react';
import { motion } from 'framer-motion';

const EnvelopeScreen = ({ onNext }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center mb-16"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="text-xl font-bold tracking-wide text-white/90">
          A Message From My Heart
        </h2>
      </motion.div>

      {/* 3D Envelope Container */}
      <motion.div
        className="relative w-64 h-48 cursor-pointer perspective-1000 mt-8 mb-20"
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
      >
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#f8f5f2] rounded-md shadow-2xl overflow-hidden border border-[#e5dfd8]">
          {/* Inside Pink Paper */}
          <div className="absolute top-2 left-2 right-2 bottom-8 bg-[#ffb6c1] rounded-sm"></div>
        </div>
        
        {/* Envelope Top Flap (Open) */}
        <div 
          className="absolute top-0 left-0 w-full h-1/2 bg-[#ffc0cb] origin-top rounded-t-md"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transform: 'rotateX(180deg)',
            borderTop: '2px solid #ffd700',
            borderRight: '2px solid #ffd700',
            boxShadow: '0 -5px 10px rgba(0,0,0,0.1)'
          }}
        ></div>

        {/* Envelope Bottom Flap */}
        <div 
          className="absolute bottom-0 left-0 w-full h-full bg-[#fdfbf9] origin-bottom rounded-b-md"
          style={{ 
            clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)',
            borderTop: '2px solid #e0c068' // Gold trim
          }}
        ></div>

        {/* Envelope Left Flap */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[#f4eee6] origin-left rounded-l-md"
          style={{ 
            clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
            borderRight: '1px solid #e0c068'
          }}
        ></div>

        {/* Envelope Right Flap */}
        <div 
          className="absolute top-0 right-0 w-full h-full bg-[#f4eee6] origin-right rounded-r-md"
          style={{ 
            clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
            borderLeft: '1px solid #e0c068'
          }}
        ></div>
        
        {/* Pulsing prompt */}
        <motion.div 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center gap-2"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>Tap to open</span>
          <span className="text-xl">👆</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EnvelopeScreen;
