import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const messages = [
  "Happy Birthday, Ayushiiii! 🎂",
  "Our bond in three words was — Sweet, Loyal & My cutiepie 💎",
  "The vibe between us? Sweet & Warm ☀️"
];

const MessageCarousel = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 px-6 text-center w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full max-w-sm h-64 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-relaxed tracking-wide drop-shadow-lg">
              {messages[currentIndex]}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-8 mb-12">
        {messages.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-8 bg-pink-400' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      <motion.button
        onClick={handleNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-medium text-white transition-colors"
      >
        {currentIndex === messages.length - 1 ? 'Continue' : 'Next'}
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default MessageCarousel;
