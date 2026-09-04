type PreviewProps = {
  className?: string;
  animate?: boolean;
};

export function ReportResultPreview({ className = "", animate = false }: PreviewProps) {
  const bars = [42, 68, 55, 82, 61, 94, 78];
  const metrics = [
    { label: "전환율", value: "+18%", color: "text-neon-cyan" },
    { label: "CTR", value: "4.2%", color: "text-accent-violet" },
    { label: "ROAS", value: "3.1x", color: "text-accent-lime" },
  ];

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm ${animate ? "animate-image-result" : ""} ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-neon-cyan/15 text-xs font-bold text-neon-cyan">
            PDF
          </span>
          <span className="text-xs font-bold text-slate-800">주간_마케팅_보고서.pdf</span>
        </div>
        <span className="rounded-full bg-accent-lime/15 px-2 py-1 text-xs font-semibold text-accent-lime">
          완료
        </span>
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-slate-500">2026년 7월 1주차 핵심 지표</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-slate-100 bg-slate-50/60 px-2 py-2 text-center">
              <p className={`text-sm font-extrabold ${m.color}`}>{m.value}</p>
              <p className="text-xs text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-14 items-end gap-1 rounded-lg bg-slate-50/80 p-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(to top, #00d4ff, #6d7cff)"
                    : "linear-gradient(to top, #9ae600, #b8ff2e)",
              }}
            />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {["유료 광고 채널 ROAS 상승", "이메일 캠페인 CTR 개선", "랜딩 페이지 전환율 +18%"].map(
            (line) => (
              <div key={line} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="h-1 w-1 rounded-full bg-neon-cyan" />
                {line}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export function HeroBannerResultPreview({ className = "", animate = false, variant = 0 }: PreviewProps & { variant?: number }) {
  const gradients = [
    "from-[#0c1a2e] via-[#1a3a5c] to-[#2d1b69]",
    "from-[#0f2847] via-[#1e4d6b] to-[#3d2a7a]",
  ];
  const gradient = gradients[variant % gradients.length];

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/80 shadow-md ${animate ? "animate-image-result" : ""} ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/90 px-2 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-1 text-xs text-white/40">nexus-hero-banner.png</span>
      </div>
      <div className={`relative aspect-[16/9] bg-gradient-to-br ${gradient} p-3`}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 70% 30%, rgba(0,212,255,0.4), transparent 50%), radial-gradient(circle at 20% 80%, rgba(155,125,255,0.3), transparent 50%)",
        }} />
        <div className="relative flex h-full flex-col justify-center">
          <span className="mb-1 inline-flex w-fit rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2 py-1 text-xs font-semibold text-neon-cyan">
            AI Platform
          </span>
          <p className="text-xs font-extrabold leading-tight text-white">
            업무를 자동화하는
            <br />
            <span className="text-transparent bg-gradient-to-r from-neon-cyan to-accent-violet bg-clip-text">
              AI 워크스페이스
            </span>
          </p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-neon-cyan px-2 py-1 text-xs font-bold text-slate-900">
              시작하기
            </span>
            <span className="rounded-full border border-white/30 px-2 py-1 text-xs font-medium text-white/80">
              더 알아보기
            </span>
          </div>
        </div>
        <div className="absolute right-2 bottom-2 h-10 w-14 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm" />
      </div>
    </div>
  );
}

export function CalendarInvitePreview({ className = "", animate = false }: PreviewProps) {
  const attendees = ["김", "이", "박", "최", "정"];

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm ${animate ? "animate-image-result" : ""} ${className}`}
    >
      <div className="bg-gradient-to-r from-accent-violet/10 to-neon-cyan/10 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 flex-col items-center justify-center rounded-lg bg-white shadow-sm">
            <span className="text-xs font-bold uppercase text-accent-violet">Jul</span>
            <span className="text-sm font-extrabold leading-none text-slate-800">6</span>
          </span>
          <div>
            <p className="text-xs font-bold text-slate-800">팀 주간 미팅</p>
            <p className="text-xs text-slate-500">내일 오전 10:00 – 11:00</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 2a4 4 0 014 4v2.5l1 2H3l1-2V6a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          Google Meet · 화상 회의
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {attendees.map((name, i) => (
              <span
                key={name}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-sm"
                style={{
                  background: `linear-gradient(135deg, hsl(${200 + i * 30}, 70%, 55%), hsl(${240 + i * 20}, 60%, 50%))`,
                  zIndex: attendees.length - i,
                }}
              >
                {name}
              </span>
            ))}
          </div>
          <span className="text-xs text-slate-500">참석자 5명 · 초대 발송됨</span>
        </div>
        <div className="rounded-lg border border-accent-lime/25 bg-accent-lime/8 px-2 py-2 text-center text-xs font-semibold text-accent-lime">
          ✓ 캘린더 초대 전송 완료
        </div>
      </div>
    </div>
  );
}

export function ResultPreviewByType({
  type,
  animate = true,
  className = "",
  variant = 0,
}: {
  type: "report" | "image" | "calendar";
  animate?: boolean;
  className?: string;
  variant?: number;
}) {
  if (type === "report") return <ReportResultPreview animate={animate} className={className} />;
  if (type === "image") return <HeroBannerResultPreview animate={animate} className={className} variant={variant} />;
  return <CalendarInvitePreview animate={animate} className={className} />;
}
