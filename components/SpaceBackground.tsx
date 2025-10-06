
import React, { useRef, useEffect } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.onresize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const stars: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < 800; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX - width / 2;
      mouseY = e.clientY - height / 2;
    });

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.9)';
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (const star of stars) {
        const factor = 1000;
        const x = star.x / (star.z / factor);
        const y = star.y / (star.z / factor);
        const size = (1 - star.z / width) * 4;
        const colorValue = Math.floor(255 * (1 - star.z / width));
        
        // Add subtle neon glow
        const glowColor = `rgba(${100 + colorValue / 2}, ${200}, 255, ${0.5 + (1 - star.z / width) * 0.5})`;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        
        ctx.fillStyle = `rgb(${colorValue},${colorValue},${colorValue})`;
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fill();

        star.z -= 1; // Speed of stars coming towards viewer
        if (star.z < 1) {
          star.z = width;
        }
      }
      ctx.restore();
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default SpaceBackground;
