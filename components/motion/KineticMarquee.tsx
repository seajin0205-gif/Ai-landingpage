"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

const PHRASE = [
  { word: "Chat", fill: false },
  { word: "Image", fill: true },
  { word: "Automate", fill: false },
  { word: "Workspace", fill: true },
  { word: "Nexus", fill: false },
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="studio-marquee-group" aria-hidden={hidden || undefined}>
      {PHRASE.map((item) => (
        <span key={item.word} className={`studio-marquee-item${item.fill ? " is-fill" : ""}`}>
          <span className="studio-marquee-mark" />
          {item.word}
        </span>
      ))}
    </div>
  );
}

export function KineticMarquee() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let velocity = 0.45;
    let skew = 0;
    let lastY = window.scrollY;
    let frame = 0;

    const tick = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      const target = 0.45 + Math.max(-3.5, Math.min(3.5, delta * 0.05));
      velocity += (target - velocity) * 0.12;
      x -= velocity;

      const half = track.scrollWidth / 2;
      if (half > 0) {
        while (x <= -half) x += half;
        while (x > 0) x -= half;
      }

      const skewTarget = Math.max(-5, Math.min(5, -delta * 0.2));
      skew += (skewTarget - skew) * 0.18;
      track.style.transform = `translate3d(${x}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  if (reduced) {
    return (
      <div className="studio-marquee is-static" aria-hidden>
        <MarqueeGroup />
      </div>
    );
  }

  return (
    <div className="studio-marquee" aria-hidden>
      <div ref={trackRef} className="studio-marquee-track">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}
