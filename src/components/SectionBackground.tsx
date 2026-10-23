'use client';

interface SectionBackgroundProps {
  variant: 'services' | 'work' | 'about' | 'process' | 'contact';
}

export default function SectionBackground({ variant }: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ──────────────── SERVICES VARIANT ──────────────── */}
      {variant === 'services' && (
        <>
          {/* Luminous Floating Ambient Mesh Orbs */}
          <div 
            className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full blur-[110px] opacity-35 dark:opacity-50 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(6,182,212,0.25) 50%, transparent 70%)',
            }}
          />
          <div 
            className="absolute -bottom-24 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 dark:opacity-45 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(99,102,241,0.20) 50%, transparent 70%)',
            }}
          />

          {/* Visible Architectural Dot-Matrix Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.10] dark:opacity-[0.18]">
            <defs>
              <pattern id="grid-pattern-services" width="70" height="70" patternUnits="userSpaceOnUse">
                <path d="M 70 0 L 0 0 0 70" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="70" cy="70" r="1.8" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-services)" />
          </svg>

          {/* Moving Horizontal Laser Scan Beam */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.85)] animate-laser-scan opacity-70" />

          {/* Drifting Cyber Constellation Nodes with Halos */}
          <div className="absolute top-[22%] left-[8%] flex items-center justify-center animate-particle-float">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
            <span className="absolute w-5 h-5 rounded-full border border-indigo-400/40 animate-ping" />
          </div>
          <div className="absolute top-[38%] right-[12%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-2s' }}>
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
          </div>
          <div className="absolute bottom-[28%] left-[18%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-3.5s' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </div>
          <div className="absolute bottom-[18%] right-[10%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-5s' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
          </div>
        </>
      )}

      {/* ──────────────── SELECTED WORK VARIANT ──────────────── */}
      {variant === 'work' && (
        <>
          {/* Ambient Corner Atmosphere */}
          <div 
            className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full blur-[120px] opacity-30 dark:opacity-45 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(99,102,241,0.18) 55%, transparent 75%)',
            }}
          />
          <div 
            className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[110px] opacity-25 dark:opacity-40 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(244,63,94,0.15) 55%, transparent 75%)',
            }}
          />

          {/* Diagonal Laser Circuit Vector Traces */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.16]">
            <line x1="0" y1="15%" x2="100%" y2="45%" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 12" />
            <line x1="0" y1="55%" x2="100%" y2="85%" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 12" />
          </svg>

          {/* Floating Starlight Motes with Glowing Pulse Rings */}
          <div className="absolute top-[20%] right-[6%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-1s' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
            <span className="absolute w-6 h-6 rounded-full border border-emerald-400/40 animate-pulse" />
          </div>
          <div className="absolute top-[60%] left-[5%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-2.8s' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
          </div>
          <div className="absolute bottom-[20%] right-[16%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-4.2s' }}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </div>
          <div className="absolute bottom-[40%] left-[22%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-5.5s' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc]" />
          </div>
        </>
      )}

      {/* ──────────────── ABOUT / OUR STORY VARIANT ──────────────── */}
      {variant === 'about' && (
        <>
          {/* Warm Radiant Narrative Aura */}
          <div 
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 dark:opacity-45 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.30) 0%, rgba(244,63,94,0.18) 50%, transparent 75%)',
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-[520px] h-[520px] rounded-full blur-[110px] opacity-25 dark:opacity-40 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(6,182,212,0.18) 50%, transparent 75%)',
            }}
          />

          {/* Flowing Animated Topographic Contour Waves */}
          <svg 
            className="absolute inset-0 w-[140%] -left-[20%] h-full opacity-[0.16] dark:opacity-[0.28] overflow-visible animate-wave-contour"
            viewBox="0 0 1600 800"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path 
              d="M0,180 C400,60 700,320 1100,160 C1400,40 1700,260 2000,180" 
              stroke="url(#wave-grad-1)" 
              strokeWidth="1.8" 
              strokeDasharray="6 8"
            />
            <path 
              d="M0,380 C350,220 750,480 1150,290 C1450,150 1750,410 2000,340" 
              stroke="url(#wave-grad-2)" 
              strokeWidth="2"
            />
            <path 
              d="M0,580 C420,420 800,680 1200,480 C1500,320 1800,580 2000,520" 
              stroke="url(#wave-grad-1)" 
              strokeWidth="1.8" 
              strokeDasharray="5 7"
            />
          </svg>

          {/* Micro Engineering Crosshairs */}
          <div className="absolute top-12 left-12 text-indigo-400/40 dark:text-indigo-300/60 font-mono text-sm select-none hidden md:block">+</div>
          <div className="absolute top-12 right-12 text-indigo-400/40 dark:text-indigo-300/60 font-mono text-sm select-none hidden md:block">+</div>
          <div className="absolute bottom-12 left-12 text-indigo-400/40 dark:text-indigo-300/60 font-mono text-sm select-none hidden md:block">+</div>
          <div className="absolute bottom-12 right-12 text-indigo-400/40 dark:text-indigo-300/60 font-mono text-sm select-none hidden md:block">+</div>
        </>
      )}

      {/* ──────────────── PROCESS VARIANT ──────────────── */}
      {variant === 'process' && (
        <>
          {/* Atmospheric Tech Aura */}
          <div 
            className="absolute top-1/4 -left-10 w-[520px] h-[520px] rounded-full blur-[110px] opacity-30 dark:opacity-45 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(99,102,241,0.20) 50%, transparent 75%)',
            }}
          />
          <div 
            className="absolute bottom-1/4 -right-10 w-[480px] h-[480px] rounded-full blur-[100px] opacity-25 dark:opacity-40 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(6,182,212,0.18) 50%, transparent 75%)',
            }}
          />

          {/* Moving Laser Horizontal Scan Beam */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_12px_rgba(99,102,241,0.85)] animate-laser-scan opacity-60" style={{ animationDelay: '-3.5s' }} />

          {/* Stepped Architectural Guide Tracks */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.16]">
            <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="10%" y1="80%" x2="90%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          </svg>

          {/* Floating Process Sequence Pulse Nodes */}
          <div className="absolute top-[28%] left-[20%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-1s' }}>
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
            <span className="absolute w-7 h-7 rounded-full border border-cyan-400/50 animate-ping" />
          </div>
          <div className="absolute top-[48%] right-[25%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-2.8s' }}>
            <span className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8]" />
          </div>
          <div className="absolute bottom-[24%] left-[35%] flex items-center justify-center animate-particle-float" style={{ animationDelay: '-4.5s' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          </div>
        </>
      )}

      {/* ──────────────── CONTACT VARIANT ──────────────── */}
      {variant === 'contact' && (
        <>
          {/* Active Concentric Cyber Sonar / Radar Rings */}
          <div className="absolute -bottom-10 -left-10 w-[550px] h-[550px] pointer-events-none">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/70 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-radar-ripple" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-radar-ripple" style={{ animationDelay: '-2.5s' }} />
            <div className="absolute inset-0 rounded-full border-2 border-indigo-400/50 animate-radar-ripple" style={{ animationDelay: '-5s' }} />
          </div>

          {/* Focal Atmospheric Glow Behind Form */}
          <div 
            className="absolute top-1/3 right-10 w-[560px] h-[560px] rounded-full blur-[110px] opacity-30 dark:opacity-45 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(244,63,94,0.18) 50%, transparent 75%)',
            }}
          />
        </>
      )}
    </div>
  );
}
