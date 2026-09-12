import { StoryState } from '@/types/project';

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  role: string;
  stack: string[];
  image: string;
  accent: string;
  // Compatibility fields for legacy, currently-unmounted project components.
  tagline: string;
  tags: string[];
};

export const STORY_STATES: StoryState[] = [
  {
    id: 1,
    videoSrc: '/videos/hero-core-01-scrub.mp4',
    badge: 'AVAILABLE FOR SELECT WORK',
    badgeDot: true,
    headline: ['SOFTWARE', 'ENGINEER.'],
    description: 'I design and build products across iOS, web, backend systems and infrastructure.',
    ctaButtons: [
      { label: 'Explore Work', href: '#story-scroll', isPrimary: true },
      {
        label: 'View GitHub ↗',
        href: 'https://github.com',
        isPrimary: false,
        isExternal: true,
      },
    ],
  },
  {
    id: 2,
    videoSrc: '/videos/hero-core-02-scrub.mp4',
    badge: 'CAPABILITIES',
    headline: ['ONE DEVELOPER.', 'MULTIPLE LAYERS.'],
    description: 'Mobile · Web · Backend · Cloud',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'rexipay',
    number: '01',
    title: 'RexiPay',
    tagline: 'Placeholder project — details to be added.',
    description: 'A placeholder for a modern financial product spanning mobile, backend, and infrastructure.',
    category: 'Fintech Platform',
    tags: ['Flutter', '.NET', 'Supabase'],
    stack: ['Flutter', '.NET', 'Supabase'],
    role: 'Full Stack / Mobile',
    image: '/projects/rexipay.png',
    accent: '#4F7CFF',
    year: '2026',
  },
  {
    id: 'project-two', number: '02', title: 'Project Two', tagline: 'Placeholder project — details to be added.', category: 'Placeholder Product',
    description: 'Placeholder description for a product and its engineering approach.', role: 'Placeholder role', year: '—',
    tags: ['To be added'], stack: ['To be added'], image: '/projects/project-two.png', accent: '#A57CFF',
  },
  {
    id: 'project-three', number: '03', title: 'Project Three', tagline: 'Placeholder project — details to be added.', category: 'Placeholder Product',
    description: 'Placeholder description for a product and its engineering approach.', role: 'Placeholder role', year: '—',
    tags: ['To be added'], stack: ['To be added'], image: '/projects/project-three.png', accent: '#5DD3E8',
  },
  {
    id: 'project-four', number: '04', title: 'Project Four', tagline: 'Placeholder project — details to be added.', category: 'Placeholder Product',
    description: 'Placeholder description for a product and its engineering approach.', role: 'Placeholder role', year: '—',
    tags: ['To be added'], stack: ['To be added'], image: '/projects/project-four.png', accent: '#A9C1DC',
  },
];
