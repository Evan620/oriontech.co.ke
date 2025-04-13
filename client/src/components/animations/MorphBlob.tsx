import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MorphBlobProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
}

const MorphBlob: React.FC<MorphBlobProps> = ({ children, className, speed = 10 }) => {
  const [currentRadius, setCurrentRadius] = useState<string>("50% 50% 50% 50% / 50% 50% 50% 50%");
  
  useEffect(() => {
    // Create random values for border-radius animation
    const createRandomValues = () => {
      const values = [];
      for (let i = 0; i < 8; i++) {
        values.push(Math.floor(Math.random() * 30) + 40); // Values between 40% and 70% (less extreme)
      }
      return values;
    };
    
    // Set up animation interval
    const interval = setInterval(() => {
      const values = createRandomValues();
      setCurrentRadius(`${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}% / ${values[4]}% ${values[5]}% ${values[6]}% ${values[7]}%`);
    }, speed * 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [speed]);
  
  // Apply CSS transition instead of GSAP for better performance
  return (
    <div 
      style={{ 
        borderRadius: currentRadius,
        transition: `border-radius ${speed * 0.8}s ease-in-out`
      }} 
      className={cn("morph w-full h-full flex items-center justify-center", className)}
    >
      {children}
    </div>
  );
};

export default MorphBlob;
