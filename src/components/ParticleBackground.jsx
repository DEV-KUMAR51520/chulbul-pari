import React, { useMemo } from 'react';

const ParticleBackground = () => {
  const particles = useMemo(() => {
    const items = [];
    // 40 twinkling stars
    for (let i = 0; i < 40; i++) {
      items.push({
        id: `star-${i}`,
        type: 'star',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      });
    }
    // 15 floating hearts
    for (let i = 0; i < 15; i++) {
      items.push({
        id: `heart-${i}`,
        type: 'heart',
        x: Math.random() * 100,
        y: Math.random() * 50 + 50, // Start in the bottom half
        size: Math.random() * 16 + 16,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 10,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => {
        if (p.type === 'star') {
          return (
            <div
              key={p.id}
              className="absolute rounded-full bg-white opacity-40"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.8)`,
                animation: `twinkle ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          );
        } else {
          return (
            <div
              key={p.id}
              className="absolute text-pink-400/50 select-none pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                fontSize: `${p.size}px`,
                animation: `floatUp ${p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
              }}
            >
              ❤️
            </div>
          );
        }
      })}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.65;
          }
          90% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;
