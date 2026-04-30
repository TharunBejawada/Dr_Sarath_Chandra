"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Home } from "lucide-react";

export default function ThankYouPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-24 font-sans">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center px-6"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle size={48} className="text-[#A62B2B]" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-[#A62B2B] mb-4 tracking-tighter">
          Thank You for registering.
        </h1>
        
        <p className="text-2xl md:text-4xl font-semibold text-gray-900 mb-10 leading-tight max-w-2xl mx-auto">
          We will reach out to you shortly.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#A62B2B] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#8E2424] transition-all shadow-xl hover:shadow-2xl active:scale-95"
        >
          <Home size={22} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}