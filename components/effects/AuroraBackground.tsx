"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { StudioCursor } from "@/components/motion/StudioCursor";
import { SectionRail } from "@/components/motion/SectionRail";

export function AuroraBackground({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const meshRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const mesh = meshRef.current;
    const blobs = blobRef.current;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (mesh) mesh.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
      if (blobs) blobs.style.transform = `translate3d(${x * 0.5}px, ${y * 0.4}px, 0)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <div className="aurora-root min-h-screen">
      <div className="premium-site-noise" aria-hidden />
      <div
        ref={meshRef}
        className="mesh-gradient aurora-parallax-slow"
        aria-hidden
      />
      <div
        ref={blobRef}
        className="aurora-parallax-wrap"
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
      <StudioCursor />
      <SectionRail />
      {children}
    </div>
  );
}
