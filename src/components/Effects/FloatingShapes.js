import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const shapes = [
  { type: 'circle', size: 60, color: 'rgba(99, 102, 241, 0.1)', delay: 0 },
  { type: 'square', size: 40, color: 'rgba(236, 72, 153, 0.1)', delay: 0.5 },
  { type: 'triangle', size: 50, color: 'rgba(20, 184, 166, 0.1)', delay: 1 },
  { type: 'circle', size: 80, color: 'rgba(99, 102, 241, 0.08)', delay: 1.5 },
  { type: 'square', size: 30, color: 'rgba(236, 72, 153, 0.08)', delay: 2 },
  { type: 'donut', size: 70, color: 'rgba(20, 184, 166, 0.1)', delay: 2.5 },
];

const positions = [
  { top: '10%', left: '10%' },
  { top: '20%', right: '15%' },
  { top: '60%', left: '5%' },
  { top: '70%', right: '10%' },
  { bottom: '20%', left: '20%' },
  { bottom: '30%', right: '25%' },
];

const FloatingShapes = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => {
        const pos = positions[index];
        
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              ...pos,
              width: shape.size,
              height: shape.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -30, 0],
              rotate: [0, shape.type === 'square' ? 45 : 0, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: shape.delay },
              scale: { duration: 0.5, delay: shape.delay },
              y: { duration: 6 + index, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 8 + index, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {shape.type === 'circle' && (
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: shape.color, border: `2px solid ${shape.color.replace('0.1', '0.3')}` }}
              />
            )}
            {shape.type === 'square' && (
              <div
                className="w-full h-full rounded-lg"
                style={{ backgroundColor: shape.color, border: `2px solid ${shape.color.replace('0.1', '0.3')}` }}
              />
            )}
            {shape.type === 'triangle' && (
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid ${shape.color}`,
                }}
              />
            )}
            {shape.type === 'donut' && (
              <div
                className="w-full h-full rounded-full"
                style={{
                  border: `8px solid ${shape.color.replace('0.1', '0.2')}`,
                  backgroundColor: 'transparent',
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingShapes;

