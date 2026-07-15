import { Loader2 } from "lucide-react";

const VARIANT_CLASSES = {
  primary:
    "bg-accent text-accent-contrast font-bold hover:bg-accent-deep",
  secondary:
    "bg-surface text-text font-medium border border-border hover:bg-surface-2 hover:border-text-3",
  ghost: "bg-transparent text-text font-medium hover:bg-surface-2",
  danger: "bg-err-soft text-err font-bold hover:opacity-85",
};

const SIZE_CLASSES = {
  sm: "px-4 py-[7px] text-[13px] gap-1.5",
  md: "px-[22px] py-[10px] text-[15px] gap-2",
  lg: "px-7 py-[13px] text-[17px] gap-2.5",
};

export const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconOnly = false,
  loading = false,
  disabled = false,
  className = "",
  children,
  type = "button",
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center rounded-full transition-colors duration-150 active:translate-y-[1px] ${
        VARIANT_CLASSES[variant]
      } ${
        iconOnly ? "w-11 h-11 p-0" : SIZE_CLASSES[size]
      } ${
        isDisabled ? "opacity-40 cursor-not-allowed" : loading ? "cursor-wait" : ""
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {!iconOnly && children}
    </button>
  );
};
