import { useEffect } from 'react';

// Sets the browser tab title and meta description for the current
// page. Call this once at the top of each page component. Falls back
// to restoring the default title on unmount so navigating away is clean.
export function useDocumentTitle(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDescription = metaDescription?.getAttribute('content');

    if (description && metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (metaDescription && prevDescription) {
        metaDescription.setAttribute('content', prevDescription);
      }
    };
  }, [title, description]);
}