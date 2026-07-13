import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import TopDecorations from './TopDecorations';

const CandleScreen = ({ onNext }) => {
  const [litCandles, setLitCandles] = useState([true, true, true, true, true]);
  const [success, setSuccess] = useState(false);

  const triggerSuccess = () => {
    setSuccess(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  const handleBlowIndividual = (idx) => {
    if (success) return;
    setLitCandles((prev) => {
      const next = [...prev];
      next[idx] = false;
      const remainingLit = next.filter(Boolean).length;
      if (remainingLit === 0) {
        triggerSuccess();
      }
      return next;
    });
  };

  const handleBlowAll = () => {
    if (success) return;
    setLitCandles([false, false, false, false, false]);
    triggerSuccess();
  };

  const litCount = litCandles.filter(Boolean).length;

  return (
    <motion.div
      className="flex flex-col items-center justify-between min-h-screen z-10 w-full relative pb-12 pt-24 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <TopDecorations showText={true} />

      <div className="text-center max-w-sm z-20 mt-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 font-serif mb-2">
          {success ? "You blew them all out! 🥳" : "Tap each candle flame to blow it out! 🕯️"}
        </h2>
        <p className="text-white/60 text-sm">
          {success ? "Make a wish! ✨" : `Candles burning: ${litCount} of 5`}
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mt-6">
        <motion.div 
          className="relative perspective-1000 transform-style-3d w-48 h-48"
        >
          {/* Cake Plate */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-12 bg-gray-800 rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-b-4 border-gray-900" />
          
          {/* Bottom Tier */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-24 bg-gradient-to-b from-[#2a1b54] to-[#160d33] rounded-[50%] shadow-lg">
            <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/10 blur-[1px]"></div>
            <div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-blue-400/20 blur-[1px]"></div>
            <div className="absolute bottom-4 left-8 text-[10px]">✨</div>
            
            <div className="absolute top-[-15px] left-0 w-full h-[30px] bg-gradient-to-b from-[#3b2773] to-[#2a1b54] rounded-[50%]"></div>
          </div>

          {/* Top Tier */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-[#3b2773] to-[#2a1b54] rounded-[50%] shadow-xl">
             <div className="absolute top-3 right-4 w-4 h-4 rounded-full bg-pink-400/20 blur-[1px]"></div>
             <div className="absolute top-6 left-4 text-[10px]">✨</div>
             
             <div className="absolute top-[-12px] left-0 w-full h-[24px] bg-[#4a348c] rounded-[50%]"></div>
          </div>

          {/* Candles */}
          <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 flex gap-4 z-10">
            {litCandles.map((isLit, i) => (
              <div 
                key={i} 
                className={`w-2.5 h-8 bg-gradient-to-t from-pink-300 to-purple-400 rounded-sm relative cursor-pointer ${
                  i === 0 || i === 4 ? 'mt-2' : i === 1 || i === 3 ? 'mt-1' : ''
                }`}
                onClick={() => handleBlowIndividual(i)}
              >
                {/* Wick */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gray-600"></div>
                
                {/* Flame or Smoke */}
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-3.5 h-5 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-t-full rounded-b-md shadow-[0_0_15px_4px_rgba(249,115,22,0.8)]"
                      style={{ animation: `flicker ${Math.random() * 0.4 + 0.8}s infinite alternate` }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                    />
                  )}
                  {!isLit && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 w-1.5 h-6 opacity-60 bg-gray-300 blur-[1px] rounded-full"
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: -20, opacity: 0, scale: 1.5 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </motion.div>
      </div>

      <motion.button
        className={`w-[85%] max-w-sm py-4 rounded-full text-white font-bold text-lg shadow-[0_4px_15px_rgba(236,72,153,0.4)] transition-all ${
          success ? 'bg-gradient-to-r from-gray-500 to-gray-600 cursor-default' : 'bg-gradient-to-r from-[#e84188] to-[#8b5cf6] cursor-pointer'
        }`}
        whileHover={!success ? { scale: 1.02 } : {}}
        whileTap={!success ? { scale: 0.98 } : {}}
        onClick={handleBlowAll}
      >
        {success ? 'Yay! 🎉' : 'Blow All Candles 🌬️'}
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
