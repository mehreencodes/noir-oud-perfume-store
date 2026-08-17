import { useEffect } from 'react';

// Calls onEscape whenever the Escape key is pressed, for as long as
// the component using it is mounted. Any modal/overlay can opt in
// with one line instead of wiring its own keydown listener.
export function useEscapeKey(onEscape) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onEscape();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onEscape]);
}