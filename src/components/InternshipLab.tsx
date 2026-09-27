import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldCheck, Play, Pause, ChevronRight, CheckCircle2, Box, FileText } from 'lucide-react';
import { INTERNSHIP_DATA } from '../data/portfolioData';

export const InternshipLab: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeDomain, setActiveDomain] = useState<'text' | 'object'>('text');

  // Automated step progression when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % INTERNSHIP_DATA.pipelineSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const stepDetails = [
    {
      name: "Python",
      role: "Core Execution Runtime",
      desc: "Base environment for data engineering, mathematical transformations, and ML workflow orchestration.",
      stream: "INIT [python:3.10-runtime] ... virtualenv active ... dependencies loaded",
    },
    {
      name: "TensorFlow",
      role: "Deep Learning Engine",
      desc: "Computational graph construction, tensor operations, and backpropagation infrastructure.",
      stream: "EXEC tf.constant() tensors allocated ... accelerated compute engine initialized",
    },
    {
      name: "Keras",
      role: "High-Level Neural Architecture",
      desc: "Model prototyping, layer specification, compilation, and loss function parameterization.",
      stream: "MODEL keras.Sequential() compilation ... loss='categorical_crossentropy'",
    },
    {
      name: "Data Preprocessing",
      role: "Pipeline Engineering",
      desc: "Text tokenization, sequence padding, vector normalization, and bounding box coordinate transforms.",
      stream: "PIPELINE cleaning tokens ... stop-words filtered ... feature vectors aligned",
    },
    {
      name: "Model Training",
      role: "Supervised Learning",
      desc: "Iterative batch gradient descent, weight tuning, and continuous validation checkpoints.",
      stream: "TRAIN batch_size=32 ... forward pass ... loss minimization actively converging",
    },
    {
      name: "Performance Validation",
      role: "Model Verification",
      desc: "Rigorous evaluation across unseen splits to confirm generalization and prevent overfitting.",
      stream: "VALIDATE test split evaluation complete ... classification boundaries verified",
    },
  ];

  return (
    <section id="internship" className="relative py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400"
        >
          Engineering Experience
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display uppercase"
        >
          AI Internship
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base font-mono text-slate-300"
        >
          <span className="text-sky-300 font-semibold">{INTERNSHIP_DATA.company}</span>
          <span className="text-violet-400">·</span>
          <span className="text-slate-400">{INTERNSHIP_DATA.duration}</span>
        </motion.div>
      </div>

      {/* Main Terminal / AI Laboratory Visual Card */}
      <div className="glass-panel rounded-2xl border border-violet-500/25 overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.12)]">
        {/* Terminal Title Bar */}
        <div className="bg-[#080914] px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>ai-lab-console://personifwy/ml-pipeline</span>
            </div>
          </div>

          {/* Interactive Play/Pause Simulation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span>{isPlaying ? 'Pause Cycle' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Laboratory Interior Grid */}
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Domain Focus & Bullet Points */}
          <div className="lg:col-span-5 space-y-6">
            {/* Domain Focus Badges */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Core ML Domains
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveDomain('text')}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    activeDomain === 'text'
                      ? 'bg-violet-600/20 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-mono font-bold tracking-wider">DOMAIN 01</span>
                  </div>
                  <div className="text-sm font-semibold">TEXT CLASSIFICATION</div>
                </button>

                <button
                  onClick={() => setActiveDomain('object')}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    activeDomain === 'object'
                      ? 'bg-sky-600/20 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Box className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-mono font-bold tracking-wider">DOMAIN 02</span>
                  </div>
                  <div className="text-sm font-semibold">OBJECT DETECTION</div>
                </button>
              </div>
            </div>

            {/* Factual Scope Bullets */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Production Responsibilities
              </span>
              {INTERNSHIP_DATA.points.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">{point}</p>
                </div>
              ))}
            </div>

            {/* Core Tech Stack */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                Applied Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {INTERNSHIP_DATA.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono bg-violet-600/15 border border-violet-500/30 text-violet-200 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Animated ML Pipeline Flow & Live Stage Monitor */}
          <div className="lg:col-span-7 space-y-6">
            {/* The 6-Step Visual Pipeline Spine */}
            <div className="bg-[#05060e] p-6 rounded-xl border border-white/10 relative">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-between">
                <span>Initialization Pipeline Sequence</span>
                <span className="text-sky-400">STEP {activeStep + 1} OF 6</span>
              </div>

              {/* Pipeline Nodes Flow */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INTERNSHIP_DATA.pipelineSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isCompleted = activeStep > idx;

                  return (
                    <button
                      key={step}
                      onClick={() => {
                        setActiveStep(idx);
                        setIsPlaying(false);
                      }}
                      className={`relative p-3 rounded-lg border text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-violet-600/30 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                          : isCompleted
                          ? 'bg-white/[0.04] border-sky-400/40 text-slate-200'
                          : 'bg-white/[0.01] border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span>0{idx + 1}</span>
                        {isCompleted && <span className="text-sky-400">DONE</span>}
                        {isActive && <span className="text-violet-300 animate-pulse">ACTIVE</span>}
                      </div>
                      <div className="text-xs font-semibold truncate font-display">{step}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Live Console Details */}
              <div className="mt-6 p-4 rounded-lg bg-black/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white font-display">
                    {stepDetails[activeStep].name} —{' '}
                    <span className="text-sky-400 text-xs font-mono">
                      {stepDetails[activeStep].role}
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {stepDetails[activeStep].desc}
                </p>

                {/* Simulated Telemetry Stream */}
                <div className="mt-3 pt-3 border-t border-white/10 font-mono text-[11px] text-sky-300/90 flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span className="truncate">{stepDetails[activeStep].stream}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
