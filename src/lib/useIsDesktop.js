import { useState, useEffect } from 'react';

/**
 * Tracks whether the viewport is desktop-width (>= 768px). Used to disable
 * 3D rotateX / perspective transforms on mobile while keeping layout intact.
 *
 * Returns `mounted` so callers can render the plain (transform-free) tree on
 * the server and first paint, then opt into perspective once on the client —
 * avoiding hydration mismatches and a mobile-first flash.
 */
export default function useIsDesktop(query = '(min-width: 768px)') {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia(query);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return { isDesktop, mounted };
}
