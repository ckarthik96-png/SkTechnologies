"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  ox: number; // original x
  oy: number; // original y
  oz: number; // original z
  color: string;
  size: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = 100;
    const colors = ["#2563eb", "#0ea5e9", "#06b6d4", "#3b82f6"];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      // Space particles in a 3D bounding box
      const x = (Math.random() - 0.5) * width * 1.5;
      const y = (Math.random() - 0.5) * height * 1.5;
      const z = Math.random() * 1000 + 100; // depth

      particles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX - width / 2;
      targetMouseY = e.clientY - height / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const focalLength = 400;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Draw background glow spots
      const gradient = ctx.createRadialGradient(
        width / 2 + mouseX * 0.5,
        height / 2 + mouseY * 0.5,
        10,
        width / 2,
        height / 2,
        width * 0.8
      );
      gradient.addColorStop(0, "rgba(5, 8, 22, 1)");
      gradient.addColorStop(0.5, "rgba(9, 15, 35, 1)");
      gradient.addColorStop(1, "rgba(5, 8, 22, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Ambient glows
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const glow1 = ctx.createRadialGradient(
        width * 0.25,
        height * 0.3,
        0,
        width * 0.25,
        height * 0.3,
        width * 0.4
      );
      glow1.addColorStop(0, "rgba(37, 99, 235, 0.15)");
      glow1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      const glow2 = ctx.createRadialGradient(
        width * 0.75,
        height * 0.7,
        0,
        width * 0.75,
        height * 0.7,
        width * 0.4
      );
      glow2.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      glow2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Project and draw particles
      const projected: { sx: number; sy: number; size: number; color: string; z: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle forward (closer to screen)
        p.z -= 0.8;

        // Reset if too close
        if (p.z <= 0) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        // Apply mouse distortion based on depth
        // Parallax effect: items further back shift less
        const depthFactor = focalLength / (focalLength + p.z);
        const shiftX = mouseX * (1 - depthFactor) * 0.4;
        const shiftY = mouseY * (1 - depthFactor) * 0.4;

        const rx = p.x - shiftX;
        const ry = p.y - shiftY;

        // 3D to 2D projection
        const sx = rx * depthFactor + width / 2;
        const sy = ry * depthFactor + height / 2;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          const sz = p.size * depthFactor * 2.5;
          projected.push({ sx, sy, size: sz, color: p.color, z: p.z });
        }
      }

      // Draw connections
      ctx.strokeStyle = "rgba(37, 99, 235, 0.08)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].sx - projected[j].sx;
          const dy = projected[i].sy - projected[j].sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only connect nearby particles
          if (dist < 100 && Math.abs(projected[i].z - projected[j].z) < 150) {
            ctx.beginPath();
            ctx.moveTo(projected[i].sx, projected[i].sy);
            ctx.lineTo(projected[j].sx, projected[j].sy);
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2);
        
        // Alpha fades with depth
        const alpha = Math.max(0.1, 1 - p.z / 1000);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 block pointer-events-none" />;
}
