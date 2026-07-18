import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}
      title={isDark ? "Tema chiaro" : "Tema scuro"}
      className={`inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-surface text-text-2 hover:text-accent hover:border-text-3 transition-colors duration-150 active:translate-y-[1px] ${className}`}
    >
      {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
};
