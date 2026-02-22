import { useEffect, useState, RefObject } from 'react';

export function useParallax(ref: RefObject<HTMLElement>, speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const scrolled = window.scrollY;

      const parallaxOffset = (scrolled - elementTop) * speed;
      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return offset;
}
