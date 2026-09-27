import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  baseAlpha: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleScroll = () => {
      // Track scroll progress for the transition zone (0 to 800px)
      const maxScroll = Math.max(window.innerHeight, 750);
      targetScrollProgress = Math.min(window.scrollY / maxScroll, 1);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Particle pool - strictly controlled for high performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 75;
    const particles: Particle[] = [];
    const colors = [
      'rgba(168, 85, 247, ', // violet
      'rgba(56, 189, 248, ', // electric blue
      'rgba(248, 250, 252, ', // crisp light
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.35 + 0.15,
      });
    }

    // 3D wireframe octahedron in the distance
    let angleX = 0;
    let angleY = 0;
    const vertices = [
      { x: 0, y: -110, z: 0 },
      { x: 110, y: 0, z: 0 },
      { x: 0, y: 110, z: 0 },
      { x: -110, y: 0, z: 0 },
      { x: 0, y: 0, z: 110 },
      { x: 0, y: 0, z: -110 },
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [0, 4], [1, 4], [2, 4], [3, 4],
      [0, 5], [1, 5], [2, 5], [3, 5],
    ];

    const render = () => {
      // Smooth interpolation for mouse and scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;

      const mouseNormX = (mouse.x / width - 0.5) * 2;
      const mouseNormY = (mouse.y / height - 0.5) * 2;

      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric background gradient: darkens as user scrolls
      const bgGrad = ctx.createRadialGradient(
        width / 2 + mouseNormX * 70,
        height / 2 + mouseNormY * 70,
        40,
        width / 2,
        height / 2,
        Math.max(width, height) * (0.9 - scrollProgress * 0.15)
      );
      
      const darkFactor = 1 - scrollProgress * 0.4;
      bgGrad.addColorStop(0, `rgb(${Math.floor(10 * darkFactor)}, ${Math.floor(11 * darkFactor)}, ${Math.floor(22 * darkFactor)})`);
      bgGrad.addColorStop(0.5, `rgb(${Math.floor(5 * darkFactor)}, ${Math.floor(6 * darkFactor)}, ${Math.floor(13 * darkFactor)})`);
      bgGrad.addColorStop(1, '#020204');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle futuristic perspective grid
      const fov = 350;
      ctx.save();
      const gridOpacity = Math.max(0.01, 0.04 - scrollProgress * 0.02);
      ctx.strokeStyle = `rgba(139, 92, 246, ${gridOpacity})`;
      ctx.lineWidth = 1;
      
      const gridLines = isMobile ? 8 : 12;
      const vanishX = width / 2 + mouseNormX * 50;
      const vanishY = height * 0.5 + scrollProgress * 40;

      for (let i = 0; i <= gridLines; i++) {
        const xPos = (width / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(xPos, height);
        ctx.stroke();
      }

      // Horizontal depth lines
      for (let d = 1; d <= 5; d++) {
        const yVal = vanishY + Math.pow(d / 5, 2) * (height - vanishY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.012 * d * (1 - scrollProgress * 0.4)})`;
        ctx.beginPath();
        ctx.moveTo(0, yVal);
        ctx.lineTo(width, yVal);
        ctx.stroke();
      }
      ctx.restore();

      // Render subtle wireframe rotating object
      if (!prefersReducedMotion) {
        angleX += 0.0018;
        angleY += 0.0025;
      }
      const objCenterX = width * 0.85 - mouseNormX * 25;
      const objCenterY = height * 0.28 - mouseNormY * 25 + scrollProgress * 80;

      ctx.save();
      const wireframeAlpha = Math.max(0.02, 0.11 - scrollProgress * 0.08);
      ctx.strokeStyle = `rgba(139, 92, 246, ${wireframeAlpha})`;
      ctx.lineWidth = 1;

      const projectedVertices = vertices.map((v) => {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + 320 + scrollProgress * 200);
        return {
          x: objCenterX + x1 * scale,
          y: objCenterY + y2 * scale,
        };
      });

      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projectedVertices[i].x, projectedVertices[i].y);
        ctx.lineTo(projectedVertices[j].x, projectedVertices[j].y);
        ctx.stroke();
      });
      ctx.restore();

      // Render 3D particles with parallax and outward scroll expansion
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
        }

        // Boundary wrap
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < 50) p.z = 850;
        if (p.z > 850) p.z = 50;

        // Mouse parallax influence with scroll depth
        const parallaxX = mouseNormX * (900 - p.z) * 0.045;
        const parallaxY = mouseNormY * (900 - p.z) * 0.045 + scrollProgress * 20;

        const k = fov / p.z;
        // Subtle radial expansion as a projection factor based on scrollProgress
        const expandFactor = 1 + scrollProgress * 0.15;
        const screenX = cx + (p.x * expandFactor - parallaxX) * k;
        const screenY = cy + (p.y * expandFactor - parallaxY) * k;

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          const depthRatio = 1 - p.z / 900;
          const alpha = p.baseAlpha * depthRatio;
          const radius = Math.max(0.5, p.size * k);

          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dz = p.z - p2.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 95) {
              const k2 = fov / p2.z;
              const s2x = cx + (p2.x - parallaxX) * k2;
              const s2y = cy + (p2.y - parallaxY) * k2;
              const lineAlpha = (1 - dist / 95) * 0.09 * depthRatio;
              ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(screenX, screenY);
              ctx.lineTo(s2x, s2y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
