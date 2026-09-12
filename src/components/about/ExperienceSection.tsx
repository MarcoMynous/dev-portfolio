'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  X,
  Building2,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  FileText,
  Sparkles,
} from 'lucide-react';
import MorphSlider from './MorphSlider';
import styles from './AboutChapter.module.css';

export interface ExperienceItem {
  id: string;
  number: string;
  role: string;
  company: string;
  shortCompany: string;
  type: string;
  period: string;
  location: string;
  image: string;
  caption: string;
  summary: string;
  reportTitle?: string;
  reportDescription?: string;
  skills: string[];
  details: {
    overview: string;
    highlights: string[];
    technologies: string[];
  };
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'gdsc',
    number: '01',
    role: 'Full-stack Developer',
    company: 'Google Developer Student Clubs',
    shortCompany: 'GDSC / GDG',
    type: 'Part-time · Hybrid',
    period: 'May 2024 – Present',
    location: 'Hybrid',
    image: '/images/about/gdsc-tech.jpg',
    caption: 'GDSC — Full-stack Developer & Technical Contributor',
    summary:
      'As a full-stack developer, I actively engage with the developer community to build open-source tools, contribute to cross-functional web applications, mentor peers, and organize technical workshops.',
    skills: [
      'React.js',
      'TypeScript',
      'Next.js',
      'Software Infrastructure',
      'Distributed Systems',
      'Community Leadership',
    ],
    details: {
      overview:
        'Active technical leader within the Google Developer Groups ecosystem. Collaborate on open-source community applications, architect modern frontend interfaces, and facilitate engineering workshops on full-stack web technologies and cloud infrastructure.',
      highlights: [
        'Built and deployed performant client and backend architectures using React, Next.js, and TypeScript',
        'Led hands-on technical sessions on web performance, software infrastructure, and clean system design',
        'Mentored aspiring developers and coordinated collaborative hackathon projects across multidisciplinary teams',
      ],
      technologies: [
        'React.js',
        'TypeScript',
        'Next.js',
        'Node.js',
        'Tailwind CSS',
        'Git & GitHub Actions',
        'Cloud Computing',
      ],
    },
  },
  {
    id: 'gtco',
    number: '02',
    role: 'Software Engineering Intern',
    company: 'Guaranty Trust (GTCO / HabariPay)',
    shortCompany: 'GTCO / HabariPay',
    type: 'Internship · On-site',
    period: 'Jul 2026 – Sep 2026',
    location: 'Lagos, Lagos State, Nigeria',
    image: '/images/about/gtco-fintech.jpg',
    caption: 'GTCO / HabariPay — Backend Engineering & AI Support Systems',
    summary:
      'Led backend engineering on the internal AI Support System, structuring REST API endpoints and integrating real-time automated voice calling for proactive merchant POS issue resolution.',
    reportTitle: 'END OF INTERNSHIP REPORT',
    reportDescription:
      'A complete overview of eight weeks as a Software Engineering Intern at HabariPay (GTCO). Covers leading backend development on our AI support system, merchant POS telemetry, and payment infrastructure.',
    skills: [
      'Backend Engineering',
      'AI Support Systems',
      'API Design',
      'POS Telemetry',
      'Leadership',
      'Program Management',
    ],
    details: {
      overview:
        'Spearheaded backend architecture and service integrations for HabariPay (GTCO) fintech operations. Engineered real-time automated diagnostic pipelines that monitor merchant POS terminals and trigger proactive automated resolutions.',
      highlights: [
        'Led backend engineering on the internal AI Support System, structuring resilient API endpoints for transaction processing',
        'Integrated real-time automated voice calling and proactive telemetry to resolve merchant terminal issues before escalation',
        'Collaborated with senior fintech architects on high-volume payment infrastructure and microservice reliability',
        'Delivered the End of Internship Report documenting production deployment blueprints and API contracts',
      ],
      technologies: [
        'Python',
        'FastAPI / Node.js',
        'PostgreSQL',
        'REST APIs',
        'Real-Time Telephony APIs',
        'Docker',
        'Microservices',
      ],
    },
  },
  {
    id: 'goes',
    number: '03',
    role: 'Global Employment Intern',
    company: 'GOES Consulting (Ghost Consulting)',
    shortCompany: 'GOES Consulting',
    type: 'Internship · Remote',
    period: 'Mar 2026 – Jun 2026',
    location: 'Remote',
    image: '/images/about/goes-consulting.jpg',
    caption: 'GOES Consulting — Cybersecurity & Market Intelligence',
    summary:
      'Conducted comprehensive labor market research and developed targeted career differentiation strategies for professionals entering highly competitive sectors in cybersecurity and North American tech.',
    reportTitle: 'CERTIFICATE OF ACHIEVEMENT',
    reportDescription:
      'Certified by Ghost Consulting for in-depth Canadian and North American cybersecurity market research, ATS algorithmic optimization, and executive talent strategy.',
    skills: [
      'Market Research',
      'Cybersecurity Analysis',
      'ATS Optimization',
      'Data Analytics',
      'Communication',
      'Client Relations',
    ],
    details: {
      overview:
        'Conducted labor market intelligence and competitive workforce research across North American tech and cybersecurity domains. Formulated data-backed differentiation frameworks and algorithmic ATS strategies.',
      highlights: [
        'Analyzed technical hiring pipelines and cybersecurity workforce trends across the Canadian and US tech markets',
        'Formulated algorithmic ATS optimization models and differentiation strategies for technical candidates',
        'Earned Certificate of Achievement from Ghost Consulting for research excellence and client delivery',
      ],
      technologies: [
        'Cybersecurity Market Research',
        'Data Analysis',
        'Talent Intelligence Frameworks',
        'Technical Communication',
        'Executive Reporting',
      ],
    },
  },
];

export default function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const activeExp = EXPERIENCES[currentIndex];

  return (
    <section className={styles.exp} id="experience">
      <header>
        <span className={styles.eyebrow}>07 / 07 &nbsp;&nbsp;&nbsp; EXPERIENCE</span>
        <h2>
          PLACES I&apos;VE WORKED,
          <br />
          BUILT AND LEARNED.
        </h2>
        <p className={styles.lead}>
          Professional environments where I&apos;ve contributed engineering leadership, built production
          systems, and solved real-world problems.
        </p>
      </header>

      {/* WebGL Morph Slider Container */}
      <div className={styles.slider}>
        <MorphSlider
          items={EXPERIENCES.map((item) => ({
            image: item.image,
            caption: item.caption,
          }))}
          startIndex={currentIndex}
          transition="melt"
          duration={1.2}
          intensity={0.55}
          aberration={0.25}
          drift={0.22}
          autoplay={false}
          loop={false}
          radius={28}
          overlayColor="#050507"
          showCaptions={false}
          showControls={true}
          showIndicators={true}
          onIndexChange={(newIndex) => setCurrentIndex(newIndex)}
        />
      </div>

      {/* Active Experience Meta & Card Details */}
      <div className={styles.job}>
        <span>
          {activeExp.number} / {String(EXPERIENCES.length).padStart(2, '0')}
        </span>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#60a5fa',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.6rem',
                background: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(96, 165, 250, 0.25)',
                borderRadius: '99px',
              }}
            >
              {activeExp.type}
            </span>
          </div>

          <h3>{activeExp.company}</h3>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9', margin: '0.2rem 0 0.5rem' }}>
            {activeExp.role}
          </p>

          <small style={{ color: '#94a3b8', display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} /> {activeExp.period}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} /> {activeExp.location}
            </span>
          </small>

          <p style={{ color: '#cbd5e1', lineHeight: '1.65', maxWidth: '42rem' }}>
            {activeExp.summary}
          </p>

          {/* Artifact Preview Box if Report or Certificate */}
          {activeExp.reportTitle && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.85rem 1.15rem',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                maxWidth: '42rem',
              }}
            >
              <FileText size={20} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#93c5fd', letterSpacing: '0.08em', display: 'block' }}>
                  {activeExp.reportTitle}
                </strong>
                <span style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.45', display: 'block', marginTop: '2px' }}>
                  {activeExp.reportDescription}
                </span>
              </div>
            </div>
          )}

          {/* Skills & Competencies Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1.25rem' }}>
            {activeExp.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#e2e8f0',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDetailOpen(true)}
          aria-label={`View full experience details for ${activeExp.company}`}
        >
          <span>VIEW EXPERIENCE</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Experience Full Detail Modal */}
      {isDetailOpen && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeExp.company} Experience Details`}
          onClick={() => setIsDetailOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsDetailOpen(false)}
            aria-label="Close details"
          >
            <X size={18} /> CLOSE
          </button>

          <article onClick={(e) => e.stopPropagation()}>
            <span className={styles.eyebrow}>
              {activeExp.number} {'//'} {activeExp.type.toUpperCase()}
            </span>

            <h2>{activeExp.company}</h2>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#93c5fd', margin: '0.5rem 0 1rem' }}>
              {activeExp.role}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', margin: '0.5rem 0 1.75rem', color: '#7bb5ff', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} /> {activeExp.period}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={15} /> {activeExp.location}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Briefcase size={15} /> {activeExp.type}
              </span>
            </div>

            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0.65rem 0', color: '#93c5fd', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              <Building2 size={15} /> ROLE OVERVIEW
            </h4>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.65', color: '#cbd5e1' }}>
              {activeExp.details.overview}
            </p>

            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '2rem 0 0.85rem 0', color: '#93c5fd', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              <Award size={15} /> KEY CONTRIBUTIONS & IMPACT
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {activeExp.details.highlights.map((highlight, idx) => (
                <li key={idx} style={{ color: '#e2e8f0', fontSize: '0.94rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start', lineHeight: '1.55' }}>
                  <span style={{ color: '#38bdf8' }}>•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '2rem 0 0.85rem 0', color: '#93c5fd', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              <Sparkles size={15} /> TECHNOLOGIES & TOOLS
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {activeExp.details.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.4rem 0.8rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '6px',
                    color: '#dbeafe',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
