"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type ColorTheme = "light" | "dark";

type ThemeContextValue = {
  colorTheme: ColorTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const themeChangeEvent = "portfolio-theme-change";
let fallbackTheme: ColorTheme = "dark";

function getThemeSnapshot(): ColorTheme {
  try {
    const savedTheme = window.localStorage.getItem("color-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      fallbackTheme = savedTheme;
    }
  } catch (error) {
    console.error("Unable to read the saved color theme.", error);
  }

  return fallbackTheme;
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(themeChangeEvent, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(themeChangeEvent, onChange);
  };
}

function getServerThemeSnapshot(): ColorTheme {
  return "dark";
}

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const colorTheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = colorTheme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", colorTheme === "dark" ? "#0c1013" : "#eef0f2");
  }, [colorTheme]);

  function toggleTheme() {
    const nextTheme = colorTheme === "light" ? "dark" : "light";
    fallbackTheme = nextTheme;

    try {
      window.localStorage.setItem("color-theme", nextTheme);
    } catch (error) {
      console.error("Unable to save the color theme.", error);
    }

    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <ThemeContext.Provider value={{ colorTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeToggle must be rendered inside ThemeProvider.");
  }

  const { colorTheme, toggleTheme } = themeContext;
  const isDark = colorTheme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
    </button>
  );
}
