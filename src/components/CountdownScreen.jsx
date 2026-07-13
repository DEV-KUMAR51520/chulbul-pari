import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock } from 'lucide-react';

const CountdownScreen = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      // If time is up, trigger onComplete
      if (Object.keys(remaining).length === 0) {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  // For testing purposes, click the lock icon 30 times to bypass
  const [clickCount, setClickCount] = useState(0);
  const handleSecretBypass = () => {
    if (clickCount >= 29) {
      onComplete();
    } else {
      setClickCount(prev => prev + 1);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 px-6 text-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-black/30 backdrop-blur-md border border-pink-500/30 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full relative overflow-hidden"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div 
          className="w-20 h-20 mb-6 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center shadow-lg cursor-pointer"
          onClick={handleSecretBypass}
        >
          <Lock className="w-8 h-8 text-pink-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
          No Peeking! 👀
        </h2>
        
        <p className="text-white/80 mb-8 text-sm md:text-base leading-relaxed">
          This surprise is locked until your special day on <strong className="text-pink-400">May 12th</strong>. Be patient!
        </p>

        <div className="flex gap-4 justify-center w-full">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 mb-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs uppercase tracking-wider text-pink-300 font-medium">
                {unit}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex items-center gap-2 text-white/50 text-xs">
          <Clock className="w-4 h-4" />
          <span>Counting down...</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CountdownScreen;
