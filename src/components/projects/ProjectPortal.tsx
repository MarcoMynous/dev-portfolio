'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollExpand from './ScrollExpand';
import ProjectWorld from './ProjectWorld';
import styles from './ProjectPortal.module.css';

export default function ProjectPortal() {
  const [progress, setProgress] = useState(0);
  const [isPresent, setIsPresent] = useState(true);
  const [exitProgress, setExitProgress] = useState(0);
  const portalRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => {
      const rect = portalRef.current?.getBoundingClientRect();
      if (rect) {
        setIsPresent(rect.bottom > 0 && rect.top < window.innerHeight);
        const portalProgress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        // The expanded mountain holds long enough for the ripple interaction
        // before its final, physical move into the logo page.
        setExitProgress(Math.min(1, Math.max(0, (portalProgress - 0.7) / 0.3)));
      }
    };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <section ref={portalRef} className={styles.portal} id="projects">
      <ProjectWorld progress={progress} isPresent={isPresent} exitProgress={exitProgress} />
      <ScrollExpand
        className={styles.expand}
        src="/images/project-portal.webp"
        alt="Moonlit mountain landscape"
        scrollHint="Scroll to explore ↓"
        startWidth={42}
        startHeight={55}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.18}
        scrollDistance={1.8}
        holdDistance={0.45}
        smoothing={0.12}
        overlayScrim={0.15}
        useWindowScroll
        onProgressChange={setProgress}
        intro={<div className={styles.portalCopy}>
          <span>SELECTED WORK</span>
          <h2>Projects I&apos;ve<br />Built &amp; Shipped.</h2>
        </div>}
      />
    </section>
  );
}
