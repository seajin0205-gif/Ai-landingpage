"use client";

const KPI = [
  { label: "Active Workflows", value: "24", trend: "+3" },
  { label: "Images Generated", value: "1.2k", trend: "+18%" },
  { label: "Chat Sessions", value: "386", trend: "+9%" },
  { label: "Automations Run", value: "892", trend: "Today" },
];

const ACTIVITY = [
  { title: "Marketing report exported", time: "2m ago", type: "report" },
  { title: "Hero banner v2 approved", time: "14m ago", type: "image" },
  { title: "Slack digest workflow ran", time: "1h ago", type: "auto" },
  { title: "Team standup summary sent", time: "3h ago", type: "chat" },
];

function ActivityDot({ type }: { type: string }) {
  const color =
    type === "image"
      ? "bg-accent-violet"
      : type === "auto"
        ? "bg-accent-lime"
        : type === "chat"
          ? "bg-neon-cyan"
          : "bg-accent-indigo";
  return <span className={`h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

export function DashboardScreen() {
  return (
    <div className="grid min-h-[416px] gap-0 lg:grid-cols-[1fr_280px]">
      <div className="border-b border-slate-200/70 p-6 sm:p-6 lg:border-b-0 lg:border-r">
        <p className="text-xs font-bold tracking-wide text-muted uppercase">Overview</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {KPI.map((k) => (
            <div key={k.label} className="rounded-xl border border-white/90 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-semibold text-muted-foreground">{k.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-2xl font-extrabold text-foreground">{k.value}</p>
                <span className="text-xs font-bold text-accent-lime">{k.trend}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
          <p className="text-xs font-bold text-muted uppercase">Weekly Usage</p>
          <div className="mt-3 flex h-24 items-end gap-2">
            {[42, 58, 45, 72, 65, 88, 94].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-neon-cyan/80 to-accent-violet/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-6">
        <p className="text-xs font-bold tracking-wide text-muted uppercase">Recent Activity</p>
        <ul className="mt-4 space-y-3">
          {ACTIVITY.map((item) => (
            <li key={item.title} className="flex items-start gap-3 rounded-lg bg-white/70 px-3 py-2">
              <ActivityDot type={item.type} />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WorkflowBuilderScreen() {
  const nodes = [
    { id: "trigger", label: "New Report", x: "8%", y: "28%" },
    { id: "ai", label: "Summarize", x: "38%", y: "18%" },
    { id: "image", label: "Gen Chart", x: "38%", y: "58%" },
    { id: "slack", label: "Send Slack", x: "72%", y: "38%" },
  ];

  return (
    <div className="relative min-h-[416px] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.06),transparent_55%)] p-6">
      <p className="text-xs font-bold tracking-wide text-muted uppercase">Workflow Builder</p>
      <div className="relative mt-4 h-[336px] rounded-xl border border-dashed border-accent-violet/25 bg-white/50">
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          <path d="M120 120 C200 80, 240 80, 320 100" stroke="rgba(109,124,255,0.45)" strokeWidth="2" fill="none" />
          <path d="M120 120 C200 160, 240 200, 320 180" stroke="rgba(154,230,0,0.4)" strokeWidth="2" fill="none" />
          <path d="M420 100 C480 120, 500 130, 560 140" stroke="rgba(0,212,255,0.45)" strokeWidth="2" fill="none" />
        </svg>
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute flex min-w-24 flex-col items-center rounded-xl border border-white/95 bg-white px-3 py-2 shadow-md"
            style={{ left: node.x, top: node.y }}
          >
            <span className="text-xs font-bold text-accent-violet">{node.label}</span>
            <span className="mt-1 text-xs text-muted-foreground">Node</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIChatScreen() {
  const messages = [
    { role: "user", text: "이번 분기 매출 데이터 요약해줘" },
    { role: "ai", text: "Q2 매출은 전분기 대비 +18% 성장했습니다. 주요 드라이버는 Enterprise 플랜 전환입니다." },
    { role: "user", text: "슬랙에 공유할 한 줄 요약도 만들어줘" },
    { role: "ai", text: "📊 Q2 매출 +18% — Enterprise 전환이 성장을 견인했습니다." },
  ];

  return (
    <div className="flex min-h-[416px] flex-col">
      <div className="border-b border-slate-200/70 px-6 py-3">
        <p className="text-xs font-bold tracking-wide text-muted uppercase">AI Chat</p>
        <p className="mt-1 text-sm font-semibold text-foreground">Revenue Analysis Thread</p>
      </div>
      <div className="flex-1 space-y-3 overflow-hidden p-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-neon-cyan/15 font-medium text-foreground"
                  : "border border-slate-200/80 bg-white text-muted"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200/70 p-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2">
          <span className="flex-1 text-sm text-muted-foreground">메시지 입력...</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-cyan text-xs font-bold text-white">↑</span>
        </div>
      </div>
    </div>
  );
}

export function ImageGalleryScreen() {
  const gradients = [
    "from-[#0c1a2e] via-[#1a3a5c] to-[#2d1b69]",
    "from-[#1a2e1a] via-[#2d4a2d] to-[#1b3a4a]",
    "from-[#2a1a3a] via-[#4a2a6a] to-[#1a3a5c]",
    "from-[#0f2847] via-[#1e4d6b] to-[#3d2a7a]",
    "from-[#1a1a2e] via-[#2d2d4a] to-[#4a2a5a]",
    "from-[#0c2a2a] via-[#1a4a4a] to-[#2a3a6a]",
  ];

  return (
    <div className="min-h-[416px] p-6 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-wide text-muted uppercase">Image Gallery</p>
        <span className="rounded-full bg-accent-violet/15 px-2 py-1 text-xs font-bold text-accent-violet">24 assets</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {gradients.map((g, i) => (
          <div
            key={i}
            className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${g} shadow-sm ${
              i === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[180px]" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function AnalyticsScreen() {
  return (
    <div className="grid min-h-[416px] gap-4 p-6 sm:grid-cols-2 sm:p-6">
      <div className="rounded-xl border border-slate-200/80 bg-white/80 p-4 sm:col-span-2">
        <p className="text-xs font-bold tracking-wide text-muted uppercase">Analytics</p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-extrabold text-foreground">4.2x</p>
            <p className="text-xs text-muted">Average team productivity lift</p>
          </div>
          <span className="rounded-full bg-accent-lime/15 px-3 py-1 text-xs font-bold text-accent-lime">+32% MoM</span>
        </div>
        <div className="mt-4 flex h-28 items-end gap-2">
          {[35, 48, 42, 58, 52, 68, 74, 82, 78, 92].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-accent-indigo/70 to-neon-cyan/50" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      {[
        { label: "Chat Resolution", value: "94%", color: "text-neon-cyan" },
        { label: "Image Approval", value: "87%", color: "text-accent-violet" },
        { label: "Workflow Success", value: "99.2%", color: "text-accent-lime" },
        { label: "Avg. Response", value: "1.8s", color: "text-accent-indigo" },
      ].map((m) => (
        <div key={m.label} className="rounded-xl border border-white/90 bg-white/70 p-4">
          <p className="text-xs font-semibold text-muted-foreground">{m.label}</p>
          <p className={`mt-2 text-2xl font-extrabold ${m.color}`}>{m.value}</p>
        </div>
      ))}
    </div>
  );
}

export function AutomationCanvasScreen() {
  const blocks = [
    { label: "Schedule Trigger", color: "border-neon-cyan/40 bg-neon-cyan/8" },
    { label: "Fetch CRM Data", color: "border-accent-indigo/40 bg-accent-indigo/8" },
    { label: "Generate Report", color: "border-accent-violet/40 bg-accent-violet/8" },
    { label: "Post to Slack", color: "border-accent-lime/40 bg-accent-lime/8" },
  ];

  return (
    <div className="min-h-[416px] p-6 sm:p-6">
      <p className="text-xs font-bold tracking-wide text-muted uppercase">Automation Canvas</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        {blocks.map((block, i) => (
          <div key={block.label} className="contents">
            <div className={`rounded-xl border px-4 py-6 text-center shadow-sm ${block.color}`}>
              <p className="text-xs font-bold text-foreground">{block.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">Step {i + 1}</p>
            </div>
            {i < blocks.length - 1 && (
              <span className="hidden text-center text-lg text-muted-foreground sm:block" aria-hidden>→</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-dashed border-accent-lime/30 bg-accent-lime/5 px-4 py-3 text-center">
        <p className="text-xs font-semibold text-accent-lime">● Live · 12 automations running</p>
      </div>
    </div>
  );
}

export const PRODUCT_SCREENS = [
  { id: "dashboard", label: "Dashboard", title: "팀 전체 현황을 한눈에", Screen: DashboardScreen },
  { id: "workflow", label: "Workflow Builder", title: "드래그로 연결하는 업무 흐름", Screen: WorkflowBuilderScreen },
  { id: "chat", label: "AI Chat", title: "맥락을 기억하는 대화형 AI", Screen: AIChatScreen },
  { id: "gallery", label: "Image Gallery", title: "생성된 비주얼 자산 관리", Screen: ImageGalleryScreen },
  { id: "analytics", label: "Analytics", title: "성과와 사용량 인사이트", Screen: AnalyticsScreen },
  { id: "automation", label: "Automation Canvas", title: "반복 업무 자동화 설계", Screen: AutomationCanvasScreen },
] as const;
