import React from "react";
import { useTheme, ThemeType } from "@/lib/themeContext";
import { cn } from "@/lib/utils";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // This is a more direct method for changing themes
  const handleThemeChange = (newTheme: ThemeType) => {
    console.log("Theme changing to:", newTheme);
    setTheme(newTheme);
    
    // Apply the theme class to both documentElement and body
    // This ensures it's applied consistently across the entire document
    ["documentElement", "body"].forEach(element => {
      const el = document[element as keyof Document] as HTMLElement;
      el.classList.remove("theme-noir", "theme-cyber", "theme-techno");
      el.classList.add(`theme-${newTheme}`);
    });
    
    // Store the theme preference in localStorage for persistence
    localStorage.setItem("orion-theme", newTheme);
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
    // First, define background colors that match each theme's primary color
    const themeColors = {
      noir: "bg-[#00E5FF]/20", // Noir theme primary color with transparency
      cyber: "bg-[#00BFA5]/20", // Cyber theme primary color with transparency
      techno: "bg-[#00C853]/20" // Techno theme primary color with transparency
    };
    
    // Then return the appropriate styling based on active state
    if (isActive) {
      return `${themeColors[theme]} ring-2 ring-primary shadow-md shadow-primary/30`;
    }
    
    // Return a subdued version when not active
    return `hover:${themeColors[theme]} bg-opacity-10 hover:bg-opacity-20`;
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 relative",
        getThemeClasses()
      )}
      aria-label={`Switch to ${theme} theme`}
    >
      {/* Active indicator - small dot */}
      {isActive && (
        <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
      )}
      <i className={`bx ${icon} ${isActive ? "text-primary font-bold text-lg" : "text-foreground/80 text-sm"}`}></i>
    </button>
  );
};

export default ThemeToggle;
