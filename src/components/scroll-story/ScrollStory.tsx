'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { STORY_STATES } from '@/data/projects';
import Navigation from '@/components/navigation/Navigation';
import VideoStage from './VideoStage';
import { useGsapContext, ScrollTrigger, gsap } from '@/hooks/useGsap';
import styles from './ScrollStory.module.css';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const ScrollStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualStageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const chapterSize = 1 / STORY_STATES.length;
  const finalChapterProgress = clamp((progress - chapterSize * (STORY_STATES.length - 1)) / chapterSize);
  const finaleExit = clamp((finalChapterProgress - 0.85) / 0.15);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=700svh',
      pin: true,
      scrub: 0.5,
      id: 'scroll-story-master',
      onUpdate: (self) => {
        setProgress(self.progress);
        const index = Math.min(
          STORY_STATES.length - 1,
          Math.floor(self.progress * STORY_STATES.length)
        );
        setActiveIndex(index);
      },
    });
  }, sectionRef);

  const getTextStyle = (chapterIndex: number, stagger = 0): React.CSSProperties => {
    const localProgress = clamp((progress - chapterIndex * chapterSize) / chapterSize);

    // Entry phase: 0.00 -> 0.10 (immediate for chapter 0 on initial load)
    let enter = 1;
    if (chapterIndex > 0) {
      const enterStart = clamp(stagger * 0.03, 0, 0.06);
      const enterEnd = 0.10 + stagger * 0.02;
      enter = clamp((localProgress - enterStart) / (enterEnd - enterStart));
    }

    // Exit phase: 0.75 -> 0.90
    const exitStart = 0.75 + stagger * 0.02;
    const exitEnd = 0.90 + stagger * 0.02;
    const exit = chapterIndex === STORY_STATES.length - 1
      ? finaleExit
      : clamp((localProgress - exitStart) / (exitEnd - exitStart));

    const y = (1 - enter) * 24 - exit * 20;
    const blur = (1 - enter) * 4 + exit * 4;

    return {
      opacity: enter * (1 - exit),
      transform: `translate3d(0, ${y}px, 0)`,
      filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents: enter > 0.8 && exit < 0.2 ? 'auto' : 'none',
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || !visualStageRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
    gsap.to(visualStageRef.current, { x, y, duration: 0.8, ease: 'power3.out', overwrite: true });
  };

  const resetParallax = () => {
    if (visualStageRef.current) {
      gsap.to(visualStageRef.current, { x: 0, y: 0, duration: 1, ease: 'power3.out', overwrite: true });
    }
  };

  return (
    <section ref={sectionRef} className={styles.storySection} id="story-scroll">
      <div
        className={styles.pinnedViewport}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetParallax}
      >
        <div ref={visualStageRef} className={styles.visualStage}>
          <div
            className={styles.finaleScale}
            style={{
              transform: `translate3d(0, -${finaleExit * 8}vh, 0) scale(${1 - finaleExit * 0.06})`,
            }}
          >
            <VideoStage progress={progress} />
          </div>
        </div>

        <div className={styles.videoOverlay} />

        <Navigation />

        <div className={styles.heroContent}>
          <div className={styles.textColumn}>
            {STORY_STATES.map((state, index) => {
              const isActive = index === activeIndex;
              const isExited = index < activeIndex;

              return (
                <div
                  key={state.id}
                  className={styles.stepBlock}
                  aria-hidden={!isActive && !isExited}
                >
                  {state.badge && (
                    <div className="status-badge" style={getTextStyle(index, 0)}>
                      {state.badgeDot && <span className="status-dot" />}
                      <span>{state.badge}</span>
                    </div>
                  )}

                  <h1 className={styles.headline}>
                    {state.headline.map((line, lineIndex) => (
                      <span
                        key={line}
                        className={styles.headlineLine}
                        style={getTextStyle(index, 0.02 + lineIndex * 0.025)}
                      >
                        {line}
                      </span>
                    ))}
                  </h1>

                  <p
                    className={styles.description}
                    style={getTextStyle(index, 0.08)}
                  >
                    {state.description}
                  </p>

                  {state.labels && (
                    <div
                      className={styles.labelsList}
                      style={getTextStyle(index, 0.12)}
                    >
                      {state.labels.map((label) => (
                        <span key={label} className={styles.labelItem}>
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  {state.ctaButtons && (
                    <div
                      className={styles.buttonGroup}
                      style={getTextStyle(index, 0.12)}
                    >
                      {state.ctaButtons.map((button) =>
                        button.isExternal ? (
                          <a
                            key={button.label}
                            href={button.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn ${
                              button.isPrimary ? 'btn-primary' : 'btn-secondary'
                            }`}
                          >
                            {button.label}
                          </a>
                        ) : (
                          <Link
                            key={button.label}
                            href={button.href}
                            className={`btn ${
                              button.isPrimary ? 'btn-primary' : 'btn-secondary'
                            }`}
                          >
                            {button.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} />
        </div>

        <div className={styles.storyProgress} aria-hidden="true">
          {STORY_STATES.map((state, index) => (
            <span
              key={state.id}
              className={index === activeIndex ? styles.progressActive : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollStory;
