'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import styles from './ScrollExpand.module.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (from: number, to: number, value: number) => {
  const t = clamp((value - from) / (to - from || 0.000001), 0, 1);
  return t * t * (3 - 2 * t);
};

export type ScrollExpandProps = {
  src: string;
  alt: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onProgressChange?: (progress: number) => void;
};

export default function ScrollExpand({
  src,
  alt,
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  intro,
  children,
  className = '',
  style,
  onProgressChange,
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const eased = smoothstep(0, 1, progress);
    const width = startWidth + (100 - startWidth) * eased;
    const height = startHeight + (100 - startHeight) * eased;
    const xInset = (100 - width) / 2;
    const yInset = (100 - height) / 2;
    const radius = startRadius + (endRadius - startRadius) * eased;
    frame.style.clipPath = `inset(${yInset}% ${xInset}% ${yInset}% ${xInset}% round ${radius}px)`;
    media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * eased})`;
    if (scrimRef.current) scrimRef.current.style.opacity = String(overlayScrim * eased);

    const titleOut = smoothstep(0.38, 0.82, progress);
    if (titleRef.current) {
      titleRef.current.style.opacity = String(1 - titleOut);
      titleRef.current.style.transform = `translate3d(0, ${-26 * titleOut}px, 0)`;
    }
    if (hintRef.current) {
      const hintOut = smoothstep(0, 0.12, progress);
      hintRef.current.style.opacity = String(1 - hintOut);
      hintRef.current.style.transform = `translate3d(0, ${8 * hintOut}px, 0)`;
    }
    if (childrenRef.current) {
      const childOut = smoothstep(0.3, 0.7, progress);
      childrenRef.current.style.opacity = String(1 - childOut);
      childrenRef.current.style.transform = `translate3d(0, ${-20 * childOut}px, 0)`;
    }
    if (introRef.current) {
      const introOut = smoothstep(0.3, 0.7, progress);
      introRef.current.style.opacity = String(1 - introOut);
      introRef.current.style.transform = `translate3d(0, ${-20 * introOut}px, 0)`;
    }
    onProgressChange?.(progress);
  }, [endRadius, mediaZoom, onProgressChange, overlayScrim, startHeight, startRadius, startWidth]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;
    let raf = 0;
    let current = 0;
    let target = 0;
    let stageHeight = 0;
    let active = false;

    const measure = () => {
      stageHeight = useWindowScroll ? window.innerHeight : root.clientHeight;
      stage.style.height = `${stageHeight}px`;
      track.style.height = `${stageHeight * (1 + scrollDistance + holdDistance)}px`;
    };
    const read = () => {
      const span = stageHeight * Math.max(0.01, scrollDistance);
      return useWindowScroll ? clamp(-track.getBoundingClientRect().top / span, 0, 1) : clamp(root.scrollTop / span, 0, 1);
    };
    const tick = () => {
      current += (target - current) * (smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing)));
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        active = false;
      }
      applyProgress(current);
      if (active) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = read();
      if (!active) { active = true; raf = requestAnimationFrame(tick); }
    };
    const onResize = () => { measure(); target = read(); current = target; applyProgress(current); };

    measure();
    onResize();
    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); scroller.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, [applyProgress, holdDistance, scrollDistance, smoothing, useWindowScroll]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className}`} style={style}>
      <div ref={trackRef} className={styles.track}>
        <div ref={stageRef} className={styles.stage}>
          <div ref={frameRef} className={styles.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={mediaRef} className={styles.media} src={src} alt={alt} draggable={false} />
            <div ref={scrimRef} className={styles.scrim} />
            {children && <div ref={childrenRef} className={styles.children}>{children}</div>}
          </div>
          {intro && <div ref={introRef} className={styles.intro}>{intro}</div>}
          {title && <div ref={titleRef} className={styles.title}>{title}</div>}
          {scrollHint && <div ref={hintRef} className={styles.hint}>{scrollHint}</div>}
        </div>
      </div>
    </div>
  );
}
