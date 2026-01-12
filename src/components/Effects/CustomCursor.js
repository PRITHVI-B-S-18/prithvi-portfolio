import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  
  // Cursor colors - gradient from primary (blue) to secondary (pink)
  const cursorGradient = 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)';
  const cursorBorderGradient = 'linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%)';

  // Only render on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    // Throttled mouse position update for better performance
    let ticking = false;
    const updateMousePosition = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMounted]);

  // Don't render on server side or touch devices
  if (!isMounted) {
    return null;
  }

  // Hide on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          background: cursorGradient,
          mixBlendMode: theme === 'light' ? 'normal' : 'difference',
        }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Trailing ring with gradient border */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{
          background: `linear-gradient(135deg, rgba(99, 102, 241, ${theme === 'light' ? '0.7' : '0.5'}) 0%, rgba(236, 72, 153, ${theme === 'light' ? '0.7' : '0.5'}) 100%)`,
          padding: '2px',
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.3 : 1,
          opacity: isHovering ? (theme === 'light' ? 0.8 : 0.6) : (theme === 'light' ? 0.6 : 0.4),
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: theme === 'light' ? 'var(--bg-primary)' : 'var(--bg-primary)',
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;

