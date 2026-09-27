import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CinematicIntro } from './components/CinematicIntro';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { LivingNeuralNetwork } from './components/LivingNeuralNetwork';
import { InternshipLab } from './components/InternshipLab';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Active section observer on scroll
  useEffect(() => {
    if (!hasEntered) return;

    const sections = ['hero', 'journey', 'skills', 'internship', 'projects', 'certifications', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <div className="relative min-h-screen bg-[#040407] text-[#f1f5f9] selection:bg-violet-500/30 selection:text-white">
      {/* Premium Interactive Custom Cursor */}
      <CustomCursor />

      {/* Universal 3D Background Canvas */}
      <BackgroundCanvas />

      {/* SCENE 1: Cinematic Intro Screen */}
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <CinematicIntro key="cinematic-intro" onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* Main Digital World Experience */}
      {hasEntered && (
        <motion.div
          key="main-portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {/* Top Bar Navigation */}
          <HeaderNav activeSection={activeSection} />

          {/* Quick controls: Replay intro button floating quietly at bottom-left */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              setHasEntered(false);
            }}
            title="Replay Cinematic Intro"
            className="fixed bottom-5 left-5 z-40 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/40 transition-all text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg group"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Intro</span>
          </button>

          <main id="main-content">
            {/* SCENE 2: Hero */}
            <div id="hero">
              <HeroSection />
            </div>

            {/* SCENE 3: Journey / Academic Timeline */}
            <JourneySection />

            {/* SCENE 4: Technical Skills - Living Neural Network */}
            <LivingNeuralNetwork />

            {/* SCENE 5: AI Internship Laboratory */}
            <InternshipLab />

            {/* SCENE 6: Selected Projects Experiences */}
            <ProjectsSection />

            {/* SCENE 7: Floating Certifications */}
            <CertificationsSection />

            {/* SCENE 8: Contact / Big Finish & System Status */}
            <ContactSection />
          </main>
        </motion.div>
      )}
    </div>
  );
}
