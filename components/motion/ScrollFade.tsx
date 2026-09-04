"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
};

export function ScrollFade({ children, className = "", offset = 56 }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH * 0.95;
      const end = viewH * 0.6;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const translateY = offset * (1 - progress);
  const opacity = 0.5 + progress * 0.5;

  return (
    <div
      ref={ref}
      className={`scroll-fade ${className}`}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
}
