'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useAnimations';
import { Search, PenTool, Code, Rocket, CheckCircle } from 'lucide-react';
import SectionBackground from './SectionBackground';

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    phase: 'Research & Strategy',
    description: 'Understand the business goals, user psychology, technical requirements, and core challenges.',
    icon: Search,
    deliverables: ['Product Scope & PRD', 'User Journey Mapping', 'System Architecture Plan'],
    timeline: 'Sprint 1',
  },
  {
    number: '02',
    title: 'Design',
    phase: 'UI/UX & Interactive Design',
    description: 'Shape the aesthetic identity, interactive prototypes, design tokens, and fluid motion systems.',
    icon: PenTool,
    deliverables: ['High-Fidelity Figma Systems', 'Motion Specifications', 'Component Library Tokens'],
    timeline: 'Sprint 2',
  },
  {
    number: '03',
    title: 'Develop',
    phase: 'Full-Stack Engineering',
    description: 'Write clean, type-safe, modular code with automated testing, CI/CD pipelines, and high performance.',
    icon: Code,
    deliverables: ['TypeScript & Next.js Core', 'API Integration & Auth', 'Automated Jest / E2E Tests'],
    timeline: 'Sprint 3 - 4',
  },
  {
    number: '04',
    title: 'Launch & Evolve',
    phase: 'Cloud Deployment & Telemetry',
    description: 'Deploy to scalable edge infrastructure, monitor telemetry in real time, and continuously iterate.',
    icon: Rocket,
    deliverables: ['Zero-Downtime Rollout', 'Global CDN & Auto-scaling', 'Post-Launch Analytics & SLA'],
    timeline: 'Continuous',
  },
];

export default function ProcessSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.2);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="section-spacing-lg relative bg-bg-secondary/40 border-t border-border-default">
      <SectionBackground variant="process" />
      <div className="container-premium relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-8 h-[1px] bg-border-strong opacity-60" />
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-text-muted">
              OUR METHODOLOGY
            </span>
            <span className="w-8 h-[1px] bg-border-strong opacity-60" />
          </motion.div>
          <motion.h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-text-primary leading-[1.12]"
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            From pure concept.<br />
            <span className="italic font-normal text-text-secondary">To resilient architecture.</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-text-secondary mt-4 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A disciplined, transparent, and agile development lifecycle built for speed and precision.
          </motion.p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isCurrent = activeStep === i;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
                className={`group p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-card-bg border-indigo-500/50 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30 -translate-y-1'
                    : 'bg-card-bg border-border-default hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 hover:ring-1 hover:ring-indigo-500/30 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-mono font-bold tracking-widest transition-colors duration-300 ${
                      isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-text-muted group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}>
                      {step.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        isCurrent
                          ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-500 shadow-xs'
                          : 'bg-bg-secondary border-border-default text-text-muted group-hover:bg-indigo-500/10 group-hover:border-indigo-500/40 group-hover:text-indigo-500'
                      }`}
                    >
                      <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Phase & Title */}
                  <span className="text-[0.6875rem] font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 block mb-1">
                    {step.phase}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal mb-5">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-border-default space-y-2">
                  <div className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-1">
                    Key Deliverables:
                  </div>
                  {step.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-1.5 text-[11px] text-text-secondary font-medium">
                      <CheckCircle size={11} className="text-emerald-500 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                  <div className="mt-3 text-[10px] font-mono text-text-muted">
                    Timeline: <span className="text-text-primary font-bold">{step.timeline}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
