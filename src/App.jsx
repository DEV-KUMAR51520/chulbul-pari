import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import IntroScreen from './components/IntroScreen';
import MessageCarousel from './components/MessageCarousel';
import CelebrationScreen from './components/CelebrationScreen';
import BalloonsScreen from './components/BalloonsScreen';
import CakeScreen from './components/CakeScreen';
import MemoriesTransitionScreen from './components/MemoriesTransitionScreen';
import MemoryGalleryScreen from './components/MemoryGalleryScreen';
import CandleScreen from './components/CandleScreen';
import EnvelopeScreen from './components/EnvelopeScreen';
import FinalLetterScreen from './components/FinalLetterScreen';
import CountdownScreen from './components/CountdownScreen';

// Set the target date here: Year, Month (0-indexed, so 4 is May), Day, Hour, Minute
const TARGET_DATE = new Date(2026, 4, 12, 0, 0, 0); // May 12, 2026 00:00:00

function App() {
  // If current date is before target date, start at step -1 (countdown)
  const isWaiting = new Date() < TARGET_DATE;
  const [step, setStep] = useState(isWaiting ? -1 : 0);
  const audioRef = React.useRef(null);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const playBackgroundMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.play().catch(err => console.log("Audio playback failed:", err));
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent w-full overflow-hidden flex justify-center items-center font-sans">
      <ParticleBackground />
      
      {/* Background Music Element */}
      <audio ref={audioRef} src="/music.mp3" loop />
      
      <AnimatePresence mode="wait">
        {step === -1 && <CountdownScreen key="countdown" targetDate={TARGET_DATE} onComplete={() => setStep(0)} />}
        {step === 0 && <IntroScreen key="step0" onNext={nextStep} />}
        {step === 1 && <MessageCarousel key="step1" onNext={nextStep} />}
        {step === 2 && <CelebrationScreen key="step2" onNext={nextStep} />}
        {step === 3 && <BalloonsScreen key="step3" onNext={nextStep} />}
        {step === 4 && <CakeScreen key="step4" onNext={nextStep} />}
        {step === 5 && <MemoriesTransitionScreen key="step5" onNext={nextStep} />}
        {step === 6 && <MemoryGalleryScreen key="step6" onNext={nextStep} playMusic={playBackgroundMusic} />}
        {step === 7 && <CandleScreen key="step7" onNext={nextStep} />}
        {step === 8 && <EnvelopeScreen key="step8" onNext={nextStep} />}
        {step === 9 && <FinalLetterScreen key="step9" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
