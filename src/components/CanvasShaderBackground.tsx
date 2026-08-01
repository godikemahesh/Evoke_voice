import React, { useEffect, useRef } from 'react';

interface Props {
  variant?: 'cosmic' | 'success';
  className?: string;
}

export const CanvasShaderBackground: React.FC<Props> = ({ variant = 'cosmic', className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle system
    const particleCount = variant === 'success' ? 60 : 40;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (variant === 'success' ? 3 : 2) + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - (variant === 'success' ? 0.3 : 0.1),
      alpha: Math.random() * 0.6 + 0.2,
      color: variant === 'success'
        ? ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
        : ['#6366f1', '#a855f7', '#ec4899', '#818cf8'][Math.floor(Math.random() * 4)],
    }));

    let time = 0;

    const render = () => {
      time += 0.01;

      // Clear with dark atmospheric gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (variant === 'success') {
        bgGrad.addColorStop(0, '#0a0518');
        bgGrad.addColorStop(0.5, '#130c2c');
        bgGrad.addColorStop(1, '#05020a');
      } else {
        bgGrad.addColorStop(0, '#070611');
        bgGrad.addColorStop(0.5, '#0f0a21');
        bgGrad.addColorStop(1, '#05040a');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Glowing dynamic orb 1
      const orb1X = width * 0.3 + Math.sin(time * 0.8) * 60;
      const orb1Y = height * 0.4 + Math.cos(time * 0.6) * 40;
      const orb1Grad = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, width * 0.4);
      orb1Grad.addColorStop(0, variant === 'success' ? 'rgba(236, 72, 153, 0.25)' : 'rgba(99, 102, 241, 0.2)');
      orb1Grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orb1Grad;
      ctx.beginPath();
      ctx.arc(orb1X, orb1Y, width * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Glowing dynamic orb 2
      const orb2X = width * 0.7 + Math.cos(time * 0.7) * 70;
      const orb2Y = height * 0.6 + Math.sin(time * 0.9) * 50;
      const orb2Grad = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, width * 0.45);
      orb2Grad.addColorStop(0, variant === 'success' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.18)');
      orb2Grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orb2Grad;
      ctx.beginPath();
      ctx.arc(orb2X, orb2Y, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Draw floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha + Math.sin(time * 2 + p.x) * 0.15;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
