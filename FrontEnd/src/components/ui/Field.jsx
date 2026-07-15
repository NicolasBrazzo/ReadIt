export const Field = ({ label, htmlFor, error, hint, children, className = "" }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="font-mono text-caption uppercase text-text-2"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-[13px] text-err">{error}</p>}
      {hint && !error && <p className="text-[13px] text-text-3">{hint}</p>}
    </div>
  );
};
