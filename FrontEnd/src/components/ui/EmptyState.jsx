export const EmptyState = ({ icon: Icon, title, description, action, className = "" }) => {
  return (
    <div
      className={`bg-surface border border-dashed border-border rounded-card px-6 py-12 text-center flex flex-col items-center gap-2 ${className}`}
    >
      {Icon && (
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent-text mb-2">
          <Icon className="w-6 h-6" />
        </span>
      )}
      {title && <h3 className="font-bold text-[18px] text-text">{title}</h3>}
      {description && (
        <p className="text-[14px] text-text-2 max-w-[38ch]">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
