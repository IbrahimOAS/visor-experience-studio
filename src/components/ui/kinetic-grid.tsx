"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface KineticGridProps {
  children: ReactNode;
  className?: string;
  fixed?: boolean;
}

export default function KineticGrid({ children, className = "", fixed = true }: KineticGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<{ x: number; y: number; radius: number; alpha: number }[]>([]);
  const frameRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        ripplesRef.current.push({ x, y, radius: 0, alpha: 1 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    const gridSize = 40;
    const warpRadius = 180;
    const warpStrength = 22;

    const draw = () => {
      const width = canvas.width / dprRef.current;
      const height = canvas.height / dprRef.current;
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = "#0b131e";
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;
      const points: { x: number; y: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * gridSize;
          const baseY = r * gridSize;

          const dx = baseX - mouseRef.current.x;
          const dy = baseY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let offsetX = 0;
          let offsetY = 0;

          if (dist < warpRadius && dist > 0) {
            const force = (1 - dist / warpRadius) * warpStrength;
            offsetX = (dx / dist) * force;
            offsetY = (dy / dist) * force;
          }

          // Add subtle idle motion
          const time = Date.now() * 0.0005;
          offsetX += Math.sin(r * 0.3 + time) * 1.2;
          offsetY += Math.cos(c * 0.3 + time) * 1.2;

          points[r]![c] = { x: baseX + offsetX, y: baseY + offsetY };
        }
      }

      // Draw grid lines
      ctx.strokeStyle = "rgba(153, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r]![c];
          if (!p) continue;

          if (c < cols - 1) {
            const right = points[r]![c + 1];
            if (right) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(right.x, right.y);
              ctx.stroke();
            }
          }

          if (r < rows - 1) {
            const bottom = points[r + 1]![c];
            if (bottom) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(bottom.x, bottom.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        if (!ripple) continue;
        ripple.radius += 4;
        ripple.alpha -= 0.02;

        if (ripple.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(153, 255, 255, ${ripple.alpha * 0.35})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(153, 255, 255, ${ripple.alpha * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, [fixed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-[#0b131e] ${className}`}>
      <canvas
        ref={canvasRef}
        className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 z-0`}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
