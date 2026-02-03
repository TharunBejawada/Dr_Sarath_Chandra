"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { API_URL } from "../../config";

// --- TYPES ---
interface Testimonial {
  id: string;
  videoId: string;
  videoUrl: string;
  title?: string;
}

export default function HomeTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Data
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`${API_URL}/api/testimonials`);
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  // Scroll Handlers
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320; // Card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (loading) return null;
  if (testimonials.length === 0) return null; // Don't show section if empty

  return (
    <section id="testimonials" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-400 font-bold tracking-widest text-sm uppercase mb-2 block"
            >
              Success Stories
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl font-bold"
            >
              Patient Testimonials
            </motion.h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="snap-start shrink-0 w-[300px] md:w-[400px] group cursor-pointer"
              onClick={() => setSelectedVideo(item.videoId)}
            >
              {/* Card */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 shadow-xl border border-white/5">
                {/* Thumbnail Image */}
                <img 
                  src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`} 
                  alt="Patient Story"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    YOUTUBE
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* --- VIDEO MODAL (Lightbox) --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)} // Close on background click
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video Player Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking video
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="Patient Testimonial"
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}