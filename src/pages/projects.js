import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import PageLayout from '@/components/Layout/PageLayout';
import ProjectCard from '@/components/Projects/ProjectCard';

const projects = [
  {
    id: 'trainops',
    title: 'TrainOps',
    subtitle: 'Enterprise Trainer Management System',
    description: 'Complete 90-day training lifecycle platform with GPS-based verification, real-time synchronization, and multi-role architecture.',
    image: '/images/projects/trainops.png',
    features: [
      'Three-role architecture (Admin, Program Manager, Trainer)',
      'GPS-based clock-in/out verification with Mapbox',
      'Real-time synchronization across all users',
      'Bulk operations with Excel/PDF export',
      'Firebase Authentication & Cloud Firestore',
    ],
    tech: ['React', 'Firebase', 'Mapbox', 'NodeMailer', 'Cloud Functions'],
    metrics: [
      { value: '70%', label: 'Setup Time Reduced' },
      { value: 'Real-time', label: 'Data Sync' },
      { value: 'Multi', label: 'Concurrent Sessions' },
    ],
    status: 'In Use',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'mcq-generator',
    title: 'MCQ Generator Platform',
    subtitle: 'AI-Powered Question Creation',
    description: 'Automated MCQ generation with n8n workflow automation, strict subject hierarchy, and quality control system.',
    image: '/images/projects/mcq-generator.png',
    features: [
      'n8n workflow automation pipeline',
      'Multi-select subtopic interface with form state persistence',
      'Strict subject-topic-subtopic hierarchy',
      'Quality control with validation checkmarks',
      'Dual output system (CSV + Google Sheets)',
    ],
    tech: ['n8n', 'Supabase', 'Azure OpenAI', 'React', 'FastAPI'],
    metrics: [
      { value: '40%', label: 'Accuracy Improved' },
      { value: '1-30', label: 'Questions/Gen' },
      { value: 'Active', label: 'Team Usage' },
    ],
    status: 'In Use',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'trainer-scorer',
    title: 'Trainer Scorer',
    subtitle: 'AI-Powered Evaluation System',
    description: 'Automated trainer evaluation with VTT parsing, rubric-based scoring, and multi-format report generation.',
    image: '/images/projects/trainer-scorer.png',
    features: [
      'VTT-to-JSON parsing pipeline',
      'Rubric-based AI evaluation with GPT-4o',
      'Multi-format reports (HTML/DOCX/CSV)',
      'Azure Blob Storage integration',
      'Concurrent user support with real-time status',
    ],
    tech: ['React', 'Vite', 'FastAPI', 'Azure OpenAI', 'Firebase'],
    metrics: [
      { value: 'GPT-4o', label: 'AI Powered' },
      { value: 'Multi', label: 'Report Formats' },
      { value: 'Real-time', label: 'Status Tracking' },
    ],
    status: 'Production',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'course-automation',
    title: 'Course Automation System',
    subtitle: 'Selenium-Powered Workflow',
    description: 'Browser automation for course management with comprehensive reporting and dual-mode operation.',
    image: '/images/projects/course-automation.png',
    features: [
      'Selenium WebDriver automation',
      'Dual-mode operation (Course Creation + Test Addition)',
      'Comprehensive Excel/JSON reporting',
      'Non-intrusive wrapper system',
      'Modern React UI with tab navigation',
    ],
    tech: ['Selenium', 'Python', 'FastAPI', 'React', 'Pandas'],
    metrics: [
      { value: '70%', label: 'Time Saved' },
      { value: 'Dual', label: 'Excel/JSON Reports' },
      { value: 'Auto', label: 'Error Tracking' },
    ],
    status: 'In Use',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'voice-assistant',
    title: 'LLM Voice Assistant',
    subtitle: 'Intelligent Conversational AI',
    description: 'Voice-activated assistant with facial recognition trigger, speech processing, and context-aware responses.',
    image: '/images/projects/voice-assistant.png',
    features: [
      'MTCNN-based facial recognition trigger',
      'Speech-to-text & text-to-speech pipeline',
      'Context-aware LLM responses',
      'Streamlit interactive interface',
      'Hands-free operation mode',
    ],
    tech: ['LLM', 'MTCNN', 'Google TTS', 'Streamlit', 'Python'],
    metrics: [
      { value: '30%', label: 'Response Time ↓' },
      { value: '40%', label: 'Engagement ↑' },
      { value: 'Hands-free', label: 'Operation' },
    ],
    status: 'Completed',
    color: 'from-indigo-500 to-violet-500',
  },
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

    return (
    <PageLayout>
      <Head>
        <title>Projects | Prithvi B S</title>
        <meta name="description" content="Production systems and projects built by Prithvi B S." />
      </Head>

      <section className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-x-hidden" style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
        <div className="max-w-7xl mx-auto w-full" style={{ border: 'none', outline: 'none' }}>
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm text-primary mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Featured Work
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Production systems and applications that drive real impact
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
              />
            ))}
                </div>
            </div>
      </section>
    </PageLayout>
  );
};

export default Projects;

