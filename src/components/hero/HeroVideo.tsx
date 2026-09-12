'use client';

import React, { useEffect, useRef } from 'react';

interface HeroVideoProps {
  src: string;
  isActive?: boolean;
  opacity?: number;
  className?: string;
  fallbackLabel?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  src,
  isActive = true,
  opacity = 1,
  className = '',
  fallbackLabel,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted until user interaction
      });
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <div
      className={`hero-video-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        opacity,
        transition: 'opacity 0.4s ease',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 'var(--radius-lg)',
        }}
      />
      {/* Decorative futuristic border & glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 30px rgba(0, 242, 254, 0.05)',
        }}
      />
      {fallbackLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            padding: '0.25rem 0.65rem',
            background: 'rgba(5, 8, 17, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan)',
          }}
        >
          {fallbackLabel}
        </div>
      )}
    </div>
  );
};

export default HeroVideo;
