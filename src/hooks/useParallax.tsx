
import { useEffect, RefObject } from 'react';

const useParallax = (
  ref: RefObject<HTMLElement>,
  intensity: number = 20
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * intensity;
      const y = (clientY / innerHeight - 0.5) * intensity;

      requestAnimationFrame(() => {
        element.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.05)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Reset style on unmount
      if (element) {
        element.style.transform = 'translateX(0px) translateY(0px) scale(1)';
      }
    };
  }, [ref, intensity]);
};

export default useParallax;
