'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import Navigation from '@/components/navigation/Navigation';
import styles from './Hero.module.css';

export const Hero: React.FC = () => (
  <section className={styles.heroSection} id="hero">
    <video className={styles.heroVideo} src="/videos/hero-core-01-scrub.mp4" autoPlay muted playsInline loop />
    <div className={styles.heroOverlay} />
    <Navigation />
    <div className={styles.heroContent}>
      <div className="status-badge"><span className="status-dot" />AVAILABLE FOR SELECT WORK</div>
      <h1 className={styles.heroTitle}>SOFTWARE<br />ENGINEER.</h1>
      <p className={styles.heroDescription}>I design and build products across iOS, web, backend systems and the infrastructure between them.</p>
      <div className={styles.buttonGroup}>
        <Link href="#story-scroll" className="btn btn-primary">Explore Work</Link>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View GitHub ↗</a>
      </div>
    </div>
    <div className={styles.scrollIndicator} aria-hidden="true"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></div>
  </section>
);

export default Hero;
