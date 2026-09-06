"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  active: boolean,
  duration = 1800
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const safeDuration = Math.max(duration, 1);
    let frame = requestAnimationFrame((start) => {
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / safeDuration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      tick(start);
    });

    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return active ? value : 0;
}

function normalizePoints(data: number[], width: number, height: number, pad = 4) {
  if (data.length === 0) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const lastIndex = Math.max(data.length - 1, 1);
  return data.map((v, i) => ({
    x: pad + (i / lastIndex) * (width - pad * 2),
    y: pad + (1 - (v - min) / range) * (height - pad * 2),
  }));
}

const LINE_CHART_WIDTH = 168;
const LINE_CHART_HEIGHT = 56;
const LINE_CHART_PAD = 6;

export function Sparkline({
  data,
  color = "#00d4ff",
  active,
  className = "",
}: {
  data: number[];
  color?: string;
  active: boolean;
  className?: string;
}) {
  const w = LINE_CHART_WIDTH;
  const h = LINE_CHART_HEIGHT;
  const pad = LINE_CHART_PAD;
  const pts = normalizePoints(data, w, h, pad);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const lastPoint = pts[pts.length - 1];

  if (!lastPoint) return null;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={`stat-sparkline stat-line-chart-variant ${active ? "stat-chart-active" : ""} ${className}`}
      aria-hidden
    >
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={pad}
          y1={pad + t * (h - pad * 2)}
          x2={w - pad}
          y2={pad + t * (h - pad * 2)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      <path d={path} fill="none" stroke={color} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill={color} className="stat-chart-dot" />
    </svg>
  );
}

export function MiniLineChart({
  data,
  color = "#9b7dff",
  fillColor = "rgba(155,125,255,0.2)",
  active,
  className = "",
}: {
  data: number[];
  color?: string;
  fillColor?: string;
  active: boolean;
  className?: string;
}) {
  const w = LINE_CHART_WIDTH;
  const h = LINE_CHART_HEIGHT;
  const pad = LINE_CHART_PAD;
  const pts = normalizePoints(data, w, h, pad);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const lastPoint = pts[pts.length - 1];
  const firstPoint = pts[0];

  if (!lastPoint || !firstPoint) return null;

  const area = `${line} L${lastPoint.x},${h - pad} L${firstPoint.x},${h - pad} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={`stat-line-chart stat-line-chart-variant ${active ? "stat-chart-active" : ""} ${className}`}
      aria-hidden
    >
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={pad}
          y1={pad + t * (h - pad * 2)}
          x2={w - pad}
          y2={pad + t * (h - pad * 2)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      <path d={area} fill={fillColor} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

export function ProgressGraph({
  value,
  color = "#9ae600",
  active,
  label,
  className = "",
}: {
  value: number;
  color?: string;
  active: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`stat-progress-graph ${className}`}>
      <div className="flex items-center justify-between text-xs font-medium text-white/40">
        <span>0%</span>
        {label && <span>{label}</span>}
        <span>100%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className={`stat-progress-fill h-full rounded-full ${active ? "stat-progress-animate" : ""}`}
          style={{
            width: active ? `${value}%` : "0%",
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }}
        />
      </div>
      <div className="mt-2 flex gap-1">
        {[65, 72, 68, 70].map((seg, i) => (
          <div
            key={i}
            className="stat-progress-segment flex-1 rounded-sm"
            style={{
              height: `${8 + seg * 0.2}px`,
              background: active ? `${color}${i < 3 ? "66" : "cc"}` : "rgba(255,255,255,0.08)",
              transitionDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function TinyBarSparkline({
  data,
  color = "#6d7cff",
  active,
  className = "",
}: {
  data: number[];
  color?: string;
  active: boolean;
  className?: string;
}) {
  const max = Math.max(...data, 1);
  return (
    <div className={`stat-bar-sparkline flex items-end gap-1 ${className}`}>
      {data.map((v, i) => (
        <div
          key={i}
          className={`stat-bar-col flex-1 rounded-sm ${active ? "stat-bar-animate" : ""}`}
          style={{
            height: active ? `${(v / max) * 100}%` : "0%",
            minHeight: active ? "4px" : "0",
            background: `linear-gradient(to top, ${color}55, ${color})`,
            transitionDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedNumber({
  value,
  format,
  className = "",
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  return (
    <span className={`stat-animated-number tabular-nums ${className}`}>
      {format(value)}
    </span>
  );
}

export function useInViewOnce(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
