"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { API_URL } from "../../config";

// --- TYPES (Updated to match your actual API Response) ---
interface Service {
  serviceId: string;
  title: string;
  description: string; // HTML string
  heroImage: string;
  url: string;
  seoTitle?: string;
}

// --- UTILS ---
// Helper to strip HTML tags for the card summary
const stripHtml = (html: string) => {
  if (!html) return "";
  if (typeof window === "undefined") return html; // Server-side safety
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  },
};

export default function ServicesList() {
  // Initialize with empty array to prevent undefined error immediately
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_URL}/api/services/getAllServices`);
        
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        
        const data = await res.json();
        
        // --- CRITICAL FIX HERE ---
        // Your API returns { "Items": [...] }, notice the Capital 'I'
        const serviceList = data.Items || []; 
        
        setServices(serviceList);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-widest mb-4 border border-red-100"
          >
            <Activity className="w-3.5 h-3.5" />
            Comprehensive Cardiac Care
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6"
          >
            Our Services
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg leading-relaxed"
          >
            Advanced interventional cardiology procedures delivered with precision, 
            compassion, and nearly four decades of expertise.
          </motion.p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl h-[450px] animate-pulse border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-8 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Real Data Grid */}
        {!loading && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Added Optional Chaining (?.map) and fallback (|| []) for extra safety */}
            {(services || []).map((service) => {
              // Construct URL: Remove duplicate slashes if necessary
              // If service.url is "/ptca", link becomes "/services/ptca"
              const linkUrl = service.url ? `/services${service.url}` : "#";

              return (
                <motion.div
                  key={service.serviceId}
                  variants={cardVariants}
                  className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-red-100 transition-all duration-500 relative"
                >
                  <Link href={linkUrl} className="flex flex-col h-full">
                    
                    {/* Image Container */}
                    <div className="h-60 sm:h-72 overflow-hidden relative bg-gray-100">
                      <img 
                        src={service.heroImage || "https://placehold.co/800x600/f1f5f9/94a3b8?text=Medical+Service"} 
                        alt={service.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/800x600/f1f5f9/94a3b8?text=Image+Unavailable";
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Icon/Badge floating on image */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-[#A62B2B]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#A62B2B] transition-colors line-clamp-2">
                        {service.title}
                      </h3>
                      
                      {/* Description with HTML stripping and Line Clamping */}
                      <p className="text-gray-500 leading-relaxed text-sm sm:text-base line-clamp-3 mb-6 flex-grow">
                        {stripHtml(service.description)}
                      </p>

                      {/* 'Learn More' CTA */}
                      <div className="flex items-center text-[#A62B2B] font-bold text-sm tracking-wide uppercase group/link">
                        <span className="mr-2 group-hover:underline">Learn More</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}