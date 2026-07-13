import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopDecorations from './TopDecorations';

const CandleScreen = ({ onNext }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blowText, setBlowText] = useState('Blow the Candles');

  const handleBlow = () => {
    setCandlesLit(false);
    setBlowText('Yay! 🎉');
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-between min-h-screen z-10 w-full relative pb-12 pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <TopDecorations showText={true} />

      <div className="relative w-64 h-64 flex items-center justify-center mt-10">
        <motion.div 
          className="relative perspective-1000 transform-style-3d w-48 h-48"
        >
          {/* Cake Plate */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-12 bg-gray-800 rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-b-4 border-gray-900" />
          
          {/* Bottom Tier (Cut slice missing) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-24 bg-gradient-to-b from-[#2a1b54] to-[#160d33] rounded-[50%] shadow-lg clip-cake-cut">
            <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/10 blur-[1px]"></div>
            <div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-blue-400/20 blur-[1px]"></div>
            <div className="absolute bottom-4 left-8 text-[10px]">✨</div>
            
            <div className="absolute top-[-15px] left-0 w-full h-[30px] bg-gradient-to-b from-[#3b2773] to-[#2a1b54] rounded-[50%] clip-cake-cut"></div>
          </div>

          {/* Top Tier (Cut slice missing) */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-[#3b2773] to-[#2a1b54] rounded-[50%] shadow-xl clip-cake-cut">
             <div className="absolute top-3 right-4 w-4 h-4 rounded-full bg-pink-400/20 blur-[1px]"></div>
             <div className="absolute top-6 left-4 text-[10px]">✨</div>
             
             <div className="absolute top-[-12px] left-0 w-full h-[24px] bg-[#4a348c] rounded-[50%] clip-cake-cut"></div>
          </div>

          {/* Candles */}
          <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-1.5 h-8 bg-gray-200 rounded-sm relative ${i === 0 ? 'mt-2' : i === 4 ? 'mt-2' : i === 1 ? 'mt-1' : i === 3 ? 'mt-1' : ''}`}>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-400"></div>
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-4 bg-orange-400 rounded-t-full rounded-b-md shadow-[0_0_10px_2px_rgba(251,146,60,0.8)]"
                      style={{ animation: `flicker ${Math.random() * 0.5 + 1}s infinite alternate` }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                    />
                  )}
                  {!candlesLit && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-6 opacity-50 bg-gray-300 blur-sm rounded-full"
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: -20, opacity: 0.5, scale: 1.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </motion.div>
      </div>

      <motion.button
        className="w-[85%] max-w-sm py-4 bg-gradient-to-r from-[#e84188] to-[#8b5cf6] rounded-full text-white font-bold text-lg shadow-[0_4px_15px_rgba(236,72,153,0.4)] transition-transform"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBlow}
      >
        {blowText}
      </motion.button>

      <style>{`
        .clip-cake-cut {
          clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%);
        }
      `}</style>
    </motion.div>
  );
};

export default CandleScreen;
