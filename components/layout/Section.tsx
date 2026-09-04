import { type ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type SectionVariant = "default" | "tight" | "band" | "full-bleed" | "spacious";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  bordered?: boolean;
  variant?: SectionVariant;
};

const variantPadding: Record<SectionVariant, string> = {
  default: "section-padding",
  tight: "section-padding-tight",
  band: "section-padding-band",
  "full-bleed": "section-padding-bleed",
  spacious: "section-padding-spacious",
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  bordered = false,
  variant = "default",
}: SectionProps) {
  const useContainer = variant !== "full-bleed";

  return (
    <section
      id={id}
      className={`${variantPadding[variant]} relative ${bordered ? "border-t border-white/60" : ""} ${className}`}
    >
      {useContainer ? (
        <Container className={`relative ${containerClassName}`}>{children}</Container>
      ) : (
        <div className={`relative ${containerClassName}`}>{children}</div>
      )}
    </section>
  );
}

export const sectionGridGap = "gap-6 lg:gap-8";
export const sectionHeaderMb = "mb-16 lg:mb-24";
export const sectionHeaderMbLarge = "mb-20 lg:mb-32";
export const sectionHeaderMbSpacious = "mb-20 lg:mb-32";
