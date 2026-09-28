import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils.js';

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * Renders visible immediately for people who prefer reduced motion or on browsers
 * without IntersectionObserver. Use `as` to change the wrapper element, and `delay`
 * (ms) to stagger siblings.
 */
export default function Reveal({
  as: Component = 'div',
  delay = 0,
  className,
  style,
  children,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}
