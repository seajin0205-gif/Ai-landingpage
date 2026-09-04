type MetricBadgeProps = {
  value: string;
  label: string;
  variant?: "glass" | "flat";
};

export function MetricBadge({ value, label, variant = "glass" }: MetricBadgeProps) {
  return (
    <div
      className={`flex flex-1 flex-col items-center rounded-lg px-2 py-2 text-center ${
        variant === "flat" ? "metric-badge-flat" : "metric-badge-glass"
      }`}
    >
      <span className="font-mono text-sm font-bold text-neon-cyan">{value}</span>
      <span className="mt-2 text-xs leading-tight text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
}
