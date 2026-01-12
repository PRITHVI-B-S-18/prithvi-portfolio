import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ project, index, isHovered, onHover, onLeave }) => {
  const cardRef = useRef(null);
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
      />

      {/* Card */}
      <motion.div
        className="relative h-full rounded-3xl glass border border-[var(--border)] overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading={index < 3 ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
          
          {/* Status Badge */}
          <motion.span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${project.color}`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {project.status}
          </motion.span>
        </div>

        {/* Content */}
        <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-1">
            {project.title}
          </h3>
          <p className="text-primary text-sm font-medium mb-3">{project.subtitle}</p>
          <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-4">
            {project.features.slice(0, 3).map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 + i * 0.1 }}
              >
                <span className="text-accent mt-0.5">✓</span>
                <span className="text-[var(--text-secondary)]">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="text-center p-2 rounded-lg glass"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 + i * 0.1 }}
              >
                <p className="text-lg font-bold text-gradient">{metric.value}</p>
                <p className="text-[10px] text-[var(--text-secondary)]">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech, i) => (
              <motion.span
                key={tech}
                className="px-2 py-1 rounded-full text-[10px] glass text-[var(--text-secondary)]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.6 + i * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-1 rounded-full text-[10px] glass text-[var(--text-secondary)]">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Action Button */}
          <Link href={`/projects/${project.id}`}>
            <motion.button
              className={`w-full py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${project.color} relative overflow-hidden group/btn`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore Details →</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;

