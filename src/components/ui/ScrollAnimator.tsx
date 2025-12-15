
import { useRef, ReactNode, CSSProperties } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface ScrollAnimatorProps {
  children: ReactNode;
  className?: string;
  animationClassName?: string;
  threshold?: number;
  rootMargin?: string;
  style?: CSSProperties;
}

const ScrollAnimator = ({
  children,
  className,
  animationClassName = 'animate-fade-in-up',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  style,
}: ScrollAnimatorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold, rootMargin });

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0', // Start with opacity-0 to prevent flash of unstyled content
        className,
        isVisible && animationClassName
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollAnimator;
