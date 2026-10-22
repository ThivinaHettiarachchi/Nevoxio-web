'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Shield, Cpu, Activity, Globe } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSmoothScroll } from '@/hooks/useAnimations';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-48 h-48 rounded-full border border-border-default opacity-20"
        style={{ animation: 'pulse-subtle 2s ease-in-out infinite' }}
      />
    </div>
  ),
});

const TECH_STACK = [
  'Next.js 15',
  'React 19',
  'Three.js / WebGL',
  'TypeScript',
  'Python AI',
  'AWS Cloud',
  'Tailwind CSS',
  'PostgreSQL',
  'Docker',
  'Node.js',
  'Distributed Systems',
  'Framer Motion',
];

const METRICS = [
  { label: 'Uptime Reliability', value: '99.9%', icon: Shield },
  { label: 'Projects Shipped', value: '50+', icon: Sparkles },
  { label: 'Latency Benchmark', value: '<100ms', icon: Cpu },
  { label: 'Client Retention', value: '100%', icon: Activity },
];

export default function HeroSection() {
  const scrollTo = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between min-h-screen pt-24 sm:pt-28 pb-8 overflow-hidden select-none bg-gradient-to-b from-bg-primary via-bg-primary/95 to-bg-secondary/40"
    >
      {/* 3D Global Cyber Network Canvas — Stays in the Background, Responsive to Mouse and Scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <Hero3D />
      </div>

      {/* Atmospheric Soft Ambient Lighting Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-500/5 dark:bg-rose-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Hero Foreground Content */}
      <div className="container-premium text-center flex flex-col items-center relative z-10 pt-4 pb-2">
        {/* Eyebrow with Fine Horizontal Lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6"
        >
          <span className="w-8 sm:w-14 h-[1px] bg-border-strong opacity-60" />
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.24em] uppercase text-text-muted">
            THE HOUSE OF NEVOXIO
          </span>
          <span className="w-8 sm:w-14 h-[1px] bg-border-strong opacity-60" />
        </motion.div>

        {/* High-Fashion Classical Editorial Headline with Soft Ambient Protection */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle soft scrim behind typography for flawless legibility over the 3D globe */}
          <div className="absolute -inset-x-8 -inset-y-4 bg-bg-primary/50 dark:bg-[#0c0a09]/55 blur-2xl -z-10 rounded-full pointer-events-none" />

          <motion.h1
            className="font-serif text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] font-normal tracking-[-0.025em] text-text-primary leading-[1.08]"
            initial={{ opacity: 0, y: 25 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block">The systems you trust.</span>
            <span className="block italic font-normal text-text-secondary">The craft you remember.</span>
          </motion.h1>
        </div>

        {/* Editorial Subtitle */}
        <motion.p
          className="max-w-xl mx-auto mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed font-light backdrop-blur-[2px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We architect mission-critical digital systems, scalable cloud engines, and bespoke brand ecosystems designed to endure.
        </motion.p>

        {/* CTA Buttons — Generous, Perfectly Balanced Luxury Pill Buttons */}
        <motion.div
          style={{ marginTop: '28px', marginBottom: '24px' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Primary Pill Button */}
          <button
            onClick={() => scrollTo('contact')}
            style={{ paddingLeft: '32px', paddingRight: '32px' }}
            className="hero-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 rounded-full
              text-xs sm:text-[13px] font-medium tracking-[0.08em] uppercase
              hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-xs leading-none group text-center"
          >
            <span className="leading-none text-center">Start a Project</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </button>

          {/* Secondary Pill Button */}
          <button
            onClick={() => scrollTo('work')}
            style={{ paddingLeft: '32px', paddingRight: '32px' }}
            className="hero-btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 rounded-full
              text-xs sm:text-[13px] font-medium tracking-[0.08em] uppercase
              hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-2xs leading-none text-center"
          >
            <span className="leading-none text-center">Explore Selected Work</span>
          </button>
        </motion.div>

        {/* Global Live Network Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#121622]/85 backdrop-blur-md border border-border-default/80 text-[10.5px] font-mono text-text-muted mb-6 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-text-primary font-medium tracking-wider uppercase">GLOBAL NETWORK ACTIVE</span>
          <span className="text-text-muted/60">•</span>
          <span className="flex items-center gap-1 text-text-secondary">
            <Globe size={11} className="text-sky-500" />
            Scroll to Rotate & Explore Hubs
          </span>
        </motion.div>

        {/* Trust Metrics Editorial Row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-5 border-t border-border-default/70 max-w-3xl w-full bg-white/45 dark:bg-black/25 backdrop-blur-md rounded-2xl px-6 py-3.5 border shadow-2xs"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="flex flex-col items-center text-center p-1.5 rounded-xl">
                <div className="flex items-center gap-1.5 text-text-primary text-xl sm:text-2xl font-serif font-normal tracking-tight">
                  <Icon size={14} className="text-rose-500 dark:text-rose-400 shrink-0" />
                  <span>{metric.value}</span>
                </div>
                <span className="text-[10px] tracking-[0.12em] uppercase text-text-muted mt-1 font-medium">{metric.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Technology Ribbon Marquee */}
      <div className="relative z-10 w-full overflow-hidden py-3 border-y border-border-default/70 bg-bg-secondary/60 backdrop-blur-md mt-6">
        <div className="flex w-max animate-marquee gap-8">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div key={i} className="flex items-center gap-3 text-[11px] font-medium text-text-muted tracking-[0.14em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/60 dark:bg-rose-400/60" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
