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

// Set the target date here: Year, Month (0-indexed, so 7 is August), Day, Hour, Minute
const TARGET_DATE = new Date(2026, 7, 5, 12, 0, 0); // August 5, 2026 12:00:00

function App() {
  // If current date is before target date, start at step -1 (countdown)
  const isWaiting = new Date() < TARGET_DATE;
  const [step, setStep] = useState(isWaiting ? -1 : 0);
  const birthdayAudioRef = React.useRef(null);
  const musicAudioRef = React.useRef(null);

  const playBirthdaySong = () => {
    if (musicAudioRef.current) {
      musicAudioRef.current.pause();
    }
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.volume = 0.5;
      birthdayAudioRef.current.play().catch(err => console.log("Birthday song playback failed:", err));
    }
  };

  const playMusicSong = () => {
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.pause();
    }
    if (musicAudioRef.current) {
      musicAudioRef.current.volume = 0.5;
      musicAudioRef.current.play().catch(err => console.log("Music song playback failed:", err));
    }
  };

  const nextStep = () => {
    setStep((prev) => {
      const newStep = prev + 1;
      if (newStep === 6) {
        playMusicSong();
      }
      return newStep;
    });
  };

  return (
    <div className="relative min-h-screen bg-transparent w-full overflow-hidden flex justify-center items-center font-sans">
      <ParticleBackground />
      
      {/* Background Music Elements */}
      <audio ref={birthdayAudioRef} src="/birthday.mp3" loop />
      <audio ref={musicAudioRef} src="/music.mp3" loop />
      
      <AnimatePresence mode="wait">
        {step === -1 && <CountdownScreen key="countdown" targetDate={TARGET_DATE} onComplete={() => setStep(0)} />}
        {step === 0 && <IntroScreen key="step0" onNext={nextStep} />}
        {step === 1 && <MessageCarousel key="step1" onNext={nextStep} />}
        {step === 2 && <CelebrationScreen key="step2" onNext={nextStep} playMusic={playBirthdaySong} />}
        {step === 3 && <BalloonsScreen key="step3" onNext={nextStep} />}
        {step === 4 && <CakeScreen key="step4" onNext={nextStep} />}
        {step === 5 && <MemoriesTransitionScreen key="step5" onNext={nextStep} />}
        {step === 6 && <MemoryGalleryScreen key="step6" onNext={nextStep} playMusic={playMusicSong} />}
        {step === 7 && <CandleScreen key="step7" onNext={nextStep} />}
        {step === 8 && <EnvelopeScreen key="step8" onNext={nextStep} />}
        {step === 9 && <FinalLetterScreen key="step9" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
