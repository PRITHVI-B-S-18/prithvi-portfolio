import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import PageLayout from '@/components/Layout/PageLayout';
import AnimatedCounter from '@/components/UI/AnimatedCounter';

const stats = [
  { value: 8, label: 'Production Systems', icon: '🚀', suffix: '' },
  { value: 70, label: 'Time Reduction', icon: '⏱️', suffix: '%' },
  { value: 40, label: 'Efficiency Gain', icon: '📈', suffix: '%' },
  { value: 2, label: 'Employee of Month', icon: '🏆', suffix: '×' },
];

const About = () => {
    return (
    <PageLayout>
            <Head>
        <title>About | Prithvi B S</title>
        <meta name="description" content="Learn about Prithvi B S - AI/Data Science student and Full-Stack Developer." />
            </Head>

      <section 
        className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-x-hidden" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '100vw',
          border: 'none',
          outline: 'none'
        }}
      >
        <div className="max-w-7xl mx-auto w-full" style={{ border: 'none', outline: 'none' }}>
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get to know me
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-[var(--text-primary)]">About </span>
              <span className="text-gradient">Me</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Passionate about building systems that make a real impact
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="max-w-4xl mx-auto mb-12 sm:mb-20 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6 text-center text-[var(--text-primary)]">
              AI & Full-Stack Developer building the future
            </h2>
            
            <div className="space-y-4 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
              <p>
                I&apos;m <span className="text-primary font-semibold">Prithvi B S</span>, 
                an AI/Data Science student at <span className="text-[var(--text-primary)]">Bannari Amman Institute of Technology</span> and 
                currently working as an <span className="text-secondary font-semibold">Associate Tech Content</span> at iamneo.
              </p>
              <p>
                I specialize in building <span className="text-[var(--text-primary)]">production-ready systems</span> that 
                combine AI capabilities with robust full-stack development. My expertise spans from 
                creating intelligent workflow automations with <span className="text-accent font-semibold">n8n</span> to 
                deploying enterprise applications.
              </p>
              <p>
                I believe in creating solutions that drive measurable impact — reducing manual tasks 
                by 70%, improving efficiency by 40%, and delivering systems that teams genuinely enjoy using.
              </p>
                        </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center">
              {['React', 'FastAPI', 'Azure OpenAI', 'n8n', 'Firebase', 'Python'].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm text-[var(--text-primary)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                >
                  {tech}
                </motion.span>
              ))}
                        </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-stretch sm:items-center">
              <Link href="/experience" className="w-full sm:w-auto">
                <motion.button
                  className="btn-primary w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Experience
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                                </span>
                </motion.button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.button
                  className="btn-secondary w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See Projects
                </motion.button>
              </Link>
                            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                <motion.div
                  className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl glass text-center card-3d"
                  whileHover={{ y: -5 }}
                >
                  <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{stat.icon}</span>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-8 sm:mb-12">
              <span className="text-gradient">Education</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  institution: 'Bannari Amman Institute of Technology',
                  degree: 'B.Tech AI & Data Science',
                  period: '2021 - 2025',
                  score: '8.22 CGPA',
                  icon: '🎓',
                },
                {
                  institution: 'Vidyaa Vikas Matriculation Higher Secondary School',
                  degree: 'HSC - Class XII',
                  period: '2020 - 2021',
                  score: '87.75%',
                  icon: '📚',
                },
                {
                  institution: 'Periyar Matriculation Higher Secondary School',
                  degree: 'SSLC - Class X',
                  period: '2018 - 2019',
                  score: '83%',
                  icon: '🏫',
                },
              ].map((edu, index) => (
                <motion.div
                  key={edu.institution}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="p-5 sm:p-6 rounded-xl sm:rounded-2xl glass border border-[var(--border)] h-full"
                    whileHover={{ y: -5 }}
                  >
                    <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{edu.icon}</span>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1">
                      {edu.institution}
                    </h3>
                    <p className="text-primary font-medium text-xs sm:text-sm mb-2">{edu.degree}</p>
                    <p className="text-[var(--text-secondary)] text-xs sm:text-sm mb-2">{edu.period}</p>
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-primary/20 text-primary text-xs sm:text-sm font-bold">
                      {edu.score}
                                </span>
                  </motion.div>
                </motion.div>
              ))}
                            </div>
          </motion.div>
                        </div>
      </section>
    </PageLayout>
  );
};

export default About;

