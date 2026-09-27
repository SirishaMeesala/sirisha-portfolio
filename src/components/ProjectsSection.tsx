import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Activity,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  FileCheck2,
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { PROJECTS_DATA, ProjectData } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // ReviewGuard interactive demo state
  const [sampleReview, setSampleReview] = useState<string>(
    'The build quality and battery endurance matched expectations, package sealed with manual.'
  );
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<'genuine' | 'suspicious'>('genuine');

  // SmartShelf simulated item selector
  const [selectedStockCategory, setSelectedStockCategory] = useState<string>('Sensors');

  const handleTestReview = (text: string, type: 'genuine' | 'suspicious') => {
    setSampleReview(text);
    setAnalyzing(true);
    setTimeout(() => {
      setReviewResult(type);
      setAnalyzing(false);
    }, 450);
  };

  return (
    <section id="projects" className="relative py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-sky-400"
        >
          Curated Engineering Portfolio
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display uppercase"
        >
          Selected Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          Interactive machine learning architectures solving critical real-world challenges.
        </motion.p>
      </div>

      <div className="space-y-24">
        {/* ======================================================== */}
        {/* PROJECT 01: SMARTSHELF AI                                */}
        {/* ======================================================== */}
        <div className="glass-panel rounded-3xl border border-violet-500/25 overflow-hidden group transition-all duration-500 hover:border-violet-500/50 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
          {/* Project Top Bar */}
          <div className="bg-[#080a18] px-8 py-5 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold">
                PROJECT 01 // INVENTORY INTELLIGENCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                SmartShelf AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Intelligent Inventory Management & Demand Forecasting System
              </p>
            </div>

            <button
              onClick={() => setSelectedProject(PROJECTS_DATA[0])}
              className="px-5 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              <span>Immersive Project View</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>

          {/* Project Body */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Concepts & Architecture details */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Developed an AI-based inventory management system using machine learning for demand forecasting, stock monitoring, and inventory optimization. Built a Flask-based dashboard with analytics and low-stock alerts to provide real-time inventory insights.
              </p>

              {/* Core Concepts */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  Engineered Concepts
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROJECTS_DATA[0].concepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-white/[0.03] border border-white/10 text-slate-300"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Category Selector */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Select Monitored Inventory Node:
                </span>
                <div className="flex gap-2">
                  {['Sensors', 'Compute Units', 'Power Modules'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedStockCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        selectedStockCategory === cat
                          ? 'bg-violet-600/40 border border-violet-400 text-white shadow-sm'
                          : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Futuristic Inventory Dashboard Visualization */}
            <div className="lg:col-span-7">
              <div className="bg-[#05060f] p-6 rounded-2xl border border-white/10 space-y-6 relative overflow-hidden">
                {/* Visualizer Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Flask Telemetry & Stock Stream
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Low-Stock Alert Trigger: ACTIVE</span>
                  </div>
                </div>

                {/* Stock Monitoring Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">
                      Stock Monitoring
                    </div>
                    <div className="text-sm font-semibold text-white">Optimal Level</div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-sky-400 h-full w-[82%] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">
                      Demand Forecast
                    </div>
                    <div className="text-sm font-semibold text-white">Trend: Ascending</div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-violet-500 h-full w-[68%] rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                    <div className="text-[11px] font-mono text-amber-400 uppercase">
                      Low-Stock Warning
                    </div>
                    <div className="text-sm font-semibold text-amber-200">Reorder Threshold</div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-full w-[24%] rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    </div>
                  </div>
                </div>

                {/* Demand Forecast Visualization Graph (SVG Wave) */}
                <div className="p-5 rounded-xl bg-black/60 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                      ML Demand Forecasting Curve (Historical vs Predicted)
                    </span>
                    <span className="text-slate-500">Flask Dashboard Analytics</span>
                  </div>

                  {/* SVG Forecast Curve */}
                  <div className="h-28 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Area under historical + forecast */}
                      <path
                        d="M 0,80 Q 50,30 100,55 T 200,40 T 300,20 T 400,10 L 400,100 L 0,100 Z"
                        fill="url(#curveGradient)"
                      />

                      {/* Main trend line */}
                      <path
                        d="M 0,80 Q 50,30 100,55 T 200,40 T 300,20 T 400,10"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2.5"
                      />

                      {/* Projection split line */}
                      <line
                        x1="220"
                        y1="0"
                        x2="220"
                        y2="100"
                        stroke="#38bdf8"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-400">
                      Historical Ingestion
                    </div>
                    <div className="absolute top-2 right-4 text-[10px] font-mono text-sky-400">
                      Forecast Prediction Horizon →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PROJECT 02: REVIEWGUARD                                  */}
        {/* ======================================================== */}
        <div className="glass-panel rounded-3xl border border-sky-500/25 overflow-hidden group transition-all duration-500 hover:border-sky-500/50 shadow-[0_0_50px_rgba(56,189,248,0.1)]">
          {/* Project Top Bar */}
          <div className="bg-[#080a18] px-8 py-5 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
                PROJECT 02 // NLP INTEGRITY LAB
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                ReviewGuard
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                AI-Powered Fake Product Review Detection System
              </p>
            </div>

            <button
              onClick={() => setSelectedProject(PROJECTS_DATA[1])}
              className="px-5 py-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            >
              <span>Immersive Project View</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>

          {/* Project Body */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Overview, Metrics & Concepts */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Developed a machine learning-based system to classify e-commerce reviews as genuine or fake using TF-IDF feature extraction and classification algorithms. Implemented data preprocessing, model training, and evaluation using accuracy, precision, recall, and F1-score metrics.
              </p>

              {/* Performance Metrics Verification (Names only, no fake numbers!) */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  Performance Metric Suite
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {PROJECTS_DATA[1].metrics?.map((metric) => (
                    <div
                      key={metric}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <span className="text-xs font-mono text-slate-300">{metric}</span>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <FileCheck2 className="w-3 h-3 text-emerald-400" /> Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concepts */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  Linguistic Pipeline Concepts
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROJECTS_DATA[1].concepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-sky-950/40 border border-sky-500/20 text-sky-200"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: AI Text-Analysis Laboratory Visualizer */}
            <div className="lg:col-span-7">
              <div className="bg-[#05060f] p-6 rounded-2xl border border-white/10 space-y-6">
                {/* Visual Pipeline Sequence Banner */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Execution Flow
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 bg-black/60 p-3 rounded-xl border border-white/5 overflow-x-auto gap-2">
                    <span className="text-white whitespace-nowrap">Product Review</span>
                    <span className="text-violet-400">→</span>
                    <span className="text-white whitespace-nowrap">Text Processing</span>
                    <span className="text-violet-400">→</span>
                    <span className="text-sky-300 whitespace-nowrap">TF-IDF</span>
                    <span className="text-violet-400">→</span>
                    <span className="text-white whitespace-nowrap">Classification</span>
                    <span className="text-violet-400">→</span>
                    <span className="text-emerald-400 whitespace-nowrap">Genuine / Fake</span>
                  </div>
                </div>

                {/* Interactive Test Sandbox */}
                <div className="p-5 rounded-xl bg-black/60 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">
                      Simulate Review Input Vector:
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleTestReview(
                            'The build quality and battery endurance matched expectations, package sealed with manual.',
                            'genuine'
                          )
                        }
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                      >
                        Sample Genuine
                      </button>
                      <button
                        onClick={() =>
                          handleTestReview(
                            'AMAZING 10/10 BUY NOW BEST EVER CLICK HERE MIRACLE PRODUCT 5 STARS!',
                            'suspicious'
                          )
                        }
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                      >
                        Sample Anomalous
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#080914] border border-white/10 text-xs text-slate-300 font-mono">
                    "{sampleReview}"
                  </div>

                  {/* Result & Matrix */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400">TF-IDF Vectorization:</span>
                      <span className="text-sky-300">
                        {analyzing ? 'Tokenizing...' : 'Computed [N-grams Active]'}
                      </span>
                    </div>

                    <div
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase border flex items-center gap-2 ${
                        reviewResult === 'genuine'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          reviewResult === 'genuine' ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                      <span>
                        {reviewResult === 'genuine' ? 'CLASSIFIED: GENUINE' : 'CLASSIFIED: FAKE / ANOMALOUS'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Immersive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#080916] border border-white/15 rounded-3xl max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  Immersive Architectural Deep Dive
                </span>
                <h3 className="text-3xl font-bold text-white font-display">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-slate-300 font-sans">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Project Image */}
              <div className="rounded-2xl overflow-hidden border border-white/10 max-h-72">
                <img
                  src={selectedProject.imagePath}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300">
                  Engineering Scope & Purpose
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300">
                  Architectural Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-slate-300 font-sans"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow Pipeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300">
                  System Workflow Pipeline
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {selectedProject.workflow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="p-2 rounded-lg bg-black/60 border border-white/10 text-slate-300">
                        0{idx + 1}. {step}
                      </span>
                      {idx < selectedProject.workflow.length - 1 && (
                        <span className="text-violet-400">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Exploration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
