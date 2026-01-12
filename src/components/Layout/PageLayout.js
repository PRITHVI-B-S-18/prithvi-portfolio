import React from 'react';
import Navigation from './Navigation';
import ParticleField from '../Effects/ParticleField';
// import CustomCursor from '../Effects/CustomCursor';

const PageLayout = ({ children, showParticles = true }) => {
  return (
    <div className="min-h-screen bg-mesh relative overflow-x-hidden">
      {/* Custom Cursor */}
      {/* <CustomCursor /> */}
      
      {/* Background Effects */}
      {showParticles && <ParticleField />}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Page Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;

