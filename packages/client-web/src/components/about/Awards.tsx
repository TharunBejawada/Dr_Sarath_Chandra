"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award as AwardIcon } from "lucide-react";

export default function Awards() {
  const awards = [
    {
      title: "Dr. Abdul Kalam Award",
      description: "Prestigious recognition for outstanding contributions to medical science and healthcare.",
      icon: Trophy
    },
    {
      title: "Life Time Achievement Award",
      description: "Honoring decades of exceptional service in interventional cardiology.",
      icon: Medal
    },
    {
      title: "Vaidya Siromani Award",
      description: "Recognition for excellence in clinical and preventive cardiology practice.",
      icon: Star
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold uppercase tracking-widest mb-4"
          >
            Recognition & Honors
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold text-[#0F172A] mb-6"
          >
            Awards & Achievements
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Recognized nationally and internationally for outstanding contributions to clinical and preventive cardiology.
          </motion.p>
        </div>

        {/* Top Row: 3 Awards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#FEF3C7]/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#FEF3C7]/50 flex items-center justify-center text-[#D97706] mb-6">
                <award.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-3">
                {award.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {award.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Wide Card: Procedures */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#0F172A] transition-colors">
            
            {/* Dark Icon Box */}
            <div className="w-16 h-16 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <AwardIcon className="w-8 h-8" />
            </div>

            {/* Text */}
            <div className="text-center sm:text-left">
              <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-1">
                Thousands of Complex Procedures
              </h3>
              <p className="text-gray-500 text-sm">
                Including angioplasty, atherectomy, stent implantation & more performed with high success rates.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}