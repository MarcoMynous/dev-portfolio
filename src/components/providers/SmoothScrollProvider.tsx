'use client';

import React from 'react';
import { useLenis } from '@/hooks/useLenis';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useLenis();

  return <>{children}</>;
};

export default SmoothScrollProvider;
