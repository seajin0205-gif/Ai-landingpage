"use client";

import { type MouseEvent, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type TiltFrameProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export function TiltFrame({ children, className = "", max = 7 }: TiltFrameProps) {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
    const py = (event.clientY - rect.top) / Math.max(rect.height, 1);
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    el.classList.add("is-tilting");
    el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    el.style.setProperty("--gx", `${(px * 100).toFixed(2)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(2)}%`);
  };

  const onMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    el.classList.remove("is-tilting");
    el.style.transform = "";
  };

  return (
    <div className={`tilt-stage ${className}`.trim()}>
      <div
        className="tilt-frame"
        onMouseMove={active ? onMouseMove : undefined}
        onMouseLeave={active ? onMouseLeave : undefined}
      >
        {children}
        <span className="tilt-glare" aria-hidden />
      </div>
    </div>
  );
}
