import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Cpu, Terminal, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse coordinates for parallax & spotlight
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [isInside, setIsInside] = useState(false);

  // Springs for smooth dynamic light & parallax lag
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const smoothLightX = useSpring(window.innerWidth / 2, springConfig);
  const smoothLightY = useSpring(window.innerHeight / 2, springConfig);

  // Parallax offsets for text & 3D visual
  const textParallaxX = useSpring(0, springConfig);
  const textParallaxY = useSpring(0, springConfig);
  const artifactTiltX = useSpring(0, springConfig);
  const artifactTiltY = useSpring(0, springConfig);

  // Scroll transition progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Cinematic scroll transforms
  const heroDarkenOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [0, 0.8, 0.95]
  );

  const heroContentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -110]
  );

  const heroContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 0.45, 0]
  );

  const heroContentScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.96]
  );

  const artifactScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.76]
  );

  const artifactScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 60]
  );

  const artifactOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.4, 0]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setMousePos({ x, y, normX, normY });

    smoothLightX.set(e.clientX);
    smoothLightY.set(e.clientY);

    // Subtle parallax shifts
    textParallaxX.set(normX * -12);
    textParallaxY.set(normY * -10);

    // 3D artifact tilt
    artifactTiltX.set(normY * -18);
    artifactTiltY.set(normX * 18);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    textParallaxX.set(0);
    textParallaxY.set(0);
    artifactTiltX.set(0);
    artifactTiltY.set(0);
  };

  // Staggered letters for SATYA SIRISHA
  const firstName = 'SATYA';
  const lastName = 'SIRISHA';

  const nameContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: {
      opacity: 0,
      y: 22,
      filter: 'blur(8px)',
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Dynamic Cursor Light Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: isInside ? 0.6 : 0.25,
          background:
            'radial-gradient(650px circle at 50% 40%, rgba(139, 92, 246, 0.12), rgba(56, 189, 248, 0.04), transparent 70%)',
        }}
      />

      {/* Cinematic Darkening Veil on Scroll */}
      <motion.div
        style={{ opacity: heroDarkenOpacity }}
        className="pointer-events-none absolute inset-0 bg-[#040407] z-10"
      />

      {/* Main hero content */}
      <motion.div
        style={{
          y: heroContentY,
          opacity: heroContentOpacity,
          scale: heroContentScale,
        }}
        className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20"
      >
        {/* Left Column */}
        <motion.div
          style={{
            x: textParallaxX,
            y: textParallaxY,
          }}
          className="lg:col-span-8 space-y-6"
        >
          {/* Status Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400 font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            <span>FINAL-YEAR B.TECH IT</span>

            <span className="text-slate-600">·</span>

            <span>SOFTWARE & AI PROJECTS</span>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl font-light text-slate-300 tracking-wide font-sans"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              variants={nameContainerVariant}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white font-display uppercase leading-[0.95] text-gradient-violet-blue flex flex-wrap gap-x-5 select-none"
            >
              {/* SATYA */}
              <span className="inline-flex whitespace-nowrap">
                {firstName.split('').map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    variants={letterVariant}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>

              {/* SIRISHA */}
              <span className="inline-flex whitespace-nowrap">
                {lastName.split('').map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    variants={letterVariant}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </div>

          {/* Academic & Batch Detail */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-slate-300 font-mono"
          >
            <span className="text-white font-semibold">
              {PERSONAL_INFO.title}
            </span>

            <span className="text-violet-400">/</span>

            <span className="text-sky-300">
              {PERSONAL_INFO.batch}
            </span>
          </motion.div>

          {/* Career Objective */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-sans"
          >
            {PERSONAL_INFO.careerObjective}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#skills"
              variant="primary"
              icon={<Cpu className="w-4 h-4 text-violet-300" />}
            >
              Explore Neural Skills
            </MagneticButton>

            <MagneticButton
              href="#projects"
              variant="secondary"
              icon={<Terminal className="w-4 h-4 text-sky-400" />}
            >
              View Projects
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <motion.div
            style={{
              scale: artifactScale,
              y: artifactScrollY,
              opacity: artifactOpacity,
            }}
            className="relative"
          >
            {/* Orbital particle ring */}
            <div className="absolute -inset-10 pointer-events-none">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <motion.div
                  key={deg}
                  animate={{
                    rotate: [deg, deg + 360],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 24 + i * 2,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div
                    style={{
                      transform: `translate(${140 + (i % 3) * 15}px, 0)`,
                    }}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i % 2 === 0
                        ? 'bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.9)]'
                        : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            {/* 3D Digital Artifact Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              style={{
                rotateX: artifactTiltX,
                rotateY: artifactTiltY,
                transformPerspective: 1000,
              }}
              className="relative w-64 h-64 sm:w-76 sm:h-76 rounded-2xl p-2.5 glass-panel border border-violet-500/40 shadow-[0_0_50px_rgba(139,92,246,0.22)] group overflow-hidden"
            >
              {/* Ambient Shimmer */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.65, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-600/25 via-sky-500/15 to-transparent pointer-events-none"
              />

              {/* Inner Boundary */}
              <div className="w-full h-full rounded-xl overflow-hidden relative border border-white/10 bg-[#080914]">

                {/* AVATAR IMAGE - FIXED PATH */}
                <img
  src="https://raw.githubusercontent.com/SirishaMeesala/sirisha-portfolio/main/avatar.jpg"
  alt="Meesala Satya Sirisha Digital Artifact"
  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 select-none pointer-events-none"
  referrerPolicy="no-referrer"
/>

                {/* Depth scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040407]/90 via-transparent to-transparent opacity-75" />

                {/* Micro Tech HUD */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 backdrop-blur-md bg-black/75 px-3 py-1.5 rounded-lg border border-white/15 shadow-sm">
                  <span className="flex items-center gap-1.5 text-sky-300">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    MSS // ARTIFACT
                  </span>

                  <span className="text-slate-400">
                    ONLINE
                  </span>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-sky-400/60" />

                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-violet-400/60" />

                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-violet-400/60" />

                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-sky-400/60" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{ opacity: heroContentOpacity }}
        className="pt-12 flex flex-col items-center justify-center text-center relative z-20"
      >
        <a
          href="#journey"
          className="group flex flex-col items-center gap-2 text-xs font-mono tracking-[0.25em] text-slate-400 hover:text-white transition-colors"
        >
          <span>SCROLL TO EXPLORE ↓</span>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
            }}
            className="w-6 h-9 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-violet-400 rounded-full shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
