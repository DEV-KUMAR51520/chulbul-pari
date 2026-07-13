import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 7 Photos in JPEG format
const memoryPhotos = [
  '/memories/1.png',
  '/memories/2.png',
  '/memories/3.jpg',
  '/memories/4.jpg',
  '/memories/5.jpg',
];

const MemoryGalleryScreen = ({ onNext, playMusic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasFinished = React.useRef(false);

  const handleNext = () => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    onNext();
  };

  // Start the background music as soon as this screen appears
  useEffect(() => {
    if (playMusic) {
      playMusic();
    }
  }, [playMusic]);

  // Handle the automatic cinematic slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === memoryPhotos.length - 1) {
          clearInterval(timer);
          // Wait slightly longer on the final photo, then move to the next screen
          setTimeout(() => {
            handleNext();
          }, 4500);
          return prev;
        }
        return prev + 1;
      });
    }, 4500); // 4.5 seconds per image for a slow, cinematic feel

    return () => clearInterval(timer);
  }, [onNext]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 w-full relative bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Cinematic Image Container with Ken Burns effect */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-8"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeOut" }
            }}
          >
            <img
              src={memoryPhotos[currentIndex]}
              alt={`Memory ${currentIndex + 1}`}
              className="w-full h-full object-contain opacity-90 drop-shadow-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback if image is missing */}
            <div className="hidden absolute inset-0 bg-gray-900 flex-col items-center justify-center text-white/50 text-center p-4">
              <span className="text-4xl mb-3">🎞️</span>
              <span className="font-light tracking-widest uppercase">Missing File</span>
              <span className="text-xs mt-2 opacity-70">Please add {memoryPhotos[currentIndex]} to public/memories</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic Vignette / Dark Edges */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10"></div>

      {/* Cinematic Letterboxing (Black Bars Top & Bottom) */}
      <div className="absolute top-0 left-0 w-full h-[12vh] bg-black z-20 shadow-[0_10px_20px_rgba(0,0,0,0.8)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[12vh] bg-black z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.8)]"></div>

      {/* Subtle overlay text */}
      <motion.div
        className="absolute bottom-[15vh] left-0 w-full text-center z-30 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <h2 className="text-white/80 font-serif italic text-xl tracking-widest drop-shadow-xl">
          Beautiful Memories
        </h2>
        <div className="flex justify-center gap-2 mt-4">
          {memoryPhotos.map((_, idx) => (
            <div
              key={idx}
              className={`h-0.5 transition-all duration-1000 ${idx === currentIndex ? 'w-6 bg-white/80' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Skip button - moved to top right black bar for cinematic cleanliness */}
      <motion.button
        onClick={handleNext}
        className="absolute top-4 right-6 z-30 px-4 py-1 text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Skip
      </motion.button>

      <style>{`
        .bg-radial-vignette {
          background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%);
        }
      `}</style>
    </motion.div>
  );
};

export default MemoryGalleryScreen;
