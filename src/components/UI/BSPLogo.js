import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';

const BSPLogo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [maxScroll, setMaxScroll] = useState(1000);
  const containerRef = useRef(null);
  const router = useRouter();
  const controls = useAnimation();
  
  // Use scroll from the container or window
  const { scrollY } = useScroll();
  
  // Calculate max scroll based on document height - improved calculation
  useEffect(() => {
    const calculateMaxScroll = () => {
      // Wait for DOM to be ready
      if (typeof window === 'undefined' || !document.documentElement) {
        return;
      }
      
      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        // Use multiple methods to get accurate document height
        const body = document.body;
        const html = document.documentElement;
        
        // Get the actual scrollable height
        const documentHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        
        const windowHeight = window.innerHeight;
        const scrollableHeight = Math.max(0, documentHeight - windowHeight);
        
        // Ensure minimum scrollable height for short pages, but use actual value for long pages
        const maxScrollValue = Math.max(scrollableHeight, 200);
        
        // Only update if the value has changed significantly to avoid unnecessary re-renders
        setMaxScroll(prev => {
          if (Math.abs(prev - maxScrollValue) > 10) {
            return maxScrollValue;
          }
          return prev;
        });
      });
    };
    
    // Initial calculation with multiple delays to catch dynamic content
    const timeouts = [
      setTimeout(calculateMaxScroll, 0),
      setTimeout(calculateMaxScroll, 100),
      setTimeout(calculateMaxScroll, 300),
      setTimeout(calculateMaxScroll, 500),
    ];
    
    // Recalculate on various events
    const events = ['resize', 'load'];
    events.forEach(event => {
      window.addEventListener(event, calculateMaxScroll, { passive: true });
    });
    
    // Recalculate on scroll to catch dynamic content loading (throttled)
    let scrollTimeout;
    const handleScrollRecalc = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(calculateMaxScroll, 150);
    };
    window.addEventListener('scroll', handleScrollRecalc, { passive: true });
    
    // Use MutationObserver to detect DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      setTimeout(calculateMaxScroll, 100);
    });
    
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
      });
    }
    
    // Recalculate on route change
    const handleRouteChange = () => {
      // Reset maxScroll temporarily to force recalculation
      setMaxScroll(1000);
      setTimeout(calculateMaxScroll, 100);
      setTimeout(calculateMaxScroll, 300);
      setTimeout(calculateMaxScroll, 600);
      setTimeout(calculateMaxScroll, 1000); // Extra delay for dynamic content
    };
    
    if (router.events) {
      router.events.on('routeChangeComplete', handleRouteChange);
    }
    
    // Also recalculate when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(calculateMaxScroll, 100);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      events.forEach(event => {
        window.removeEventListener(event, calculateMaxScroll);
      });
      window.removeEventListener('scroll', handleScrollRecalc);
      clearTimeout(scrollTimeout);
      observer.disconnect();
      if (router.events) {
        router.events.off('routeChangeComplete', handleRouteChange);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router.pathname, router.events]);
  
  // Scroll-based transformations
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const logoOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);
  
  // Calculate scroll progress (0 to 1) based on actual page content
  const scrollProgress = useTransform(
    scrollY,
    [0, maxScroll],
    [0, 1],
    { clamp: true }
  );
  
  // Track scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Page transition animation
  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      scale: [0.9, 1],
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    });
  }, [router.pathname, controls]);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex items-center justify-center cursor-pointer"
      style={{ scale: logoScale, opacity: logoOpacity }}
      animate={controls}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Main Logo Container */}
      <div className="relative">
        {/* Outer Animated Border Design - Completes on Scroll */}
        <div className="absolute -inset-3 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 120 120"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradient Definitions for Mixed Colors */}
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
                <animate
                  attributeName="x1"
                  values="0%;100%;0%"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </linearGradient>
              <linearGradient id="logoGradientReverse" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
                <animate
                  attributeName="x1"
                  values="100%;0%;100%"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            
            {/* Outer Square Border - Animated Stroke with Gradient */}
            <motion.rect
              x="10"
              y="10"
              width="100"
              height="100"
              rx="8"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 400,
                strokeDashoffset: useTransform(scrollProgress, [0, 1], [400, 0]),
                opacity: 0.6,
              }}
            />
            
            {/* Inner Diamond - Animated Stroke with Gradient */}
            <motion.path
              d="M 60 20 L 100 60 L 60 100 L 20 60 Z"
              fill="none"
              stroke="url(#logoGradientReverse)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 320,
                strokeDashoffset: useTransform(scrollProgress, [0, 1], [320, 0]),
                opacity: 0.5,
              }}
            />
            
          </svg>
        </div>
        
        {/* BSP Letters - Mixed Gradient Color */}
        <div className="relative flex items-center gap-1 font-display font-bold text-lg sm:text-xl tracking-tight z-10">
          {/* B */}
          <motion.span
            className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -2, scale: 1.1 }}
          >
            B
          </motion.span>
          
          {/* S */}
          <motion.span
            className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -2, scale: 1.1 }}
          >
            S
          </motion.span>
          
          {/* P */}
          <motion.span
            className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -2, scale: 1.1 }}
          >
            P
          </motion.span>
        </div>
        
        {/* Rotating Ring Indicator - Appears when Scrolled with Gradient */}
        <motion.div
          className="absolute -inset-2 rounded-lg pointer-events-none"
          style={{
            border: '1px solid',
            borderImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3)) 1',
          }}
          animate={{
            rotate: isScrolled ? 360 : 0,
            opacity: isScrolled ? 0.3 : 0,
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 0.3 },
          }}
        />
      </div>
    </motion.div>
  );
};

export default BSPLogo;
