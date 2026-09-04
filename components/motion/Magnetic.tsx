"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className = "", strength = 0.22 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const handleMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      className={`magnetic-wrap inline-flex ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  );
}
