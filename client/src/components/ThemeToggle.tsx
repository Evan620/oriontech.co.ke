import React from "react";
import { useTheme, ThemeType } from "@/lib/themeContext";
import { cn } from "@/lib/utils";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    document.documentElement.classList.remove("theme-noir", "theme-cyber", "theme-techno");
    document.documentElement.classList.add(`theme-${newTheme}`);
  };

  return (
    <div className="flex space-x-2 border border-opacity-20 border-foreground rounded-full p-1">
      <ThemeButton 
        theme="noir" 
        isActive={theme === "noir"} 
        onClick={() => handleThemeChange("noir")}
        icon="bxs-moon"
      />
      <ThemeButton 
        theme="cyber" 
        isActive={theme === "cyber"} 
        onClick={() => handleThemeChange("cyber")}
        icon="bx-sun"
      />
      <ThemeButton 
        theme="techno" 
        isActive={theme === "techno"} 
        onClick={() => handleThemeChange("techno")}
        icon="bx-network-chart"
      />
    </div>
  );
};

interface ThemeButtonProps {
  theme: ThemeType;
  isActive: boolean;
  onClick: () => void;
  icon: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ 
  theme, 
  isActive, 
  onClick, 
  icon 
}) => {
  const getThemeClasses = () => {
    if (isActive) {
      if (theme === "noir") return "bg-gray-800 border-2 border-primary";
      if (theme === "cyber") return "bg-blue-700 border-2 border-primary";
      if (theme === "techno") return "bg-purple-700 border-2 border-primary";
    }
    return "";
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
        getThemeClasses()
      )}
      aria-label={`Switch to ${theme} theme`}
    >
      <i className={`bx ${icon} ${isActive ? "text-primary" : ""}`}></i>
    </button>
  );
};

export default ThemeToggle;
