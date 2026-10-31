"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "workspace-demo", label: "Product" },
  { id: "features", label: "Craft" },
  { id: "how-it-works", label: "Flow" },
  { id: "testimonials", label: "Proof" },
  { id: "pricing", label: "Start" },
];

export function SectionRail() {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const bar = barRef.current;
    const onScroll = () => {
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const nodes = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (nodes.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let next = "";
        let best = 0;
        for (const section of SECTIONS) {
          const ratio = ratios.get(section.id) ?? 0;
          if (ratio > best) {
            best = ratio;
            next = section.id;
          }
        }
        if (next) setActive(next);
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: [0.05, 0.2, 0.45, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={barRef} className="studio-progress" aria-hidden />
      <nav className="section-rail" aria-label="Sections">
        <ol>
          {SECTIONS.map((section) => (
            <li key={section.id} className={active === section.id ? "is-active" : undefined}>
              <a href={`#${section.id}`} data-cursor="Go" aria-current={active === section.id ? "true" : undefined}>
                <span className="section-rail-label">{section.label}</span>
                <span className="section-rail-dot" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
