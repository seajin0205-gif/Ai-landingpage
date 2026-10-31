"use client";

import { memo, useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

const INTERACTIVE = "a, button, [data-cursor]";

export const StudioCursor = memo(function StudioCursor() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    const root = document.documentElement;
    root.classList.add("has-studio-cursor");

    let mx = 0;
    let my = 0;
    let visible = false;
    let hovering = false;
    let labelText = "";

    const place = () => {
      ring.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

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
      }
    };

    const show = () => {
      if (visible) return;
      visible = true;
      ring.classList.remove("is-hidden");
    };

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      show();
      place();
      syncTarget((event.target as Element | null)?.closest(INTERACTIVE) ?? null);
    };

    const onScroll = () => {
      if (!visible) return;
      syncTarget(document.elementFromPoint(mx, my)?.closest(INTERACTIVE) ?? null);
    };

    const hide = () => {
      visible = false;
      ring.classList.add("is-hidden");
    };

    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onOut);

    return () => {
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
    </div>
  );
});
