'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Scroll reveal hook ── */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ── Smooth scroll to section ── */
export function useSmoothScroll() {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return scrollTo;
}

/* ── Active section detection ── */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('');
  const manualLockRef = useRef<NodeJS.Timeout | null>(null);

  const setActiveManual = useCallback((id: string) => {
    setActiveSection(id);
    if (manualLockRef.current) clearTimeout(manualLockRef.current);
    manualLockRef.current = setTimeout(() => {
      manualLockRef.current = null;
    }, 850);
  }, []);

  useEffect(() => {
    const releaseLock = () => {
      if (manualLockRef.current) {
        clearTimeout(manualLockRef.current);
        manualLockRef.current = null;
      }
    };
    window.addEventListener('wheel', releaseLock, { passive: true });
    window.addEventListener('touchmove', releaseLock, { passive: true });

    const handleScroll = () => {
      if (manualLockRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // When near the top of the page (Hero section)
      if (scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      // When near the bottom of the page (Contact / Footer)
      if (scrollY + viewportHeight >= docHeight - 60) {
        const lastValidId = [...sectionIds].reverse().find((id) => id !== 'hero' && document.getElementById(id));
        if (lastValidId) {
          setActiveSection(lastValidId);
          return;
        }
      }

      // Reading focal line: below the ~112px fixed header
      const focalLine = Math.min(220, Math.max(130, viewportHeight * 0.28));

      // Gather valid elements and sort in true DOM vertical order
      const elements = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, el } : null;
        })
        .filter((item): item is { id: string; el: HTMLElement } => item !== null)
        .sort((a, b) => {
          const topA = a.el.getBoundingClientRect().top + scrollY;
          const topB = b.el.getBoundingClientRect().top + scrollY;
          return topA - topB;
        });

      if (elements.length === 0) return;

      // 1. Primary: Match section spanning the focal line
      let matchedSection = '';
      for (const { id, el } of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matchedSection = id;
          break;
        }
      }

      // 2. Secondary fallback: Match section with largest visible footprint
      if (!matchedSection) {
        let maxVisibleHeight = 0;
        for (const { id, el } of elements) {
          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            matchedSection = id;
          }
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', releaseLock);
      window.removeEventListener('touchmove', releaseLock);
      if (manualLockRef.current) clearTimeout(manualLockRef.current);
    };
  }, [sectionIds]);

  return { activeSection, setActiveSection: setActiveManual };
}

/* ── Mouse position for 3D interaction ── */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

/* ── Scroll progress (0-1) ── */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

/* ── Reduced motion preference ── */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    queueMicrotask(() => setReduced(mql.matches));

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}
