import { useEffect } from 'react';

// Locks page scroll while any overlay (menu drawer, search, cart) is
// open. Previously this was a useEffect duplicated with a slightly
// different condition in every component that opened an overlay —
// now it's one line: useScrollLock(isOpen).
export function useScrollLock(isLocked) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}