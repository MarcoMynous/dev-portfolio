'use client';
import { ArrowRight } from 'lucide-react';
import WebThreads from './WebThreads';
import styles from './AboutChapter.module.css';

const capabilities = [
  ['01', 'MOBILE', 'Building product-focused mobile experiences'],
  ['02', 'WEB', 'Modern interfaces and applications'],
  ['03', 'BACKEND', 'APIs, services and integrations'],
  ['04', 'SYSTEMS', 'Infrastructure, architecture and reliability'],
];

export default function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutStage}>
        <WebThreads className={styles.threadLayer} color1="#0a4cae" color2="#78aaff" color3="#c7dcff" speed={0.14} threadCount={6} brightness={0.5} opacity={0.7} />
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCopy}>
            <span className={styles.eyebrow}>05 / 07&nbsp;&nbsp;&nbsp; ABOUT</span>
            <h2>I BUILD WHERE<br />PRODUCT, CODE<br />AND SYSTEMS MEET.</h2>
            <p className={styles.lead}>I&apos;m a software engineer who enjoys turning ideas into real products.<br />I work across mobile, web, backend systems and infrastructure.<br />I care about building things that are useful, thoughtful, and reliable.</p>
            <div className={styles.caps}>{capabilities.map(([number, title, description]) => <div key={title}><b>{number}</b><p><strong>{title}</strong><span>{description}</span></p><ArrowRight size={22} /></div>)}</div>
          </div>
          <figure className={styles.portrait}>
            <img src="/images/about/portrait-clean.png" alt="Software engineer portrait" />
            <figcaption><span>IDEAS<br />SYSTEMS<br />PEOPLE<br />IMPACT</span><i /><em>“I don&apos;t just write code.<br />I build for people.”</em></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
