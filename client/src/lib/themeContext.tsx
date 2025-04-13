import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = "noir" | "cyber" | "techno";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Create context with default values to avoid undefined checks
const defaultThemeContext: ThemeContextType = {
  theme: "noir",
  setTheme: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // First, try to get theme from localStorage for persistence
  const getSavedTheme = (): ThemeType => {
    if (typeof window === 'undefined') return "noir";
    const savedTheme = localStorage.getItem("orion-theme") as ThemeType;
    return (savedTheme && ["noir", "cyber", "techno"].includes(savedTheme)) 
      ? savedTheme 
      : "noir";
  };
  
  const [theme, setTheme] = useState<ThemeType>(getSavedTheme());

  useEffect(() => {
    // Apply theme to both document.documentElement and document.body for consistency
    ["documentElement", "body"].forEach(element => {
      const el = document[element as keyof Document] as HTMLElement;
      // Remove previous theme classes
      el.classList.remove("theme-noir", "theme-cyber", "theme-techno");
      // Add theme-specific class
      el.classList.add(`theme-${theme}`);
    });
    
    // Add noise and transition classes
    document.body.classList.add("bg-noise", "theme-transition");
    
    // Save to localStorage for persistence
    localStorage.setItem("orion-theme", theme);
    
    console.log("Theme applied:", theme);
  }, [theme]);
  
  const value = {
    theme,
    setTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  return context;
};
