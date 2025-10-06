
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black font-orbitron text-cyan-300">
      <div className="relative w-48 h-48">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border-2 border-cyan-400 rounded-full"
            style={{
              animation: `pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0,
            }}
          ></div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white tracking-widest"
             style={{textShadow: '0 0 10px #00ffff'}}>
          L
        </div>
      </div>
      <p className="mt-8 text-lg tracking-[0.2em] animate-pulse">INITIALIZING UNIVERSE...</p>
      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
            opacity: 1;
          }
          80%, 100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
