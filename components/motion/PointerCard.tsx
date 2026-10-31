"use client";

import { type MouseEvent, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type PointerCardProps = {
  as?: "div" | "article" | "figure";
  className?: string;
  children: ReactNode;
  max?: number;
  lift?: number;
};

export function PointerCard({
  as = "div",
  className = "",
  children,
  max = 5,
  lift = 6,
}: PointerCardProps) {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;
  const classes = `pointer-surface ${className}`.trim();

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
    const py = (event.clientY - rect.top) / Math.max(rect.height, 1);
    el.style.setProperty("--sx", `${(px * 100).toFixed(2)}%`);
    el.style.setProperty("--sy", `${(py * 100).toFixed(2)}%`);
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    el.classList.add("is-tilting");
    el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-${lift}px)`;
  };

  const onMouseLeave = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget;
    el.classList.remove("is-tilting");
    el.style.transform = "";
  };

  const handlers = active
    ? { onMouseMove, onMouseLeave }
    : {};

  const body = (
    <>
      <span className="pointer-sheen" aria-hidden />
      {children}
    </>
  );

  if (as === "article") {
    return (
      <article className={classes} {...handlers}>
        {body}
      </article>
    );
  }

  if (as === "figure") {
    return (
      <figure className={classes} {...handlers}>
        {body}
      </figure>
    );
  }

  return (
    <div className={classes} {...handlers}>
      {body}
    </div>
  );
}
