'use client';

import type { ReactNode } from 'react';

// Adapted from React Bits: intentionally uses the app's existing global Lenis.
export function ScrollStackItem({ children }: { children: ReactNode }) {
  return <div className="scroll-stack-card">{children}</div>;
}

export default function ScrollStack({ children, className = '' }: { children: ReactNode; className?: string; itemDistance?: number; itemScale?: number; itemStackDistance?: number; stackPosition?: string; scaleEndPosition?: string; baseScale?: number; scaleDuration?: number; rotationAmount?: number; blurAmount?: number; useWindowScroll?: boolean }) {
  return <div className={className}>{children}</div>;
}
