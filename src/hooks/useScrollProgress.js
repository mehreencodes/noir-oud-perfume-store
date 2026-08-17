import { useState, useEffect } from 'react';

// Tracks how far down the page the person has scrolled, as a 0-100
// percentage. Pulled out of the ScrollProgress component so the
// calculation itself is reusable and testable independent of the UI
// that renders it.
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}