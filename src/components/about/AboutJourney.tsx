

'use client';

import { useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Mail,
  MapPin,
  X,
} from 'lucide-react';
import MorphSlider from './MorphSlider';
import WebThreads from './WebThreads';
import styles from './AboutJourney.module.css';

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger, Flip);

interface Capability {
  number: string;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  { number: '01', title: 'MOBILE', description: 'Building product-focused mobile experiences' },
  { number: '02', title: 'WEB', description: 'Modern interactive interfaces and client apps' },
  { number: '03', title: 'BACKEND', description: 'Scalable APIs, services and data integrations' },
  { number: '04', title: 'SYSTEMS', description: 'Infrastructure, architecture and system reliability' },
];

interface SchoolItem {
  number: string;
  name: string;
  degree: string;
  location: string;
  years: string;
  image: string;
  tags: string[];
  detail: string;
  highlights: string[];
}

const schools: SchoolItem[] = [
  {
    number: '01',
    name: 'Covenant University',
    degree: 'B.Sc. Computer Science',
    location: 'Ota, Ogun State, Nigeria',
    years: '2019 — 2023',
    image: '/images/project-portal.webp',
    tags: ['Undergraduate', 'Computer Science', 'First Class'],
    detail:
      'Rigorous foundation in computer science, distributed architectures, database engines, algorithms, and collaborative product engineering.',
    highlights: [
      'Graduated with First Class Honours in Computer Science.',
      'Core focus on systems programming, operating systems, and distributed networks.',
      'Led multiple university engineering projects from conception to live deployment.',
    ],
  },
  {
    number: '02',
    name: 'Central College',
    degree: 'Secondary Education',
    location: 'Lagos, Nigeria',
    years: '2016 — 2019',
    image: '/images/about/experience-city.png',
    tags: ['High School', 'Science & Technology'],
    detail:
      'An intensive science and mathematics curriculum that fostered analytical reasoning, technical curiosity, and structured problem solving.',
    highlights: [
      'Advanced coursework in Mathematics, Physics, Chemistry, and Information Technology.',
      'Represented the institution in regional STEM and science exhibitions.',
      'Cultivated the discipline and curiosity that drive my approach to software.',
    ],
  },
];

interface ExperienceItem {
  number: string;
  company: string;
  role: string;
  period: string;
  location: string;
  image: string;
  summary: string;
  tags: string[];
  reportTitle?: string;
  reportExcerpt?: string;
}

const experiences: ExperienceItem[] = [
  {
    number: '01',
    company: 'HabariPay / GTCO',
    role: 'Software Engineering Intern',
    period: '2026',
    location: 'Lagos, Nigeria',
    image: '/images/about/gtco-fintech.jpg',
    summary:
      'Engineered backend services, optimized API gateways, and developed high-throughput transactional components for enterprise fintech products.',
    tags: ['Backend', 'Fintech', 'Distributed Systems', 'Java', 'Node.js'],
    reportTitle: 'Transaction Pipeline Throughput Optimization',
    reportExcerpt: 'Refactored message routing to improve endpoint response times by 34%.',
  },
  {
    number: '02',
    company: 'Google Developer Groups',
    role: 'Full-stack Developer',
    period: '2024 — Present',
    location: 'Hybrid',
    image: '/images/about/gdsc-tech.jpg',
    summary:
      'Architected developer tools, organized hands-on engineering hackathons, and published reusable component libraries for open-source communities.',
    tags: ['React', 'TypeScript', 'Web Architecture', 'Open Source', 'Community'],
    reportTitle: 'Open-Source UI Tooling Framework',
    reportExcerpt: 'Delivered modular design patterns used by 500+ student developers.',
  },
  {
    number: '03',
    company: 'GOES Consulting',
    role: 'Global Employment Intern',
    period: '2026',
    location: 'Remote',
    image: '/images/about/goes-consulting.jpg',
    summary:
      'Conducted data analysis across international tech employment markets, cybersecurity postures, and delivered strategic intelligence reports.',
    tags: ['Market Intelligence', 'Cybersecurity', 'Data Analysis', 'Strategy'],
    reportTitle: 'Emerging Engineering Talent Trends',
    reportExcerpt: 'Aggregated cross-regional hiring metrics into actionable talent blueprints.',
  },
];

export default function AboutJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const portraitInnerRef = useRef<HTMLDivElement>(null);
  const educationCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeSchool, setActiveSchool] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [experienceIndex, setExperienceIndex] = useState(0);

  const morphItems = useMemo(
    () => experiences.map(({ image, company }) => ({ image, caption: company })),
    []
  );

  const activeExperience = experiences[experienceIndex] || experiences[0];

  useLayoutEffect(() => {
    const root = rootRef.current;
    const thread = threadRef.current;
    if (!root || !thread) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const aboutLines = gsap.utils.toArray<HTMLElement>('[data-about-line]');
        const aboutRows = gsap.utils.toArray<HTMLElement>('[data-about-row]');
        const eduCards = gsap.utils.toArray<HTMLElement>('[data-edu-card]');
        const expMetaItems = gsap.utils.toArray<HTMLElement>('[data-exp-meta]');
        const contactParts = gsap.utils.toArray<HTMLElement>('[data-contact-part]');

        const aboutScene = root.querySelector('#scene-about') as HTMLElement | null;
        const eduScene = root.querySelector('#scene-education') as HTMLElement | null;
        const expScene = root.querySelector('#scene-experience') as HTMLElement | null;
        const contactScene = root.querySelector('#scene-contact') as HTMLElement | null;

        // Reset all 3D layers to pristine starting states
        gsap.set(
          '[data-about-eyebrow], [data-about-description], [data-about-portrait], [data-edu-heading], [data-exp-heading], [data-exp-stage], [data-exp-meta], [data-door], [data-contact-part]',
          { autoAlpha: 0 }
        );
        gsap.set(aboutLines, { autoAlpha: 0 });
        gsap.set(aboutRows, { autoAlpha: 0 });
        gsap.set(eduCards, { autoAlpha: 0 });
        gsap.set('[data-door]', { autoAlpha: 0 });
        gsap.set('[data-exp-live]', { autoAlpha: 1 });

        // Master Timeline (0 to 100 progress units mapped across 850vh)
        const timeline = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        // ========================================================
        // CHAPTER 1: ABOUT (0.00 - 0.33)
        // ========================================================
        // 0.00 - 0.18: ABOUT ENTER & ASSEMBLE
        timeline
          // Eyebrow enters
          .fromTo(
            '[data-about-eyebrow]',
            { x: -80, z: -200, autoAlpha: 0 },
            { x: 0, z: 0, autoAlpha: 1, duration: 4 },
            1.5
          )
          // Portrait travels out from depth: z -700 -> 80 -> 0, scale 0.65 -> 1.03 -> 1
          .fromTo(
            '[data-about-portrait]',
            {
              x: '18vw',
              y: '12vh',
              z: -700,
              scale: 0.65,
              rotateY: -12,
              rotateX: 4,
              filter: 'blur(10px)',
              autoAlpha: 0,
            },
            {
              x: 0,
              y: 0,
              z: 80,
              scale: 1.03,
              rotateY: 2,
              rotateX: 0,
              filter: 'blur(0px)',
              autoAlpha: 1,
              duration: 13.5,
              ease: 'power2.out',
            },
            0
          )
          .to(
            '[data-about-portrait]',
            { z: 0, scale: 1, rotateY: 0, duration: 3.5, ease: 'power2.inOut' },
            13.5
          )
          // Headline lines arrive from staggered depth
          .fromTo(
            aboutLines,
            {
              x: (i) => -120 - i * 30,
              z: (i) => -250 - i * 100,
              autoAlpha: 0,
            },
            {
              x: 0,
              z: 0,
              autoAlpha: 1,
              duration: 5.5,
              stagger: 0.7,
            },
            3
          )
          // Description
          .fromTo(
            '[data-about-description]',
            { y: 30, z: -180, autoAlpha: 0 },
            { y: 0, z: 0, autoAlpha: 1, duration: 4.5 },
            8
          )
          // Capability rows staggered entrance
          .fromTo(
            aboutRows,
            {
              x: (i) => -70 + i * 20,
              z: -120,
              autoAlpha: 0,
            },
            {
              x: 0,
              z: 0,
              autoAlpha: 1,
              duration: 3.5,
              stagger: 0.55,
            },
            10.5
          );

        // 0.18 - 0.25: ABOUT HOLD (Reading moment)
        if (aboutScene) {
          timeline.set(aboutScene, { pointerEvents: 'auto' }, 18);
        }

        // 0.25 - 0.33: ABOUT EXIT + CAMERA DIVE 1
        if (aboutScene) {
          timeline.set(aboutScene, { pointerEvents: 'none' }, 25);
        }
        timeline
          .to(
            '[data-about-portrait]',
            { x: '16vw', z: 250, scale: 1.12, autoAlpha: 0, duration: 8, ease: 'power2.in' },
            25
          )
          .to(
            aboutLines,
            { x: '-15vw', z: 180, autoAlpha: 0, duration: 7, stagger: 0.12, ease: 'power2.in' },
            25
          )
          .to(
            '[data-about-eyebrow], [data-about-description]',
            { x: '-10vw', z: 120, autoAlpha: 0, duration: 6, ease: 'power2.in' },
            25.5
          )
          .to(
            aboutRows,
            { z: -300, scale: 0.9, autoAlpha: 0, duration: 6, stagger: 0.08, ease: 'power2.in' },
            26
          )
          // WebThreads Dive 1
          .to(
            thread,
            {
              scale: 1.75,
              y: '-3vh',
              rotateZ: 1.5,
              filter: 'brightness(1.3)',
              opacity: 0.92,
              duration: 8,
              ease: 'power2.inOut',
            },
            25
          );

        // ========================================================
        // CHAPTER 2: EDUCATION (0.33 - 0.63)
        // ========================================================
        // 0.33 - 0.48: EDUCATION ENTER
        timeline
          .to(
            thread,
            {
              scale: 1.08,
              y: 0,
              rotateZ: 0,
              filter: 'brightness(1.0)',
              opacity: 0.55,
              duration: 5,
              ease: 'power2.out',
            },
            33
          )
          .fromTo(
            '[data-edu-heading]',
            { x: -100, z: -450, autoAlpha: 0 },
            { x: 0, z: 0, autoAlpha: 1, duration: 7 },
            34
          )
          // Card 01 / Left flies into place with overshoot
          .fromTo(
            eduCards[0],
            {
              x: '-65vw',
              y: '10vh',
              z: -700,
              rotateY: 28,
              rotateZ: -8,
              scale: 0.72,
              autoAlpha: 0,
            },
            {
              x: 25,
              y: 0,
              z: 40,
              rotateY: -1,
              rotateZ: 1.5,
              scale: 1.035,
              autoAlpha: 1,
              duration: 9.5,
              ease: 'power2.out',
            },
            34
          )
          .to(
            eduCards[0],
            { x: 0, z: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 3, ease: 'power2.inOut' },
            43.5
          )
          // Card 02 / Right flies into place with overshoot
          .fromTo(
            eduCards[1],
            {
              x: '65vw',
              y: '-5vh',
              z: -700,
              rotateY: -28,
              rotateZ: 8,
              scale: 0.72,
              autoAlpha: 0,
            },
            {
              x: -25,
              y: 0,
              z: 40,
              rotateY: 1,
              rotateZ: -1.5,
              scale: 1.035,
              autoAlpha: 1,
              duration: 9.5,
              ease: 'power2.out',
            },
            35
          )
          .to(
            eduCards[1],
            { x: 0, z: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 3, ease: 'power2.inOut' },
            44.5
          );

        // 0.48 - 0.55: EDUCATION HOLD (Interactive cards)
        if (eduScene) {
          timeline.set(eduScene, { pointerEvents: 'auto' }, 48);
        }

        // 0.55 - 0.63: EDUCATION EXIT + CAMERA DIVE 2
        if (eduScene) {
          timeline.set(eduScene, { pointerEvents: 'none' }, 55);
        }
        timeline
          .to(
            eduCards[0],
            { x: '-58vw', z: 300, rotateY: -24, rotateZ: -6, autoAlpha: 0, duration: 8, ease: 'power2.in' },
            55
          )
          .to(
            eduCards[1],
            { x: '58vw', z: 300, rotateY: 24, rotateZ: 6, autoAlpha: 0, duration: 8, ease: 'power2.in' },
            55
          )
          .to(
            '[data-edu-heading]',
            { z: -400, scale: 0.82, autoAlpha: 0, duration: 7, ease: 'power2.in' },
            55
          )
          // WebThreads Dive 2
          .to(
            thread,
            {
              scale: 1.7,
              rotateZ: -1,
              filter: 'brightness(1.26)',
              opacity: 0.9,
              duration: 8,
              ease: 'power2.inOut',
            },
            55
          );

        // ========================================================
        // CHAPTER 3: EXPERIENCE (0.63 - 0.92)
        // ========================================================
        // 0.63 - 0.78: EXPERIENCE ENTER
        timeline
          .to(
            thread,
            {
              scale: 1.1,
              rotateZ: 0,
              filter: 'brightness(1.0)',
              opacity: 0.5,
              duration: 5,
              ease: 'power2.out',
            },
            63
          )
          .fromTo(
            '[data-exp-heading]',
            { y: 50, z: -350, autoAlpha: 0 },
            { y: 0, z: 0, autoAlpha: 1, duration: 6 },
            64
          )
          // MorphSlider 3D Slit Reveal: opens from thin distant rectangle
          .fromTo(
            '[data-exp-stage]',
            {
              clipPath: 'inset(47% 12% 47% 12% round 30px)',
              z: -600,
              rotateX: 12,
              scale: 0.75,
              autoAlpha: 0,
            },
            {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              z: 40,
              rotateX: -1,
              scale: 1.025,
              autoAlpha: 1,
              duration: 10,
              ease: 'power2.out',
            },
            64
          )
          .to(
            '[data-exp-stage]',
            { z: 0, rotateX: 0, scale: 1, duration: 2.8, ease: 'power2.inOut' },
            74
          )
          // Metadata panel enters sequentially
          .fromTo(
            expMetaItems,
            { x: 90, z: -160, autoAlpha: 0 },
            { x: 0, z: 0, autoAlpha: 1, duration: 4.5, stagger: 0.5 },
            69.5
          );

        // 0.78 - 0.84: EXPERIENCE HOLD (Interactive MorphSlider)
        if (expScene) {
          timeline.set(expScene, { pointerEvents: 'auto' }, 78);
        }

        // 0.84 - 0.92: EXPERIENCE SPLIT + CAMERA DIVE 3
        if (expScene) {
          timeline.set(expScene, { pointerEvents: 'none' }, 84);
        }
        timeline
          .to('[data-exp-live]', { autoAlpha: 0, duration: 0.35 }, 84)
          .set('[data-door]', { autoAlpha: 1 }, 84)
          // Split doors fly outward
          .to(
            '[data-door="left"]',
            { x: '-55vw', z: 220, rotateY: -12, autoAlpha: 0, duration: 8, ease: 'power2.in' },
            84
          )
          .to(
            '[data-door="right"]',
            { x: '55vw', z: 220, rotateY: 12, autoAlpha: 0, duration: 8, ease: 'power2.in' },
            84
          )
          .to(
            expMetaItems,
            { y: 70, z: -350, autoAlpha: 0, duration: 7, stagger: 0.05, ease: 'power2.in' },
            84
          )
          .to(
            '[data-exp-heading]',
            { z: -500, scale: 0.8, autoAlpha: 0, duration: 7, ease: 'power2.in' },
            84
          )
          // Final push through network
          .to(
            thread,
            {
              scale: 1.45,
              filter: 'brightness(1.12)',
              opacity: 0.72,
              duration: 4,
              ease: 'power2.inOut',
            },
            84
          )
          .to(
            thread,
            {
              scale: 1.0,
              filter: 'brightness(0.68)',
              opacity: 0.14,
              duration: 8,
              ease: 'power2.inOut',
            },
            88
          );

        // ========================================================
        // CHAPTER 4: CONTACT (0.92 - 1.00)
        // ========================================================
        timeline.fromTo(
          contactParts,
          {
            z: (i) => -280 + i * 35,
            y: 26,
            autoAlpha: 0,
          },
          {
            z: 0,
            y: 0,
            autoAlpha: 1,
            duration: 6.5,
            stagger: 0.55,
            ease: 'power2.out',
          },
          92
        );

        if (contactScene) {
          timeline.set(contactScene, { pointerEvents: 'auto' }, 96);
        }

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      return () => media.revert();
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      window.clearTimeout(refresh);
      context.revert();
    };
  }, []);

  // Pointer tilt & parallax during About hold
  const handlePortraitPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!portraitInnerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    gsap.to(portraitInnerRef.current, { x, y, duration: 0.45, ease: 'power2.out', overwrite: true });
  };

  const resetPortraitPointer = () => {
    if (portraitInnerRef.current) {
      gsap.to(portraitInnerRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out', overwrite: true });
    }
  };

  // Education card 3D tilt
  const handleCardPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activeSchool !== null) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--card-rx', `${-ny * 4}deg`);
    event.currentTarget.style.setProperty('--card-ry', `${nx * 6}deg`);
    event.currentTarget.style.setProperty('--glow-x', `${(nx + 0.5) * 100}%`);
    event.currentTarget.style.setProperty('--glow-y', `${(ny + 0.5) * 100}%`);
  };

  const resetCardPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--card-rx', '0deg');
    event.currentTarget.style.setProperty('--card-ry', '0deg');
  };

  // GSAP Flip for Education detail view
  const openSchool = (index: number) => {
    const card = educationCardRefs.current[index];
    if (!card) return;
    const state = Flip.getState(card);
    flushSync(() => setActiveSchool(index));
    Flip.from(state, { duration: 0.75, ease: 'power3.inOut', absolute: true });
  };

  const closeSchool = () => {
    if (activeSchool === null) return;
    const card = educationCardRefs.current[activeSchool];
    if (!card) return;
    const state = Flip.getState(card);
    flushSync(() => setActiveSchool(null));
    Flip.from(state, { duration: 0.65, ease: 'power3.inOut', absolute: true });
  };

  return (
    <section ref={rootRef} className={styles.journey} aria-label="Cinematic 3D Scroll Journey">
      <div className={styles.stage}>
        {/* Connective Background WebThreads */}
        <div ref={threadRef} className={styles.threadsWrapper} aria-hidden="true">
          <WebThreads
            className={styles.threads}
            color1="#0d55d8"
            color2="#7fb3ff"
            color3="#e7f1ff"
            speed={0.16}
            threadCount={7}
            frequency={5}
            spread={0.2}
            glow={0.025}
            falloff={0.62}
            thickness={1.05}
            brightness={0.62}
            opacity={0.8}
            mirror
            shimmer={false}
            grain
            grainIntensity={0.025}
            mouseInteraction
            mouseStrength={0.16}
          />
        </div>

        {/* Ambient Dark Tunnel Vignette */}
        <div className={styles.vignette} aria-hidden="true" />

        {/* ========================================================
            CHAPTER 1: ABOUT
            ======================================================== */}
        <article className={styles.scene} id="scene-about">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCopy}>
              <p className={styles.eyebrow} data-about-eyebrow>
                05 / 07 <span>ABOUT</span>
              </p>
              <h2 className={styles.aboutTitle}>
                <span data-about-line>I BUILD WHERE</span>
                <span data-about-line>PRODUCT, CODE</span>
                <span data-about-line>AND SYSTEMS MEET.</span>
              </h2>
              <p className={styles.aboutLead} data-about-description>
                I&apos;m a software engineer who turns ambitious ideas into real, scalable products. I design and
                develop across mobile, web, distributed backend systems and the infrastructure between them.
              </p>
              <div className={styles.capabilities}>
                {capabilities.map((cap) => (
                  <div className={styles.capabilityRow} data-about-row key={cap.number}>
                    <span className={styles.capNumber}>{cap.number}</span>
                    <div className={styles.capText}>
                      <strong>{cap.title}</strong>
                      <small>{cap.description}</small>
                    </div>
                    <ArrowRight className={styles.capArrow} size={16} aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={styles.aboutPortraitMotion}
              data-about-portrait
              onPointerMove={handlePortraitPointer}
              onPointerLeave={resetPortraitPointer}
            >
              <div ref={portraitInnerRef} className={styles.portraitInner}>
                <img
                  src="/images/about/portrait-full-transparent.png"
                  alt="Portrait of Marco, Software Engineer"
                />
                <div className={styles.portraitBadge}>
                  IDEAS
                  <br />
                  SYSTEMS
                  <br />
                  PEOPLE
                  <br />
                  IMPACT
                </div>
                <blockquote className={styles.portraitQuote}>
                  “I don&apos;t just write code.
                  <br />I build for people.”
                </blockquote>
              </div>
            </div>
          </div>
        </article>

        {/* ========================================================
            CHAPTER 2: EDUCATION
            ======================================================== */}
        <article className={styles.scene} id="scene-education">
          <div className={styles.educationGrid}>
            <header className={styles.educationHeading} data-edu-heading>
              <p className={styles.eyebrow}>
                06 / 07 <span>EDUCATION</span>
              </p>
              <h2>
                WHERE I<br />
                LEARNED<br />
                AND GREW.
              </h2>
              <p>
                The academic institutions that shaped my foundation in computer science, software systems, and
                analytical problem solving.
              </p>
            </header>

            <div className={styles.schoolsWrapper}>
              {schools.map((school, index) => (
                <div className={styles.schoolCardMotion} data-edu-card key={school.number}>
                  <div
                    ref={(node) => {
                      educationCardRefs.current[index] = node;
                    }}
                    className={styles.schoolCard}
                    onPointerMove={handleCardPointer}
                    onPointerLeave={resetCardPointer}
                    onClick={() => activeSchool === null && openSchool(index)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && activeSchool === null) {
                        e.preventDefault();
                        openSchool(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${school.name}`}
                  >
                    <div className={styles.schoolCardGlow} />
                    <div className={styles.schoolCardMedia}>
                      <img src={school.image} alt={school.name} />
                    </div>
                    <div className={styles.schoolCardScrim} />
                    <div className={styles.schoolCardContent}>
                      <div className={styles.schoolCardHeader}>
                        <span className={styles.schoolCardNumber}>{school.number}</span>
                        <span className={styles.schoolCardYears}>{school.years}</span>
                      </div>
                      <div className={styles.schoolCardFooter}>
                        <h3 className={styles.schoolCardName}>{school.name}</h3>
                        <p className={styles.schoolCardDegree}>{school.degree}</p>
                        <small className={styles.schoolCardLocation}>{school.location}</small>
                        <div className={styles.schoolCardTags}>
                          {school.tags.map((tag) => (
                            <span className={styles.schoolTag} key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className={styles.schoolCardAction}>
                          VIEW DETAILS <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Education Flip Modal Detail Dialog */}
        {activeSchool !== null && (
          <div className={styles.modalOverlay} onClick={closeSchool} role="dialog" aria-modal="true">
            <article
              className={styles.modalArticle}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={closeSchool}
                aria-label="Close dialog"
              >
                <X size={14} /> CLOSE
              </button>
              <p className={styles.eyebrow}>
                {schools[activeSchool].number} / 02 <span>{schools[activeSchool].years}</span>
              </p>
              <h3 className={styles.modalName}>{schools[activeSchool].name}</h3>
              <h4 className={styles.modalDegree}>{schools[activeSchool].degree}</h4>
              <p className={styles.schoolCardLocation}>
                <MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />
                {schools[activeSchool].location}
              </p>
              <img
                className={styles.modalImg}
                src={schools[activeSchool].image}
                alt={schools[activeSchool].name}
              />
              <p className={styles.modalDetail}>{schools[activeSchool].detail}</p>
              <div style={{ marginTop: '1.5rem' }}>
                <strong
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.8rem',
                    color: '#93c5fd',
                    letterSpacing: '0.08em',
                    marginBottom: '0.6rem',
                  }}
                >
                  KEY HIGHLIGHTS & ACHIEVEMENTS:
                </strong>
                <ul style={{ paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {schools[activeSchool].highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        )}

        {/* ========================================================
            CHAPTER 3: EXPERIENCE
            ======================================================== */}
        <article className={`${styles.scene} ${styles.experienceScene}`} id="scene-experience">
          <header className={styles.experienceHeader} data-exp-heading>
            <p className={styles.eyebrow}>
              07 / 07 <span>EXPERIENCE</span>
            </p>
            <h2>
              PLACES I&apos;VE WORKED,
              <br />
              BUILT AND LEARNED.
            </h2>
          </header>

          <div className={styles.experienceContainer}>
            {/* MorphSlider Stage + Split Doors */}
            <div className={styles.experienceStage} data-exp-stage>
              <span className={styles.stageCounter}>{activeExperience.number} / 03</span>
              <div className={styles.morphLiveWrapper} data-exp-live>
                <MorphSlider
                  items={morphItems}
                  startIndex={0}
                  transition="melt"
                  intensity={0.48}
                  aberration={0.2}
                  drift={0.18}
                  autoplay={false}
                  overlayColor="#05060a"
                  duration={1.1}
                  ease="power2.inOut"
                  scale={2.4}
                  loop
                  radius={24}
                  showCaptions={false}
                  showControls
                  showIndicators
                  onIndexChange={setExperienceIndex}
                />
              </div>

              {/* Masked split doors for exit transition */}
              <div
                className={`${styles.splitDoor} ${styles.splitDoorLeft}`}
                data-door="left"
                style={{ backgroundImage: `url(${activeExperience.image})` }}
              />
              <div
                className={`${styles.splitDoor} ${styles.splitDoorRight}`}
                data-door="right"
                style={{ backgroundImage: `url(${activeExperience.image})` }}
              />
            </div>

            {/* Synchronized Metadata */}
            <div className={styles.experienceMeta}>
              <span className={styles.expMetaNumber} data-exp-meta>
                {activeExperience.number}
              </span>
              <div className={styles.expMetaBody}>
                <div className={styles.expMetaTop} data-exp-meta>
                  <span className={styles.expBadge}>WORK EXPERIENCE</span>
                </div>
                <h3 className={styles.expCompany} data-exp-meta>
                  {activeExperience.company}
                </h3>
                <h4 className={styles.expRole} data-exp-meta>
                  {activeExperience.role}
                </h4>
                <div className={styles.expFacts} data-exp-meta>
                  <span>
                    <MapPin size={13} /> {activeExperience.location}
                  </span>
                  <span>
                    <CalendarDays size={13} /> {activeExperience.period}
                  </span>
                </div>
                <p className={styles.expSummary} data-exp-meta>
                  {activeExperience.summary}
                </p>
                <div className={styles.expTags} data-exp-meta>
                  {activeExperience.tags.map((tag) => (
                    <span className={styles.expTag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className={styles.expViewBtn}
                data-exp-meta
                onClick={() => setSelectedExperience(activeExperience)}
              >
                VIEW DETAILS <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </article>

        {/* Experience Detail Modal */}
        {selectedExperience && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedExperience(null)}
            role="dialog"
            aria-modal="true"
          >
            <article
              className={styles.modalArticle}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSelectedExperience(null)}
                aria-label="Close dialog"
              >
                <X size={14} /> CLOSE
              </button>
              <p className={styles.eyebrow}>
                {selectedExperience.number} / 03 <span>{selectedExperience.period}</span>
              </p>
              <h3 className={styles.modalName}>{selectedExperience.company}</h3>
              <h4 className={styles.modalDegree}>{selectedExperience.role}</h4>
              <p className={styles.schoolCardLocation}>
                <MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />
                {selectedExperience.location}
              </p>
              <img
                className={styles.modalImg}
                src={selectedExperience.image}
                alt={selectedExperience.company}
              />
              <p className={styles.modalDetail}>{selectedExperience.summary}</p>
              {selectedExperience.reportTitle && (
                <div
                  style={{
                    marginTop: '1.2rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(96, 165, 250, 0.25)',
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.78rem',
                      color: '#93c5fd',
                      letterSpacing: '0.06em',
                      marginBottom: '0.3rem',
                    }}
                  >
                    FEATURED PROJECT / REPORT: {selectedExperience.reportTitle}
                  </strong>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.88rem' }}>
                    {selectedExperience.reportExcerpt}
                  </p>
                </div>
              )}
            </article>
          </div>
        )}

        {/* ========================================================
            CHAPTER 4: CONTACT
            ======================================================== */}
        <article className={styles.scene} id="scene-contact">
          <div className={styles.contactCard}>
            <span className={styles.contactBadge} data-contact-part>
              LET&apos;S CONNECT
            </span>
            <h2 className={styles.contactTitle} data-contact-part>
              LET&apos;S BUILD <span className={styles.gradientText}>SOMETHING</span> THAT MATTERS.
            </h2>
            <p className={styles.contactLead} data-contact-part>
              Have an ambitious project, an engineering challenge, or an opportunity in mind? Let&apos;s turn it into
              something useful, thoughtful, and built to last.
            </p>
            <div className={styles.contactActions} data-contact-part>
              <a
                href="mailto:ogochukwuulonnam986@gmail.com"
                className={styles.primaryContactBtn}
              >
                START A CONVERSATION <ArrowUpRight size={15} />
              </a>
              <a href="#scene-about" className={styles.secondaryContactBtn}>
                VIEW RESUME <ArrowUpRight size={15} />
              </a>
            </div>

            <nav className={styles.socialNav} aria-label="Social connections" data-contact-part>
              <a
                href="https://github.com/MarcoMynous"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <GithubIcon size={15} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
              <a
                href="mailto:ogochukwuulonnam986@gmail.com"
                className={styles.socialLink}
              >
                <Mail size={15} /> Email
              </a>
              <a href="#scene-about" className={styles.socialLink}>
                <ArrowLeft size={15} /> Resume
              </a>
            </nav>

            <footer className={styles.contactFooter} data-contact-part>
              <span>© {new Date().getFullYear()} Marco. All rights reserved.</span>
              <span>BUILT WITH REACT, NEXT.JS & GSAP</span>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
