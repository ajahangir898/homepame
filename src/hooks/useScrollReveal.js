import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-based reveal animations
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - Ref to attach and visibility state
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Only animate once
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

/**
 * Custom hook for staggered reveal animations on multiple elements
 * @param {number} count - Number of elements to animate
 * @param {number} staggerDelay - Delay between each element (ms)
 * @returns {Array} - Array of refs and visibility states
 */
export function useStaggeredReveal(count, staggerDelay = 100) {
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Array(count).fill(false));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContainerVisible(true);
          observer.unobserve(container);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  useEffect(() => {
    if (!isContainerVisible) return;

    const timeouts = [];
    for (let i = 0; i < count; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems((prev) => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, i * staggerDelay);
      timeouts.push(timeout);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [isContainerVisible, count, staggerDelay]);

  return [containerRef, visibleItems];
}

/**
 * Custom hook for parallax scrolling effect
 * @param {number} speed - Parallax speed multiplier (default: 0.5)
 * @returns {[React.RefObject, number]} - Ref and transform value
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      
      setOffset(distance * speed * -1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
}

/**
 * Custom hook to detect when user prefers reduced motion
 * @returns {boolean} - Whether user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Custom hook for responsive breakpoint detection
 * @returns {Object} - Object with breakpoint states
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
      });
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize, { passive: true });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export default useScrollReveal;
