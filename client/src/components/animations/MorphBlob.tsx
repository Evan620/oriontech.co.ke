import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MorphBlobProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
}

const MorphBlob: React.FC<MorphBlobProps> = ({ children, className, speed = 10 }) => {
  const blobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!blobRef.current) return;
    
    // Create random values for border-radius animation
    const createRandomValues = () => {
      const values = [];
      for (let i = 0; i < 8; i++) {
        values.push(Math.floor(Math.random() * 40) + 30); // Values between 30% and 70%
      }
      return values;
    };
    
    const morphBlob = () => {
      const values1 = createRandomValues();
      const values2 = createRandomValues();
      
      // Apply morphing animation using GSAP
      gsap.to(blobRef.current, {
        borderRadius: `${values1[0]}% ${values1[1]}% ${values1[2]}% ${values1[3]}% / ${values1[4]}% ${values1[5]}% ${values1[6]}% ${values1[7]}%`,
        duration: speed,
        ease: "sine.inOut",
        onComplete: () => {
          gsap.to(blobRef.current, {
            borderRadius: `${values2[0]}% ${values2[1]}% ${values2[2]}% ${values2[3]}% / ${values2[4]}% ${values2[5]}% ${values2[6]}% ${values2[7]}%`,
            duration: speed,
            ease: "sine.inOut",
            onComplete: morphBlob
          });
        }
      });
    };
    
    // Initial values
    const initialValues = createRandomValues();
    gsap.set(blobRef.current, {
      borderRadius: `${initialValues[0]}% ${initialValues[1]}% ${initialValues[2]}% ${initialValues[3]}% / ${initialValues[4]}% ${initialValues[5]}% ${initialValues[6]}% ${initialValues[7]}%`
    });
    
    // Start the animation
    morphBlob();
    
    // Clean up animation on unmount
    return () => {
      gsap.killTweensOf(blobRef.current);
    };
  }, [speed]);
  
  return (
    <div 
      ref={blobRef} 
      className={cn("morph w-full h-full flex items-center justify-center", className)}
    >
      {children}
    </div>
  );
};

export default MorphBlob;
