export interface StoryState {
  id: number;
  videoSrc: string;
  badge?: string;
  badgeDot?: boolean;
  headline: string[];
  description: string;
  labels?: string[];
  ctaButtons?: {
    label: string;
    href: string;
    isPrimary?: boolean;
    isExternal?: boolean;
  }[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  videoPreview?: string;
  thumbnail?: string;
  year: string;
  role: string;
  stack: string[];
  image: string;
  accent: string;
}
