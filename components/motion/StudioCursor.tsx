"use client";

import { memo, useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

const INTERACTIVE = "a, button, [data-cursor]";

export const StudioCursor = memo(function StudioCursor() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const root = document.documentElement;
    root.classList.add("has-studio-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let visible = false;
    let hovering = false;
    let labelText = "";
    let frame = 0;

    const setLabel = (next: string) => {
      if (next === labelText) return;
      labelText = next;
      label.textContent = next;
    };

    const syncTarget = (target: Element | null) => {
      const next = target
        ? target.getAttribute("data-cursor") || (target.tagName === "A" ? "View" : "Open")
        : "";
      setLabel(next);
      const on = Boolean(target);
      if (on !== hovering) {
        hovering = on;
        ring.classList.toggle("is-active", on);
        dot.classList.toggle("is-active", on);
      }
    };

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      if (!visible) {
        visible = true;
        dx = mx;
        dy = my;
        rx = mx;
        ry = my;
        dot.classList.remove("is-hidden");
        ring.classList.remove("is-hidden");
      }
      syncTarget((event.target as Element | null)?.closest(INTERACTIVE) ?? null);
    };

    const onScroll = () => {
      if (!visible) return;
      syncTarget(document.elementFromPoint(mx, my)?.closest(INTERACTIVE) ?? null);
    };

    const hide = () => {
      visible = false;
      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");
    };

    const tick = () => {
      dx += (mx - dx) * 0.45;
      dy += (my - dy) * 0.45;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onOut);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onOut);
      root.classList.remove("has-studio-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="studio-cursor" aria-hidden>
      <div ref={ringRef} className="studio-cursor-ring is-hidden">
        <span ref={labelRef} className="studio-cursor-label" />
      </div>
      <div ref={dotRef} className="studio-cursor-dot is-hidden" />
    </div>
  );
});
