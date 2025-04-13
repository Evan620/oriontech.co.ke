import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  icon?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  icon
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!buttonRef.current || !shineRef.current) return;
    
    // Set up shine effect
    gsap.set(shineRef.current, {
      x: "-100%",
      opacity: 0.2
    });
    
    // Setup hover animation
    const handleMouseEnter = () => {
      gsap.to(shineRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    const button = buttonRef.current;
    button.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);
  
  const baseClasses = "btn-animated relative overflow-hidden px-8 py-3 font-medium rounded-full transition-all duration-300 flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105",
    secondary: "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105",
    outline: "border border-secondary text-secondary hover:bg-secondary/10"
  };
  
  const buttonContent = (
    <>
      <span>{children}</span>
      {icon && <i className={`bx ${icon} ml-2 text-xl`}></i>}
      <span ref={shineRef} className="absolute inset-0 w-full h-full bg-white opacity-0"></span>
    </>
  );
  
  // Render as Link if href is provided, otherwise as button
  if (href) {
    return (
      <Link 
        href={href}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        className={cn(baseClasses, variantClasses[variant], className)}
      >
        {buttonContent}
      </Link>
    );
  }
  
  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {buttonContent}
    </button>
  );
};

export default AnimatedButton;
