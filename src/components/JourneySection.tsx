import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GraduationCap, Award, MapPin } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';

export const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.2'],
  });

  // Smooth emergence of the timeline spine as user approaches
  const spineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const spineGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.9]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative py-28 px-6 max-w-7xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Ambient background glow for section emergence */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-3 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400"
        >
          Chronological Vector
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display uppercase"
        >
          My Academic Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          Travelling through key milestones and continuous technical foundation.
        </motion.p>
      </div>

      {/* Futuristic Timeline Spine with Smooth Emerging Beam */}
      <div className="relative max-w-4xl mx-auto">
        {/* Background track line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-white/5" />

        {/* Dynamic Glowing Emerging Beam controlled by scroll */}
        <motion.div
          style={{
            height: spineHeight,
            opacity: spineGlowOpacity,
          }}
          className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-400 via-violet-500 to-sky-400 shadow-[0_0_15px_rgba(139,92,246,0.8)] z-10 origin-top"
        />

        <div className="space-y-16 relative z-10">
          {TIMELINE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-0`}
              >
                {/* Glowing Core Node Point */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 z-20 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-[#05060e] border-2 border-violet-400 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.8)]">
                    <GraduationCap className="w-4 h-4 text-sky-300" />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-violet-500/20 blur-sm pointer-events-none animate-ping opacity-60" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[44%] pl-14 md:pl-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}
                >
                  <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
                    {/* Subtle corner accent line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Year badge */}
                    <div
                      className={`text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2 flex items-center gap-2 ${
                        isEven ? 'md:justify-end' : 'justify-start'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>{item.year}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1 group-hover:text-violet-200 transition-colors">
                      {item.institution}
                    </h3>

                    <p className="text-sm font-medium text-slate-300 mb-4">{item.degree}</p>

                    {/* Metadata & CGPA */}
                    <div
                      className={`flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-3 border-t border-white/5 ${
                        isEven ? 'md:justify-end' : 'justify-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-violet-300">
                        <Award className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-slate-400">CGPA:</span>
                        <span className="font-bold text-white tabular-nums">{item.cgpa}</span>
                      </div>
                      <span className="text-slate-600">·</span>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for desktop balance */}
                <div className="hidden md:block md:w-[44%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
