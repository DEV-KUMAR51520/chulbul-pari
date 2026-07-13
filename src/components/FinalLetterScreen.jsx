import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const FinalLetterScreen = () => {
  useEffect(() => {
    // Launch a celebratory, multi-burst confetti shower
    const duration = 4.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  const petals = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      size: Math.random() * 8 + 6,
    }));
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 w-full px-6 py-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Floating Rose Petals background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute bg-rose-400/30 rounded-[50%_0_50%_50%] rotate-[45deg]"
            style={{
              left: `${p.left}%`,
              top: `-10%`,
              width: `${p.size}px`,
              height: `${p.size * 1.4}px`,
              animation: `driftDown ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-sm bg-gradient-to-b from-[#fffdfa] to-[#fffaf0] rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-amber-100/50 relative overflow-hidden z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
      >
        {/* Decorative corner lines */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-amber-200/40 rounded-[1.7rem] pointer-events-none" />

        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mb-6"></div>

        <div className="font-serif text-[#3a352d] text-center flex flex-col gap-5 text-[15px] leading-relaxed italic relative z-10">
          <p className="font-bold text-lg not-italic text-pink-700/80 tracking-wide">Dear Chulbul pari,</p>

          <p>Happy Birthday to someone truly special! 🎂</p>

          <p>
            Wishing you a day filled with laughter, happiness, delicious cake,
            and everything that makes you smile.
          </p>

          <p>
            You are full of warmth and sweetness. Every moment spent with you since nevesa is precious and is cherisable.
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

          <div className="mt-4 flex flex-col items-center not-italic">
            <p className="text-xs uppercase tracking-widest text-[#7c6f5d] font-semibold">With love and best wishes,</p>
            <p className="font-bold mt-1 text-pink-600 font-serif text-base shadow-sm">Your friend 💝</p>
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-3xl animate-bounce">🐇🐇</span> {/* Bunnies */}
          </div>
        </div>

        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mt-6"></div>
      </motion.div>

      <style>{`
        @keyframes driftDown {
          0% {
            transform: translateY(0) rotate(45deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(80px);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default FinalLetterScreen;
