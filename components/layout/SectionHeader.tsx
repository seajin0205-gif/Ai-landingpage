type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl";

  return (
    <header className={`${alignClass} ${className}`}>
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/60 px-4 py-2 shadow-sm ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-neon-cyan motion-glow shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
        <p className="text-sm font-bold tracking-[0.1em] text-muted uppercase">
          {label}
        </p>
      </div>
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl lg:text-5xl lg:leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg leading-[1.8] text-muted sm:text-xl">
          {description}
        </p>
      )}
    </header>
  );
}
