
import React, { useState, useEffect, Suspense, lazy } from 'react';
import SpaceBackground from './components/SpaceBackground';
import LoadingScreen from './components/LoadingScreen';

const AiChat = lazy(() => import('./components/AiChat'));
const SocialIcons = lazy(() => import('./components/SocialIcons'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    setIntro(false);
    setTimeout(() => setShowMain(true), 1000);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <SpaceBackground />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${intro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <h1 className="font-orbitron text-5xl md:text-8xl font-bold tracking-widest text-white animate-pulse"
              style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff' }}>
            LEADER
          </h1>
          <p className="mt-4 text-lg text-cyan-200" style={{ textShadow: '0 0 5px #00ffff' }}>
            A glimpse into a different reality.
          </p>
          <button
            onClick={handleExplore}
            className="mt-12 px-8 py-4 font-orbitron text-xl text-white bg-black/30 border-2 border-cyan-400 rounded-lg backdrop-blur-sm transition-all duration-300
                       hover:bg-cyan-400/30 hover:shadow-[0_0_20px_#00ffff] hover:scale-105 active:scale-95"
          >
            Explore My World
          </button>
        </div>

        <div className={`relative w-full h-full transition-opacity duration-1000 ${showMain ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Suspense fallback={<div className="text-white">Loading Components...</div>}>
            <SocialIcons />
            <AiChat />
          </Suspense>
        </div>
      </div>
      <audio id="background-music" src="https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3" loop></audio>
    </div>
  );
};

export default App;
