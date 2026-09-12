'use client';

import React, { useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { ScrollTrigger, useGsapContext } from '@/hooks/useGsap';
import styles from './ProjectsIntro.module.css';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const ProjectsIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const expand = clamp(progress / 0.62);
  const hold = clamp((progress - 0.62) / 0.38);

  useGsapContext(() => {
    if (!sectionRef.current) return;
    ScrollTrigger.create({ trigger: sectionRef.current, start: 'top top', end: '+=210svh', pin: true, scrub: 0.12, onUpdate: (self) => setProgress(self.progress) });
  }, sectionRef);

  return <section ref={sectionRef} className={styles.intro} aria-label="Projects introduction">
    <div className={styles.scrim} style={{ opacity: expand * 0.28 }} />
    <div className={styles.frame} style={{ width: `${46 + expand * 54}vw`, height: `${58 + expand * 42}svh`, borderRadius: `${30 * (1 - expand)}px`, transform: `scale(${1 + expand * 0.15})` }}>
      <div className={styles.preview}>
        <div style={{ opacity: 1 - expand * .6 }}><span>SELECTED WORK</span><h2>PROJECTS I&apos;VE<br />BUILT &amp; SHIPPED.</h2><p>Scroll to explore <ArrowDown size={15} /></p></div>
      </div>
    </div>
    <span className={styles.holdLabel} style={{ opacity: hold }}>PROJECT ENVIRONMENT</span>
  </section>;
};

export default ProjectsIntro;
