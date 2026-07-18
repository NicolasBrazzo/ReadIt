// src/context/ThemeProvider.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";

const THEME_KEY = "readit-theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );
  const isExplicit = useRef(localStorage.getItem(THEME_KEY) !== null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isExplicit.current) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setThemeState(e.matches ? "dark" : "light");

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (next) => {
    isExplicit.current = true;
    localStorage.setItem(THEME_KEY, next);
    setThemeState(next);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
