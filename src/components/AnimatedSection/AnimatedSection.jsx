import React, { memo } from 'react';
import { useScrollReveal, usePrefersReducedMotion } from '../../hooks/useScrollReveal';
import './style.css';

/**
 * AnimatedSection - Wrapper component for scroll-triggered animations
 * @param {string} animation - Animation type: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale'
 * @param {number} delay - Animation delay in ms
 * @param {number} duration - Animation duration in ms
 * @param {number} threshold - IntersectionObserver threshold (0-1)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Child elements
 */
export const AnimatedSection = memo(({
  animation = 'slide-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  children,
  as: Component = 'div',
  style = {},
  ...props
}) => {
  const [ref, isVisible] = useScrollReveal({ threshold });
  const prefersReducedMotion = usePrefersReducedMotion();

  const getAnimationClass = () => {
    if (prefersReducedMotion) return '';
    
    switch (animation) {
      case 'fade':
        return 'animated-fade';
      case 'slide-up':
        return 'animated-slide-up';
      case 'slide-down':
        return 'animated-slide-down';
      case 'slide-left':
        return 'animated-slide-left';
      case 'slide-right':
        return 'animated-slide-right';
      case 'scale':
        return 'animated-scale';
      default:
        return 'animated-slide-up';
    }
  };

  const animationStyle = {
    '--animation-delay': `${delay}ms`,
    '--animation-duration': `${duration}ms`,
    ...style,
  };

  return (
    <Component
      ref={ref}
      className={`animated-section ${getAnimationClass()} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={animationStyle}
      {...props}
    >
      {children}
    </Component>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

/**
 * StaggeredList - Animates children with staggered delays
 */
export const StaggeredList = memo(({
  children,
  staggerDelay = 100,
  animation = 'slide-up',
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const childrenWithDelay = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    return React.cloneElement(child, {
      className: `${child.props.className || ''} staggered-item ${animation} ${isVisible ? 'is-visible' : ''}`,
      style: {
        ...child.props.style,
        '--stagger-delay': prefersReducedMotion ? '0ms' : `${index * staggerDelay}ms`,
      },
    });
  });

  return (
    <Component ref={ref} className={`staggered-list ${className}`} {...props}>
      {childrenWithDelay}
    </Component>
  );
});

StaggeredList.displayName = 'StaggeredList';

export default AnimatedSection;
