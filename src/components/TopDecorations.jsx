import React from 'react';
import { motion } from 'framer-motion';

const TopDecorations = ({ showText = false }) => {
  const lights = [
    'bg-red-500 shadow-[0_0_10px_2px_rgba(239,68,68,0.8)]',
    'bg-yellow-400 shadow-[0_0_10px_2px_rgba(250,204,21,0.8)]',
    'bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]',
    'bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.8)]',
    'bg-red-500 shadow-[0_0_10px_2px_rgba(239,68,68,0.8)]',
    'bg-yellow-400 shadow-[0_0_10px_2px_rgba(250,204,21,0.8)]',
    'bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]',
    'bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.8)]',
  ];

  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-8 z-0 pointer-events-none">
      {/* Lights row */}
      <div className="flex justify-between w-full px-6 max-w-sm mb-4">
        {lights.map((colorClass, i) => (
          <motion.div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${colorClass}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ animation: `pulse-glow ${2 + (i % 3) * 0.5}s infinite alternate` }}
          />
        ))}
      </div>

      {/* Glowing text */}
      {showText && (
        <motion.div 
          className="flex gap-1.5 text-xl font-bold tracking-widest mt-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {['H','A','P','P','Y'].map((letter, i) => (
            <span key={'h'+i} className={`text-transparent bg-clip-text drop-shadow-[0_0_8px_currentColor] 
              ${i%4===0 ? 'text-red-400' : i%4===1 ? 'text-yellow-400' : i%4===2 ? 'text-blue-400' : 'text-green-400'}`}>
              {letter}
            </span>
          ))}
          <span className="w-2"></span>
          {['B','I','R','T','H','D','A','Y'].map((letter, i) => (
            <span key={'b'+i} className={`text-transparent bg-clip-text drop-shadow-[0_0_8px_currentColor] 
              ${(i+5)%4===0 ? 'text-red-400' : (i+5)%4===1 ? 'text-yellow-400' : (i+5)%4===2 ? 'text-blue-400' : 'text-green-400'}`}>
              {letter}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TopDecorations;
