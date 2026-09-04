"use client";

import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Magnetic } from "@/components/motion/Magnetic";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg" | "xl";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentProps<"button">, keyof ButtonBaseProps> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonBaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary rounded-full",
  secondary: "btn-secondary rounded-full",
  ghost:
    "inline-flex items-center justify-center text-sm text-muted transition-colors hover:text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-12 px-8 text-base",
  lg: "h-14 px-8 text-base sm:text-lg",
  xl: "btn-primary-xl h-16 min-w-72 px-12 text-lg sm:h-[72px] sm:min-w-80 sm:px-16 sm:text-xl",
};

export function Button({
  variant = "primary",
  size = "default",
  showArrow = false,
  magnetic = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    variantClasses[variant],
    variant === "ghost" ? "" : sizeClasses[size],
    showArrow && variant !== "ghost" ? "btn-with-icon" : "",
    variant !== "ghost" ? "micro-interact" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {showArrow && variant !== "ghost" && (
        <ArrowRightIcon className="opacity-80" />
      )}
    </>
  );

  const useMagnetic = magnetic && variant !== "ghost";
  const wrap = (node: ReactNode) =>
    useMagnetic ? <Magnetic strength={0.18}>{node}</Magnetic> : node;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return wrap(
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return wrap(
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
