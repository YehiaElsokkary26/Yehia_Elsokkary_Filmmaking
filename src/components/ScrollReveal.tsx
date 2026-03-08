import { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'scale' | 'left' | 'right';
  delay?: number;
}

const variantMap = {
  up: 'reveal',
  scale: 'reveal-scale',
  left: 'reveal-left',
  right: 'reveal-right',
};

const ScrollReveal = ({ children, className = '', variant = 'up', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutRef.current = setTimeout(() => setVisible(true), delay);
        } else {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setVisible(false);
        }
      },
      { threshold: 0.08 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`${variantMap[variant]} ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
