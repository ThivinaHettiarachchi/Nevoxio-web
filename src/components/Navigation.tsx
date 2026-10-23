'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowUpRight, Search } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useSmoothScroll, useActiveSection } from '@/hooks/useAnimations';
import Logo from './Logo';

const NAV_ITEMS = [
  { label: 'OUR STORY', id: 'about' },
  { label: 'SERVICES', id: 'services' },
  { label: 'SELECTED WORK', id: 'work' },
  { label: 'PROCESS', id: 'process' },
  { label: 'CONTACT', id: 'contact' },
];

const SECTION_IDS = ['hero', ...NAV_ITEMS.map(item => item.id)];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const scrollTo = useSmoothScroll();
  const { activeSection, setActiveSection } = useActiveSection(SECTION_IDS);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((id: string) => {
    setActiveSection(id);
    scrollTo(id);
    setIsMobileMenuOpen(false);
  }, [scrollTo, setActiveSection]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-nav-bg/95 backdrop-blur-xl border-b border-border-default shadow-xs'
            : 'bg-bg-primary/80 backdrop-blur-md border-b border-border-default/40'
        }`}
      >
        {/* Top Announcement Bar (Fritzo Signature) */}
        <div className="w-full border-b border-border-default/60 bg-bg-secondary/40 py-2 sm:py-2.5 px-4 text-center">
          <p className="text-[10px] sm:text-[11.5px] tracking-[0.16em] uppercase text-text-muted font-normal">
            Intelligent software and digital experiences engineered to endure.
          </p>
        </div>

        {/* Main 3-Column Navigation Bar */}
        <nav className="container-premium flex items-center justify-between h-[72px] sm:h-[76px] relative">
          {/* Left Column: Editorial Uppercase Links */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8 flex-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-[10.5px] xl:text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 py-1 cursor-pointer
                  ${activeSection === item.id ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-text-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Center Column: Stylized Brand Lockup */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex flex-col items-center justify-center cursor-pointer group py-1 select-none flex-shrink-0"
            aria-label="NEVOXIO — Return to top"
          >
            <div className="relative h-6 w-auto flex items-center justify-center mb-0.5">
              <Logo height={24} showWordmark={false} />
            </div>
            <span className="font-serif text-[1.25rem] sm:text-[1.4rem] tracking-[0.22em] uppercase font-normal text-text-primary leading-none group-hover:opacity-80 transition-opacity">
              NEVOXIO
            </span>
          </button>

          {/* Right Column: Search Pill, Start Project CTA & Theme Toggle */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-1">
            {/* Quick Inquire Pill (matching Fritzo's "Find a fragrance") */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border-default bg-bg-secondary/60 hover:bg-bg-secondary hover:border-border-strong text-[11px] text-text-muted hover:text-text-primary transition-all cursor-pointer shadow-2xs"
            >
              <Search size={12} className="opacity-60" />
              <span className="tracking-[0.04em]">Find a solution</span>
            </button>

            {/* Primary Pill Button (matching Fritzo's Bag / Talk pill) */}
            <button
              id="start-project-nav-btn"
              onClick={() => handleNavClick('contact')}
              style={{ paddingLeft: '22px', paddingRight: '22px' }}
              className="hidden sm:inline-flex items-center justify-center gap-2 h-9 sm:h-10 rounded-full
                bg-stone-900 text-stone-100 hover:bg-stone-800
                dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white
                text-[11px] sm:text-xs font-medium tracking-[0.06em] uppercase
                transition-all duration-300 cursor-pointer shadow-xs hover:scale-[1.02] active:scale-[0.98] leading-none"
            >
              <span className="leading-none text-center">Start a Project</span>
              <ArrowUpRight size={13} className="shrink-0" />
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full
                border border-border-default hover:border-border-strong bg-bg-secondary/40
                transition-all duration-300 text-text-primary cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={15} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={15} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full
                border border-border-default bg-bg-secondary/40 text-text-primary transition-colors cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay lg:hidden px-6"
          >
            <nav className="flex flex-col items-center gap-7 text-center">
              <div className="mb-2 flex flex-col items-center">
                <Logo height={28} showWordmark={false} />
                <span className="font-serif text-2xl tracking-[0.2em] uppercase font-normal text-text-primary mt-2">
                  NEVOXIO
                </span>
              </div>

              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-lg tracking-[0.18em] uppercase font-normal transition-colors
                    ${activeSection === item.id ? 'text-text-primary border-b border-text-primary pb-1' : 'text-text-muted hover:text-text-primary'}`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => handleNavClick('contact')}
                className="mt-6 flex items-center gap-2 h-12 px-8 rounded-full
                  bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 text-xs tracking-[0.08em] uppercase font-medium"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={15} />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
