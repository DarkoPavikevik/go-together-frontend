"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkTheme: boolean;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isDarkTheme: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // Apply theme to document and determine if dark theme is active
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.style.colorScheme = theme === "dark" ? "dark" : "light";

    let effectiveTheme = theme;
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    // Apply the theme with a smooth transition
    if (effectiveTheme === "dark") {
      document.body.classList.add("theme-transition");
      setTimeout(() => {
        root.classList.add("dark");
        setIsDarkTheme(true);
        // Remove transition class to prevent transition on page load
        setTimeout(() => {
          document.body.classList.remove("theme-transition");
        }, 300);
      }, 0);
    } else {
      document.body.classList.add("theme-transition");
      setTimeout(() => {
        root.classList.add("light");
        setIsDarkTheme(false);
        // Remove transition class to prevent transition on page load
        setTimeout(() => {
          document.body.classList.remove("theme-transition");
        }, 300);
      }, 0);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
        setIsDarkTheme(systemTheme === "dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = {
    theme,
    isDarkTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
