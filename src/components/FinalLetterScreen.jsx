import React from 'react';
import { motion } from 'framer-motion';

const FinalLetterScreen = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 w-full px-6 py-12 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="w-full max-w-sm bg-[#fffdf9] rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
      >
        <div className="font-serif text-[#333333] text-center flex flex-col gap-5 text-[15px] leading-relaxed italic">
          <p className="font-semibold text-lg not-italic">Dear Chulbul pari,</p>

          <p>Happy Birthday to someone truly special! 🎂</p>

          <p>
            Wishing you a day filled with laughter, happiness, delicious cake,
            and everything that makes you smile.
          </p>

          <p>
            You are full of warmth and sweetness. Every moment spent with you was precious.
          </p>

          <p>
            Some friendships change your life forever. Ours is one of them.
          </p>

          <p>
            Here's to celebrating you today and always! 🎉
          </p>
          <p>
            one more gift is the promise that you will remain the permanent friend of my life and will be irreplaceable friend in my life for the rest of my life.
          </p>

          <div className="mt-4 flex flex-col items-center">
            <p>With love and best wishes,</p>
            <p className="font-bold mt-1">Your friend 💝</p>
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-3xl">🐇🐇</span> {/* Bunnies */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinalLetterScreen;
