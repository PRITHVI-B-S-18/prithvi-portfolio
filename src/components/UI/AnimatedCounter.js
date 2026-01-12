import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTimestamp = null;
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function (easeOutQuart)
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * value));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;

