"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant = "fade-up" | "scale-in" | "fade" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** @deprecated Use variant="fade-up" */
  direction?: "up" | "down" | "left" | "right" | "none";
  variant?: RevealVariant;
};

function resolveVariant(
  variant?: RevealVariant,
  direction?: RevealProps["direction"]
): RevealVariant {
  if (variant) return variant;
  if (direction === "left") return "left";
  if (direction === "right") return "right";
  if (direction === "none") return "fade";
  return "fade-up";
}

const variantClass: Record<RevealVariant, string> = {
  "fade-up": "reveal-up",
  "scale-in": "reveal-scale",
  fade: "reveal-fade",
  left: "reveal-left",
  right: "reveal-right",
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction,
  variant,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const resolved = resolveVariant(variant, direction);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${variantClass[resolved]} ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
