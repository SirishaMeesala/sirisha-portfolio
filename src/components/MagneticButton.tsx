import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface MagneticButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  href,
  className = '',
  children,
  icon,
  variant = 'primary',
  onClick,
}) => {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  // Spring physics for smooth magnetic movement
  const springConfig = { damping: 16, stiffness: 180, mass: 0.2 };
  const magneticX = useSpring(0, springConfig);
  const magneticY = useSpring(0, springConfig);

  const iconX = useSpring(0, springConfig);
  const iconY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Subtle magnetic pull (max ~9px translation)
    const pullFactor = 0.22;
    magneticX.set(Math.max(-10, Math.min(10, deltaX * pullFactor)));
    magneticY.set(Math.max(-8, Math.min(8, deltaY * pullFactor)));

    // Icon moves slightly more in the same direction
    iconX.set(Math.max(-6, Math.min(6, deltaX * 0.12)));
    iconY.set(Math.max(-4, Math.min(4, deltaY * 0.12)));

    // Track relative percentage for dynamic highlight
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    magneticX.set(0);
    magneticY.set(0);
    iconX.set(0);
    iconY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const baseStyles =
    variant === 'primary'
      ? 'bg-violet-600/25 hover:bg-violet-600/35 border-violet-500/40 hover:border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.18)]'
      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-sky-400/40 text-slate-300 hover:text-white shadow-[0_0_15px_rgba(56,189,248,0.06)]';

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: magneticX,
        y: magneticY,
      }}
      className={`relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm border backdrop-blur-md transition-colors duration-200 overflow-hidden cursor-pointer ${baseStyles} ${className}`}
    >
      {/* Dynamic inner highlight following cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(120px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(168, 85, 247, 0.25), transparent 70%)`,
        }}
      />

      {/* Optional icon with subtle relative offset */}
      {icon && (
        <motion.span
          style={{ x: iconX, y: iconY }}
          className="relative z-10 shrink-0"
        >
          {icon}
        </motion.span>
      )}

      <span className="relative z-10 select-none whitespace-nowrap">{children}</span>
    </motion.a>
  );
};
