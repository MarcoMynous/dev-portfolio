'use client';

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFlutter,
  SiSwift,
  SiGraphql,
  SiFigma,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiRedis,
  SiDotnet,
  SiGo,
} from 'react-icons/si';
import LogoLoop, { type LogoItem } from './LogoLoop';
import styles from './LogoLoopScene.module.css';

const frontendLogos: LogoItem[] = [
  { node: <SiReact color="#61dafb" />, title: 'React' },
  { node: <SiNextdotjs color="#ffffff" />, title: 'Next.js' },
  { node: <SiTypescript color="#3178c6" />, title: 'TypeScript' },
  { node: <SiTailwindcss color="#38bdf8" />, title: 'Tailwind CSS' },
  { node: <SiFlutter color="#54c5f8" />, title: 'Flutter' },
  { node: <SiSwift color="#f05138" />, title: 'Swift' },
  { node: <SiGraphql color="#e535ab" />, title: 'GraphQL' },
  { node: <SiFigma color="#f24e1e" />, title: 'Figma' },
];

const backendLogos: LogoItem[] = [
  { node: <SiNodedotjs color="#5fa04e" />, title: 'Node.js' },
  { node: <SiPython color="#3776ab" />, title: 'Python' },
  { node: <SiPostgresql color="#4169e1" />, title: 'PostgreSQL' },
  { node: <SiSupabase color="#3ecf8e" />, title: 'Supabase' },
  { node: <SiDocker color="#2496ed" />, title: 'Docker' },
  { node: <SiRedis color="#dc382d" />, title: 'Redis' },
  { node: <SiDotnet color="#8b5cf6" />, title: '.NET' },
  { node: <SiGo color="#00add8" />, title: 'Go' },
];

export default function LogoLoopScene() {
  return (
    <section className={styles.scene} aria-label="Technology stack & tools">
      <div className={styles.stage}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            CORE TECHNOLOGIES &amp; ECOSYSTEM
          </span>
        </div>
        <div className={styles.rails}>
          {/* Top rail: moving left */}
          <LogoLoop
            logos={frontendLogos}
            direction="left"
            speed={75}
            logoHeight={34}
            gap={44}
            scaleOnHover
            showTitles
            hoverSpeed={15}
            fadeOut
            fadeOutColor="#050507"
            ariaLabel="Frontend and mobile frameworks"
          />

          {/* Bottom rail: moving right (opposite direction) */}
          <LogoLoop
            logos={backendLogos}
            direction="right"
            speed={75}
            logoHeight={34}
            gap={44}
            scaleOnHover
            showTitles
            hoverSpeed={15}
            fadeOut
            fadeOutColor="#050507"
            ariaLabel="Backend, cloud and systems infrastructure"
          />
        </div>
      </div>
    </section>
  );
}
