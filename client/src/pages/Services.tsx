import React, { useEffect, useRef } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import MorphBlob from "@/components/animations/MorphBlob";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  variant: "primary" | "secondary" | "gradient";
}

const services: ServiceCardProps[] = [
  {
    title: "AI Automation",
    description: "Deploy intelligent AI agents to automate repetitive tasks, enhance customer interactions, and optimize business processes.",
    icon: "bx-bot",
    tags: ["Chatbots", "Process Automation", "GPT Integration"],
    variant: "primary"
  },
  {
    title: "Software Development",
    description: "Custom software solutions tailored to your business needs, from web applications to enterprise systems and mobile apps.",
    icon: "bx-code-block",
    tags: ["Web Apps", "Mobile Development", "APIs"],
    variant: "secondary"
  },
  {
    title: "Management Consulting",
    description: "Strategic business insights and digital transformation roadmaps to help you navigate the changing technological landscape.",
    icon: "bx-line-chart",
    tags: ["Digital Strategy", "Business Analytics"],
    variant: "gradient"
  },
  {
    title: "Website Modernization",
    description: "Transform outdated websites into modern, responsive digital experiences that engage customers and drive conversions.",
    icon: "bx-devices",
    tags: ["Responsive Design", "UI/UX Overhaul", "SEO"],
    variant: "secondary"
  },
  {
    title: "Data Analytics",
    description: "Harness the power of your data with advanced analytics, visualization tools, and AI-driven insights.",
    icon: "bx-bar-chart-alt-2",
    tags: ["Business Intelligence", "Predictive Analytics"],
    variant: "primary"
  },
  {
    title: "Training & Support",
    description: "Comprehensive training programs and ongoing technical support to ensure your team can maximize new technology investments.",
    icon: "bx-support",
    tags: ["Tech Workshops", "24/7 Support"],
    variant: "gradient"
  }
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate heading
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      }
    });
    
    // Animate service cards
    const cards = document.querySelectorAll(".service-card");
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
      }
    });
    
    // Animate CTA
    gsap.from(".services-cta", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".services-cta",
        start: "top 90%",
      }
    });
  }, []);
  
  return (
    <section ref={sectionRef} id="services" className="py-24 px-4 bg-card bg-opacity-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="font-space font-bold text-3xl md:text-4xl mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 max-w-2xl mx-auto opacity-80">
            We offer comprehensive solutions to transform your business with cutting-edge technology and strategic consulting.
          </p>
        </div>
        
        <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* CTA */}
        <div className="services-cta mt-16 text-center">
          <AnimatedButton href="/contact" variant="secondary" icon="bx-right-arrow-alt">
            Discuss Your Project
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  tags, 
  variant 
}) => {
  const getBorderClass = (variant: ServiceCardProps["variant"]) => {
    switch (variant) {
      case "primary": return "border-primary/20";
      case "secondary": return "border-secondary/20";
      case "gradient": return "border-primary/20";
      default: return "border-primary/20";
    }
  };
  
  const getIconBgClass = (variant: ServiceCardProps["variant"]) => {
    switch (variant) {
      case "primary": return "bg-primary/10 group-hover:bg-primary/20";
      case "secondary": return "bg-secondary/10 group-hover:bg-secondary/20";
      case "gradient": return "bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20";
      default: return "bg-primary/10 group-hover:bg-primary/20";
    }
  };
  
  const getIconTextClass = (variant: ServiceCardProps["variant"]) => {
    switch (variant) {
      case "primary": return "text-primary";
      case "secondary": return "text-secondary";
      case "gradient": return "text-primary";
      default: return "text-primary";
    }
  };
  
  const getTagBgClass = (variant: ServiceCardProps["variant"]) => {
    switch (variant) {
      case "primary": return "bg-primary/10 text-primary";
      case "secondary": return "bg-secondary/10 text-secondary";
      case "gradient": return "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary";
      default: return "bg-primary/10 text-primary";
    }
  };
  
  return (
    <div className={`service-card bg-background rounded-2xl overflow-hidden border ${getBorderClass(variant)} shadow-lg group p-1`}>
      <div className="h-full bg-background rounded-xl p-6 flex flex-col">
        <div className={`w-16 h-16 rounded-2xl ${getIconBgClass(variant)} flex items-center justify-center mb-6 transition-all`}>
          <i className={`bx ${icon} text-4xl ${getIconTextClass(variant)}`}></i>
        </div>
        
        <h3 className="font-space font-medium text-xl mb-3">{title}</h3>
        
        <p className="opacity-80 mb-6 flex-grow">
          {description}
        </p>
        
        <div className="pt-4 border-t border-card">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className={`px-3 py-1 ${getTagBgClass(variant)} text-xs rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
