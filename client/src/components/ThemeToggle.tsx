import React from "react";
import { useTheme, ThemeType } from "@/lib/themeContext";
import { cn } from "@/lib/utils";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex space-x-2 border border-opacity-20 border-foreground rounded-full p-1">
      <ThemeButton 
        theme="noir" 
        isActive={theme === "noir"} 
        onClick={() => setTheme("noir")}
        icon="bxs-moon"
      />
      <ThemeButton 
        theme="cyber" 
        isActive={theme === "cyber"} 
        onClick={() => setTheme("cyber")}
        icon="bx-sun"
      />
      <ThemeButton 
        theme="techno" 
        isActive={theme === "techno"} 
        onClick={() => setTheme("techno")}
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
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
        isActive && `bg-${theme === "noir" ? "noir" : theme === "cyber" ? "cyber" : "techno"}-bg border-2 border-primary`
      )}
      aria-label={`Switch to ${theme} theme`}
    >
      <i className={`bx ${icon} ${isActive ? "text-primary" : ""}`}></i>
    </button>
  );
};

export default ThemeToggle;
