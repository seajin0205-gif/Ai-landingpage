"use client";

import { useState } from "react";
import { useCopy } from "@/components/i18n/LocaleProvider";

const spots = [
  { x: 50, y: 10 },
  { x: 84, y: 28 },
  { x: 84, y: 72 },
  { x: 50, y: 90 },
  { x: 16, y: 72 },
  { x: 16, y: 28 },
];

const CX = 50;
const CY = 50;

export function IntegrationHub() {
  const copy = useCopy();
  const hub = copy.brand.hub;
  const tools = copy.integrations.tools.map((name, index) => ({
    id: name,
    name,
    ...spots[index],
  }));
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="integration-hub">
      <svg
        className="integration-hub-lines pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="hub-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#6d7cff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="hub-center-glow">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r="18" fill="url(#hub-center-glow)" className="hub-pulse-ring" />

        {tools.map((tool) => {
          const isActive = activeId === tool.id;
          const isDimmed = activeId !== null && !isActive;
          return (
            <line
              key={tool.id}
              x1={tool.x}
              y1={tool.y}
              x2={CX}
              y2={CY}
              className={`hub-connect-line ${isActive ? "hub-line-active" : ""} ${isDimmed ? "hub-line-dim" : ""}`}
            />
          );
        })}
      </svg>

      <div className="integration-hub-core">
        <div className="hub-core-glow" aria-hidden />
        <div className="hub-core-node">
          <span className="hub-core-icon">N</span>
          <span className="hub-core-label">Nexus AI</span>
          <span className="hub-core-sublabel">{hub}</span>
        </div>
      </div>

      {tools.map((tool) => {
        const isActive = activeId === tool.id;
        return (
          <button
            key={tool.id}
            type="button"
            className={`hub-tool-node ${isActive ? "hub-tool-active" : ""}`}
            style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
            onMouseEnter={() => setActiveId(tool.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(tool.id)}
            onBlur={() => setActiveId(null)}
          >
            <span className="hub-tool-glow" aria-hidden />
            <span className="hub-tool-name">{tool.name}</span>
          </button>
        );
      })}
    </div>
  );
}
