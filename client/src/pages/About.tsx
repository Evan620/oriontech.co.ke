import React, { useEffect, useRef } from "react";
import MorphBlob from "@/components/animations/MorphBlob";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: "primary" | "secondary" | "gradient";
}

const timelineItems: TimelineItem[] = [
  {
    year: "2018",
    title: "Foundation",
    description: "Orion was founded with a mission to bring AI-powered automation to Kenyan businesses",
    icon: "bx-flag",
    color: "primary"
  },
  {
    year: "2020",
    title: "Expansion",
    description: "Grew our team and expanded service offerings to include mobile app development and AI consulting",
    icon: "bx-rocket",
    color: "secondary"
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description: "Launched Orion Innovation Hub to foster tech talent and incubate new ideas in automation",
    icon: "bx-bulb",
    color: "gradient"
  }
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
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
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll(".timeline-item");
    gsap.from(timelineItems, {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      duration: 0.8,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
      }
    });
    
    // Animate content sections
    gsap.from(".about-content", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      }
    });
    
    gsap.from(".about-image", {
      opacity: 0,
      x: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 80%",
      }
    });
  }, []);
  
  return (
    <section ref={sectionRef} id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="font-space font-bold text-3xl md:text-4xl mb-4">
            About <span className="text-primary">Orion</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-content space-y-6 order-2 md:order-1">
            <p className="text-lg">
              Founded by <span className="text-primary font-medium">Lazarus Magwaro</span>, Orion represents the perfect blend of technological innovation and business acumen aimed at transforming how Kenyan businesses operate in the digital age.
            </p>
            
            <p>
              Our vision is to create a future where businesses of all sizes can harness the power of AI, automation, and modern software solutions to compete globally while maintaining their unique local identity.
            </p>
            
            <div className="my-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <i className='bx bx-bulb text-2xl'></i>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg">Vision</h3>
                  <p className="opacity-80">To revolutionize business operations through cutting-edge technology</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <i className='bx bx-target-lock text-2xl'></i>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg">Mission</h3>
                  <p className="opacity-80">Creating accessible, powerful technological solutions for businesses of all sizes</p>
                </div>
              </div>
            </div>
            
            <AnimatedButton href="/services" variant="outline" icon="bx-right-arrow-alt">
              Our Services
            </AnimatedButton>
          </div>
          
          <div className="about-image relative order-1 md:order-2">
            <div className="morph rounded-2xl overflow-hidden border border-primary/20 shadow-xl">
              <MorphBlob>
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=600&q=80" 
                  alt="Orion Office" 
                  className="w-full h-auto"
                />
              </MorphBlob>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-6 -right-6 p-4 bg-card rounded-xl border border-primary/20 shadow-lg animate-float">
              <p className="font-mono text-xs mb-1">Years of Excellence</p>
              <p className="font-space font-bold text-2xl text-primary">5+</p>
            </div>
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="mt-24">
          <h3 className="text-center font-space text-2xl mb-12">Our Journey</h3>
          
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-card"></div>
            
            {/* Timeline Items */}
            <div className="timeline-container">
              {timelineItems.map((item, index) => (
                <div key={index} className="timeline-item relative z-10 mb-20">
                  <div className="flex flex-col md:flex-row items-center">
                    {index % 2 === 0 ? (
                      <>
                        <div className="md:w-1/2 md:pr-12 md:text-right">
                          <TimelineCard item={item} />
                        </div>
                        
                        <TimelineIcon item={item} />
                        
                        <div className="md:w-1/2 md:pl-12 md:invisible"></div>
                      </>
                    ) : (
                      <>
                        <div className="md:w-1/2 md:pr-12 md:invisible"></div>
                        
                        <TimelineIcon item={item} />
                        
                        <div className="md:w-1/2 md:pl-12">
                          <TimelineCard item={item} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineCardProps {
  item: TimelineItem;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item }) => {
  const getBorderClass = (color: TimelineItem["color"]) => {
    switch (color) {
      case "primary": return "border-primary/20";
      case "secondary": return "border-secondary/20";
      case "gradient": return "border-primary/20";
      default: return "border-primary/20";
    }
  };
  
  return (
    <div className={`bg-card p-6 rounded-xl border ${getBorderClass(item.color)} shadow-md transform transition-transform hover:scale-105`}>
      <span className={`text-${item.color === "gradient" ? "primary" : item.color} font-mono text-sm`}>{item.year}</span>
      <h4 className="font-space font-medium text-xl mt-1">{item.title}</h4>
      <p className="mt-2 opacity-80">{item.description}</p>
    </div>
  );
};

const TimelineIcon: React.FC<TimelineCardProps> = ({ item }) => {
  const getIconClass = (color: TimelineItem["color"]) => {
    switch (color) {
      case "primary": return "bg-primary";
      case "secondary": return "bg-secondary";
      case "gradient": return "bg-gradient-to-br from-primary to-secondary";
      default: return "bg-primary";
    }
  };
  
  return (
    <div className={`mx-auto my-4 md:my-0 w-10 h-10 rounded-full ${getIconClass(item.color)} flex items-center justify-center z-20`}>
      <i className={`bx ${item.icon} text-primary-foreground`}></i>
    </div>
  );
};

export default About;
