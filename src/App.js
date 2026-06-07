import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MemoryTimeline from './components/MemoryTimeline';
import MemoryGallery from './components/MemoryGallery';
import ComplimentGenerator from './components/ComplimentGenerator';
import LoveMeter from './components/LoveMeter';
import PrincessQuiz from './components/PrincessQuiz';
import SongPlaylist from './components/SongPlaylist';
import CountdownSection from './components/CountdownSection';
import LoveLetter from './components/LoveLetter';
import FBISection from './components/FBISection';
import VirtualGiftBox from './components/VirtualGiftBox';
import ProposalSection from './components/ProposalSection';
import WishWall from './components/WishWall';
import FinalSection from './components/FinalSection';
import EasterEgg, { useEasterEgg } from './components/EasterEgg';
import MouseTrail from './components/MouseTrail';
import './App.css';

function App() {
  const [phase, setPhase] = useState('loading'); // loading | landing | main
  const { isActive: easterEggActive, close: closeEasterEgg } = useEasterEgg();

  const handleLoadingComplete = () => setPhase('landing');
  const handleEnterKingdom = () => setPhase('main');

  return (
    <div className="App min-h-screen overflow-x-hidden">
      {/* Mouse Trail */}
      {phase === 'main' && <MouseTrail />}

      {/* Easter Egg */}
      <EasterEgg isActive={easterEggActive} onClose={closeEasterEgg} />

      <AnimatePresence mode="wait">
        {/* Loading Screen */}
        {phase === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {/* Landing Page */}
        {phase === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <LandingPage onEnter={handleEnterKingdom} />
          </motion.div>
        )}

        {/* Main Portal */}
        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navigation />
            <HeroSection />
            <MemoryTimeline />
            <MemoryGallery />
            <ComplimentGenerator />
            <LoveMeter />
            <PrincessQuiz />
            <SongPlaylist />
            <CountdownSection />
            <LoveLetter />
            <FBISection />
            <VirtualGiftBox />
            <ProposalSection />
            <WishWall />
            <FinalSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
