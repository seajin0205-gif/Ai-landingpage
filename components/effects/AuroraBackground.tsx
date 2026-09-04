"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

export function AuroraBackground({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const parallax = reduced ? { x: 0, y: 0 } : offset;

  return (
    <div className="aurora-root min-h-screen">
      <div className="premium-site-noise" aria-hidden />
      <div
        className="mesh-gradient aurora-parallax-slow"
        style={{ transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0)` }}
        aria-hidden
      />
      <div
        className="aurora-parallax-wrap"
        style={{ transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.4}px, 0)` }}
        aria-hidden
      >
        <div className="aurora-blob aurora-blob-1 motion-glow-aurora" />
        <div className="aurora-blob aurora-blob-2 motion-glow-aurora motion-glow-delayed" />
        <div className="aurora-blob aurora-blob-3 motion-glow-aurora" />
      </div>
      <div className="neon-orb neon-orb-1 hidden lg:block" aria-hidden />
      <div className="neon-orb neon-orb-2 hidden md:block" aria-hidden />
      <div className="neon-wire neon-wire-1 hidden lg:block" aria-hidden />
      <div className="neon-wire neon-wire-2 hidden md:block" aria-hidden />
      {children}
    </div>
  );
}
