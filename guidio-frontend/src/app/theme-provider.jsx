import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/app/theme-context";

const THEMES = ["light", "dark", "system"];

function readStoredTheme(storageKey, fallback) {
  try {
    const stored = localStorage.getItem(storageKey);
    return THEMES.includes(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "Guidio-Ai-theme",
}) {
  const [theme, setThemeState] = useState(() =>
    readStoredTheme(storageKey, defaultTheme)
  );
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // Follow operating-system theme changes.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // Apply the resolved theme to the <html> element.
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = useCallback(
    (nextTheme) => {
      if (!THEMES.includes(nextTheme)) {
        return;
      }

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Storage can be unavailable (private mode). Theme still updates.
      }

      setThemeState(nextTheme);
    },
    [storageKey]
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}