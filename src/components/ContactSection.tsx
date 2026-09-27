import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactItem {
  id: string;
  label: string;
  displayValue: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  const contactObjects: ContactItem[] = [
    {
      id: 'email',
      label: 'EMAIL',
      displayValue: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
      accentColor: 'from-violet-500/20 to-sky-400/20',
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      displayValue: 'Sirisha M',
      href: PERSONAL_INFO.linkedin,
      icon: Linkedin,
      accentColor: 'from-sky-500/20 to-blue-600/20',
    },
    {
      id: 'github',
      label: 'GITHUB',
      displayValue: 'SirishaMeesala',
      href: PERSONAL_INFO.github,
      icon: Github,
      accentColor: 'from-purple-500/20 to-violet-700/20',
    },
  ];

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Smooth cinematic transition delay before navigating
    setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
    }, 280);
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-[#020204] text-white overflow-hidden scroll-mt-10">
      {/* Absolute dark mask to clear visual clutter */}
      <div className="absolute inset-0 bg-[#020204]/95 pointer-events-none" />

      {/* Subtle bottom aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-16">
        {/* Cinematic Headline */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-[0.4em] text-violet-400"
          >
            Initiate Contact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight font-display uppercase leading-[0.95] text-gradient-pure"
          >
            LET'S BUILD
            <br />
            <span className="text-gradient-violet-blue">SOMETHING</span>
            <br />
            UNFORGETTABLE.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans"
          >
            Actively seeking entry-level engineering opportunities. Open to discussions on AI, software development, and innovative digital solutions.
          </motion.p>
        </div>

        {/* Three Glowing Floating Contact Objects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {contactObjects.map((item, index) => {
            const Icon = item.icon;
            const isHovered = activeHoverId === item.id;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
                onMouseEnter={() => setActiveHoverId(item.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className={`relative p-8 rounded-2xl glass-panel-interactive border border-white/10 group block text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'border-violet-400/60 shadow-[0_0_35px_rgba(139,92,246,0.3)] -translate-y-2'
                    : ''
                }`}
              >
                {/* Internal gradient shine */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block mb-1">
                      {item.label}
                    </span>
                    <div className="text-base sm:text-lg font-bold text-white font-display truncate">
                      {item.displayValue}
                    </div>
                  </div>

                  {item.id === 'email' && (
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-violet-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied to clipboard' : 'Copy email address'}</span>
                    </button>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Final Micro-Interaction: Futuristic System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-20 border-t border-white/5 max-w-md mx-auto"
        >
          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 text-left font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-slate-400">
              <span className="tracking-widest uppercase">SYSTEM STATUS</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> NOMINAL
              </span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center justify-between">
                <span>CURIOUS</span>
                <span className="text-sky-400">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LEARNING</span>
                <span className="text-sky-400">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>BUILDING</span>
                <span className="text-sky-400">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CREATING</span>
                <span className="text-sky-400">✓</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-500 tracking-wider flex items-center justify-between">
              <span>END OF TRANSMISSION_</span>
              <span className="text-slate-600">© 2026 MEESALA SATYA SIRISHA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
