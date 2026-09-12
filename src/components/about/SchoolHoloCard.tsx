'use client';

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './SchoolHoloCard.module.css';

export interface SchoolData {
  number: string;
  name: string;
  category: string;
  program: string;
  location: string;
  years: string;
  handle: string;
  status: string;
  avatarUrl: string;
  miniAvatarUrl?: string;
  tags: string[];
  innerGradient?: string;
  behindGlowColor?: string;
  details?: {
    overview: string;
    highlights: string[];
    coursework: string[];
  };
}

interface SchoolHoloCardProps {
  school: SchoolData;
  onSelect?: (school: SchoolData) => void;
  className?: string;
  enableTilt?: boolean;
}

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, rgba(30, 60, 130, 0.45) 0%, rgba(10, 25, 60, 0.75) 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 60,
  INITIAL_Y_OFFSET: 50,
  ENTER_TRANSITION_MS: 180,
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

export const SchoolHoloCard: React.FC<SchoolHoloCardProps> = ({
  school,
  onSelect,
  className = '',
  enableTilt = true,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const cardBodyRef = useRef<HTMLDivElement>(null);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      const cardBody = cardBodyRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const rotX = round(-(centerX / 4.8));
      const rotY = round(centerY / 4.2);

      const properties: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${rotX}deg`,
        '--rotate-y': `${rotY}deg`,
      };

      for (const [k, v] of Object.entries(properties)) {
        wrap.style.setProperty(k, v);
      }

      if (cardBody && shell.classList.contains('active')) {
        cardBody.style.transform = `translateZ(0) rotateX(${rotY}deg) rotateY(${rotX}deg)`;
      }
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || (typeof document !== 'undefined' && document.hasFocus())) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = (): void => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number): void {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number): void {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter(): void {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number): void {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent(): { x: number; y: number; tx: number; ty: number } {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel(): void {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement): { x: number; y: number } => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      const cardBody = cardBodyRef.current;
      if (!shell || !tiltEngine || !wrap) return;

      wrap.style.setProperty('--card-opacity', '1');
      shell.classList.add('active');
      shell.classList.add('entering');
      if (cardBody) {
        cardBody.style.transition = 'none';
      }

      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback((): void => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    const cardBody = cardBodyRef.current;
    if (!shell || !tiltEngine || !wrap) return;

    tiltEngine.toCenter();

    if (cardBody) {
      cardBody.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      cardBody.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
    }

    const checkSettle = (): void => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        wrap.style.setProperty('--card-opacity', '0');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };

    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardStyle = useMemo(
    () => ({
      '--inner-gradient': school.innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': school.behindGlowColor ?? 'rgba(125, 190, 255, 0.65)',
      '--behind-glow-size': '55%',
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--pointer-from-center': '0',
      '--pointer-from-top': '0.5',
      '--pointer-from-left': '0.5',
      '--card-opacity': '0',
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--background-x': '50%',
      '--background-y': '50%',
      '--card-radius': '28px',
      '--sunpillar-1': 'hsl(2, 100%, 73%)',
      '--sunpillar-2': 'hsl(53, 100%, 69%)',
      '--sunpillar-3': 'hsl(93, 100%, 69%)',
      '--sunpillar-4': 'hsl(176, 100%, 76%)',
      '--sunpillar-5': 'hsl(228, 100%, 74%)',
      '--sunpillar-6': 'hsl(283, 100%, 73%)',
      '--sunpillar-clr-1': 'var(--sunpillar-1)',
      '--sunpillar-clr-2': 'var(--sunpillar-2)',
      '--sunpillar-clr-3': 'var(--sunpillar-3)',
      '--sunpillar-clr-4': 'var(--sunpillar-4)',
      '--sunpillar-clr-5': 'var(--sunpillar-5)',
      '--sunpillar-clr-6': 'var(--sunpillar-6)',
    }),
    [school]
  );

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${className}`.trim()}
      style={cardStyle as React.CSSProperties}
    >
      {/* Dynamic Specular Behind Glow */}
      <div className={styles.behindGlow} />

      <div ref={shellRef} className={styles.shell}>
        <div
          ref={cardBodyRef}
          className={styles.cardBody}
          onClick={() => onSelect?.(school)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect?.(school);
            }
          }}
          aria-label={`View education details for ${school.name}`}
        >
          {/* Inner Atmospheric Ambient Gradient */}
          <div className={styles.innerGradient} />

          {/* Holographic Spectral Sheen Foil */}
          <div className={styles.shineLayer} />

          {/* High-Tech Specular Glare */}
          <div className={styles.glareLayer} />

          {/* Background Artwork Layer with Parallax Depth */}
          <div className={styles.backdropArtwork}>
            <img
              src={school.avatarUrl}
              alt=""
              className={styles.backdropImg}
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
          </div>

          {/* Top Info Badge */}
          <div className={styles.cardHeader}>
            <span className={styles.badgeNumber}>
              <span>{school.number}</span>
              <i>{'//'}</i>
              <span>{school.category}</span>
            </span>
            <span className={styles.badgeCategory}>{school.years}</span>
          </div>

          {/* Core Typography & Degree Information */}
          <div className={styles.mainInfo}>
            <h3 className={styles.schoolName}>{school.name}</h3>
            <h4 className={styles.degreeTitle}>{school.program}</h4>
            <p className={styles.metaInfo}>
              {school.location} • {school.years}
            </p>

            <div className={styles.tagsRow}>
              {school.tags.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Bottom Glass Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.identityBlock}>
              {school.miniAvatarUrl ? (
                <div className={styles.miniAvatar}>
                  <img src={school.miniAvatarUrl} alt="" />
                </div>
              ) : (
                <div className={styles.miniAvatar}>
                  <img src={school.avatarUrl} alt="" />
                </div>
              )}
              <div className={styles.identityText}>
                <span className={styles.handleText}>@{school.handle}</span>
                <span className={styles.statusText}>
                  <span className={styles.statusDot} />
                  {school.status}
                </span>
              </div>
            </div>

            <button
              type="button"
              className={styles.viewBtn}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(school);
              }}
              aria-label={`Explore ${school.name}`}
            >
              <span>Explore</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolHoloCard;
