import { useEffect } from "react";
import { X } from "lucide-react";

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

export const Modal = ({ open, onClose, title, size = "md", children, className = "" }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(10,8,6,.45)] backdrop-blur-[3px] animate-[overlayIn_0.2s_ease]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={`w-full ${SIZE_CLASSES[size]} bg-surface border border-border rounded-card shadow-3 p-7 animate-[dialogIn_0.25s_ease] max-h-[90vh] overflow-y-auto ${className}`}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between mb-5">
            {title && <h3 className="text-h2 text-text">{title}</h3>}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-text-3 hover:text-text transition-colors"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
