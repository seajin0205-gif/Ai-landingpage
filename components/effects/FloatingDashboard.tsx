"use client";

import { useEffect, useRef, useState } from "react";
import { ResultPreviewByType } from "@/components/effects/DemoResultPreviews";

const DEMOS = [
  {
    prompt: "이번 주 마케팅 보고서 요약해줘",
    response: "마케팅 보고서를 생성했습니다.",
    detail: "PDF · 핵심 지표 3종 · 주간 차트 포함",
    type: "report" as const,
  },
  {
    prompt: "미니멀 SaaS 히어로 배너 만들어줘",
    response: "히어로 배너 이미지를 생성했습니다.",
    detail: "PNG 4K · 미니멀 · 블루-퍼플 그라데이션",
    type: "image" as const,
  },
  {
    prompt: "내일 팀 미팅 일정 잡아줘",
    response: "캘린더 초대를 보냈습니다.",
    detail: "Google Meet · 참석자 5명 · 내일 10:00",
    type: "calendar" as const,
  },
];

type Phase = "idle" | "typing" | "sending" | "thinking" | "streaming" | "result" | "hold";
type NavId = "chat" | "image" | "automation" | "workflow" | "history";

type ActiveResult = {
  key: number;
  prompt: string;
  response: string;
  detail: string;
  type: (typeof DEMOS)[number]["type"];
};

type HistoryItem = {
  prompt: string;
  type: (typeof DEMOS)[number]["type"];
};

const WORKSPACE_NAV: { id: NavId; label: string }[] = [
  { id: "chat", label: "Chat" },
  { id: "image", label: "Image" },
  { id: "automation", label: "Automation" },
  { id: "workflow", label: "Workflow" },
  { id: "history", label: "History" },
];

let resultCounter = 0;

function ResultIcon({ type }: { type: ActiveResult["type"] }) {
  if (type === "image") {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5.5" cy="6.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 11l3-2.5 2.5 2 3-3.5L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6h12M5 1.5V4M11 1.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 12V8M6 12V5M9 12V7M12 12V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NavIcon({ id }: { id: NavId }) {
  if (id === "image") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5.5" cy="6.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (id === "automation") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "workflow") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 4.5h2M4.5 7v2M11.5 7v2M7 11.5h2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (id === "history") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 4h10v9H3V4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 2v2M11 2v2M3 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 4.5c0-1 1-2 2.5-2h5c1.5 0 2.5 1 2.5 2v7c0 1-1 2-2.5 2h-5c-1.5 0-2.5-1-2.5-2v-7z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function navFromDemo(type: (typeof DEMOS)[number]["type"]): NavId {
  if (type === "image") return "image";
  if (type === "calendar") return "automation";
  return "chat";
}

export function FloatingDashboard({
  showFloaters = true,
  preview = false,
  staticSnapshot = false,
  workspaceLayout = false,
}: {
  showFloaters?: boolean;
  preview?: boolean;
  staticSnapshot?: boolean;
  workspaceLayout?: boolean;
}) {
  const imageDemo = DEMOS[1];
  const [inputText, setInputText] = useState(staticSnapshot ? imageDemo.prompt : "");
  const [phase, setPhase] = useState<Phase>(staticSnapshot ? "hold" : "result");
  const [activeResult, setActiveResult] = useState<ActiveResult | null>(
    staticSnapshot
      ? {
          key: 1000,
          prompt: imageDemo.prompt,
          response: imageDemo.response,
          detail: imageDemo.detail,
          type: imageDemo.type,
        }
      : {
          key: 999,
          prompt: DEMOS[0].prompt,
          response: DEMOS[0].response,
          detail: DEMOS[0].detail,
          type: DEMOS[0].type,
        },
  );
  const [streamedResponse, setStreamedResponse] = useState("");
  const [sidebarType, setSidebarType] = useState<(typeof DEMOS)[number]["type"]>(
    staticSnapshot ? "image" : "report",
  );
  const [imageProgress, setImageProgress] = useState(0);
  const [flowStep, setFlowStep] = useState(staticSnapshot ? 3 : -1);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(
    staticSnapshot
      ? [{ prompt: imageDemo.prompt, type: "image" }]
      : [{ prompt: DEMOS[0].prompt, type: "report" }],
  );
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    if (staticSnapshot) return;

    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timersRef.current.delete(id);
        if (!cancelled) fn();
      }, ms);
      timersRef.current.add(id);
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => schedule(() => resolve(), ms));

    const typePrompt = async (prompt: string) => {
      setActiveResult(null);
      setPhase("typing");
      setInputText("");
      for (let i = 1; i <= prompt.length; i += 1) {
        if (cancelled) return;
        setInputText(prompt.slice(0, i));
        await wait(40);
      }
    };

    const runDemo = async (demo: (typeof DEMOS)[number]) => {
      setFlowStep(-1);
      setImageProgress(0);
      setStreamedResponse("");
      await typePrompt(demo.prompt);
      if (cancelled) return;

      setPhase("sending");
      await wait(280);
      if (cancelled) return;

      setInputText("");
      setPhase("thinking");
      setSidebarType(demo.type);

      if (demo.type === "image") {
        for (let p = 0; p <= 100; p += 5) {
          if (cancelled) return;
          setImageProgress(p);
          await wait(40);
        }
      } else {
        await wait(850);
      }
      if (cancelled) return;

      setPhase("streaming");
      for (let i = 1; i <= demo.response.length; i += 1) {
        if (cancelled) return;
        setStreamedResponse(demo.response.slice(0, i));
        await wait(28);
      }
      if (cancelled) return;

      resultCounter += 1;
      const result: ActiveResult = {
        key: resultCounter,
        prompt: demo.prompt,
        response: demo.response,
        detail: demo.detail,
        type: demo.type,
      };

      setPhase("result");
      setActiveResult(result);
      setHistoryItems((prev) => {
        const next = [{ prompt: demo.prompt, type: demo.type }, ...prev.filter((h) => h.prompt !== demo.prompt)];
        return next.slice(0, 5);
      });

      for (let s = 0; s < 3; s += 1) {
        if (cancelled) return;
        setFlowStep(s);
        await wait(400);
      }
      setFlowStep(3);

      setPhase("hold");
      await wait(3500);
      if (cancelled) return;

      setPhase("idle");
      setStreamedResponse("");
      setFlowStep(-1);
    };

    const loop = async () => {
      await wait(500);
      let index = 0;
      while (!cancelled) {
        await runDemo(DEMOS[index % DEMOS.length]);
        index += 1;
        await wait(600);
      }
    };

    if (!(globalThis as { __NEXUS_DEMO_FREEZE?: boolean }).__NEXUS_DEMO_FREEZE) loop();

    return () => {
      cancelled = true;
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
    };
  }, [staticSnapshot]);

  const isThinking = phase === "thinking";
  const isStreaming = phase === "streaming";
  const showResult = activeResult && (phase === "result" || phase === "hold");
  const flowLabels = ["보고서 생성", "슬랙 전송", "완료"];

  const activeNav: NavId = (() => {
    if (phase === "hold" && flowStep >= 3) return "history";
    if ((phase === "result" || phase === "hold") && flowStep >= 0) return "workflow";
    if (isThinking || isStreaming || phase === "typing" || phase === "sending") {
      return navFromDemo(sidebarType);
    }
    if (activeResult) return navFromDemo(activeResult.type);
    return "chat";
  })();

  const mainPanelLabel =
    activeNav === "image"
      ? "Image Studio"
      : activeNav === "automation"
        ? "Automation"
        : activeNav === "workflow"
          ? "Workflow Builder"
          : activeNav === "history"
            ? "Session History"
            : "AI Chat";

  const mainContent = (
    <>
            <div className={`mb-4 ${preview ? "" : "h-[280px]"}`}>
        {activeNav === "history" && phase === "hold" ? (
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4">
            <p className="text-xs font-bold tracking-wide text-muted uppercase">Recent Sessions</p>
            <ul className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto">
              {historyItems.map((item) => (
                <li
                  key={item.prompt}
                  className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neon-cyan/10 text-neon-cyan">
                    <ResultIcon type={item.type} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">{item.prompt}</p>
                    <p className="mt-1 text-xs text-muted-foreground">방금 · 완료</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : isThinking ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-neon-cyan/30 bg-neon-cyan/5 px-4 py-6">
            <div className="flex gap-2">
              <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan" />
            </div>
            <p className="mt-3 text-sm font-semibold text-neon-cyan">AI가 결과를 생성하는 중...</p>
            {sidebarType === "image" && imageProgress > 0 && (
              <p className="mt-2 text-xs font-bold text-accent-violet">{imageProgress}%</p>
            )}
          </div>
        ) : isStreaming ? (
          <div className="flex h-full flex-col rounded-2xl border border-neon-cyan/30 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold tracking-wide text-neon-cyan uppercase">Nexus AI</p>
            <p className="mt-3 text-sm font-medium text-foreground">
              {streamedResponse}
              <span className="showcase-cursor" />
            </p>
          </div>
        ) : showResult && activeResult ? (
          <div
            key={activeResult.key}
            className="demo-success-badge animate-pop-result flex h-full flex-col overflow-hidden rounded-2xl border border-neon-cyan/30 bg-white p-4 shadow-glow"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/25 to-accent-violet/20 text-neon-cyan">
                <ResultIcon type={activeResult.type} />
              </span>
              <p className="text-xs font-bold tracking-wide text-neon-cyan uppercase">생성 결과</p>
            </div>
            <p className="mt-3 text-base font-bold text-foreground">{activeResult.response}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{activeResult.detail}</p>
            <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-xl">
              <ResultPreviewByType type={activeResult.type} animate className="w-full" />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/90 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/60 px-4 py-6 text-center">
            <p className="text-sm font-medium text-muted">프롬프트를 입력하면</p>
            <p className="mt-1 text-sm font-medium text-muted">결과가 여기에 표시됩니다</p>
          </div>
        )}
      </div>

      {activeNav !== "history" && (
        <div
          className={`flex items-center gap-2 rounded-xl border bg-white px-4 py-2 transition-all duration-300 ${
            phase === "typing"
              ? "border-neon-cyan/50 shadow-[0_0_0_3px_rgba(0,212,255,0.18)]"
              : "border-slate-200/80"
          }`}
        >
          <div className="flex min-w-0 flex-1 items-center">
            <span
              className={`truncate text-sm ${
                inputText ? "font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              {inputText || "메시지 입력..."}
            </span>
            {phase === "typing" && (
              <span className="hero-cursor-blink ml-1 inline-block h-4 w-1 shrink-0 bg-neon-cyan" />
            )}
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-cyan text-xs font-bold text-white">
            ↑
          </span>
        </div>
      )}
    </>
  );

  const previewPanel = (
    <div className={preview ? "dashboard-preview-side shrink-0" : "p-6 sm:p-4"}>
      <p className="mb-3 text-xs font-bold tracking-wide text-muted uppercase">생성물 미리보기</p>
      <div className="dashboard-preview-preview-frame relative overflow-hidden rounded-xl">
        {showResult || isStreaming ? (
          <ResultPreviewByType
            type={sidebarType}
            animate={!!showResult}
            className="w-full"
            variant={sidebarType === "image" ? 1 : 0}
          />
        ) : isThinking && sidebarType === "image" && imageProgress > 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-accent-violet/30 bg-accent-violet/5 p-3">
            <div className="w-full overflow-hidden rounded-full bg-white/50">
              <div
                className="showcase-progress-bar h-1 rounded-full bg-gradient-to-r from-accent-violet to-neon-cyan"
                style={{ width: `${imageProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-bold text-accent-violet">{imageProgress}%</p>
          </div>
        ) : (
          <ResultPreviewByType type="image" animate={false} className="w-full opacity-60" />
        )}
      </div>
      <p className="mt-2 text-center text-xs font-medium text-muted-foreground">
        {showResult ? "방금 생성됨" : isThinking && imageProgress > 0 ? "생성 중..." : "미리보기"}
      </p>
    </div>
  );

  return (
    <div className={preview ? "dashboard-preview-fixed" : "relative mx-auto w-full max-w-xl lg:max-w-none"}>
      {!preview && (
        <div
          className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-neon-cyan/15 via-accent-violet/10 to-accent-lime/10 blur-3xl"
          aria-hidden
        />
      )}

      {showFloaters && (
        <>
          <div className="absolute -top-4 right-0 z-20 hidden sm:block lg:-right-8 lg:top-2">
            <div className="glass-card card-interactive shadow-premium min-w-[120px] rounded-2xl px-6 py-4">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">이미지 생성</p>
              <p className="mt-1 text-lg font-bold text-accent-violet">
                {isThinking || isStreaming
                  ? "생성 중..."
                  : showResult
                    ? "완료!"
                    : imageProgress > 0
                      ? `${imageProgress}%`
                      : "3.2초"}
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-3 z-20 hidden sm:block lg:-left-10">
            <div className="card-surface card-surface-gradient card-interactive flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
              </span>
              <p className="text-sm font-semibold text-foreground">자동화 12건 실행 중</p>
            </div>
          </div>
        </>
      )}

      <div
        className={
          preview
            ? "dashboard-preview-card relative overflow-hidden rounded-2xl border border-white/90 bg-white/95 backdrop-blur-2xl"
            : "shadow-float relative overflow-hidden rounded-2xl border border-white/90 bg-white/60 backdrop-blur-2xl lg:rounded-3xl"
        }
      >
        <div
          className={
            preview
              ? "dashboard-preview-header flex items-center justify-between border-b border-slate-200/70 bg-white/60 px-6 py-4"
              : "flex items-center justify-between border-b border-slate-200/70 bg-white/60 px-6 py-4"
          }
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/30 to-accent-violet/25 text-sm font-bold">
              N
            </span>
            <div>
              <p className="text-base font-bold text-foreground">Nexus AI Workspace</p>
              {workspaceLayout && (
                <p className="text-xs font-medium text-muted-foreground">app.nexus.ai/workspace</p>
              )}
            </div>
          </div>
          {!workspaceLayout && (
            <div className="flex gap-2">
              {["챗봇", "이미지", "자동화"].map((tab, i) => (
                <span
                  key={tab}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                    i === 0 ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          )}
          {workspaceLayout && (
            <span className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-muted-foreground sm:flex">
              <span className="h-2 w-2 rounded-full bg-accent-lime" />
              Live Demo
            </span>
          )}
        </div>

        <div
          className={`flex min-h-0 ${
            preview
              ? "dashboard-preview-body shrink-0"
              : workspaceLayout
                ? "min-h-[480px]"
                : ""
          }`}
        >
          {workspaceLayout && (
            <aside
              className={`workspace-sidebar shrink-0 flex-col border-r border-slate-200/70 bg-white/50 ${
                preview
                  ? "dashboard-preview-sidebar flex"
                  : "hidden w-[168px] md:flex lg:w-[192px]"
              }`}
            >
              <nav className="flex flex-col gap-1 p-3">
                {WORKSPACE_NAV.map((item) => (
                  <span
                    key={item.id}
                    className={`workspace-nav-item flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                      activeNav === item.id
                        ? "workspace-nav-item-active bg-neon-cyan/10 text-neon-cyan shadow-[inset_0_0_0_1px_rgba(0,212,255,0.2)]"
                        : "text-muted-foreground"
                    }`}
                  >
                    <NavIcon id={item.id} />
                    {item.label}
                  </span>
                ))}
              </nav>
              <div className="mt-auto border-t border-slate-200/60 p-3">
                <p className="mb-2 text-xs font-bold tracking-wide text-muted uppercase">Recent</p>
                <ul className="space-y-2">
                  {historyItems.slice(0, 3).map((item) => (
                    <li
                      key={item.prompt}
                      className="truncate rounded-lg bg-slate-50/90 px-2 py-2 text-xs font-medium text-muted-foreground"
                    >
                      {item.prompt}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          <div
            className={
              preview
                ? "dashboard-preview-grid grid-pattern grid shrink-0 gap-0"
                : "grid-pattern grid min-w-0 flex-1 gap-0 sm:grid-cols-[1fr_168px]"
            }
          >
            <div
              className={
                preview
                  ? "dashboard-preview-main border-r border-slate-200/60"
                  : "border-b border-slate-200/60 sm:border-r sm:border-b-0 p-6 sm:p-6"
              }
            >
              <p className="mb-3 text-xs font-bold tracking-wide text-muted uppercase">{mainPanelLabel}</p>
              {mainContent}
            </div>
            {previewPanel}
          </div>
        </div>

        <div className={preview ? "dashboard-preview-footer border-t border-slate-200/70 bg-white/60 px-6 py-4" : "border-t border-slate-200/70 bg-white/60 px-6 py-4"}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-accent-lime">● Automation</span>
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
              {flowLabels.flatMap((step, i) => {
                const items = [
                  <span
                    key={step}
                    className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium transition-all duration-300 ${
                      flowStep >= i
                        ? "bg-accent-lime/20 font-bold text-accent-lime demo-success-badge"
                        : "bg-white/70 text-foreground"
                    }`}
                  >
                    {step}
                    {flowStep > i && " ✓"}
                  </span>,
                ];
                if (i < flowLabels.length - 1) {
                  items.push(
                    <span key={`arrow-${i}`} className="shrink-0 text-xs text-muted-foreground">
                      →
                    </span>,
                  );
                }
                return items;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
