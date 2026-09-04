"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import {
  AnimatedNumber,
  MiniLineChart,
  ProgressGraph,
  Sparkline,
  TinyBarSparkline,
  useCountUp,
  useInViewOnce,
} from "@/components/effects/StatCharts";

type StatConfig = {
  label: string;
  target: number;
  format: (n: number) => string;
  accent: string;
  accentHex: string;
  trend: string;
  trendUp: boolean;
  chart: "sparkline" | "line" | "progress" | "bars";
  data: number[];
  progressLabel?: string;
};

const stats: StatConfig[] = [
  {
    label: "챗봇 대화 처리",
    target: 100_000_000,
    format: (n) => `${Math.round(n / 10_000_000) / 10}억+`,
    accent: "text-neon-cyan",
    accentHex: "#00d4ff",
    trend: "+12.4%",
    trendUp: true,
    chart: "sparkline",
    data: [42, 55, 48, 62, 58, 71, 68, 82, 90, 100],
  },
  {
    label: "생성된 이미지",
    target: 5_000_000,
    format: (n) => `${Math.round(n / 100_000) / 10}만+`,
    accent: "text-accent-violet",
    accentHex: "#9b7dff",
    trend: "+28.1%",
    trendUp: true,
    chart: "line",
    data: [30, 38, 45, 42, 55, 62, 58, 72, 80, 88],
  },
  {
    label: "반복 업무 시간 절감",
    target: 70,
    format: (n) => `${n}%`,
    accent: "text-accent-lime",
    accentHex: "#9ae600",
    trend: "평균 70%",
    trendUp: true,
    chart: "progress",
    data: [55, 60, 62, 65, 68, 70],
    progressLabel: "팀 평균",
  },
  {
    label: "도입 기업·팀",
    target: 500,
    format: (n) => `${n}+`,
    accent: "text-accent-indigo",
    accentHex: "#6d7cff",
    trend: "+86 신규",
    trendUp: true,
    chart: "bars",
    data: [28, 42, 35, 55, 48, 62, 58, 70, 65, 78],
  },
];

function StatDashboardCard({ stat, index }: { stat: StatConfig; index: number }) {
  const { ref, inView } = useInViewOnce(0.25);
  const count = useCountUp(stat.target, inView, 1600 + index * 150);
  const isWideLineChart = stat.chart === "sparkline" || stat.chart === "line";

  return (
    <div
      ref={ref}
      className={`stat-dashboard-card group flex h-full flex-col${
        isWideLineChart ? " stat-dashboard-card--line-chart" : ""
      }`}
    >
      <div className="stat-dashboard-card-head flex items-start justify-between gap-3">
        <p className="stat-dashboard-label font-semibold tracking-wide text-white/45">
          {stat.label}
        </p>
        <span
          className={`stat-dashboard-trend shrink-0 rounded-full py-1 font-bold ${
            stat.trendUp
              ? "bg-accent-lime/12 text-accent-lime"
              : "bg-white/8 text-white/50"
          }`}
        >
          {stat.trendUp ? "↑ " : ""}
          {stat.trend}
        </span>
      </div>

      <p className={`stat-dashboard-value mt-3 font-extrabold tracking-tight ${stat.accent}`}>
        <AnimatedNumber value={count} format={stat.format} />
      </p>

      <div className={`stat-dashboard-chart${isWideLineChart ? " stat-dashboard-chart--lg" : ""}`}>
        {stat.chart === "sparkline" && (
          <Sparkline data={stat.data} color={stat.accentHex} active={inView} className="h-full w-full" />
        )}
        {stat.chart === "line" && (
          <MiniLineChart
            data={stat.data}
            color={stat.accentHex}
            fillColor={`${stat.accentHex}22`}
            active={inView}
            className="h-full w-full"
          />
        )}
        {stat.chart === "progress" && (
          <ProgressGraph
            value={count}
            color={stat.accentHex}
            active={inView}
            label={stat.progressLabel}
            className="h-full w-full"
          />
        )}
        {stat.chart === "bars" && (
          <TinyBarSparkline data={stat.data} color={stat.accentHex} active={inView} className="h-full w-full" />
        )}
      </div>
    </div>
  );
}

export function Statistics() {
  return (
    <section id="stats" className="stats-band section-padding-band section-rhythm-proof-metrics">
      <Container>
        <Reveal>
          <div className="stats-dashboard-shell overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-6 lg:rounded-3xl lg:p-8">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-white/50 uppercase">Analytics Dashboard</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  팀의 AI 활용이 실제 성과로 이어집니다
                </h2>
              </div>
              <div className="flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70">
                <span className="h-2 w-2 rounded-full bg-accent-lime" />
                Live metrics
              </div>
            </div>

            <div className="stats-dashboard-grid mt-6 lg:mt-8">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} variant="scale-in" delay={index * 80} className="h-full min-w-0">
                  <StatDashboardCard stat={stat} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
