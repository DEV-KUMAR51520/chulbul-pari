import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EnvelopeScreen = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCardOut, setIsCardOut] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Wait for the flap to rotate open, then slide the card out
    setTimeout(() => {
      setIsCardOut(true);
    }, 800);

    // Auto advance to the letter screen after 2.8 seconds
    setTimeout(() => {
      onNext();
    }, 2800);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 w-full relative select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center mb-8 z-20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <h2 className="text-2xl font-bold tracking-wide text-white/90 font-serif">
          A Message From My Heart
        </h2>
        <p className="text-white/50 text-xs mt-1">
          {isOpen ? "Opening your special message..." : "Tap the envelope to open"}
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <div className="relative w-72 h-52 perspective-1000 mt-4 mb-20 z-10">
        <motion.div
          className="relative w-full h-full transform-style-3d cursor-pointer"
          onClick={handleOpen}
          whileHover={!isOpen ? { scale: 1.03 } : {}}
          whileTap={!isOpen ? { scale: 0.98 } : {}}
        >
          {/* Inside Letter Card (slides up) */}
          <motion.div
            className="absolute top-4 left-4 right-4 h-40 bg-[#fffdf9] rounded-lg shadow-inner z-0 border border-amber-100/50 flex flex-col items-center justify-center p-4"
            initial={{ y: 0 }}
            animate={isCardOut ? { y: -120, scale: 1.05, zIndex: 30 } : { y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mb-2 animate-bounce">
              ❤️
            </div>
            <span className="text-pink-600 font-serif italic text-sm font-semibold">Special Letter For You</span>
            <div className="w-16 h-0.5 bg-pink-200 mt-2"></div>
          </motion.div>

          {/* Envelope Back Body */}
          <div className="absolute inset-0 bg-[#f4ece1] rounded-lg shadow-2xl border border-[#e5dfd8] z-10 overflow-hidden">
            {/* Dark inner lining shadow */}
            <div className="absolute inset-0 bg-black/5"></div>
          </div>

          {/* Envelope Top Flap */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-[#ebdcc8] origin-top rounded-t-lg border-b border-black/5 shadow-md"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformStyle: 'preserve-3d',
              zIndex: isOpen ? 5 : 25,
            }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          ></motion.div>

          {/* Envelope Bottom Flap */}
          <div 
            className="absolute bottom-0 left-0 w-full h-full bg-[#fcf9f5] origin-bottom rounded-b-lg z-20"
            style={{ 
              clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)',
              borderTop: '1px solid rgba(224, 192, 104, 0.4)'
            }}
          ></div>

          {/* Envelope Left Flap */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-[#f7f2ea] origin-left rounded-l-lg z-20"
            style={{ 
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
            }}
          ></div>

          {/* Envelope Right Flap */}
          <div 
            className="absolute top-0 right-0 w-full h-full bg-[#f7f2ea] origin-right rounded-r-lg z-20"
            style={{ 
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
            }}
          ></div>

          {/* Golden Heart Seal (disappears when open) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-md flex items-center justify-center z-30"
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-white text-base">💝</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pulsing tap prompt */}
        {!isOpen && (
          <motion.div 
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center gap-2 z-20"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span>Tap to open</span>
            <span className="text-xl">👆</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EnvelopeScreen;
