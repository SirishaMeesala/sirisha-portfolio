import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, X, Zap, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_NODES, SkillNode } from '../data/portfolioData';

interface NodeCoord {
  id: string;
  x: number;
  y: number;
  label: string;
  category: 'PROGRAMMING' | 'WEB' | 'FRAMEWORK' | 'TOOLS';
  color: string;
}

// Fixed coordinate layout in SVG 1000x560 viewbox
const MAIN_NETWORK_NODES: NodeCoord[] = [
  { id: 'python', x: 330, y: 70, label: 'Python', category: 'PROGRAMMING', color: '#38bdf8' },
  { id: 'sql', x: 190, y: 180, label: 'SQL', category: 'PROGRAMMING', color: '#38bdf8' },
  { id: 'java', x: 470, y: 180, label: 'Java', category: 'PROGRAMMING', color: '#38bdf8' },
  { id: 'flask', x: 330, y: 290, label: 'Flask', category: 'FRAMEWORK', color: '#a855f7' },
  { id: 'html', x: 190, y: 410, label: 'HTML', category: 'WEB', color: '#c084fc' },
  { id: 'css', x: 470, y: 410, label: 'CSS', category: 'WEB', color: '#c084fc' },
  { id: 'javascript', x: 330, y: 490, label: 'JavaScript', category: 'WEB', color: '#c084fc' },
];

const TOOLS_CLUSTER_NODES: NodeCoord[] = [
  { id: 'jupyter', x: 740, y: 100, label: 'Jupyter Notebook', category: 'TOOLS', color: '#818cf8' },
  { id: 'vscode', x: 860, y: 220, label: 'VS Code', category: 'TOOLS', color: '#818cf8' },
  { id: 'git', x: 720, y: 350, label: 'Git', category: 'TOOLS', color: '#818cf8' },
  { id: 'github', x: 880, y: 450, label: 'GitHub', category: 'TOOLS', color: '#818cf8' },
];

const ALL_COORDS = [...MAIN_NETWORK_NODES, ...TOOLS_CLUSTER_NODES];

// Predefined connection links
const NETWORK_EDGES = [
  // Core neural topology
  { from: 'python', to: 'sql' },
  { from: 'python', to: 'java' },
  { from: 'sql', to: 'flask' },
  { from: 'java', to: 'flask' },
  { from: 'python', to: 'flask' }, // Central backbone
  { from: 'flask', to: 'html' },
  { from: 'flask', to: 'css' },
  { from: 'html', to: 'javascript' },
  { from: 'css', to: 'javascript' },
  { from: 'html', to: 'css' },
  { from: 'flask', to: 'javascript' },
  // Tools cluster internal links
  { from: 'git', to: 'github' },
  { from: 'git', to: 'vscode' },
  { from: 'github', to: 'vscode' },
  { from: 'jupyter', to: 'vscode' },
  // Cross-cluster neural bridge
  { from: 'python', to: 'jupyter' },
  { from: 'java', to: 'git' },
  { from: 'flask', to: 'vscode' },
];

export const LivingNeuralNetwork: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const activeNodeId = selectedId || hoveredId;
  const activeSkill = SKILL_NODES.find((s) => s.id === activeNodeId) || null;

  // Set of connected IDs for active node
  const activeConnectedIds = new Set<string>();
  if (activeSkill) {
    activeConnectedIds.add(activeSkill.id);
    activeSkill.connections.forEach((id) => activeConnectedIds.add(id));
  }

  const coordMap = new Map(ALL_COORDS.map((c) => [c.id, c]));

  const handleNodeClick = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <section id="skills" className="relative py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-sky-400">
          Interactive Neural Constellation
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display uppercase">
          Technical Skills
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-sans">
          Every skill is connected. Explore the neural network to inspect programming languages, web technologies, frameworks, and developer tools.
        </p>

        {/* Category Filter Toggles */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {['ALL', 'PROGRAMMING', 'WEB', 'FRAMEWORK', 'TOOLS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-violet-600/30 text-white border border-violet-500/60 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Neural Display Canvas Frame */}
      <div className="relative rounded-3xl glass-panel border border-violet-500/25 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.08)] bg-[#05060f]">
        {/* HUD Top Bar */}
        <div className="px-6 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-[#080916]">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sky-300 font-semibold">NEURAL TOPOLOGY</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 hidden sm:inline">11 TECHNICAL SKILLS ACTIVE</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Hover to illuminate · Click to inspect
          </div>
        </div>

        {/* Neural Network SVG Visualization Canvas */}
        <div className="relative w-full overflow-hidden p-2 sm:p-6 min-h-[480px] flex items-center justify-center">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* SVG Diagram with responsive viewBox */}
          <svg
            className="w-full h-auto max-h-[580px] select-none"
            viewBox="0 0 1000 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cluster Boundary & Indicator Labels */}
            <g className="cluster-labels" opacity={0.6}>
              {/* Main Architecture Pod outline */}
              <rect
                x="80"
                y="30"
                width="500"
                height="500"
                rx="24"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="6 6"
                fill="none"
              />
              <text
                x="105"
                y="65"
                fill="#94a3b8"
                fontSize="11"
                fontFamily="JetBrains Mono"
                letterSpacing="2"
              >
                CORE ARCHITECTURE & WEB
              </text>

              {/* Tools Cluster outline */}
              <rect
                x="650"
                y="30"
                width="290"
                height="500"
                rx="24"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="6 6"
                fill="none"
              />
              <text
                x="675"
                y="65"
                fill="#818cf8"
                fontSize="11"
                fontFamily="JetBrains Mono"
                letterSpacing="2"
              >
                TOOLS & WORKFLOW CLUSTER
              </text>
            </g>

            {/* SVG Connecting Synapses (Edges) */}
            <g className="edges">
              {NETWORK_EDGES.map((edge) => {
                const source = coordMap.get(edge.from);
                const target = coordMap.get(edge.to);
                if (!source || !target) return null;

                const isConnectedToActive =
                  activeSkill &&
                  (activeSkill.id === edge.from || activeSkill.id === edge.to) &&
                  (activeConnectedIds.has(edge.from) && activeConnectedIds.has(edge.to));

                const isAnyActive = activeNodeId !== null;

                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={
                      isConnectedToActive
                        ? '#38bdf8'
                        : isAnyActive
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(139, 92, 246, 0.28)'
                    }
                    strokeWidth={isConnectedToActive ? 2.5 : 1.2}
                    className="transition-all duration-300"
                    style={{
                      filter: isConnectedToActive ? 'drop-shadow(0 0 6px #38bdf8)' : 'none',
                    }}
                  />
                );
              })}
            </g>

            {/* SVG Glowing Nodes */}
            <g className="nodes">
              {ALL_COORDS.map((node) => {
                const isSelected = selectedId === node.id;
                const isHovered = hoveredId === node.id;
                const isActive = isSelected || isHovered;
                const isConnected = activeConnectedIds.has(node.id);
                const matchesFilter =
                  activeFilter === 'ALL' || node.category === activeFilter;

                const baseRadius = node.id === 'python' || node.id === 'flask' ? 22 : 18;

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    {/* Outer Glow Ring on Hover/Active */}
                    {(isActive || isConnected) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={baseRadius + 14}
                        fill={isActive ? 'rgba(56, 189, 248, 0.22)' : 'rgba(139, 92, 246, 0.16)'}
                        className="transition-all duration-300 animate-pulse"
                      />
                    )}

                    {/* Secondary Aura */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? baseRadius + 6 : baseRadius + 2}
                      stroke={isActive ? '#38bdf8' : node.color}
                      strokeWidth={isActive ? 2 : 1}
                      strokeOpacity={matchesFilter ? 0.7 : 0.2}
                      fill="none"
                      className="transition-all duration-300"
                    />

                    {/* Core Solid Node */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? baseRadius + 2 : baseRadius}
                      fill={isActive ? '#0f172a' : '#080a18'}
                      stroke={isActive ? '#38bdf8' : matchesFilter ? node.color : 'rgba(255, 255, 255, 0.2)'}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      className="transition-all duration-300"
                      style={{
                        filter: isActive ? `drop-shadow(0 0 10px ${node.color})` : 'none',
                      }}
                    />

                    {/* Inner glowing nucleus */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 6 : 4}
                      fill={isActive ? '#ffffff' : matchesFilter ? node.color : '#64748b'}
                      className="transition-all duration-200"
                    />

                    {/* Node Label Text */}
                    <text
                      x={node.x}
                      y={node.y + baseRadius + 16}
                      textAnchor="middle"
                      fill={isActive ? '#ffffff' : matchesFilter ? '#cbd5e1' : '#64748b'}
                      fontSize={isActive ? 13 : 11.5}
                      fontWeight={isActive ? '700' : '500'}
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      className="transition-all duration-200 pointer-events-none select-none"
                    >
                      {node.label}
                    </text>

                    {/* Subtle Category Pill Tag */}
                    <text
                      x={node.x}
                      y={node.y + baseRadius + 29}
                      textAnchor="middle"
                      fill={isActive ? '#38bdf8' : '#475569'}
                      fontSize={8.5}
                      fontFamily="JetBrains Mono, monospace"
                      className="transition-all duration-200 pointer-events-none select-none uppercase tracking-wider"
                    >
                      {node.category}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Interactive Floating Glass Info Card */}
          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute bottom-6 right-6 z-30 max-w-sm w-full p-6 glass-panel rounded-2xl border border-sky-400/40 shadow-[0_0_35px_rgba(56,189,248,0.2)] bg-[#070918]/95 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-semibold">
                      {activeSkill.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-display">
                      {activeSkill.label}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedId(null);
                      setHoveredId(null);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close skill card"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans">
                  {activeSkill.description}
                </p>

                {/* Connected Nodes List */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-violet-400" />
                    <span>Neural Connections:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSkill.connections.map((cId) => {
                      const target = SKILL_NODES.find((s) => s.id === cId);
                      if (!target) return null;
                      return (
                        <button
                          key={cId}
                          onClick={() => setSelectedId(target.id)}
                          className="px-2 py-1 rounded-md text-[11px] font-mono bg-white/5 hover:bg-violet-600/30 border border-white/10 hover:border-violet-400 text-slate-300 hover:text-white transition-all cursor-pointer"
                        >
                          {target.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile / Compact Device Clean Grid Breakdown */}
        <div className="p-6 border-t border-white/[0.08] bg-[#070914] md:hidden space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Tap Any Skill Node To Highlight Connections:
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {SKILL_NODES.map((node) => {
              const isSelected = selectedId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-violet-600/30 border-violet-400 text-white shadow-md'
                      : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] font-mono text-violet-400">{node.category}</div>
                  <div className="text-xs font-semibold">{node.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
