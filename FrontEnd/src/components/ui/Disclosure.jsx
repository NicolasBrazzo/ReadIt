import { ChevronDown } from "lucide-react";

export const Disclosure = ({ open, onToggle, label, children, className = "" }) => {
  return (
    <div className={`border-t border-border ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 py-3 text-[14px] font-medium text-text-2 hover:text-text transition-colors"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 flex-none transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
};
