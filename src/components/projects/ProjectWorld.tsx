'use client';

import { useEffect, useRef } from 'react';
import DarkVeil from './DarkVeil';
import RippleDistortion, { RippleDistortionRef } from './RippleDistortion';
import TextType from './TextType';
import styles from './ProjectWorld.module.css';

type ProjectWorldProps = {
  progress: number;
  isPresent: boolean;
  exitProgress: number;
};

export default function ProjectWorld({
  progress,
  isPresent,
  exitProgress,
}: ProjectWorldProps) {
  const worldReveal = Math.min(1, Math.max(0, (progress - 0.72) / 0.18));
  const veilOpacity = Math.min(
    0.24,
    Math.max(0, ((progress - 0.78) / 0.17) * 0.24)
  );
  const headingReveal = Math.min(
    1,
    Math.max(0, (veilOpacity / 0.24 - 0.7) / 0.3)
  );

  const rippleRef = useRef<RippleDistortionRef>(null);
  const hasTriggeredIntroWave = useRef(false);
  const lastProgressRef = useRef(progress);

  // Trigger liquid shockwaves when scrolling into the mountain portal
  useEffect(() => {
    if (!isPresent) {
      hasTriggeredIntroWave.current = false;
      return;
    }

    const currentProg = progress;
    const lastProg = lastProgressRef.current;
    lastProgressRef.current = currentProg;

    // Major shockwave upon full mountain reveal
    if (currentProg >= 0.78 && !hasTriggeredIntroWave.current) {
      hasTriggeredIntroWave.current = true;
      if (typeof window !== 'undefined') {
        const cx = window.innerWidth * 0.5;
        const cy = window.innerHeight * 0.52;
        rippleRef.current?.addWave(cx, cy, 3.2);

        // Echo shockwave
        setTimeout(() => {
          rippleRef.current?.addWave(
            cx + (Math.random() - 0.5) * 120,
            cy + (Math.random() - 0.5) * 80,
            2.0
          );
        }, 220);
      }
    } else if (currentProg < 0.7) {
      hasTriggeredIntroWave.current = false;
    }

    // Scroll velocity ripples across the mountain
    if (
      worldReveal > 0.4 &&
      Math.abs(currentProg - lastProg) > 0.025 &&
      typeof window !== 'undefined'
    ) {
      const rx = window.innerWidth * (0.3 + Math.random() * 0.4);
      const ry = window.innerHeight * (0.4 + Math.random() * 0.3);
      rippleRef.current?.addWave(rx, ry, 1.2);
    }
  }, [progress, isPresent, worldReveal]);

  return (
    <div
      className={styles.world}
      style={{
        opacity: isPresent ? worldReveal : 0,
        pointerEvents: isPresent && worldReveal > 0.1 ? 'auto' : 'none',
        transform: `translate3d(0, ${-exitProgress * 100}%, 0)`,
      }}
      aria-hidden={worldReveal < 0.95}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.mountain}
        src="/images/project-portal.webp"
        alt=""
      />
      <div className={styles.gradient} />
      <div className={styles.veilLayer} style={{ opacity: veilOpacity }}>
        <DarkVeil
          className={styles.darkVeil}
          hueShift={31}
          noiseIntensity={0}
          scanlineIntensity={0.02}
          speed={0.35}
          scanlineFrequency={0.7}
          warpAmount={0.6}
        />
      </div>
      <div
        className={styles.rippleLayer}
        style={{
          opacity: headingReveal,
          pointerEvents: headingReveal > 0.1 ? 'auto' : 'none',
        }}
      >
        <RippleDistortion
          ref={rippleRef}
          src="/images/project-portal.webp"
          brushSize={180}
          strength={0.28}
          swirl={0.85}
          rings={4}
          spread={5.8}
          fade={2.8}
          spacing={14}
          dispersion={0.42}
          glint={0.65}
          tint="#4f8cff"
          tintAmount={0.08}
          highlightColor="#d5e8ff"
          grayscale={false}
          trigger="both"
          clickStrength={2.8}
          quality="medium"
        />
      </div>
      <div
        className={styles.heading}
        style={{
          opacity: headingReveal,
          transform: `translate3d(0, ${(1 - headingReveal) * 24}px, 0)`,
        }}
        aria-hidden={headingReveal < 0.95}
      >
        <h2>
          <TextType
            text={[
              "Projects that\nI have designed,\nbuilt and shipped.",
              "Architected for scale,\nengineered for speed.",
              "Full-stack platforms,\ncrafted with precision.",
            ]}
            typingSpeed={48}
            pauseDuration={2400}
            deletingSpeed={24}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            cursorStyle={{
              color: '#60a5fa',
              fontWeight: 400,
              fontSize: '0.92em',
              verticalAlign: 'baseline',
              marginLeft: '6px',
            }}
            startTrigger={headingReveal > 0.25}
          />
        </h2>
        <b>
          01 <i>/</i> 04
        </b>
      </div>
    </div>
  );
}
