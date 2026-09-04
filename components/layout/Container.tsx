import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </Tag>
  );
}
