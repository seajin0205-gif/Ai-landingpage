"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

export function useDemoWait() {
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const wait = useCallback(
    (ms: number, cancelled: () => boolean) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          timersRef.current.delete(id);
          if (!cancelled()) resolve();
        }, ms);
        timersRef.current.add(id);
      }),
    []
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
    };
  }, []);

  return wait;
}

export function TypingCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <span className="showcase-cursor" aria-hidden />;
}

export function ThinkingLoader({
  label = "답변 생성 중",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`showcase-thinking flex items-center gap-2 rounded-xl border border-neon-cyan/25 bg-neon-cyan/5 ${
        compact ? "px-3 py-2" : "gap-3 rounded-2xl px-4 py-4"
      }`}
    >
      <div className="showcase-glow-dot shrink-0" />
      <div className="flex gap-1">
        <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan sm:h-2 sm:w-2" />
        <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan sm:h-2 sm:w-2" />
        <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan sm:h-2 sm:w-2" />
      </div>
      <span className={`font-semibold text-neon-cyan ${compact ? "text-xs" : "text-sm"}`}>
        {label}
      </span>
    </div>
  );
}

export function SuccessBadge({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`demo-success-badge inline-flex items-center gap-2 rounded-full border border-accent-lime/35 bg-accent-lime/12 px-2 py-1 text-xs font-bold text-accent-lime ${className}`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.5 6l2.5 2.5 4.5-4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </span>
  );
}

export function DemoInput({
  value,
  placeholder,
  typing,
  active,
  sendPulse,
  accent = "neon-cyan",
}: {
  value: string;
  placeholder: string;
  typing: boolean;
  active?: boolean;
  sendPulse?: boolean;
  accent?: "neon-cyan" | "accent-violet";
}) {
  const accentBorder = accent === "accent-violet" ? "border-accent-violet/50" : "border-neon-cyan/50";
  const accentBg = accent === "accent-violet" ? "bg-accent-violet" : "bg-neon-cyan";

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border bg-white/60 px-3 py-2 transition-all duration-300 ${
        typing || active ? `showcase-input-active ${accentBorder}` : "border-white/80"
      }`}
    >
      <span
        className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${
          value ? "font-medium text-foreground" : "text-muted-foreground"
        }`}
      >
        {value || placeholder}
        {typing && <TypingCursor visible />}
      </span>
      <span
        className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold text-white sm:text-xs ${accentBg} ${
          sendPulse ? "animate-send-pulse" : ""
        }`}
      >
        {sendPulse ? "↑" : "전송"}
      </span>
    </div>
  );
}

export function DemoProgressBar({ progress }: { progress: number }) {
  return (
    <div className="overflow-hidden rounded-full bg-white/50">
      <div
        className="showcase-progress-bar h-1 rounded-full bg-gradient-to-r from-accent-violet via-neon-cyan to-accent-lime"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export async function typeText(
  text: string,
  onChar: (slice: string) => void,
  wait: (ms: number, cancelled: () => boolean) => Promise<void>,
  cancelled: () => boolean,
  speed = 35
) {
  for (let i = 1; i <= text.length; i += 1) {
    if (cancelled()) return;
    onChar(text.slice(0, i));
    await wait(speed, cancelled);
  }
}

export async function streamText(
  text: string,
  onChar: (slice: string) => void,
  wait: (ms: number, cancelled: () => boolean) => Promise<void>,
  cancelled: () => boolean,
  speed = 22
) {
  for (let i = 1; i <= text.length; i += 1) {
    if (cancelled()) return;
    onChar(text.slice(0, i));
    const delay = text[i - 1] === "\n" ? 70 : speed;
    await wait(delay, cancelled);
  }
}

export function DemoShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl bg-white/40 p-3 backdrop-blur-sm ${className}`}>{children}</div>;
}
