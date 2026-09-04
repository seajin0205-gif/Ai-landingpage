import { type ReactNode } from "react";

type BrowserMockupProps = {
  children: ReactNode;
  url?: string;
  className?: string;
};

export function BrowserMockup({
  children,
  url = "app.nexus.ai/workspace",
  className = "",
}: BrowserMockupProps) {
  return (
    <div className={`browser-mockup ${className}`}>
      <div className="browser-mockup-chrome">
        <div className="flex items-center gap-2">
          <span className="browser-dot browser-dot-red" />
          <span className="browser-dot browser-dot-amber" />
          <span className="browser-dot browser-dot-green" />
        </div>
        <div className="browser-mockup-url">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0 opacity-50">
            <path
              d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 1.5a.75.75 0 110 1.5.75.75 0 010-1.5z"
              fill="currentColor"
            />
          </svg>
          <span>{url}</span>
        </div>
        <div className="hidden w-16 sm:block" aria-hidden />
      </div>
      <div className="browser-mockup-body grid-pattern">{children}</div>
    </div>
  );
}
