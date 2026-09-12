'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';
import styles from './ProjectDeck.module.css';

interface ProjectCardProps { project: Project; active: boolean; style: React.CSSProperties; pointer: { x: number; y: number }; onPointerMove?: React.PointerEventHandler<HTMLElement>; onPointerLeave?: React.PointerEventHandler<HTMLElement>; }

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, active, style, pointer, onPointerMove, onPointerLeave }) => (
  <article className={`${styles.card} ${active ? styles.cardActive : ''}`} style={style} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
    <div className={styles.cardContent}>
      <div className={styles.cardMeta}><span>{project.number}</span><span>{project.year}</span></div>
      <div><p className={styles.category}>{project.category}</p><h2>{project.title}</h2><p className={styles.description}>{project.description}</p></div>
      <div className={styles.cardFooter}><div><span>ROLE</span><strong>{project.role}</strong></div><div><span>STACK</span><strong>{project.stack.join(' · ')}</strong></div><button type="button">View Project <ArrowUpRight size={16} /></button></div>
    </div>
    <div className={styles.visual} style={{ '--accent': project.accent, '--image-x': `${pointer.x * 8}px`, '--image-y': `${pointer.y * 8}px` } as React.CSSProperties}><div className={styles.visualOrb} /><div className={styles.visualGrid} /><span>{project.category}</span></div>
  </article>
);

export default ProjectCard;
