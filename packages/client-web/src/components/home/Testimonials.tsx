"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// 1. Mock Data (Replace with DB fetch later)
const TESTIMONIALS = [
  {
    id: 1,
    name: "Ramesh Kumar",
    procedure: "Coronary Angioplasty",
    rating: 5,
    text: "Dr. Sarat Chandra saved my life. After suffering a heart attack, his quick intervention and expert care ensured a full recovery. His compassionate approach made a difficult time much easier for my family."
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    procedure: "Valve Replacement",
    rating: 5,
    text: "I was very nervous about my valve surgery, but Dr. Sarat's confidence and clear explanation gave me hope. The procedure went perfectly, and I am now back to my normal life. I am forever grateful."
  },
  {
    id: 3,
    name: "Venkatesh Rao",
    procedure: "Pacemaker Implantation",
    rating: 5,
    text: "World-class facilities and a doctor who truly cares. The pacemaker implantation was painless, and the post-op care at Jayanthi Hospitals was exceptional. Highly recommended."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Navigation Handlers
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let nextIndex = currentIndex + newDirection;
    
    // Loop logic
    if (nextIndex < 0) nextIndex = TESTIMONIALS.length - 1;
    if (nextIndex >= TESTIMONIALS.length) nextIndex = 0;
    
    setCurrentIndex(nextIndex);
  };

  // Animation Variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-[#FAF9F6]"> {/* Warm beige background from image */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-widest mb-4"
          >
            Patient Stories
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold text-gray-900"
          >
            What Our Patients <span className="text-[#A62B2B]">Say</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 text-lg"
          >
            Hear from patients who have experienced exceptional cardiac care at our facility.
          </motion.p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
            
            {/* Background Quote Icon (Decoration) */}
            <div className="absolute top-8 right-8 text-red-50">
              <Quote className="w-24 h-24 rotate-180 opacity-40 fill-current" />
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="relative z-10 flex flex-col h-full justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#A62B2B] fill-current" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed mb-8">
                    "{TESTIMONIALS[currentIndex].text}"
                  </p>
                </div>

                {/* Footer: Name + Controls */}
                <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pt-8">
                  
                  {/* Author Info */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {TESTIMONIALS[currentIndex].name}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1 font-medium">
                      {TESTIMONIALS[currentIndex].procedure}
                    </p>
                  </div>

                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => paginate(-1)}
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#A62B2B] hover:text-[#A62B2B] transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => paginate(1)}
                      className="w-12 h-12 rounded-full bg-[#A62B2B] flex items-center justify-center text-white hover:bg-[#8E2424] transition-colors shadow-lg shadow-red-200"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots (Centered Bottom) */}
            <div className="flex justify-center gap-2 mt-8 md:mt-0 md:absolute md:bottom-12 md:left-1/2 md:-translate-x-1/2 z-20">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-[#A62B2B]" : "w-2 bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}