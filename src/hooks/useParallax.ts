import { useEffect, useState, RefObject } from 'react';

export function useParallax(ref: RefObject<HTMLElement>, speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const elementTop = ref.current.getBoundingClientRect().top;
      const scrolled = window.scrollY;
      const rate = scrolled * speed;

      if (elementTop < window.innerHeight && elementTop > -ref.current.offsetHeight) {
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return offset;
}
