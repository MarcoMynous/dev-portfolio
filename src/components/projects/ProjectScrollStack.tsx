'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS, type Project } from '@/data/projects';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import styles from './ProjectScrollStack.module.css';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function ProjectScrollStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setProgress(clamp(-rect.top / Math.max(1, section.offsetHeight - innerHeight)));
    };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  const step = progress * PROJECTS.length;
  const activeIndex = Math.min(PROJECTS.length - 1, Math.floor(step));
  const active = PROJECTS[activeIndex];
  const styleFor = (index: number): CSSProperties => {
    const local = step - index;
    const enter = clamp((local + .3) / .3);
    let y = 100 * (1 - enter), scale = .96 + enter * .04, rotate = (index % 2 ? -1 : 1) * 1.5 * (1 - enter), opacity = enter;
    if (local >= 0) {
      const leave = clamp(local / .3); y = -45 * leave; scale = 1 - .035 * leave; rotate = -.6 * leave; opacity = 1;
      if (local >= 1) { const depth = Math.min(3, Math.floor(local)); y = [-45, -32, -58, -78][depth]; scale = [0.965, .97, .94, .91][depth]; opacity = [1, 1, .8, .55][depth]; }
    }
    const isActive = index === activeIndex;
    const yValue = local >= 0 ? `${y}px` : `${y}vh`;
    return { '--accent': PROJECTS[index].accent, '--px': `${isActive ? pointer.x * 8 : 0}px`, '--py': `${isActive ? pointer.y * 6 : 0}px`, opacity, zIndex: index + 1, transform: `translate3d(0, ${yValue}, 0) scale(${scale}) rotateZ(${rotate}deg) rotateX(${isActive ? -pointer.y * 1.5 : 0}deg) rotateY(${isActive ? pointer.x * 2.5 : 0}deg)` } as CSSProperties;
  };
  const move = (event: PointerEvent<HTMLElement>) => { const r = event.currentTarget.getBoundingClientRect(); setPointer({ x: ((event.clientX-r.left)/r.width-.5)*2, y: ((event.clientY-r.top)/r.height-.5)*2 }); };

  return <>
    <section className={styles.projects} id="projects-stack">
      <section ref={sectionRef} className={styles.track} aria-label="Selected projects"><div className={styles.viewport}>
        <header className={styles.header}><div><span>SELECTED WORK</span><p>Projects I&apos;ve designed,<br />built and shipped.</p></div><strong key={active.number}>{active.number} / 04</strong></header>
        <ScrollStack className={styles.stack} itemDistance={180} itemScale={.025} itemStackDistance={28} stackPosition="13%" scaleEndPosition="7%" baseScale={.9} scaleDuration={.6} rotationAmount={.35} blurAmount={0} useWindowScroll>
          {PROJECTS.map((project, index) => { const isActive = index === activeIndex; return <ScrollStackItem key={project.id}><article className={`${styles.card} ${isActive ? styles.active : ''}`} style={styleFor(index)} onPointerMove={isActive ? move : undefined} onPointerLeave={isActive ? () => setPointer({ x: 0, y: 0 }) : undefined} onClick={isActive ? () => setSelected(project) : undefined}>
            <div className={styles.copy}><span className={styles.number}>{project.number}</span><div><p className={styles.category}>{project.category}</p><h2>{project.title}</h2><p className={styles.description}>{project.description}</p></div><div className={styles.meta}><p><span>ROLE</span>{project.role}</p><p><span>YEAR</span>{project.year}</p></div><footer><div>{project.stack.map(item => <small key={item}>{item}</small>)}</div><button type="button">View Project <ArrowUpRight size={16} /></button></footer></div>
            <div className={styles.visual}><div className={styles.grid}/><div className={styles.blueGlow}/><div className={styles.device}><b>9:41</b><i/><i/><i/><em/></div><div className={`${styles.device} ${styles.secondDevice}`}><b>9:41</b><i/><i/><i/><em/></div><p>{project.category}</p></div>
          </article></ScrollStackItem>; })}
        </ScrollStack>
        <a className="project-all-projects" style={{ opacity: clamp((progress - .9) / .1) }} href="#all-projects">View all projects <ArrowUpRight size={15}/></a>
      </div></section>
      <div id="all-projects" className="project-all-projects-end"><span>SELECTED WORK</span><p>All projects will be listed here.</p></div>
    </section>
    {selected && <div className={styles.detail} role="dialog" aria-modal="true"><button type="button" className={styles.back} onClick={() => setSelected(null)}><ArrowLeft size={17}/> Back to Projects</button><article className={styles.detailCard} style={{ '--accent': selected.accent } as CSSProperties}><div><span>{selected.number} / {selected.year}</span><p>{selected.category}</p><h2>{selected.title}</h2><p>{selected.description}</p><div className={styles.detailVisual}/></div><aside><p>Overview</p><p>Screens</p><p>Architecture</p><p>Tech Stack</p></aside></article></div>}
  </>;
}
