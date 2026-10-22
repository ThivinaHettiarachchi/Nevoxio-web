'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  height?: number;
  showWordmark?: boolean;
}

export default function Logo({
  className = '',
  height = 36,
  showWordmark = true,
}: LogoProps) {
  // Original aspect ratio: 169w / 211h ≈ 0.8
  const markWidth = Math.round(height * 0.8);

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Mark Emblem */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ height: `${height}px`, width: `${markWidth}px` }}>
        {/* Dark theme logo (White emblem) */}
        <Image
          src="/logo-white.png"
          alt="NEVOXIO Logo"
          width={markWidth * 2}
          height={height * 2}
          priority
          className="logo-dark object-contain"
          style={{ height: `${height}px`, width: 'auto' }}
        />
        {/* Light theme logo (Black emblem) */}
        <Image
          src="/logo-black.png"
          alt="NEVOXIO Logo"
          width={markWidth * 2}
          height={height * 2}
          priority
          className="logo-light object-contain"
          style={{ height: `${height}px`, width: 'auto' }}
        />
      </div>

      {/* Brand Wordmark Text */}
      {showWordmark && (
        <span className="text-[1.25rem] font-bold tracking-[-0.03em] text-text-primary transition-colors">
          NEVOXIO
        </span>
      )}
    </div>
  );
}
