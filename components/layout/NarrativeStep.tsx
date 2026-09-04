type NarrativeStepProps = {
  step: string;
  label: string;
  className?: string;
};

export function NarrativeStep({ step, label, className = "" }: NarrativeStepProps) {
  return (
    <p className={`narrative-step ${className}`}>
      <span className="narrative-step-num">{step}</span>
      <span className="narrative-step-label">{label}</span>
    </p>
  );
}
