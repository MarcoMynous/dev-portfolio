'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FrameScrollHero.module.css';

const FRAME_COUNT = 301;
const frameSource = (index: number) =>
  `/hero/frames/frame_${String(index + 1).padStart(4, '0')}.jpg`;

const beats = [
  {
    label: 'A NEW PERSPECTIVE',
    lines: ['Something worth', 'watching, in', 'motion.'],
    copy: 'A deliberate visual introduction that turns every scroll into a moment worth noticing.',
  },
  {
    label: 'THE INTERACTION',
    lines: ['Smooth scroll.', 'Scrubbed video.', 'Pinned reveals.'],
    copy: 'The story moves precisely with you, making each frame feel physical, responsive, and considered.',
  },
  {
    label: 'THE RESULT',
    lines: ['Built to', 'make people', 'stay.'],
    copy: 'A quiet, memorable first impression designed to earn attention and invite a closer look.',
  },
];

type TextDrumProps = { progressRef: React.MutableRefObject<number> };

function TextDrum({ progressRef }: TextDrumProps) {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const drumPosition = progressRef.current * (beats.length - 1);
      const viewportHeight = window.innerHeight;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const offset = index - drumPosition;
        item.style.transform = `translate3d(0, ${offset * 0.82 * viewportHeight}px, ${-Math.abs(offset) * 0.3 * viewportHeight}px) rotateX(${-offset * 58}deg)`;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [progressRef]);

  return (
    <div className={styles.drum} aria-live="polite">
      {beats.map((beat, index) => (
        <div
          className={styles.beat}
          key={beat.label}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          style={{
            transform: `translate3d(0, ${index * 82}vh, ${-index * 30}vh) rotateX(${-index * 58}deg)`,
          }}
        >
          <span className={styles.eyebrow}>{beat.label}</span>
          <h1>
            <span>{beat.lines[0]}</span>
            <span>{beat.lines[1]}</span>
            <em>{beat.lines[2]}</em>
          </h1>
          <p>{beat.copy}</p>
        </div>
      ))}
    </div>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.wordmark} href="#top">
        <strong>YOUR BRAND</strong>
        <span>THREE WORDS HERE</span>
      </a>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a href="#top">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className={styles.headerCta} href="#contact">
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default function FrameScrollHero() {
  const trackRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const easedPointerRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(true);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const prefersSimpleExperience = window.matchMedia(
      '(max-width: 768px), (prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersSimpleExperience) return;

    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let destroyed = false;
    let animationFrame = 0;
    let firstFrameDrawn = false;

    const drawCover = (image: HTMLImageElement, alpha = 1) => {
      if (!image.naturalWidth || !image.naturalHeight) return;
      const width = canvas.width;
      const height = canvas.height;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.globalAlpha = alpha;
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    };

    const resizeAndDraw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      drawFrame(currentFrameRef.current);
    };

    const drawFrame = (position: number) => {
      const base = Math.floor(position);
      const next = Math.min(base + 1, FRAME_COUNT - 1);
      const fraction = position - base;
      const baseImage = imagesRef.current[base];
      const nextImage = imagesRef.current[next];
      if (!baseImage?.complete) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCover(baseImage);
      if (fraction > 0 && nextImage?.complete) drawCover(nextImage, fraction);
      context.globalAlpha = 1;
      if (!firstFrameDrawn) {
        firstFrameDrawn = true;
        setCanvasReady(true);
      }
    };

    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = frameSource(index);
      if (index === 0) image.onload = resizeAndDraw;
      return image;
    });
    imagesRef.current = images;

    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(track);

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resizeAndDraw);

    const render = () => {
      if (!destroyed && activeRef.current) {
        const rect = track.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        const rawProgress = Math.min(1, Math.max(0, -rect.top / distance));
        const target = rawProgress * (FRAME_COUNT - 1);
        const current = currentFrameRef.current;
        const next = current + (target - current) * 0.1;
        currentFrameRef.current = Math.abs(target - next) < 0.001 ? target : next;
        progressRef.current = currentFrameRef.current / (FRAME_COUNT - 1);
        drawFrame(currentFrameRef.current);

        easedPointerRef.current.x += (pointerRef.current.x - easedPointerRef.current.x) * 0.08;
        easedPointerRef.current.y += (pointerRef.current.y - easedPointerRef.current.y) * 0.08;
        const tiltFade = Math.max(0, 1 - currentFrameRef.current / 6);
        if (visualRef.current) {
          const { x, y } = easedPointerRef.current;
          visualRef.current.style.transform = `perspective(1400px) translate3d(${-x * 8 * tiltFade}px, ${-y * 8 * tiltFade}px, 0) rotateX(${-y * 2.2 * tiltFade}deg) rotateY(${x * 2.2 * tiltFade}deg) scale(${1 + 0.05 * tiltFade})`;
        }
      }
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resizeAndDraw);
    };
  }, []);

  return (
    <>
      <Header />
      <section ref={trackRef} className={styles.track} id="top">
        <div className={styles.stage}>
          <div ref={visualRef} className={styles.visual}>
            {/* A plain image keeps the first frame visible before the canvas sequence is decoded. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.fallback} src={frameSource(0)} alt="" />
            <canvas ref={canvasRef} className={canvasReady ? styles.canvasReady : styles.canvas} />
          </div>
          <div className={styles.scrim} aria-hidden="true" />
          <TextDrum progressRef={progressRef} />
          <aside className={styles.meta}>
            <div><span>Independent studio</span><span>Worldwide / Remote</span></div>
            <div><span>Currently</span><strong>Making things move</strong><span>This week</span><strong>Building with intent</strong></div>
            <div className={styles.scrollHint}><span>Scroll to explore</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v12m0 0-4-4m4 4 4-4" /></svg></div>
          </aside>
        </div>
      </section>
    </>
  );
}
