import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";

const KIND_CONFIG = {
  info: { icon: Info, bg: "bg-info-soft", iconBg: "bg-info" },
  ok: { icon: CheckCircle2, bg: "bg-ok-soft", iconBg: "bg-ok" },
  warn: { icon: AlertTriangle, bg: "bg-warn-soft", iconBg: "bg-warn" },
  err: { icon: XCircle, bg: "bg-err-soft", iconBg: "bg-err" },
};

export const Alert = ({ kind = "info", title, children, className = "" }) => {
  const { icon: Icon, bg, iconBg } = KIND_CONFIG[kind];

  return (
    <div className={`flex items-start gap-3.5 rounded-field p-4 ${bg} ${className}`}>
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-full flex-none text-white ${iconBg}`}
      >
        <Icon className="w-4 h-4" />
      </span>
      <div>
        {title && <div className="font-bold text-[14px] text-text">{title}</div>}
        <div className="text-[14px] text-text-2 mt-0.5">{children}</div>
      </div>
    </div>
  );
};
