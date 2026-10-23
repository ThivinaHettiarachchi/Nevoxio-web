'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Globe,
  Smartphone,
  Cpu,
  Server,
  Terminal,
  Play,
  CheckCircle2,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import SectionBackground from './SectionBackground';

const SERVICES = [
  {
    id: 'web',
    number: '01',
    title: 'Web Development',
    category: 'Engineering & Experience',
    description:
      'High-performance websites and web applications engineered for speed, scalability, accessibility, and outstanding user experiences.',
    icon: Globe,
    accent: '#6366f1',
    accentClass: 'text-indigo-600 dark:text-indigo-400',
    accentBg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40',
    capabilities: ['Next.js 15 & React 19', 'Interactive 3D / WebGL', 'Lighthouse 100 Performance', 'Headless & Custom CMS'],
    demoType: 'web-perf',
  },
  {
    id: 'mobile',
    number: '02',
    title: 'Mobile App Development',
    category: 'iOS, Android & Cross-Platform',
    description:
      'Intuitive, reliable mobile applications designed to connect businesses with their customers across modern mobile platforms.',
    icon: Smartphone,
    accent: '#06b6d4',
    accentClass: 'text-cyan-600 dark:text-cyan-400',
    accentBg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40',
    capabilities: ['React Native & Flutter', 'Native iOS & Android', 'Offline-First Sync', 'Haptic Micro-Interactions'],
    demoType: 'mobile-app',
  },
  {
    id: 'software',
    number: '03',
    title: 'Software & Custom Solutions',
    category: 'Architecture & Automation',
    description:
      'Purpose-built software, automation systems, and digital tools designed around real business requirements.',
    icon: Cpu,
    accent: '#10b981',
    accentClass: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
    capabilities: ['Microservices Cluster', 'Enterprise Automation', 'Custom REST & GraphQL APIs', 'Intelligent Workflows'],
    demoType: 'software-arch',
  },
  {
    id: 'it',
    number: '04',
    title: 'IT Solutions & Management',
    category: 'DevOps & Infrastructure',
    description:
      'Technology implementation, system maintenance, ongoing improvements, and dependable digital infrastructure support.',
    icon: Server,
    accent: '#f59e0b',
    accentClass: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
    capabilities: ['Cloud Architecture (AWS)', 'CI/CD Automated Pipelines', 'Zero-Downtime Migration', '24/7 Reliability Telemetry'],
    demoType: 'devops-telemetry',
  },
];

/* ── Interactive Live Simulation Demos ── */
function ServiceLiveDemo({ type }: { type: string }) {
  const [ranTest, setRanTest] = useState(false);
  const [deviceScreen, setDeviceScreen] = useState<'home' | 'analytics'>('home');
  const [packetCount, setPacketCount] = useState(148);

  if (type === 'web-perf') {
    return (
      <div className="mt-3.5 p-3 rounded-xl border border-border-default bg-bg-secondary/70 backdrop-blur-sm text-left">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-default">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
            <Terminal size={12} className="text-indigo-500" />
            <span>Lighthouse Audit Suite</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setRanTest(true);
              setTimeout(() => setRanTest(false), 2000);
            }}
            className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Play size={9} /> {ranTest ? 'Auditing...' : 'Run Benchmark'}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="p-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-emerald-500 text-xs sm:text-sm font-bold">100</div>
            <div className="text-[9px] text-text-muted">Perf</div>
          </div>
          <div className="p-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-emerald-500 text-xs sm:text-sm font-bold">100</div>
            <div className="text-[9px] text-text-muted">Access</div>
          </div>
          <div className="p-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-emerald-500 text-xs sm:text-sm font-bold">100</div>
            <div className="text-[9px] text-text-muted">Best</div>
          </div>
          <div className="p-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-emerald-500 text-xs sm:text-sm font-bold">100</div>
            <div className="text-[9px] text-text-muted">SEO</div>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-text-muted flex items-center justify-between font-mono">
          <span>LCP: 0.62s</span>
          <span className="text-emerald-500 font-semibold flex items-center gap-1">
            <CheckCircle2 size={10} /> Passing Core Web Vitals
          </span>
        </div>
      </div>
    );
  }

  if (type === 'mobile-app') {
    return (
      <div className="mt-3.5 p-3 rounded-xl border border-border-default bg-bg-secondary/70 backdrop-blur-sm text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-default">
          <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
            <Smartphone size={11} /> iOS & Android Sandbox
          </span>
          <div className="flex gap-1 text-[9px] font-mono">
            <button
              onClick={(e) => { e.preventDefault(); setDeviceScreen('home'); }}
              className={`px-2 py-0.5 rounded ${deviceScreen === 'home' ? 'bg-cyan-500 text-white' : 'text-text-muted'}`}
            >
              Feed
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setDeviceScreen('analytics'); }}
              className={`px-2 py-0.5 rounded ${deviceScreen === 'analytics' ? 'bg-cyan-500 text-white' : 'text-text-muted'}`}
            >
              Stats
            </button>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-bg-primary border border-border-default flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-text-primary">
              {deviceScreen === 'home' ? 'Fluid Gesture Navigation' : 'Real-Time Biometrics Sync'}
            </div>
            <div className="text-[10px] text-text-muted mt-0.5">
              {deviceScreen === 'home' ? '120 Hz ProMotion animation profile' : 'Secure enclave encrypted storage'}
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-cyan-500">60 FPS</span>
        </div>
      </div>
    );
  }

  if (type === 'software-arch') {
    return (
      <div className="mt-3.5 p-3 rounded-xl border border-border-default bg-bg-secondary/70 backdrop-blur-sm text-left">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-border-default">
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <Layers size={11} /> Cloud Architecture Bus
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPacketCount((c) => c + 1);
            }}
            className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Zap size={9} /> Pulse Packet
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
          <div className="p-1.5 rounded bg-bg-primary border border-border-default flex flex-col items-center">
            <span className="text-text-muted text-[9px]">API Gateway</span>
            <span className="text-emerald-500 font-bold mt-0.5">&lt; 8ms</span>
          </div>
          <div className="p-1.5 rounded bg-bg-primary border border-border-default flex flex-col items-center">
            <span className="text-text-muted text-[9px]">Microservice</span>
            <span className="text-indigo-500 font-bold mt-0.5">{packetCount} req/s</span>
          </div>
          <div className="p-1.5 rounded bg-bg-primary border border-border-default flex flex-col items-center">
            <span className="text-text-muted text-[9px]">PostgreSQL</span>
            <span className="text-emerald-500 font-bold mt-0.5">Synced ✓</span>
          </div>
        </div>
      </div>
    );
  }

  // DevOps telemetry
  return (
    <div className="mt-3.5 p-3 rounded-xl border border-border-default bg-bg-secondary/70 backdrop-blur-sm text-left">
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-border-default">
        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
          <Activity size={11} className="text-amber-500" /> Infrastructure Telemetry
        </span>
        <span className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          99.99% SLA
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
        <div className="p-1.5 rounded bg-bg-primary border border-border-default">
          <div className="text-[9px] text-text-muted">CPU Cluster</div>
          <div className="text-amber-500 font-bold mt-0.5">18.4% Load</div>
        </div>
        <div className="p-1.5 rounded bg-bg-primary border border-border-default">
          <div className="text-[9px] text-text-muted">Global Edge</div>
          <div className="text-emerald-500 font-bold mt-0.5">38 Regions</div>
        </div>
        <div className="p-1.5 rounded bg-bg-primary border border-border-default">
          <div className="text-[9px] text-text-muted">Auto-Heal</div>
          <div className="text-text-primary font-bold mt-0.5">Active ✓</div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <div ref={ref}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${-mousePos.y * 2.5}deg) rotateY(${mousePos.x * 2.5}deg)`
            : 'perspective(1000px) rotateX(0) rotateY(0)',
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        }}
        className="group relative p-5 sm:p-6 rounded-2xl border border-border-default
          bg-card-bg hover:border-border-strong
          transition-all duration-300 cursor-default h-full flex flex-col justify-between shadow-xs hover:shadow-xl"
      >
        <div>
          {/* Top row: Number & Icon */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.6875rem] font-mono font-bold tracking-[0.2em] text-text-muted">
              {service.number}
            </span>

            <div
              className={`w-10 h-10 flex items-center justify-center rounded-xl border ${service.accentBg} transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon size={19} strokeWidth={1.5} className={service.accentClass} />
            </div>
          </div>

          {/* Category subtitle */}
          <span className="text-[0.6875rem] font-semibold tracking-wider uppercase text-text-muted block mb-1">
            {service.category}
          </span>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-text-primary mb-2">
            {service.title}
          </h3>

          {/* Description */}
          <p className="body-text text-text-secondary text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
            {service.description}
          </p>

          {/* Capabilities tags */}
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {service.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-[10px] sm:text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-bg-secondary text-text-secondary border border-border-default"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Live Interactive Interactive Simulation Demo */}
        <div>
          <ServiceLiveDemo type={service.demoType} />

          {/* Learn More link */}
          <div className="mt-4 pt-3 border-t border-border-default flex items-center justify-between text-text-muted group-hover:text-text-primary transition-colors text-xs font-semibold">
            <span>Explore Architecture</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.15);

  return (
    <section id="services" className="section-spacing-lg relative">
      <SectionBackground variant="services" />
      <div className="container-premium relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-14 lg:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[1px] bg-border-strong opacity-60" />
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-text-muted">
              OUR CAPABILITIES
            </span>
          </motion.div>
          <motion.h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-text-primary leading-[1.12]"
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Engineered with precision.<br />
            <span className="italic font-normal text-text-secondary">Designed to endure.</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From high-concurrency web engines and mobile ecosystems to distributed cloud architectures, 
            we develop technology designed to scale and impress.
          </motion.p>
        </div>

        {/* Services 2x2 Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
