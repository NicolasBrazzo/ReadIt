export const ProgressBar = ({ value = 0, tone = "accent", className = "", trackClassName = "" }) => {
  const clamped = Math.min(100, Math.max(0, value));
  const fillClass = tone === "ok" ? "bg-ok" : "bg-accent";

  return (
    <div className={`h-2 bg-surface-2 rounded-full overflow-hidden ${trackClassName}`}>
      <div
        className={`h-full rounded-full transition-[width] duration-300 ${fillClass} ${className}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
