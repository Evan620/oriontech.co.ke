import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "automation" | "software" | "web";
  categoryLabel: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "AI Chatbot for E-commerce",
    description: "Customer service automation for a leading online retailer",
    imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=500&q=80",
    category: "automation",
    categoryLabel: "Automation"
  },
  {
    id: "2",
    title: "Inventory Management System",
    description: "Custom software for a manufacturing company",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500&q=80",
    category: "software",
    categoryLabel: "Software"
  },
  {
    id: "3",
    title: "E-commerce Website Redesign",
    description: "Complete UX overhaul for a fashion retailer",
    imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=500&q=80",
    category: "web",
    categoryLabel: "Web Design"
  },
  {
    id: "4",
    title: "Automated Data Processing",
    description: "AI-powered document processing system",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    category: "automation",
    categoryLabel: "Automation"
  },
  {
    id: "5",
    title: "Mobile Banking App",
    description: "Secure, user-friendly banking solution",
    imageUrl: "https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?auto=format&fit=crop&w=500&q=80",
    category: "software",
    categoryLabel: "Software"
  },
  {
    id: "6",
    title: "Corporate Website Modernization",
    description: "Transforming a legacy site into a modern experience",
    imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=500&q=80",
    category: "web",
    categoryLabel: "Web Design"
  }
];

type FilterCategory = "all" | "automation" | "software" | "web";

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Filter items when activeFilter changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === activeFilter));
    }
    
    // Animate the filtered items
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll(".portfolio-item");
      gsap.fromTo(
        items, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, [activeFilter]);
  
  // This effect runs only once on component load and doesn't depend on ScrollTrigger
  useEffect(() => {
    // Initial animation of elements when component mounts
    const animateElements = () => {
      console.log("Animating portfolio elements");
      
      if (!sectionRef.current) return;
      
      // Make sure all elements are visible first (no opacity:0)
      if (headingRef.current) headingRef.current.style.opacity = "1";
      if (filtersRef.current) filtersRef.current.style.opacity = "1";
      
      const items = document.querySelectorAll(".portfolio-item");
      items.forEach(item => {
        (item as HTMLElement).style.opacity = "1";
      });
      
      // Then animate them with GSAP
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      
      gsap.fromTo(
        filtersRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
      
      gsap.fromTo(
        ".portfolio-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.4, ease: "power2.out" }
      );
    };
    
    // Run animations immediately (don't wait for scroll)
    setTimeout(animateElements, 100); 
    
    return () => {
      // Cleanup any animations if needed
    };
  }, []);
  
  const handleFilterChange = (category: FilterCategory) => {
    setActiveFilter(category);
  };
  
  return (
    <section ref={sectionRef} id="portfolio" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="font-space font-bold text-3xl md:text-4xl mb-4">
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 max-w-2xl mx-auto opacity-80">
            Explore our showcase of successful projects and digital transformations.
          </p>
        </div>
        
        {/* Portfolio Filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-4 mb-12">
          <FilterButton
            category="all"
            label="All Projects"
            isActive={activeFilter === "all"}
            onClick={() => handleFilterChange("all")}
          />
          <FilterButton
            category="automation"
            label="Automation"
            isActive={activeFilter === "automation"}
            onClick={() => handleFilterChange("automation")}
          />
          <FilterButton
            category="software"
            label="Software"
            isActive={activeFilter === "software"}
            onClick={() => handleFilterChange("software")}
          />
          <FilterButton
            category="web"
            label="Web Design"
            isActive={activeFilter === "web"}
            onClick={() => handleFilterChange("web")}
          />
        </div>
        
        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FilterButtonProps {
  category: FilterCategory;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  category, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-5 py-2 rounded-full font-medium transition-all duration-300",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "bg-card text-foreground hover:bg-primary/10"
      )}
    >
      {label}
    </button>
  );
};

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  const getCategoryClass = (category: PortfolioItem["category"]) => {
    switch (category) {
      case "automation": return "bg-primary/80 text-primary-foreground";
      case "software": return "bg-secondary/80 text-primary-foreground";
      case "web": return "bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground";
      default: return "bg-primary/80 text-primary-foreground";
    }
  };
  
  return (
    <div className="portfolio-item group relative rounded-xl overflow-hidden shadow-lg">
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className={`px-3 py-1 ${getCategoryClass(item.category)} text-xs rounded-full mb-2 inline-block`}>
          {item.categoryLabel}
        </span>
        <h3 className="font-space font-medium text-xl mb-1">{item.title}</h3>
        <p className="text-sm opacity-80">{item.description}</p>
      </div>
    </div>
  );
};

export default Portfolio;
