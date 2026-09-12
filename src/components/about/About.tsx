'use client';

import React from 'react';
import { User, Cpu, Server, Code, ShieldCheck } from 'lucide-react';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className="container">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <div className="badge">
              <User size={14} />
              <span>Engineering Philosophy</span>
            </div>

            <h2 className={styles.aboutTitle}>
              Bridging Architecture, Reliability & <span className="gradient-text">Interactive Polish</span>
            </h2>

            <p className={styles.aboutParagraph}>
              With over 8+ years building enterprise web apps and distributed systems, I focus on constructing architectures that are maintainable, high-performance, and delightful to interact with.
            </p>

            <p className={styles.aboutParagraph}>
              From architecting multi-tenant backends to crafting silky smooth client-side animations, every system is designed with intentionality, testability, and scalability.
            </p>
          </div>

          <div className={styles.skillsContainer}>
            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <Server size={18} className={styles.skillIcon} />
                <span>Backend & Cloud</span>
              </div>
              <ul className={styles.skillItems}>
                <li className={styles.skillItem}>• Node.js / TypeScript / Go</li>
                <li className={styles.skillItem}>• PostgreSQL / Redis / Kafka</li>
                <li className={styles.skillItem}>• Docker / Kubernetes / AWS</li>
              </ul>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <Code size={18} className={styles.skillIcon} />
                <span>Frontend & Motion</span>
              </div>
              <ul className={styles.skillItems}>
                <li className={styles.skillItem}>• Next.js / React 19 / App Router</li>
                <li className={styles.skillItem}>• GSAP / ScrollTrigger / Lenis</li>
                <li className={styles.skillItem}>• Performance & Web Vitals</li>
              </ul>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <Cpu size={18} className={styles.skillIcon} />
                <span>AI & Tooling</span>
              </div>
              <ul className={styles.skillItems}>
                <li className={styles.skillItem}>• LLM Orchestration & Agents</li>
                <li className={styles.skillItem}>• Vector Databases & RAG</li>
                <li className={styles.skillItem}>• Python / LangChain / APIs</li>
              </ul>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <ShieldCheck size={18} className={styles.skillIcon} />
                <span>Leadership</span>
              </div>
              <ul className={styles.skillItems}>
                <li className={styles.skillItem}>• Technical Strategy & RFCs</li>
                <li className={styles.skillItem}>• Mentorship & Code Review</li>
                <li className={styles.skillItem}>• System Design & Scalability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
