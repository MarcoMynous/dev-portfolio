'use client';

import React, { useState } from 'react';
import { X, GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import SchoolHoloCard, { SchoolData } from './SchoolHoloCard';
import styles from './AboutChapter.module.css';

const SCHOOLS_DATA: SchoolData[] = [
  {
    number: '01',
    name: 'Covenant University',
    category: 'ALMA MATER',
    program: 'B.Sc. Computer Science',
    location: 'Ota, Ogun State, Nigeria',
    years: '2019 – 2023',
    handle: 'covenantuniversity',
    status: 'First Class Honours',
    avatarUrl: '/images/project-portal.webp',
    miniAvatarUrl: '/images/about/portrait-clean.png',
    tags: ['Computer Science', 'Distributed Systems', 'Software Engineering', 'Algorithms'],
    innerGradient: 'linear-gradient(145deg, rgba(95, 45, 160, 0.45) 0%, rgba(25, 95, 220, 0.35) 100%)',
    behindGlowColor: 'rgba(135, 185, 255, 0.75)',
    details: {
      overview:
        'Completed Bachelor of Science in Computer Science with First Class Honours. Immersed in core algorithmic problem solving, scalable distributed architecture, operating systems, and practical full-stack software development.',
      highlights: [
        'Graduated with First Class Honours in Computer Science',
        'Specialized in Distributed Computing, Concurrency & High-Throughput Architectures',
        'Active participant in university developer circles and software hackathons',
        'Completed final-year capstone project in real-time systems and intelligent data orchestration',
      ],
      coursework: [
        'Advanced Data Structures & Algorithms',
        'Operating Systems & Concurrent Programming',
        'Distributed Systems & Cloud Computing',
        'Database Management & Query Optimization',
        'Computer Networks & Network Security',
        'Object-Oriented Software Design & Architecture',
      ],
    },
  },
  {
    number: '02',
    name: 'Central College',
    category: 'STEM ACADEMY',
    program: 'Secondary Education & Science',
    location: 'Lagos, Nigeria',
    years: '2016 – 2019',
    handle: 'centralcollege',
    status: 'Distinction in Sciences',
    avatarUrl: '/images/about/experience-city.png',
    miniAvatarUrl: '/images/about/portrait.png',
    tags: ['Pure Mathematics', 'Physics', 'Intro to Computing', 'STEM Leadership'],
    innerGradient: 'linear-gradient(145deg, rgba(20, 85, 170, 0.45) 0%, rgba(10, 165, 210, 0.35) 100%)',
    behindGlowColor: 'rgba(75, 210, 255, 0.75)',
    details: {
      overview:
        'Foundational secondary education with deep focus on higher mathematics, physics, computing principles, and analytical problem solving.',
      highlights: [
        'Graduated with Academic Distinction across all core sciences and mathematics',
        'President of the Science and Technology Student Association',
        'Represented school in regional STEM Olympiads and mathematics competitions',
      ],
      coursework: [
        'Advanced Mathematics & Calculus',
        'Physics & Electronics Fundamentals',
        'Foundational Computer Science & Logic',
        'Chemistry & Scientific Methodology',
      ],
    },
  },
];

export default function EducationSection() {
  const [activeSchool, setActiveSchool] = useState<SchoolData | null>(null);

  return (
    <section className={styles.edu} id="education">
      <div className={styles.eduStage}>
        <div className={styles.eduGrid}>
          <header>
            <span className={styles.eyebrow}>06 / 07 &nbsp;&nbsp;&nbsp; EDUCATION</span>
            <h2>
              WHERE I LEARNED
              <br />
              AND GREW.
            </h2>
            <p className={styles.lead}>
              The academic and foundational institutions that shaped my discipline in technology,
              first-principles engineering, and systems thinking.
            </p>
          </header>

          <div className={styles.schools}>
            {SCHOOLS_DATA.map((school) => (
              <SchoolHoloCard
                key={school.number}
                school={school}
                onSelect={(selected) => setActiveSchool(selected)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal Dialog */}
      {activeSchool && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeSchool.name} Education Details`}
          onClick={() => setActiveSchool(null)}
        >
          <button
            type="button"
            onClick={() => setActiveSchool(null)}
            aria-label="Close details"
          >
            <X size={18} /> CLOSE
          </button>

          <article onClick={(e) => e.stopPropagation()}>
            <span className={styles.eyebrow}>
              {activeSchool.number} {'//'} {activeSchool.category}
            </span>

            <h2>{activeSchool.name}</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', margin: '1rem 0 1.5rem', color: '#7bb5ff', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <GraduationCap size={16} /> {activeSchool.program}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} /> {activeSchool.years}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={15} /> {activeSchool.location}
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.65', color: '#cbd5e1' }}>
              {activeSchool.details?.overview}
            </p>

            {activeSchool.details?.highlights && (
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.85rem 0', color: '#93c5fd', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
                  <Award size={15} /> KEY HIGHLIGHTS & HONOURS
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {activeSchool.details.highlights.map((item, idx) => (
                    <li key={idx} style={{ color: '#e2e8f0', fontSize: '0.92rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <span style={{ color: '#38bdf8' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeSchool.details?.coursework && (
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.85rem 0', color: '#93c5fd', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
                  <BookOpen size={15} /> RELEVANT COURSEWORK & FOCUS AREAS
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeSchool.details.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '6px',
                        color: '#dbeafe',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      )}
    </section>
  );
}
