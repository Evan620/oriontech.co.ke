import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/lib/themeContext";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import MorphBlob from "./animations/MorphBlob";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-opacity-90 backdrop-blur-md",
        isScrolled && "bg-background shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <MorphBlob>
                <span className="text-primary-foreground font-space font-bold text-xl">O</span>
              </MorphBlob>
            </div>
            <span className="font-space font-bold text-2xl tracking-wide">ORION</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/" isActive={location === "/"}>Home</NavLink>
            <NavLink href="/about" isActive={location === "/about"}>About</NavLink>
            <NavLink href="/services" isActive={location === "/services"}>Services</NavLink>
            <NavLink href="/portfolio" isActive={location === "/portfolio"}>Portfolio</NavLink>
            <NavLink href="/contact" isActive={location === "/contact"}>Contact</NavLink>
          </nav>
          
          {/* Theme Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center p-2 rounded-full bg-card"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <i className='bx bx-x text-2xl'></i>
              ) : (
                <i className='bx bx-menu text-2xl'></i>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "mobile-nav md:hidden bg-card bg-opacity-95 backdrop-blur-md absolute w-full transform transition-transform",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="px-4 py-6 space-y-4">
          <MobileNavLink href="/" onClick={closeMobileMenu} isActive={location === "/"}>Home</MobileNavLink>
          <MobileNavLink href="/about" onClick={closeMobileMenu} isActive={location === "/about"}>About</MobileNavLink>
          <MobileNavLink href="/services" onClick={closeMobileMenu} isActive={location === "/services"}>Services</MobileNavLink>
          <MobileNavLink href="/portfolio" onClick={closeMobileMenu} isActive={location === "/portfolio"}>Portfolio</MobileNavLink>
          <MobileNavLink href="/contact" onClick={closeMobileMenu} isActive={location === "/contact"}>Contact</MobileNavLink>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive }) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "nav-link relative px-1 py-2 font-medium transition-colors duration-300",
        isActive ? "text-primary" : "hover:text-primary"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
      )}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick, isActive }) => {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={cn(
        "block py-2 font-medium",
        isActive ? "text-primary" : ""
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
