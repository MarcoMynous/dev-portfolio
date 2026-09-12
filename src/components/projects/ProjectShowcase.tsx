'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { Project } from '@/types/project';
import styles from './Projects.module.css';

interface ProjectShowcaseProps {
  project: Project;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project }) => {
  return (
    <article className={styles.projectCard}>
      <div>
        <div className={styles.cardTop}>
          <span className={styles.categoryBadge}>{project.category}</span>
          <span className={styles.yearText}>{project.year}</span>
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardTagline}>{project.tagline}</p>
        <p className={styles.cardDescription}>{project.description}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className={styles.metricsRow}>
            {project.metrics.map((metric, idx) => (
              <div key={idx} className={styles.metricItem}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.tagGroup}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.projectTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.cardActions}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
            aria-label={`View ${project.title} on GitHub`}
          >
            <GithubIcon size={16} />
            <span>Source Code</span>
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectShowcase;
