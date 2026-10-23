'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Activity, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Maximize2, 
  X,
  Layers,
  CheckCircle2,
  Users,
  Award
} from 'lucide-react';
import { useScrollReveal, useSmoothScroll } from '@/hooks/useAnimations';
import SectionBackground from './SectionBackground';

const CATEGORIES = ['All', 'Web Applications', 'Platforms & IoT', 'Brand'];

export interface ProjectData {
  id: string;
  title: string;
  category: 'Web Applications' | 'Platforms & IoT' | 'Brand';
  typeLabel: string;
  tagline: string;
  client: string;
  metrics: string;
  description: string;
  image: string;
  displayUrl: string;
  url: string;
  tags: string[];
  accent: string;
  accentLight: string;
  accentDark: string;
  topGradient: string;
  bgGradient: string;
  badge: string;
  laserColor: string;
  laserSecondary: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: 'nifedify',
    title: 'NifEdify',
    category: 'Web Applications',
    typeLabel: 'EdTech & LMS Platform',
    tagline: 'Interactive Commerce Learning Ecosystem',
    client: 'Nifran Nawas (Lecturer & Mentor)',
    metrics: '1,000+ Students • 6+ Yrs Legacy',
    badge: 'Live Production',
    description: 'Comprehensive educational platform engineered for leading A/L Accounting lecturer Nifran Nawas. Features interactive lecture delivery, secure study module (Tute) distribution, student onboarding, and real-time competitive leaderboards.',
    image: '/projects/nifedify.png',
    displayUrl: 'nifedify.com',
    url: 'https://www.nifedify.com/',
    tags: ['LMS Engine', 'Leaderboards', 'Student Portal', 'Next.js', 'Tailwind'],
    accent: '#6366f1',
    laserColor: '#a5b4fc',
    laserSecondary: '#6366f1',
    accentLight: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80',
    accentDark: 'bg-indigo-950/50 text-indigo-300 border-indigo-800/40',
    topGradient: 'from-indigo-500 via-purple-500 to-indigo-600',
    bgGradient: 'from-indigo-500/[0.07] via-purple-500/[0.03] to-transparent',
  },
  {
    id: 'tripler',
    title: 'Triple R Holidays',
    category: 'Web Applications',
    typeLabel: 'Luxury Travel Booking Engine',
    tagline: 'Refined Tourism & Expedition Platform',
    client: 'Triple R Holidays Pvt Ltd',
    metrics: '4.98★ Rating • Sri Lanka & Beyond',
    badge: 'Live Booking Engine',
    description: 'Immersive travel and tour booking platform for luxury expeditions across Sri Lanka and international destinations. Features dynamic custom itinerary planning, curated tour packages, corporate retreats, and seamless inquiry booking.',
    image: '/projects/tripler.jpg',
    displayUrl: 'triplerholidays.com',
    url: 'https://triplerholidays.com/',
    tags: ['Booking Engine', 'Itinerary Planner', 'Payments', 'Cloud Infra', 'SEO'],
    accent: '#10b981',
    laserColor: '#6ee7b7',
    laserSecondary: '#10b981',
    accentLight: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
    accentDark: 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40',
    topGradient: 'from-emerald-500 via-teal-500 to-emerald-600',
    bgGradient: 'from-emerald-500/[0.07] via-teal-500/[0.03] to-transparent',
  },
  {
    id: 'fritzo',
    title: 'Fritzo',
    category: 'Brand',
    typeLabel: 'Haute Parfumerie Flagship',
    tagline: 'Editorial Olfactory E-Commerce Experience',
    client: 'Fritzo House of Fine Fragrance',
    metrics: 'Bespoke Editorial Aesthetics',
    badge: 'Brand Flagship',
    description: 'Bespoke digital brand universe for luxury fragrance house Fritzo. Designed with poetic visual storytelling, refined French editorial typography, interactive fragrance notes explorer, and sensory e-commerce showcases.',
    image: '/projects/fritzo.png',
    displayUrl: 'fritzo.vercel.app',
    url: 'https://fritzo-website.vercel.app/',
    tags: ['Editorial UI', 'Fragrance Explorer', 'Sensory E-Com', 'Micro-Interactions'],
    accent: '#f59e0b',
    laserColor: '#fcd34d',
    laserSecondary: '#f59e0b',
    accentLight: 'bg-amber-50/90 text-amber-800 border-amber-200/80',
    accentDark: 'bg-amber-950/50 text-amber-300 border-amber-800/40',
    topGradient: 'from-amber-500 via-orange-500 to-amber-600',
    bgGradient: 'from-amber-500/[0.07] via-orange-500/[0.03] to-transparent',
  },
  {
    id: 'carsale',
    title: 'CarSale',
    category: 'Web Applications',
    typeLabel: 'Automotive Marketplace Engine',
    tagline: 'Luxury Imports & Verified Pre-Owned Vehicles',
    client: 'CarSale Motors',
    metrics: 'Verified Luxury Inventory',
    badge: 'Live Marketplace',
    description: 'High-performance automotive marketplace built for modern luxury dealerships. Features real-time vehicle inventory filtering, high-definition specification showcases, finance calculators, and direct WhatsApp / call inquiry integration.',
    image: '/projects/carsale.png',
    displayUrl: 'carsale.vercel.app',
    url: 'https://carsale-jade.vercel.app/',
    tags: ['Marketplace Engine', 'Live Inventory', 'Filter System', 'Dealer CRM'],
    accent: '#06b6d4',
    laserColor: '#67e8f9',
    laserSecondary: '#06b6d4',
    accentLight: 'bg-cyan-50/90 text-cyan-800 border-cyan-200/80',
    accentDark: 'bg-cyan-950/50 text-cyan-300 border-cyan-800/40',
    topGradient: 'from-cyan-500 via-blue-500 to-cyan-600',
    bgGradient: 'from-cyan-500/[0.07] via-blue-500/[0.03] to-transparent',
  },
  {
    id: 'alertrix',
    title: 'AlertRix',
    category: 'Platforms & IoT',
    typeLabel: 'AI & IoT Healthcare Platform',
    tagline: 'Intelligent Elderly Care & Medication Dispenser',
    client: 'Alertrix Healthcare Innovations',
    metrics: 'Smart Alerts • Safe Doses',
    badge: 'Hardware & IoT Hub',
    description: 'Next-generation AI-powered medical IoT companion and automated medication dispenser. Features synchronized cloud telemetry, real-time guardian mobile alerts, scheduled dosage verification, and senior safety monitoring.',
    image: '/projects/alertrix.png',
    displayUrl: 'alertrix.lk',
    url: 'https://alertrix.lk/',
    tags: ['IoT Hardware Platform', 'AI Dispenser', 'Guardian Mobile Sync', 'HealthTech'],
    accent: '#f43f5e',
    laserColor: '#fda4af',
    laserSecondary: '#f43f5e',
    accentLight: 'bg-rose-50/90 text-rose-800 border-rose-200/80',
    accentDark: 'bg-rose-950/50 text-rose-300 border-rose-800/40',
    topGradient: 'from-rose-500 via-pink-500 to-rose-600',
    bgGradient: 'from-rose-500/[0.07] via-pink-500/[0.03] to-transparent',
  },
];

/* ── Lightbox Modal for Full-Resolution Screenshot Inspection ── */
function ProjectLightbox({ 
  project, 
  onClose 
}: { 
  project: ProjectData | null; 
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#121316] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Modal Browser Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-default bg-bg-secondary/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-border-default text-xs font-mono text-text-secondary">
              <Lock size={11} className="text-emerald-500" />
              <span>https://{project.displayUrl}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-text-primary text-bg-primary hover:opacity-90 transition-opacity"
            >
              <span>Visit Live System</span>
              <ArrowUpRight size={13} />
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-grow p-5 sm:p-8 space-y-6">
          {/* High Resolution Image Frame */}
          <div className="relative w-full rounded-xl overflow-hidden border border-border-default bg-black/5 shadow-inner">
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5]">
              <Image
                src={project.image}
                alt={`${project.title} Screenshot`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${project.accentLight} dark:${project.accentDark}`}>
                  {project.typeLabel}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Client: {project.client}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary">
                {project.title} — {project.tagline}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 p-4 rounded-xl border border-border-default bg-bg-secondary/50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                  Key Deliverables & Stack
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-bg-primary border border-border-default text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border-default">
                <div className="text-[11px] text-text-muted uppercase font-mono">Performance Metric</div>
                <div className="text-sm font-semibold text-text-primary mt-0.5">{project.metrics}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Continuous Running Perimeter Laser Border with Premium Razor-Thin Stroke ── */
function TileLaserBorder({ 
  laserColor, 
  laserSecondary, 
  index 
}: { 
  laserColor: string; 
  laserSecondary: string; 
  index: number;
}) {
  const animDelay = `${index * -0.9}s`;
  const headDelay = `calc(${animDelay} - 0.35s)`;

  return (
    <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-visible z-20">
      <svg 
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Delicate Atmospheric Glow Aura (Soft, subtle optical dispersion) */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="16"
          ry="16"
          fill="none"
          stroke={laserSecondary}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="22 78"
          pathLength="100"
          className="animate-laser-perimeter opacity-40 dark:opacity-60"
          style={{
            animationDelay: animDelay,
            filter: 'blur(3.5px)',
          }}
        />

        {/* Layer 2: Precision Razor Laser Filament (Sleek 1.75px colored stroke with tight optical halo) */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="16"
          ry="16"
          fill="none"
          stroke={laserColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="18 82"
          pathLength="100"
          className="animate-laser-perimeter opacity-95 dark:opacity-100"
          style={{
            animationDelay: animDelay,
            filter: `drop-shadow(0 0 2.5px ${laserColor}) drop-shadow(0 0 5px ${laserSecondary})`,
          }}
        />

        {/* Layer 3: Concentrated Saturated Laser Beam */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="16"
          ry="16"
          fill="none"
          stroke={laserSecondary}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="14 86"
          pathLength="100"
          className="animate-laser-perimeter opacity-100"
          style={{
            animationDelay: animDelay,
          }}
        />

        {/* Layer 4: Needle-Sharp White-Hot Focal Spark (Ultra-fine 0.85px leading tip) */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="16"
          ry="16"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeDasharray="7 93"
          pathLength="100"
          className="animate-laser-perimeter opacity-100"
          style={{
            animationDelay: headDelay,
          }}
        />
      </svg>
    </div>
  );
}

/* ── Individual Project Card with Smooth Moving Laser Border Glow ── */
function ProjectCard({ 
  project, 
  index, 
  onInspect 
}: { 
  project: ProjectData; 
  index: number;
  onInspect: (project: ProjectData) => void;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="col-span-1"
    >
      {/* 
        ══════════════════════════════════════════════════════════════
        SMOOTH CONTINUOUS LASER PERIMETER TILE
        Continuous 360-degree laser runner with thick stroke
        ══════════════════════════════════════════════════════════════
      */}
      <div className="group relative rounded-2xl h-full transition-all duration-500 hover:-translate-y-1.5 shadow-xs hover:shadow-2xl">
        
        {/* Continuous 360° Running Laser Border with Thick Stroke */}
        <TileLaserBorder
          laserColor={project.laserColor}
          laserSecondary={project.laserSecondary}
          index={index}
        />

        {/* Solid Inner Card Container */}
        <div
          className="relative rounded-2xl bg-white dark:bg-[#0e1015] border border-black/[0.08] dark:border-white/[0.08]
            overflow-hidden h-full flex flex-col justify-between z-10"
        >
          {/* Top Accent Gradient Bar with Scanning Laser Pulse */}
          <div className={`relative h-1 w-full bg-gradient-to-r ${project.topGradient} overflow-hidden`}>
            {/* Smooth Top Horizontal Laser Scanner */}
            <div 
              className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none animate-laser-scan opacity-95"
              style={{ animationDelay: `${index * -0.7}s` }}
            />
          </div>

          {/* Browser Top Bar Mockup */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-default/60 bg-bg-secondary/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90" />
            </div>

            {/* Mini URL pill */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bg-primary/90 border border-border-default/60 text-[10px] font-mono text-text-muted truncate max-w-[170px]">
              <Lock size={10} className="text-emerald-500 shrink-0" />
              <span className="truncate">{project.displayUrl}</span>
            </div>

            {/* Status Badge */}
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-medium px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {project.badge}
            </span>
          </div>

          {/* Production Screenshot Viewport - Clicking picture redirects directly to live site */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full h-[220px] sm:h-[240px] overflow-hidden bg-bg-secondary/30 group/viewport cursor-pointer"
            aria-label={`Open ${project.title} live system in new tab`}
          >
            <Image
              src={project.image}
              alt={`${project.title} Screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover/viewport:scale-105"
              priority={index < 3}
            />

            {/* Subtle gradient vignette to blend image with card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover/viewport:opacity-100 transition-opacity duration-300" />

            {/* Floating Live Site Action Pill on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/viewport:opacity-100 transition-all duration-300 bg-black/25 backdrop-blur-[2px]">
              <span className="px-4 py-2 rounded-full bg-white text-neutral-950 dark:bg-white dark:text-neutral-900 text-xs font-semibold shadow-xl border border-white/20 transition-transform duration-300 transform scale-95 group-hover/viewport:scale-100 inline-flex items-center gap-1.5 pointer-events-none">
                <span>Visit Live Site</span>
                <ExternalLink size={12} />
              </span>
            </div>
          </a>

          {/* Content Body */}
          <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
            <div>
              {/* Category Pill & Quick Direct Link */}
              <div className="flex items-center justify-between mb-3.5">
                <span className={`text-[0.6875rem] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${project.accentLight} dark:${project.accentDark}`}>
                  {project.typeLabel}
                </span>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-border-default flex items-center justify-center
                    text-text-muted hover:text-text-primary hover:border-text-primary
                    hover:bg-text-primary hover:text-bg-primary transition-all duration-300"
                  aria-label={`Open ${project.title} live system`}
                >
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-text-primary text-xl font-bold tracking-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs font-serif italic text-text-secondary mb-3">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {project.description}
              </p>
            </div>

            <div>
              {/* Key Metrics / Client Line */}
              <div className="flex items-center gap-2 mb-4 text-[11px] font-mono text-text-muted border-t border-border-default/60 pt-3">
                <Award size={12} className="text-amber-500 shrink-0" />
                <span className="truncate">{project.metrics}</span>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.6875rem] font-medium px-2.5 py-1 rounded-full
                      bg-bg-secondary text-text-secondary border border-border-default group-hover:border-border-strong transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live Link Button with Flawless Alignment */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-3.5 border-t border-border-default/60 flex items-center justify-between text-xs font-semibold text-text-muted group-hover:text-text-primary transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Launch Live Experience
                </span>
                <ExternalLink size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Interactive Engineering Capabilities & Performance Sandbox ── */
function CapabilitiesPlayground() {
  const [activeTab, setActiveTab] = useState<'webgl' | 'cloud' | 'ai' | 'iot'>('webgl');
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [simScore, setSimScore] = useState(99.4);

  const runLiveTest = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      setSimScore(Number((98.5 + Math.random() * 1.4).toFixed(1)));
      setIsBenchmarking(false);
    }, 700);
  };

  return (
    <div className="mt-20 p-6 sm:p-8 rounded-3xl border border-border-default/80 bg-white/60 dark:bg-card-bg/60 backdrop-blur-md shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-default">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold block mb-1">
            Client Verification Suite
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
            Engineering Capabilities Matrix
          </h3>
        </div>

        {/* Tab switchers with distinct button sizes */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'webgl', label: '3D WebGL Engine' },
              { id: 'cloud', label: 'Cloud Architecture' },
              { id: 'ai', label: 'AI & Real-time' },
              { id: 'iot', label: 'IoT & Cross-Platform' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-text-primary text-bg-primary shadow-xs'
                  : 'text-text-muted hover:text-text-primary bg-bg-primary border border-border-default'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Benchmark Content View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="md:col-span-2 space-y-4">
          {activeTab === 'webgl' && (
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">60 FPS Hardware-Accelerated 3D WebGL Pipeline</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Custom Three.js shader architecture, instanced mesh buffering, and real-time physical transmission optics calibrated to maintain 60 frames per second across mobile and desktop.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Frame Rate</span>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">60.0 FPS</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Draw Calls</span>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">&lt; 14 Calls</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">GPU Memory</span>
                  <div className="text-lg font-bold text-text-primary font-mono">42 MB</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cloud' && (
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">High-Throughput Distributed Cloud Infrastructure</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Zero-downtime containerized deployments on AWS and GCP with edge-cached CDNs, automated failover routing, and sub-50ms international TTFB.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Global TTFB</span>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">38ms</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Uptime Guarantee</span>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">99.99%</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Auto-Scale</span>
                  <div className="text-lg font-bold text-text-primary font-mono">100k+ req/s</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">Real-Time AI Agents & Streaming Vector Retrieval</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Enterprise agentic workflows, contextual RAG databases, and sub-second token streaming with resilient token budget management and guardrails.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Token Stream</span>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">94 tok/s</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Embedding Search</span>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">12ms</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Context Accuracy</span>
                  <div className="text-lg font-bold text-text-primary font-mono">99.2%</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'iot' && (
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">Mission-Critical IoT Companion & Mobile Sync</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Bi-directional WebSocket and MQTT telemetry syncing edge IoT sensors with iOS and Android applications under strict latency constraints.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Sensor Heartbeat</span>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">100ms</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">MQTT Security</span>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">mTLS 1.3</div>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-bg-secondary/70">
                  <span className="text-[10px] text-text-muted uppercase font-medium">Battery Impact</span>
                  <div className="text-lg font-bold text-text-primary font-mono">&lt; 1.2%/day</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Panel with Interactive Benchmark Trigger */}
        <div className="p-5 rounded-2xl border border-border-default bg-bg-secondary/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono text-text-muted">Live Benchmark</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="text-2xl font-bold font-mono text-text-primary">{simScore}%</div>
            <span className="text-[10px] text-text-muted">Aggregate Systems Quality Index</span>
          </div>

          <button
            onClick={runLiveTest}
            disabled={isBenchmarking}
            className="mt-6 w-full h-10 px-4 rounded-full bg-text-primary text-bg-primary text-xs font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            <Activity size={13} className={isBenchmarking ? 'animate-spin' : ''} />
            <span>{isBenchmarking ? 'Running Telemetry...' : 'Run Live Benchmark'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.15);
  const scrollTo = useSmoothScroll();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inspectedProject, setInspectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="section-spacing-lg relative bg-bg-secondary/40 border-t border-border-default">
      <SectionBackground variant="work" />
      <div className="container-premium relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-border-strong opacity-60" />
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-text-muted">
                SELECTED COMMISSIONS & SYSTEMS
              </span>
            </motion.div>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-text-primary leading-[1.12]"
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Crafted systems.<br />
              <span className="italic font-normal text-text-secondary">Measurable impact.</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-base sm:text-lg text-text-secondary max-w-md font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A curated showcase of production platforms, proprietary IoT companions, and brand ecosystems delivered for visionary clients.
          </motion.p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border-default/80">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-text-primary text-bg-primary shadow-xs'
                  : 'text-text-muted hover:text-text-primary bg-bg-primary border border-border-default hover:border-border-strong'
              }`}
            >
              {cat}
              {cat === 'All' && ` (${PROJECTS.length})`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={i}
                onInspect={(p) => setInspectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal for Case Inspection */}
        <AnimatePresence>
          {inspectedProject && (
            <ProjectLightbox
              project={inspectedProject}
              onClose={() => setInspectedProject(null)}
            />
          )}
        </AnimatePresence>

        {/* Interactive Engineering Capabilities Playground */}
        <CapabilitiesPlayground />

        {/* CTA Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer group"
          >
            <span>Have a custom vision in mind? Let&apos;s build it together</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
