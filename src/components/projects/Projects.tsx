'use client';

import React from 'react';
import { PROJECTS } from '@/data/projects';
import ProjectShowcase from './ProjectShowcase';
import { Layers } from 'lucide-react';
import styles from './Projects.module.css';

export const Projects: React.FC = () => {
  return (
    <section className={styles.projectsSection} id="projects">
      <div className="container">
        <div className={styles.headerWrapper}>
          <div className="badge">
            <Layers size={14} />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Selected <span className="gradient-text">Systems & Prototypes</span>
          </h2>
          <p className={styles.sectionDescription}>
            A showcase of production systems, architecture blueprints, and open-source tooling built for performance and reliability.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {PROJECTS.map((project) => (
            <ProjectShowcase key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
