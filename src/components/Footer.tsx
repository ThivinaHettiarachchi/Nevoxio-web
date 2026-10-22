'use client';

import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useAnimations';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'OUR STORY', id: 'about' },
  { label: 'SERVICES', id: 'services' },
  { label: 'SELECTED WORK', id: 'work' },
  { label: 'PROCESS', id: 'process' },
  { label: 'CONTACT', id: 'contact' },
];

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Twitter', href: '#' },
];

export default function Footer() {
  const scrollTo = useSmoothScroll();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-default bg-bg-primary">
      <div className="container-premium">
        {/* Main footer content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <button
                onClick={() => scrollTo('hero')}
                className="flex flex-col items-start mb-5 group cursor-pointer text-left select-none"
                aria-label="NEVOXIO — Go to top"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Logo height={28} showWordmark={false} />
                  <span className="font-serif text-2xl tracking-[0.2em] uppercase font-normal text-text-primary">
                    NEVOXIO
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted mt-1">
                  DIGITAL ARCHITECTURE & SYSTEMS
                </span>
              </button>
              <p className="text-sm text-text-secondary font-light leading-relaxed max-w-sm mt-3">
                Intelligent digital systems and high-impact technology engineered to endure long after the screen turns off.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted mb-5">
                INDEX
              </h4>
              <nav className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-[11px] tracking-[0.14em] uppercase text-text-secondary hover:text-text-primary transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted mb-5">
                CONNECT
              </h4>
              <div className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.14em] uppercase text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-border-default/60 gap-4">
          <p className="text-xs text-text-muted tracking-wide">
            © {currentYear} NEVOXIO. All rights reserved. Crafted with precision.
          </p>

          {/* Back to top */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-xs tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors group cursor-pointer"
          >
            <span>Return to top</span>
            <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
