"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServiceCTA() {
  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Need a Consultation?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Schedule an appointment with Dr. K. Sarat Chandra for expert cardiac evaluation and personalized treatment recommendations.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#0F172A] px-8 py-4 rounded-lg font-bold hover:bg-[#D97706] hover:text-white transition-all duration-300 shadow-lg shadow-orange-500/20"
          >
            Book Appointment <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}