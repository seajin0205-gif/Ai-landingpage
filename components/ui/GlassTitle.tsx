type GlassTitleTag = "h1" | "h2" | "span";

type GlassTitleProps = {
  as?: GlassTitleTag;
  lines: string[];
  className?: string;
  id?: string;
};

export function GlassTitle({
  as: Tag = "span",
  lines,
  className = "",
  id,
}: GlassTitleProps) {
  return (
    <Tag id={id} className={`glass-title ${className}`.trim()}>
      {lines.map((line) => (
        <span key={line} className="headline-gradient-line">
          <span className="headline-glass-extrude" aria-hidden="true">
            {line}
          </span>
          <span className="headline-glass-face">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
