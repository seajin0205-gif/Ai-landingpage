import { type ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  bordered?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  bordered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-padding relative ${bordered ? "border-t border-white/60" : ""} ${className}`}
    >
      <Container className={`relative ${containerClassName}`}>{children}</Container>
    </section>
  );
}

export const sectionGridGap = "gap-6 lg:gap-8";
