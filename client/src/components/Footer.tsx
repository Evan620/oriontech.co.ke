import React from "react";
import { Link } from "wouter";
import MorphBlob from "./animations/MorphBlob";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card pt-20 pb-10 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="col-span-4 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <MorphBlob>
                  <span className="text-primary-foreground font-space font-bold text-xl">O</span>
                </MorphBlob>
              </div>
              <span className="font-space font-bold text-2xl tracking-wide">ORION</span>
            </div>
            
            <p className="opacity-80 mb-6">
              Empowering Kenyan businesses through advanced technology, automation, and strategic innovation.
            </p>
            
            <div className="flex space-x-4">
              <SocialLink href="https://linkedin.com" icon="bxl-linkedin" />
              <SocialLink href="https://twitter.com" icon="bxl-twitter" />
              <SocialLink href="https://facebook.com" icon="bxl-facebook" />
            </div>
          </div>
          
          <div>
            <h4 className="font-space font-medium text-xl mb-6">Services</h4>
            <ul className="space-y-3">
              <FooterLink href="/services">AI Automation</FooterLink>
              <FooterLink href="/services">Software Development</FooterLink>
              <FooterLink href="/services">Management Consulting</FooterLink>
              <FooterLink href="/services">Website Modernization</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-space font-medium text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-space font-medium text-xl mb-6">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center opacity-80">
                <i className='bx bx-map-pin mr-2 text-primary'></i>
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center opacity-80">
                <i className='bx bx-envelope mr-2 text-primary'></i>
                <span>info@oriontech.co.ke</span>
              </li>
              <li className="flex items-center opacity-80">
                <i className='bx bx-phone mr-2 text-primary'></i>
                <span>+254 (0) 712 345 678</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-background flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="opacity-70 text-sm text-center md:text-left">&copy; {new Date().getFullYear()} Orion. All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <Link 
        href={href} 
        className="opacity-80 hover:opacity-100 hover:text-primary transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      <i className={`bx ${icon}`}></i>
    </a>
  );
};

export default Footer;
