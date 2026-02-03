"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import { API_URL } from "../../config";

// --- TYPES ---
interface Service {
  serviceId: string;
  title: string;
  description: string;
  heroImage: string;
  url: string;
  badge?: string; // Optional: if your API has a badge field, otherwise we use a default
}

// --- UTILS ---
const stripHtml = (html: string) => {
  if (typeof window === "undefined") return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || "").substring(0, 120) + "...";
};

export default function HomeServicesMarquee() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Animation Controls for Pause on Hover
  const controls = useAnimationControls();

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_URL}/api/services/getAllServices`);
        const data = await res.json();
        // Handle { Items: [...] } or direct array
        const list = data.Items || (Array.isArray(data) ? data : []);
        setServices(list);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Start animation when services are loaded
  useEffect(() => {
    if (services.length > 0) {
      startAnimation();
    }
  }, [services]);

  const startAnimation = () => {
    controls.start({
      x: "-50%",
      transition: {
        ease: "linear",
        duration: 50, // Slower speed (higher number = slower)
        repeat: Infinity,
      },
    });
  };

  const stopAnimation = () => {
    controls.stop();
  };

  if (loading) return null;

  // Duplicate list for seamless infinite scroll
  const marqueeList = [...services, ...services]; 

  return (
    <section className="py-24 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
        
        {/* --- ORIGINAL HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-widest mb-4"
          >
            Our Services
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Interventional & Advanced <br />
            <span className="text-[#A62B2B]">Cardiac Procedures</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Comprehensive cardiac care using the latest technology and techniques for optimal patient outcomes.
          </motion.p>
        </div>
      </div>

      {/* --- INFINITE SCROLL TRACK --- */}
      <div 
        className="relative w-full"
        onMouseEnter={stopAnimation} 
        onMouseLeave={startAnimation}
      >
        
        {/* Gradient Masks (Fade effect on edges) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 px-4" // Increased gap
            animate={controls}
            initial={{ x: "0%" }}
          >
            {marqueeList.map((service, index) => (
              <Link 
                key={`${service.serviceId}-${index}`} 
                href={service.url ? `/services${service.url}` : "#"}
                className="relative flex-shrink-0 w-[320px] md:w-[450px] group block h-full"
              >
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-red-100 transition-all duration-500 overflow-hidden h-full flex flex-col">
                  
                  {/* Image Container (Bigger & Cinematic) */}
                  <div className="h-56 relative overflow-hidden">
                    <img 
                      src={service.heroImage || "https://placehold.co/600x400?text=Heart+Care"} 
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Unavailable"}
                    />
                    
                    {/* Dark Gradient Overlay for text contrast if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Badge (Top Right) */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-md text-[#A62B2B] text-xs font-bold uppercase tracking-wider border border-red-50">
                        <Activity className="w-3 h-3 mr-1" />
                        {service.badge || "Cardiac Care"}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#A62B2B] transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {stripHtml(service.description)}
                    </p>

                    {/* 'Learn More' - Fades in/slides up on hover */}
                    <div className="flex items-center text-[#A62B2B] font-bold text-sm tracking-wide uppercase transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="mr-2 underline decoration-transparent group-hover:decoration-[#A62B2B] transition-all">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile "View All" Button */}
      <div className="mt-12 flex justify-center md:hidden">
         <Link 
            href="/services" 
            className="flex items-center gap-2 text-[#A62B2B] font-bold text-sm border border-red-100 px-8 py-3 rounded-full hover:bg-red-50 transition shadow-sm"
          >
            View All Procedures
            <ArrowRight className="w-4 h-4" />
          </Link>
      </div>

    </section>
  );
}