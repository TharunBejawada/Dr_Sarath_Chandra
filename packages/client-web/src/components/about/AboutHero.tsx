"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, 
  Clock, 
  Users, 
  Activity, 
  Award, 
  ChevronRight 
} from "lucide-react";

export default function AboutHero() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  return (
    <section className="bg-[#FFFBF6] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEF3C7] text-[#D97706] text-sm font-semibold tracking-wide">
              <Heart className="w-4 h-4 fill-current" />
              Chief Cardiologist – Jayanthi Hospitals
            </motion.div>

            {/* Headings */}
            <motion.div variants={itemVariants}>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#0F172A] mb-4">
                Dr. K. Sarat <br /> Chandra
              </h1>
              <h2 className="text-xl lg:text-2xl font-semibold text-[#475569]">
                Senior Interventional Cardiologist
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed text-lg">
              Nearly 40 years of clinical excellence in diagnosing and treating complex heart conditions. 
              Renowned for expertise in coronary angioplasty, heart valve procedures, and minimally invasive cardiac therapies.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#1B2A41] text-white font-semibold rounded-lg hover:bg-[#2C3E50] transition shadow-lg"
              >
                Book Appointment
              </Link>
              <Link
                href="#biography" // Anchor link to next section (we will build later)
                className="px-8 py-4 bg-white text-[#1B2A41] font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Stats Cards Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {[
                { icon: Clock, val: "40+", label: "Years Experience" },
                { icon: Users, val: "50,000+", label: "Patients Treated" },
                { icon: Activity, val: "15,000+", label: "Procedures Done" },
                { icon: Award, val: "25+", label: "Awards Received" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
                  <stat.icon className="w-6 h-6 text-[#D97706] mb-2" />
                  <p className="text-xl font-bold text-gray-900">{stat.val}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Image & Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-[#1B2A41] aspect-[4/5] flex items-center justify-center group">
              {/* Placeholder Content (as per design) - Replace src with actual image later */}
              {/* <img src="/doctor-portrait-formal.jpg" alt="Dr. Sarat Chandra" className="w-full h-full object-cover" /> */}
              
        
                <img 
  src="/doctor_img.webp" 
  alt="Dr. Sarat Chandra" 
  className="w-full h-full object-cover object-top"
/>
            </div>

            {/* Floating Badge (Bottom Left) */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-8 -left-4 md:-left-12 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-xs"
            >
              <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-[#D97706]" />
              </div>
              <div>
                <p className="font-bold text-[#1B2A41] text-sm">FSCAI, FESC, FACC</p>
                <p className="text-xs text-gray-500 font-medium">International Fellowships</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}