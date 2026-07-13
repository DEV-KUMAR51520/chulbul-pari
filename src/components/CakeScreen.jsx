import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopDecorations from './TopDecorations';

const CakeScreen = ({ onNext }) => {
  const [isCut, setIsCut] = useState(false);

  const handleCutCake = () => {
    setIsCut(true);
    // Wait for the cutting animation to finish before moving to the next section
    setTimeout(() => {
      onNext();
    }, 4000);
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
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Cake Plate */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-12 bg-gray-800 rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-b-4 border-gray-900" />
          
          {/* Main Cake - Bottom Tier */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-24 bg-gradient-to-b from-[#2a1b54] to-[#160d33] rounded-[50%] shadow-lg transition-all duration-1000 ${isCut ? 'clip-cake-cut' : 'clip-cake-full'}`}>
            <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/10 blur-[1px]"></div>
            <div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-blue-400/20 blur-[1px]"></div>
            <div className="absolute bottom-4 left-8 text-[10px]">✨</div>
            <div className="absolute top-8 right-6 text-[8px]">⭐</div>
            
            {/* The top surface of the bottom tier */}
            <div className={`absolute top-[-15px] left-0 w-full h-[30px] bg-gradient-to-b from-[#3b2773] to-[#2a1b54] rounded-[50%] transition-all duration-1000 ${isCut ? 'clip-cake-cut' : 'clip-cake-full'}`}></div>
          </div>

          {/* Main Cake - Top Tier */}
          <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-[#3b2773] to-[#2a1b54] rounded-[50%] shadow-xl transition-all duration-1000 z-10 ${isCut ? 'clip-cake-cut' : 'clip-cake-full'}`}>
             <div className="absolute top-3 right-4 w-4 h-4 rounded-full bg-pink-400/20 blur-[1px]"></div>
             <div className="absolute top-6 left-4 text-[10px]">✨</div>
             
             {/* The top surface of the top tier */}
             <div className={`absolute top-[-12px] left-0 w-full h-[24px] bg-[#4a348c] rounded-[50%] transition-all duration-1000 ${isCut ? 'clip-cake-cut' : 'clip-cake-full'}`}></div>
          </div>

          {/* The Removed Slice (Appears when cut) */}
          <AnimatePresence>
            {isCut && (
              <motion.div 
                className="absolute bottom-10 left-[55%] z-20 w-24 h-32"
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={{ opacity: 1, x: 40, y: 30 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {/* Slice Bottom */}
                <div className="absolute bottom-0 w-20 h-16 bg-gradient-to-b from-[#3b2773] to-[#160d33]" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 50% 100%, 0% 100%)' }}></div>
                {/* Slice Top */}
                <div className="absolute bottom-12 w-16 h-12 bg-gradient-to-b from-[#4a348c] to-[#2a1b54]" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 50% 100%, 0% 100%)' }}></div>
                {/* Inside Cake texture (pink/white cake inside) */}
                <div className="absolute bottom-4 left-0 w-16 h-20 bg-gradient-to-br from-[#fbcfe8] to-[#f472b6]" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%)' }}>
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-pink-600/40"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

      <motion.button
        className={`w-[85%] max-w-sm py-4 rounded-full text-white font-bold text-lg shadow-[0_4px_15px_rgba(236,72,153,0.4)] transition-all ${
          isCut ? 'bg-gradient-to-r from-gray-500 to-gray-600 opacity-80 cursor-default' : 'bg-gradient-to-r from-[#e84188] to-[#8b5cf6]'
        }`}
        whileHover={!isCut ? { scale: 1.02 } : {}}
        whileTap={!isCut ? { scale: 0.98 } : {}}
        onClick={!isCut ? handleCutCake : undefined}
      >
        {isCut ? 'Cutting... 🔪' : 'Cut the cake'}
      </motion.button>

      <style>{`
        /* 
          We clip the top right quarter of the cake (approx 50% to 100% horizontally, 0% to 50% vertically) 
          to simulate the slice being removed.
        */
        .clip-cake-full {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 100%);
        }
        .clip-cake-cut {
          clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%);
        }
      `}</style>
    </motion.div>
  );
};

export default CakeScreen;
