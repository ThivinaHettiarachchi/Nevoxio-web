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
          {/* Subtle Floating Ambient Auras */}
          <div 
            className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full blur-[130px] opacity-25 dark:opacity-40 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(6,182,212,0.12) 50%, transparent 70%)',
            }}
          />
          <div 
            className="absolute -bottom-36 -left-36 w-[480px] h-[480px] rounded-full blur-[120px] opacity-20 dark:opacity-35 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(99,102,241,0.10) 50%, transparent 70%)',
            }}
          />

          {/* Precision Architectural Grid & Nodes */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.065]">
            <defs>
              <pattern id="grid-pattern-services" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="80" cy="80" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-services)" />
          </svg>

          {/* Drifting Cyber Constellation Nodes */}
          <div className="absolute top-1/4 left-[10%] w-1.5 h-1.5 rounded-full bg-indigo-500/50 dark:bg-indigo-400/70 animate-particle-float" />
          <div className="absolute top-1/3 right-[15%] w-2 h-2 rounded-full bg-cyan-500/40 dark:bg-cyan-400/60 animate-particle-float" style={{ animationDelay: '-2.5s' }} />
          <div className="absolute bottom-1/4 left-[20%] w-1 h-1 rounded-full bg-emerald-500/40 dark:bg-emerald-400/60 animate-particle-float" style={{ animationDelay: '-4s' }} />
          <div className="absolute bottom-1/3 right-[8%] w-1.5 h-1.5 rounded-full bg-indigo-500/40 dark:bg-indigo-300/60 animate-particle-float" style={{ animationDelay: '-5.5s' }} />

          {/* Subtle Coordinate Watermarks */}
          <div className="absolute top-8 right-8 font-mono text-[9px] tracking-[0.25em] text-text-muted/30 uppercase hidden md:block">
            SYS.CAPABILITIES // 01-04
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-[9px] tracking-[0.25em] text-text-muted/30 uppercase hidden md:block">
            LAT: 06°55&apos;N // ARCH.GRID
          </div>
        </>
      )}

      {/* ──────────────── SELECTED WORK VARIANT ──────────────── */}
      {variant === 'work' && (
        <>
          {/* Subtle Corner Ambient Depth (Quiet, letting the cards shine) */}
          <div 
            className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 dark:opacity-30 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(99,102,241,0.08) 60%, transparent 75%)',
            }}
          />
          <div 
            className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full blur-[130px] opacity-15 dark:opacity-25 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, rgba(244,63,94,0.08) 60%, transparent 75%)',
            }}
          />

          {/* Very Faint Diagonal Horizon Vector Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.045]">
            <line x1="0" y1="20%" x2="100%" y2="40%" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" />
            <line x1="0" y1="65%" x2="100%" y2="85%" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" />
          </svg>

          {/* Floating Stardust Particles */}
          <div className="absolute top-1/5 right-[8%] w-1.5 h-1.5 rounded-full bg-emerald-400/40 animate-particle-float" style={{ animationDelay: '-1s' }} />
          <div className="absolute top-3/5 left-[6%] w-1.5 h-1.5 rounded-full bg-amber-400/40 animate-particle-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute bottom-1/5 right-[18%] w-1 h-1 rounded-full bg-cyan-400/40 animate-particle-float" style={{ animationDelay: '-5s' }} />

          {/* Subtle Technical Margin Lines */}
          <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-border-default/40 hidden xl:block" />
          <div className="absolute top-0 bottom-0 right-6 w-[1px] bg-border-default/40 hidden xl:block" />
        </>
      )}

      {/* ──────────────── ABOUT / OUR STORY VARIANT ──────────────── */}
      {variant === 'about' && (
        <>
          {/* Warm Radiant Narrative Aura */}
          <div 
            className="absolute -top-24 left-1/3 w-[560px] h-[560px] rounded-full blur-[140px] opacity-20 dark:opacity-35 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(244,63,94,0.12) 45%, transparent 70%)',
            }}
          />
          <div 
            className="absolute -bottom-24 right-1/4 w-[480px] h-[480px] rounded-full blur-[120px] opacity-15 dark:opacity-30 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(6,182,212,0.10) 50%, transparent 70%)',
            }}
          />

          {/* Flowing Topographic Contour Vector Waves */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.06] overflow-visible animate-wave-contour"
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="none"
          >
            <path 
              d="M-100,200 C300,100 600,350 1000,180 C1300,50 1500,280 1700,200" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeDasharray="4 8"
            />
            <path 
              d="M-100,380 C250,260 580,500 950,320 C1250,180 1480,420 1700,350" 
              stroke="currentColor" 
              strokeWidth="1.2"
            />
            <path 
              d="M-100,560 C320,440 680,680 1050,480 C1320,340 1520,580 1700,520" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeDasharray="3 6"
            />
          </svg>

          {/* Micro-Crosshair Engineering Markers */}
          <div className="absolute top-10 left-10 text-text-muted/25 font-mono text-xs select-none hidden md:block">+</div>
          <div className="absolute top-10 right-10 text-text-muted/25 font-mono text-xs select-none hidden md:block">+</div>
          <div className="absolute bottom-10 left-10 text-text-muted/25 font-mono text-xs select-none hidden md:block">+</div>
          <div className="absolute bottom-10 right-10 text-text-muted/25 font-mono text-xs select-none hidden md:block">+</div>
        </>
      )}

      {/* ──────────────── PROCESS VARIANT ──────────────── */}
      {variant === 'process' && (
        <>
          {/* Atmospheric Tech Glow */}
          <div 
            className="absolute top-1/4 -left-20 w-[480px] h-[480px] rounded-full blur-[130px] opacity-20 dark:opacity-35 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.20) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] rounded-full blur-[120px] opacity-20 dark:opacity-30 animate-ambient-drift-rev"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(6,182,212,0.10) 50%, transparent 70%)',
            }}
          />

          {/* Stepped Process Alignment Tracks */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.055]">
            <defs>
              <pattern id="process-stripes" width="60" height="60" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#process-stripes)" />
          </svg>

          {/* Floating Process Sequence Nodes */}
          <div className="absolute top-1/3 left-[25%] w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-particle-float" style={{ animationDelay: '-1.5s' }} />
          <div className="absolute top-1/2 right-[30%] w-1.5 h-1.5 rounded-full bg-indigo-400/50 animate-particle-float" style={{ animationDelay: '-3.5s' }} />
          <div className="absolute bottom-1/4 left-[40%] w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-particle-float" style={{ animationDelay: '-5s' }} />
        </>
      )}

      {/* ──────────────── CONTACT VARIANT ──────────────── */}
      {variant === 'contact' && (
        <>
          {/* Subtle Concentric Cyber Radar Rings (Echoing the Hero 3D Globe Radar) */}
          <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] pointer-events-none opacity-[0.05] dark:opacity-[0.10]">
            <div className="absolute inset-0 rounded-full border border-indigo-500 animate-radar-ripple" />
            <div className="absolute inset-0 rounded-full border border-indigo-500 animate-radar-ripple" style={{ animationDelay: '-3s' }} />
            <div className="absolute inset-0 rounded-full border border-indigo-500 animate-radar-ripple" style={{ animationDelay: '-6s' }} />
            <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/40" />
          </div>

          {/* Soft Focal Backdrop Glow for Form Area */}
          <div 
            className="absolute top-1/3 right-10 w-[540px] h-[540px] rounded-full blur-[140px] opacity-15 dark:opacity-30 animate-ambient-drift"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.20) 0%, rgba(244,63,94,0.10) 50%, transparent 70%)',
            }}
          />

          {/* Floating Dust Particles */}
          <div className="absolute top-1/4 right-[20%] w-1.5 h-1.5 rounded-full bg-indigo-400/40 animate-particle-float" style={{ animationDelay: '-2s' }} />
          <div className="absolute bottom-1/3 right-[35%] w-1 h-1 rounded-full bg-rose-400/40 animate-particle-float" style={{ animationDelay: '-4s' }} />
          <div className="absolute bottom-1/5 left-[30%] w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-particle-float" style={{ animationDelay: '-6s' }} />
        </>
      )}
    </div>
  );
}
