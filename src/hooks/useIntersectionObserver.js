import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export function useStaggeredReveal(count, options = {}) {
  const ref = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (entry.isIntersecting) {
          for (let i = 0; i < count; i++) {
            if (reduceMotion) {
              setVisibleItems(prev => new Set([...prev, i]));
            } else {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, i]));
              }, i * 90);
            }
          }
        } else {
          setVisibleItems(new Set());
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  return [ref, visibleItems];
}
