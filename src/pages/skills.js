import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import PageLayout from '@/components/Layout/PageLayout';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'JavaScript', 'C++', 'SQL', 'R', 'C'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Vite', 'Tailwind CSS', 'HTML', 'CSS', 'Streamlit'],
  },
  {
    name: 'Backend',
    skills: ['FastAPI', 'Django', 'Node.js', 'Firebase Functions'],
  },
  {
    name: 'AI/ML',
    skills: ['Azure OpenAI', 'LLMs', 'Machine Learning', 'GenAI', 'MTCNN'],
  },
  {
    name: 'Automation',
    skills: ['n8n Workflow', 'Selenium WebDriver', 'Workflow Orchestration'],
    specialized: 'Specialized',
  },
  {
    name: 'Database',
    skills: ['Firebase Firestore', 'PostgreSQL', 'Supabase', 'MySQL'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Azure Blob Storage', 'Firebase Hosting', 'Docker', 'Azure Services'],
  },
  {
    name: 'Dev Tools',
    skills: ['VS Code', 'Jupyter', 'Git', 'Figma', 'Android Studio'],
  },
  {
    name: 'Integration',
    skills: ['Mapbox', 'NodeMailer API', 'RESTful APIs', 'WebSocket'],
  },
];

// Skill Badge Component with blinking effect
const SkillBadge = ({ skill, index }) => {
  const badgeRef = useRef(null);
  const isInView = useInView(badgeRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={badgeRef}
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ 
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      <motion.div
        className="relative px-4 py-2.5 rounded-xl glass border border-[var(--border)] text-center overflow-hidden group/skill"
        whileHover={{ y: -4, scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{ willChange: 'transform' }}
      >
        {/* Blinking effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'linear',
          }}
          style={{ willChange: 'transform' }}
        />
        
        {/* Subtle gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
        />
        
        <span className="relative z-10 text-sm font-semibold text-[var(--text-primary)] tracking-wide">
          {skill}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Skill Category Card
const SkillCategory = ({ category, index, isExpanded, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle glow on hover */}
      <motion.div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-xl"
        animate={{ 
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ willChange: 'opacity' }}
      />

      {/* Main card */}
      <motion.div
        className={`
          relative p-6 rounded-3xl glass border-2 overflow-hidden cursor-pointer transition-all duration-300
          ${isExpanded 
            ? 'border-primary/50 ring-2 ring-primary/20 shadow-lg shadow-primary/10' 
            : 'border-[var(--border)] hover:border-primary/30'
          }
        `}
        whileHover={{ y: -5, scale: 1.02 }}
        onClick={onToggle}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ willChange: 'transform' }}
      >
        {/* Animated shimmer effect - Similar to waving but different */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
              width: '200%',
              height: '200%',
            }}
            animate={{
              rotate: [0, 360],
              x: ['-50%', '50%'],
              y: ['-50%', '50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
        
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isExpanded ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                {category.name}
              </h3>
              {category.specialized && (
                <motion.span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  {category.specialized}
                </motion.span>
              )}
            </div>
          </div>
          
          {/* Expand/Collapse Indicator */}
          <motion.div
            className="flex-shrink-0 ml-4"
            animate={{ 
              rotate: isExpanded ? 180 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center relative"
              animate={{
                boxShadow: isHovered 
                  ? ['0 0 0 0 rgba(99, 102, 241, 0.4)', '0 0 0 8px rgba(99, 102, 241, 0)']
                  : '0 0 0 0 rgba(99, 102, 241, 0)'
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeOut'
              }}
            >
              <svg
                className="w-5 h-5 text-primary relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Grid - Animated expand/collapse */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="overflow-hidden"
            >
              <motion.div 
                className="grid grid-cols-2 gap-3 pt-2"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          damping: 20,
                        }
                      },
                    }}
                  >
                    <SkillBadge
                      skill={skill}
                      index={skillIndex}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleToggle = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <PageLayout>
      <Head>
        <title>Skills | Prithvi B S</title>
        <meta name="description" content="Technical skills and expertise of Prithvi B S." />
      </Head>

      <section className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-x-hidden" style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
        <div className="max-w-7xl mx-auto w-full" style={{ border: 'none', outline: 'none' }}>
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm text-primary mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Tech Arsenal
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-gradient">Skills</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategory 
                key={category.name} 
                category={category} 
                index={index}
                isExpanded={expandedCategory === category.name}
                onToggle={() => handleToggle(category.name)}
              />
            ))}
          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default Skills;
