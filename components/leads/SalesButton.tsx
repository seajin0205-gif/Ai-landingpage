"use client";

import { Button } from "@/components/ui/Button";
import { useLead } from "@/components/leads/LeadDialog";

export function SalesButton({
  label,
  inquiryType = "sales",
  className = "",
  variant = "secondary",
  size = "lg",
}: {
  label: string;
  inquiryType?: "quote" | "sales" | "trial" | "other";
  className?: string;
  variant?: "primary" | "secondary";
  size?: "default" | "lg" | "xl";
}) {
  const { openLead } = useLead();
  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={() => openLead(inquiryType)}>
      {label}
    </Button>
  );
}
