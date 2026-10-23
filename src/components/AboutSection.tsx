'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useAnimations';
import { CheckCircle2, Award, Zap, Code2 } from 'lucide-react';
import SectionBackground from './SectionBackground';

const PRINCIPLES = [
  {
    title: 'Intellectual Clarity',
    description: 'We dissect complex business goals and technical landscapes to their core fundamentals before writing a single line of architecture.',
    icon: Code2,
  },
  {
    title: 'Obsessive Craftsmanship',
    description: 'We treat every interaction, micro-transition, and database query with the precision of high horology and industrial design.',
    icon: Zap,
  },
  {
    title: 'Engineered to Endure',
    description: 'We architect modular, resilient digital foundations that scale effortlessly across years of operational growth.',
    icon: Award,
  },
];

const HIGHLIGHTS = [
  'Modern microservice & cloud architectures',
  'Strict type safety & automated verification',
  'Sub-100ms interaction latency benchmarks',
  'Institutional-grade security & reliability',
];

export default function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.15);
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.1);
  const { ref: principlesRef, isVisible: principlesVisible } = useScrollReveal(0.1);

  return (
    <section id="about" className="section-spacing-lg relative border-t border-border-default bg-bg-secondary/40">
      <SectionBackground variant="about" />
      <div className="container-premium relative z-10">
        {/* Eyebrow with Fine Horizontal Lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          <span className="w-8 sm:w-12 h-[1px] bg-border-strong opacity-60" />
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.24em] uppercase text-text-muted">
            OUR STORY & PHILOSOPHY
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-border-strong opacity-60" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column — Editorial Story Content */}
          <div>
            <div ref={headerRef}>
              <motion.h2
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-text-primary leading-[1.12]"
                initial={{ opacity: 0, y: 30 }}
                animate={headerVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Technology with purpose.<br />
                <span className="italic font-normal text-text-secondary">Craft without compromise.</span>
              </motion.h2>
            </div>

            <div ref={contentRef} className="mt-8">
              <motion.p
                className="text-base sm:text-lg text-text-secondary leading-[1.8] font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={contentVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                At NEVOXIO, we believe great technology should do far more than function. 
                It should resolve intricate operational challenges, empower ambitious enterprises, and 
                inspire lasting confidence through extraordinary design and performance.
              </motion.p>

              {/* Editorial Pull Quote */}
              <motion.blockquote
                className="my-7 pl-5 border-l-2 border-stone-800 dark:border-stone-200 py-1"
                initial={{ opacity: 0, x: -10 }}
                animate={contentVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <p className="font-serif italic text-lg sm:text-xl text-text-primary leading-relaxed">
                  &ldquo;Elegance in software is not the absence of complexity, but the absolute mastery of it.&rdquo;
                </p>
                <cite className="block mt-2 text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-text-muted not-italic">
                  The Nevoxio Design Standard
                </cite>
              </motion.blockquote>

              <motion.p
                className="text-base sm:text-lg text-text-secondary leading-[1.8] font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={contentVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                We unite thoughtful product strategy, modern cloud engineering, and obsessive aesthetic discipline 
                to transform visionary concepts into dependable, market-leading digital ecosystems.
              </motion.p>

              {/* Engineering Highlights */}
              <motion.div
                className="mt-8 pt-7 border-t border-border-default grid grid-cols-1 sm:grid-cols-2 gap-3"
                initial={{ opacity: 0 }}
                animate={contentVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                {HIGHLIGHTS.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-text-secondary">
                    <CheckCircle2 size={14} className="text-stone-900 dark:text-stone-100 shrink-0 opacity-80" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right column — Editorial Principles */}
          <div ref={principlesRef} className="flex flex-col justify-center">
            <div className="space-y-0">
              {PRINCIPLES.map((principle, i) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={principlesVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15 + 0.1 }}
                    className="py-8 border-b border-border-default first:border-t group hover:pl-2 transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-10 h-10 rounded-full border border-border-default bg-bg-secondary flex items-center justify-center shrink-0 group-hover:border-stone-800 dark:group-hover:border-stone-200 transition-colors">
                        <Icon size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-[11px] font-mono tracking-widest text-text-muted">
                            0{i + 1}
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-text-primary">
                            {principle.title}
                          </h3>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed font-light mt-1">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
