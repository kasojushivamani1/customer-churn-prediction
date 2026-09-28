import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing a band near the top of the viewport,
 * or null when none of the given sections is there (for example, while the hero is showing).
 * Pass a stable array; an empty array turns the observer off.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!ids.length || !('IntersectionObserver' in window)) {
      setActiveId(null);
      return undefined;
    }

    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setActiveId(ids.find((id) => inBand.has(id)) ?? null);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
