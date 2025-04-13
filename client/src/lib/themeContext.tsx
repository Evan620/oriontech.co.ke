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
  const [theme, setTheme] = useState<ThemeType>("noir");

  useEffect(() => {
    // Remove previous theme classes
    document.body.classList.remove("theme-noir", "theme-cyber", "theme-techno");
    
    // Add theme-specific class
    document.body.classList.add(`theme-${theme}`);
    
    // Add noise and transition classes
    document.body.classList.add("bg-noise", "theme-transition");
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
