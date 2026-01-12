import { useState, useEffect, useCallback } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

export const useMagneticEffect = (ref, strength = 0.3) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 150;

    if (distance < maxDistance) {
      setOffset({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [ref, strength]);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return { offset, handleMouseLeave };
};

export const useTiltEffect = (ref, maxTilt = 15) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      x: -percentY * maxTilt,
      y: percentX * maxTilt,
    });
  }, [ref, maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
};

export default useMousePosition;

