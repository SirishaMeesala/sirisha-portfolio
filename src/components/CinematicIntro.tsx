import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stage, setStage] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  // Timed reveals
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600); // Reveal Name
    const t2 = setTimeout(() => setStage(2), 1600); // Reveal Subtitle
    const t3 = setTimeout(() => setStage(3), 2600); // Reveal Enter Button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Canvas floating particles that react to mouse
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const count = 120;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(139, 92, 246,' : 'rgba(56, 189, 248,',
    }));

    let warpSpeed = 1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark void
      ctx.fillStyle = '#030306';
      ctx.fillRect(0, 0, width, height);

      // When transitioning to main site, accelerate particles toward viewer (warp effect)
      if (isTransitioning) {
        warpSpeed = Math.min(warpSpeed * 1.15 + 0.5, 30);
      }

      particles.forEach((p) => {
        // Warp trajectory when transitioning
        if (isTransitioning) {
          const dx = p.x - width / 2;
          const dy = p.y - height / 2;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * warpSpeed * 3;
          p.y += Math.sin(angle) * warpSpeed * 3;
        } else {
          p.x += p.vx;
          p.y += p.vy;

          // Mouse subtle deflection
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              const force = (1 - dist / 140) * 0.8;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        }

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.beginPath();
        const r = isTransitioning ? p.radius * (1 + warpSpeed * 0.1) : p.radius;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTransitioning]);

  const handleEnterClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030306] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Subtle central glow vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,rgba(3,3,6,0.95)_70%)]" />

      {/* Ambient micro-grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Name reveal */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 mb-4 select-none"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-slate-400 font-medium">
                Meesala
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-display text-gradient-pure">
                SATYA SIRISHA
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitle reveal */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.25em] text-slate-300 font-mono uppercase mb-12"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              <span>B.Tech Information Technology</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter Button */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <button
                onClick={handleEnterClick}
                disabled={isTransitioning}
                className="group relative px-8 py-4 rounded-xl font-medium text-sm sm:text-base text-white tracking-wider uppercase transition-all duration-300 glass-panel-interactive flex items-center gap-3 cursor-pointer overflow-hidden border border-violet-500/30 hover:border-violet-400/60 shadow-[0_0_30px_rgba(139,92,246,0.18)]"
              >
                {/* Button back light sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-sky-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 flex items-center gap-3 font-display tracking-widest">
                  Enter My Digital World
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-sky-400" />
                </span>
              </button>

              <button
                onClick={onEnter}
                className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest mt-2 cursor-pointer"
              >
                Skip Intro [Esc]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cinematic Warp Curtain Overlay */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#040407]/80 to-[#040407]"
        />
      )}
    </motion.div>
  );
};
