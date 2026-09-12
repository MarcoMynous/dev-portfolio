import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Custom hook to safely execute GSAP animations with automatic scoping and cleanup
 */
export function useGsapContext(
  callback: (context: gsap.Context) => void,
  scopeRef?: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  const isMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    const scope = scopeRef ? scopeRef.current ?? undefined : undefined;

    const ctx = gsap.context((self) => {
      callback(self);
    }, scope);

    return () => {
      ctx.revert();
      isMounted.current = false;
    };
  }, deps);
}

export { gsap, ScrollTrigger };
