import { User } from "lucide-react";

const SIZE_CLASSES = {
  sm: "w-8 h-8 text-[12px]",
  md: "w-11 h-11 text-[14px]",
  lg: "w-16 h-16 text-[20px]",
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export const Avatar = ({ src, name, size = "md", status, className = "" }) => {
  const initials = name ? getInitials(name) : "";

  return (
    <span className={`relative inline-flex flex-none ${className}`}>
      <span
        className={`rounded-full overflow-hidden flex items-center justify-center bg-accent-soft text-accent-text font-bold border border-border ${SIZE_CLASSES[size]}`}
      >
        {src ? (
          <img src={src} alt={name || "avatar"} className="w-full h-full object-cover" />
        ) : initials ? (
          initials
        ) : (
          <User className="w-1/2 h-1/2" />
        )}
      </span>
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full border-2 border-bg ${
            status === "online" ? "bg-ok" : status === "away" ? "bg-warn" : "bg-text-3"
          }`}
        />
      )}
    </span>
  );
};
