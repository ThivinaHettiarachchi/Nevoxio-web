'use client';

import { useEffect, useRef, useState } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swayAngle: number;
  swaySpeed: number;
  swayRadius: number;
  opacity: number;
  glow: boolean;
  colorType: 'white' | 'ice' | 'cyan';
}

export default function SnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [opacity, setOpacity] = useState(0);
  const isDarkRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      isDarkRef.current = theme === 'dark';
    };
    checkTheme();

    // Theme mutation observer
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Handle scroll to fade in snow only after leaving hero
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.55;

      if (scrollY <= heroThreshold * 0.4) {
        setOpacity(0);
      } else if (scrollY < heroThreshold) {
        // Smooth linear ramp from 0 to 1
        const progress = (scrollY - heroThreshold * 0.4) / (heroThreshold * 0.6);
        setOpacity(Math.min(1, Math.max(0, progress)));
      } else {
        setOpacity(1);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initFlakes();
    };

    window.addEventListener('resize', handleResize);

    // Mouse drift interaction
    let mouseDriftX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const centerOffsetX = (e.clientX - width / 2) / (width / 2);
      mouseDriftX = centerOffsetX * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate snowflakes
    let flakes: Snowflake[] = [];
    const initFlakes = () => {
      const count = width < 768 ? 60 : 130;
      flakes = [];

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2.6 + 0.8; // 0.8px to 3.4px
        const isForeground = radius > 2.3;

        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          speedY: isForeground ? Math.random() * 0.9 + 1.1 : Math.random() * 0.6 + 0.4,
          speedX: (Math.random() - 0.5) * 0.3,
          swayAngle: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
          swayRadius: Math.random() * 0.8 + 0.3,
          opacity: isForeground ? Math.random() * 0.35 + 0.55 : Math.random() * 0.3 + 0.25,
          glow: isForeground,
          colorType: Math.random() > 0.75 ? 'cyan' : Math.random() > 0.45 ? 'ice' : 'white',
        });
      }
    };

    initFlakes();

    // Render loop
    let lastTime = performance.now();
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const isDark = isDarkRef.current;

      // Draw snowflakes
      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        // Update physics
        flake.swayAngle += flake.swaySpeed * (dt * 60);
        flake.x += (Math.sin(flake.swayAngle) * flake.swayRadius + flake.speedX + mouseDriftX) * (dt * 60);
        flake.y += flake.speedY * (dt * 60);

        // Wrap around borders
        if (flake.y > height + 10) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 10) {
          flake.x = -10;
        } else if (flake.x < -10) {
          flake.x = width + 10;
        }

        // Color selection
        let fillStyle = '';
        if (isDark) {
          if (flake.colorType === 'cyan') {
            fillStyle = `rgba(165, 243, 252, ${flake.opacity})`;
          } else if (flake.colorType === 'ice') {
            fillStyle = `rgba(224, 242, 254, ${flake.opacity})`;
          } else {
            fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
          }
        } else {
          // Light mode: soft frosty slate-indigo motes
          if (flake.colorType === 'cyan') {
            fillStyle = `rgba(8, 145, 178, ${flake.opacity * 0.5})`;
          } else {
            fillStyle = `rgba(71, 85, 105, ${flake.opacity * 0.55})`;
          }
        }

        // Draw soft glowing halo for foreground flakes
        if (flake.glow && isDark) {
          const glowRadius = flake.radius * 3.5;
          const gradient = ctx.createRadialGradient(
            flake.x,
            flake.y,
            0,
            flake.x,
            flake.y,
            glowRadius
          );
          gradient.addColorStop(0, fillStyle);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw flake core
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[1] transition-opacity duration-700 ease-out"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
