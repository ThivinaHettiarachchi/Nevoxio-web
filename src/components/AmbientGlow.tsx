'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function AmbientGlow() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for organic cursor following
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.2 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed pointer-events-none z-30 w-[450px] h-[450px] rounded-full blur-[90px]
        bg-radial-[circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%]
        dark:bg-radial-[circle_at_center,rgba(99,102,241,0.14)_0%,transparent_70%]
        hidden md:block transition-opacity duration-500"
    />
  );
}
