import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    // Debounced resize handler
    let resizeTimeout;
    const updateDimensions = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });
    
    // Throttled mouse move handler
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mouseRef.current = { x: e.clientX, y: e.clientY };
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const particles = [];
    const particleCount = Math.floor((dimensions.width * dimensions.height) / 15000);
    
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 60 + 220; // Blue to purple range
      }
      
      update() {
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around
        if (this.x < 0) this.x = dimensions.width;
        if (this.x > dimensions.width) this.x = 0;
        if (this.y < 0) this.y = dimensions.height;
        if (this.y > dimensions.height) this.y = 0;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };
    
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      drawConnections();
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, isMounted]);

  // Don't render canvas on server side
  if (!isMounted) {
    return null;
  }

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};

export default ParticleField;

