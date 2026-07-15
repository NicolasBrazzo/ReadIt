export const Tabs = ({ tabs, value, onChange, className = "" }) => {
  return (
    <div className={`flex border-b border-border ${className}`}>
      {tabs.map((tab) => {
        const active = tab.value === value;
        const activeClass = tab.tone === "ok" ? "border-ok text-ok" : "border-accent text-accent";

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-2 px-5 py-3 -mb-px border-b-2 text-[15px] transition-colors ${
              active ? `${activeClass} font-bold` : "border-transparent text-text-2 font-medium hover:text-text"
            }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
