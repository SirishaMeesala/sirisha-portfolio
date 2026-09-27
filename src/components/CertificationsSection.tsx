import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="certifications" className="relative py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400"
        >
          Verified Credentials
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display uppercase"
        >
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          Accredited industry validations in Artificial Intelligence and Core Programming.
        </motion.p>
      </div>

      {/* Floating Glass Certificate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {CERTIFICATIONS_DATA.map((cert, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                y: isHovered ? -8 : [0, -6, 0],
                rotateX: isHovered ? 4 : 0,
                rotateY: isHovered ? (index === 0 ? 3 : -3) : 0,
              }}
              className="relative p-8 rounded-3xl glass-panel border border-violet-500/20 hover:border-violet-400/50 transition-all duration-500 cursor-pointer overflow-hidden group shadow-[0_0_40px_rgba(139,92,246,0.08)]"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Holographic Sheen Layer */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-sky-400/10 to-transparent transition-opacity duration-500 pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-20'
                }`}
              />

              {/* Glowing Corner Emblem */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <Award className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Credential Confirmed</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 relative z-10">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                  {cert.tag}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display leading-snug group-hover:text-violet-100 transition-colors">
                  {cert.title}
                </h3>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-slate-300 font-medium">{cert.issuer}</span>
                  <span className="flex items-center gap-1 text-violet-400">
                    <Sparkles className="w-3 h-3" /> Validated
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
