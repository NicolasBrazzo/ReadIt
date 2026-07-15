export const Card = ({ lift = false, className = "", children, ...rest }) => {
  return (
    <div
      className={`bg-surface border border-border rounded-card shadow-1 ${
        lift ? "transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-2" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
