'use client';

import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import type { Project } from '@/types/project';
import { ScrollTrigger, useGsapContext } from '@/hooks/useGsap';
import ProjectCard from './ProjectCard';
import DarkVeil from './DarkVeil';
import styles from './ProjectDeck.module.css';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const ProjectDeck: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const deckStep = progress * (PROJECTS.length - 1);
  const activeIndex = Math.min(PROJECTS.length - 1, Math.floor(deckStep + 0.001));

  useGsapContext(() => {
    if (!sectionRef.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=360svh',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => setProgress(self.progress),
    });
  }, sectionRef);

  const getCardStyle = (index: number): React.CSSProperties => {
    const relative = deckStep - index;
    const direction = index % 2 === 0 ? -1 : 1;
    let y = 110;
    let scale = 1;
    let rotation = direction * 1.5;
    let opacity = 0;

    if (relative >= -1 && relative < 0) {
      const incoming = relative + 1;
      y = (1 - incoming) * 110;
      rotation = direction * 1.5 * (1 - incoming);
      opacity = 1;
    } else if (relative >= 0) {
      const age = Math.min(relative, 4);
      y = -45 - Math.max(0, age - 1) * 30;
      scale = 0.96 - Math.max(0, age - 1) * 0.04;
      rotation = 0;
      opacity = Math.max(0.3, 1 - Math.max(0, age - 1) * 0.35);
      if (relative < 1) {
        y = -45 * relative;
        scale = 1 - relative * 0.04;
        opacity = 1;
      }
    }

    const tiltX = index === activeIndex ? pointer.y * -2 : 0;
    const tiltY = index === activeIndex ? pointer.x * 3 : 0;
    return {
      opacity,
      zIndex: index + 1,
      transform: `translate3d(0, ${y}vh, 0) scale(${scale}) rotateZ(${rotation}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 2, y: ((event.clientY - rect.top) / rect.height - 0.5) * 2 });
  };

  return (
    <>
      <section ref={sectionRef} className={styles.deckSection} id="projects">
        <div className={styles.deckViewport}>
          <DarkVeil />
          <div className={styles.deckIntro}><span>SELECTED WORK</span><h2>Projects I&apos;ve<br />designed, built<br />and <em>shipped.</em></h2></div>
          <div className={styles.deckHeading}><span>{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(PROJECTS.length).padStart(2, '0')}</span><p>A collection of real-world projects that solve meaningful problems.</p></div>
          <div className={styles.deckStage}>
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                active={index === activeIndex}
                style={getCardStyle(index)}
                onPointerMove={index === activeIndex ? handlePointerMove : undefined}
                onPointerLeave={index === activeIndex ? () => setPointer({ x: 0, y: 0 }) : undefined}
                pointer={pointer}
              />
            ))}
          </div>
          <div className={styles.progressRail}><span style={{ transform: `scaleX(${clamp(progress)})` }} /></div>
        </div>
      </section>

      <section className={styles.mobileDeck} aria-label="Selected projects">
        <p>SELECTED PROJECTS</p>
        {PROJECTS.map((project) => <article key={project.id} className={styles.mobileCard} style={{ '--accent': project.accent } as React.CSSProperties} onClick={() => setSelectedProject(project)}><span>{project.number} / {project.year}</span><h2>{project.title}</h2><p>{project.description}</p><button type="button">View Project <ArrowUpRight size={16} /></button></article>)}
      </section>

      {selectedProject && <div className={styles.detail} role="dialog" aria-modal="true" aria-label={`${selectedProject.title} project detail`}>
        <button type="button" className={styles.backButton} onClick={() => setSelectedProject(null)}><ArrowLeft size={18} /> Back to projects</button>
        <div className={styles.detailContent} style={{ '--accent': selectedProject.accent } as React.CSSProperties}><span>{selectedProject.number} / {selectedProject.year}</span><p>{selectedProject.category}</p><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div>{selectedProject.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
      </div>}
    </>
  );
};

export default ProjectDeck;
