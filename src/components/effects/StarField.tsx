"use client";

import { useEffect, useRef } from "react";

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; pulse: number; color: string }[] = [];
    let shootingStars: { x: number; y: number; length: number; speed: number; angle: number; opacity: number; life: number; maxLife: number }[] = [];

    const colors = ["216, 180, 254", "233, 213, 255", "250, 250, 250", "192, 132, 252"]; // Purple tints and white

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = window.innerWidth < 768 ? 80 : 250; // Increased star count
      
      for (let i = 0; i < numStars; i++) {
        const isNear = Math.random() > 0.8;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isNear ? Math.random() * 1.5 + 0.5 : Math.random() * 1 + 0.1, // Different sizes for depth
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * (isNear ? 0.2 : 0.05), // Near stars move faster
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * (isNear ? 0.2 : 0.05),
          alpha: Math.random(),
          pulse: (Math.random() * 0.015) + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const spawnShootingStar = () => {
      if (prefersReducedMotion) return;
      if (Math.random() > 0.98) { // 2% chance per frame to spawn a shooting star
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0, // start from top
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 5,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // roughly 45 degrees
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 60 + 40,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background stars
      stars.forEach(star => {
        if (!prefersReducedMotion) {
          star.x += star.vx;
          star.y += star.vy;
          star.alpha += star.pulse;

          if (star.alpha > 1 || star.alpha < 0.1) {
            star.pulse = -star.pulse;
          }

          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Add subtle glow to larger stars
        if (star.radius > 1.2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${star.color}, ${star.alpha})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
        ctx.fill();
      });

      // Reset shadow for shooting stars
      ctx.shadowBlur = 0;

      // Draw shooting stars
      spawnShootingStar();
      
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life++;
        
        // Fade out at the end of life
        if (ss.life > ss.maxLife * 0.8) {
          ss.opacity = Math.max(0, 1 - (ss.life - ss.maxLife * 0.8) / (ss.maxLife * 0.2));
        }

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(1, `rgba(216, 180, 254, 0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
