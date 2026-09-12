'use client';

import React from 'react';
import { Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  return (
    <footer className={styles.contactSection} id="contact">
      <div className="container">
        <div className={styles.contactCard}>
          <div className="badge">
            <Sparkles size={14} />
            <span>Available for Opportunities</span>
          </div>

          <h2 className={styles.contactTitle}>
            Let&apos;s Build Something <span className="gradient-text">Exceptional</span> Together.
          </h2>

          <p className={styles.contactDescription}>
            Whether you are looking to architect a new high-scale distributed platform, optimize critical rendering paths, or push boundaries with interactive creative tech.
          </p>

          <div className={styles.contactActions}>
            <a
              href="mailto:contact@developer.portfolio"
              className={styles.emailBtn}
            >
              <Mail size={18} />
              <span>Get in Touch</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Senior Software Engineer. All rights reserved.</p>
          <p>Built with Next.js • GSAP • Lenis • TypeScript</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
