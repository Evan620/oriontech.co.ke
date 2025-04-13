import React, { useEffect, useRef } from "react";
import BackgroundParticles from "@/components/animations/BackgroundParticles";
import TextCycle from "@/components/animations/TextCycle";
import MorphBlob from "@/components/animations/MorphBlob";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate hero elements on page load
    const tl = gsap.timeline();
    tl.from(".hero-heading", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" })
      .from(".hero-subtext", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .from(".hero-image-container", { opacity: 0, scale: 0.9, duration: 1, ease: "power3.out" }, "-=0.6");
    
    // Clean up animations
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="home" className="min-h-screen relative flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <BackgroundParticles />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full filter blur-[100px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full filter blur-[100px] opacity-20 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      
      <div className="max-w-6xl mx-auto w-full z-10 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="hero-heading font-space font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
              Transforming Businesses with <TextCycle words={["Innovation", "Automation", "Intelligence"]} className="text-primary" />
            </h1>
            
            <p className="hero-subtext text-lg md:text-xl opacity-80 max-w-lg mx-auto lg:mx-0">
              Orion helps Kenyan businesses modernize through business automation with AI agents, software development, and management consulting.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <AnimatedButton href="/services" variant="primary" icon="bx-right-arrow-alt">
                Explore Services
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="outline" icon="bx-envelope">
                Get in Touch
              </AnimatedButton>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="hero-image-container relative">
              {/* Main Image */}
              <div className="morph rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-1 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=600&q=80" 
                  alt="Futuristic Technology Interface" 
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-card p-4 rounded-xl border border-primary/20 shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <MorphBlob>
                  <i className='bx bx-code-alt text-5xl text-primary'></i>
                </MorphBlob>
              </div>
              
              <div className="absolute -bottom-8 -left-8 w-40 p-4 rounded-xl bg-card border border-secondary/20 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <p className="font-mono text-xs">AI Automation</p>
                </div>
                <div className="mt-2 w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <p className="text-sm opacity-70 mb-2">Scroll to discover</p>
          <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
