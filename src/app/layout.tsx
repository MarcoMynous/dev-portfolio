import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'Senior Software Engineer | Distributed Systems & Kinetic UI',
  description:
    'Portfolio of a Senior Software Engineer specializing in scalable distributed architectures, performance engineering, and interactive 3D motion.',
  keywords: [
    'Senior Software Engineer',
    'Full Stack Engineer',
    'Distributed Systems',
    'Next.js',
    'TypeScript',
    'GSAP',
    'ScrollTrigger',
    'Performance Optimization',
  ],
  authors: [{ name: 'Senior Software Engineer' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050811',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
