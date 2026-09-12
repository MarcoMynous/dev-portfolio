'use client';

import React from 'react';
import Link from 'next/link';
import { GithubIcon } from '@/components/icons/BrandIcons';
import styles from './Navigation.module.css';

export const Navigation: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span>PORTFOLIO</span>
          <span className={styles.logoSub}>/ Senior Software Engineer</span>
        </Link>

        <div className={styles.navActions}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
            aria-label="GitHub Profile"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
