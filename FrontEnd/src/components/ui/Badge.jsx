const TONE_SOLID = {
  accent: "bg-accent text-accent-contrast",
  ok: "bg-ok text-white",
  warn: "bg-warn text-white",
  err: "bg-err text-white",
  info: "bg-info text-white",
  neutral: "bg-text text-bg",
};

const TONE_SOFT = {
  accent: "bg-accent-soft text-accent-text",
  ok: "bg-ok-soft text-ok",
  warn: "bg-warn-soft text-warn",
  err: "bg-err-soft text-err",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-2 text-text-2",
};

const TONE_OUTLINE = {
  accent: "text-accent-text border border-accent-text",
  ok: "text-ok border border-ok",
  warn: "text-warn border border-warn",
  err: "text-err border border-err",
  info: "text-info border border-info",
  neutral: "text-text-2 border border-border",
};

const TONE_DOT = {
  accent: "bg-accent",
  ok: "bg-ok",
  warn: "bg-warn",
  err: "bg-err",
  info: "bg-info",
  neutral: "bg-text-3",
};

export const Badge = ({
  variant = "soft",
  tone = "neutral",
  dot = false,
  className = "",
  children,
}) => {
  const variantClass =
    variant === "solid" ? TONE_SOLID[tone] : variant === "outline" ? TONE_OUTLINE[tone] : TONE_SOFT[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[12px] px-3.5 py-1.5 rounded-full ${variantClass} ${className}`}
    >
      {dot && <span className={`w-[7px] h-[7px] rounded-full ${TONE_DOT[tone]}`} />}
      {children}
    </span>
  );
};
