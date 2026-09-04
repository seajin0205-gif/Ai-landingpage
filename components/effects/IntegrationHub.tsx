"use client";

import { useState } from "react";

const tools = [
  { id: "slack", name: "Slack", x: 50, y: 8 },
  { id: "notion", name: "Notion", x: 82, y: 22 },
  { id: "github", name: "GitHub", x: 92, y: 50 },
  { id: "jira", name: "Jira", x: 82, y: 78 },
  { id: "figma", name: "Figma", x: 50, y: 92 },
  { id: "gdrive", name: "Google Drive", x: 18, y: 78 },
  { id: "openai", name: "OpenAI", x: 8, y: 50 },
  { id: "linear", name: "Linear", x: 18, y: 22 },
];

const CX = 50;
const CY = 50;

export function IntegrationHub() {
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
          <span className="hub-core-sublabel">통합 Hub</span>
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
