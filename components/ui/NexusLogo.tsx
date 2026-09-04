import Image from "next/image";

const LOGO_SRC = "/nexus-ai-logo.png";

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
} as const;

const wrapSizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-12 w-12",
} as const;

type NexusLogoSize = keyof typeof sizeMap;

type NexusLogoMarkProps = {
  size?: NexusLogoSize | number;
  variant?: "default" | "header";
  className?: string;
};

export function NexusLogoMark({
  size = "md",
  variant = "default",
  className = "",
}: NexusLogoMarkProps) {
  const resolvedSize = typeof size === "number" ? size : sizeMap[size];
  const wrapClass = typeof size === "number" ? "" : wrapSizeMap[size];
  const isHeader = variant === "header";

  return (
    <span
      className={`nexus-logo-mark-wrap inline-flex shrink-0 items-center justify-center rounded-full ${
        isHeader ? "nexus-logo-mark-wrap--header" : wrapClass
      } ${className}`}
      style={
        !isHeader && typeof size === "number"
          ? { width: resolvedSize + 8, height: resolvedSize + 8 }
          : undefined
      }
    >
      {isHeader && <span className="nexus-logo-mark-aurora" aria-hidden />}
      <Image
        src={LOGO_SRC}
        alt=""
        width={isHeader ? 40 : resolvedSize}
        height={isHeader ? 40 : resolvedSize}
        className={
          isHeader
            ? "nexus-logo-mark nexus-logo-mark--header"
            : "nexus-logo-mark h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full object-contain"
        }
        aria-hidden
      />
    </span>
  );
}

type NexusLogoProps = {
  size?: NexusLogoSize;
  showWordmark?: boolean;
  showTagline?: boolean;
  tagline?: string;
  className?: string;
  wordmarkClassName?: string;
  taglineClassName?: string;
  layout?: "row" | "stack";
};

export function NexusLogo({
  size = "md",
  showWordmark = true,
  showTagline = false,
  tagline = "챗봇 · 이미지 · 자동화",
  className = "",
  wordmarkClassName = "",
  taglineClassName = "",
  layout = "row",
}: NexusLogoProps) {
  const isStack = layout === "stack";

  return (
    <span
      className={`nexus-logo inline-flex items-center ${isStack ? "flex-col gap-2" : "gap-2"} ${className}`}
    >
      <NexusLogoMark size={size} />
      {(showWordmark || showTagline) && (
        <span className={`inline-flex ${isStack ? "flex-col items-center gap-1" : "flex-col gap-1"}`}>
          {showWordmark && (
            <span
              className={`nexus-logo-wordmark font-bold leading-none tracking-tight text-foreground ${wordmarkClassName}`}
            >
              Nexus AI
            </span>
          )}
          {showTagline && (
            <span
              className={`nexus-logo-tagline font-medium text-muted-foreground ${taglineClassName}`}
            >
              {tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
