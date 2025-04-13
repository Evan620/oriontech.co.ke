import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/ui/AnimatedButton";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: ""
    }
  });
  
  // Animation setup
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
    
    // Animate form and info sections
    gsap.from(formRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
      }
    });
    
    gsap.from(infoRef.current, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top 80%",
      }
    });
  }, []);
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send form data to our API endpoint
      console.log("Sending form data:", data);
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }
      
      const result = await response.json();
      console.log("Form submission result:", result);
      
      // Success toast
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible. Your request ID is: " + result.requestId,
        variant: "default"
      });
      
      // Reset form
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Error toast
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section ref={sectionRef} id="contact" className="py-24 px-4 bg-card bg-opacity-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="font-space font-bold text-3xl md:text-4xl mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 max-w-2xl mx-auto opacity-80">
            Ready to transform your business? Contact us to discuss how Orion can help you achieve your goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="bg-background rounded-2xl p-8 shadow-lg">
              <h3 className="font-space font-medium text-2xl mb-6">Send us a Message</h3>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="block mb-2 text-sm font-medium">Your Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      {...register("name")}
                      className="w-full px-4 py-3 bg-card border border-card focus:border-primary rounded-lg outline-none transition-all duration-300" 
                      placeholder="Enter your name"
                    />
                    {!errors.name && register("name").name && (
                      <div className="absolute right-3 top-3 transition-opacity">
                        <i className='bx bx-check text-primary'></i>
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block mb-2 text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      {...register("email")}
                      className="w-full px-4 py-3 bg-card border border-card focus:border-primary rounded-lg outline-none transition-all duration-300" 
                      placeholder="Enter your email"
                    />
                    {!errors.email && register("email").name && (
                      <div className="absolute right-3 top-3 transition-opacity">
                        <i className='bx bx-check text-primary'></i>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block mb-2 text-sm font-medium">Service Interested In</label>
                  <div className="relative">
                    <select 
                      {...register("service")}
                      className="w-full px-4 py-3 bg-card border border-card focus:border-primary rounded-lg outline-none transition-all duration-300"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="ai-automation">AI Automation</option>
                      <option value="software-development">Software Development</option>
                      <option value="consulting">Management Consulting</option>
                      <option value="web">Website Modernization</option>
                      <option value="data">Data Analytics</option>
                      <option value="training">Training & Support</option>
                    </select>
                  </div>
                  {errors.service && (
                    <p className="mt-1 text-sm text-destructive">{errors.service.message}</p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block mb-2 text-sm font-medium">Your Message</label>
                  <div className="relative">
                    <textarea 
                      rows={4}
                      {...register("message")}
                      className="w-full px-4 py-3 bg-card border border-card focus:border-primary rounded-lg outline-none transition-all duration-300" 
                      placeholder="Tell us about your project or inquiry"
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <i className='bx bx-send ml-2'></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div ref={infoRef} className="space-y-8">
            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <h3 className="font-space font-medium text-2xl mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <i className='bx bx-map text-2xl'></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Our Location</h4>
                    <p className="opacity-80">Nairobi, Kenya</p>
                    <p className="opacity-80">Business District, Suite 200</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                    <i className='bx bx-envelope text-2xl'></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Email Us</h4>
                    <p className="opacity-80">info@oriontech.co.ke</p>
                    <p className="opacity-80">support@oriontech.co.ke</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mr-4">
                    <i className='bx bx-phone text-2xl'></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Call Us</h4>
                    <p className="opacity-80">+254 (0) 712 345 678</p>
                    <p className="opacity-80">Mon-Fri, 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-card">
                <h4 className="font-medium text-lg mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <SocialLink href="https://linkedin.com" icon="bxl-linkedin" />
                  <SocialLink href="https://twitter.com" icon="bxl-twitter" />
                  <SocialLink href="https://facebook.com" icon="bxl-facebook" />
                  <SocialLink href="https://instagram.com" icon="bxl-instagram" />
                </div>
              </div>
            </div>
            
            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80" 
                  alt="Lazarus Magwaro" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-space font-medium text-xl">Lazarus Magwaro</h3>
                  <p className="text-primary">Founder & CEO</p>
                </div>
              </div>
              <p className="opacity-80 italic">
                "Our mission at Orion is to make advanced technology accessible to businesses of all sizes in Kenya, empowering them to compete in the global marketplace through innovation and automation."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      <i className={`bx ${icon}`}></i>
    </a>
  );
};

export default Contact;
