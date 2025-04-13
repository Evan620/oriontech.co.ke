import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TextCycleProps {
  words: string[];
  className?: string;
  interval?: number;
}

const TextCycle: React.FC<TextCycleProps> = ({ 
  words, 
  className, 
  interval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const timeline = gsap.timeline();
    
    const cycleWords = () => {
      // Fade out
      timeline.to(textRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
          
          // Fade in
          timeline.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5
          });
        }
      });
    };
    
    const intervalId = setInterval(cycleWords, interval);
    
    // Initial animation if needed
    gsap.set(textRef.current, { opacity: 1, y: 0 });
    
    return () => {
      clearInterval(intervalId);
      timeline.kill();
    };
  }, [words, interval]);
  
  return (
    <span ref={textRef} className={cn("inline-block", className)}>
      {words[currentIndex]}
    </span>
  );
};

export default TextCycle;
