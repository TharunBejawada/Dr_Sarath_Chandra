"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Building2, Award } from "lucide-react";

export default function Qualifications() {
  const education = [
    {
      degree: "MBBS",
      school: "Andhra Medical College, Visakhapatnam",
      icon: GraduationCap
    },
    {
      degree: "MD (Internal Medicine)",
      school: "PGIMER, Chandigarh",
      icon: BookOpen
    },
    {
      degree: "DM (Cardiology)",
      school: "PGIMER, Chandigarh",
      icon: Building2
    }
  ];

  const fellowships = [
    {
      id: "FSCAI",
      name: "Fellow of Society for Cardiovascular Angiography & Interventions"
    },
    {
      id: "FESC",
      name: "Fellow of European Society of Cardiology"
    },
    {
      id: "FACC",
      name: "Fellow of American College of Cardiology"
    }
  ];

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
    <section className="py-24 bg-[#0F172A] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#F59E0B] text-xs font-bold uppercase tracking-widest mb-4 border border-white/5"
          >
            Education & Training
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold mb-6"
          >
            Qualifications & Fellowships
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Training from India's premier medical institutions and recognition from the world's leading cardiology organizations.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Academic Background */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-[#F59E0B]" />
              <h3 className="font-serif text-2xl font-bold">Academic Background</h3>
            </div>

            <div className="space-y-4">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center gap-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{item.degree}</h4>
                    <p className="text-gray-400 text-sm">{item.school}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Fellowships */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-[#F59E0B]" />
              <h3 className="font-serif text-2xl font-bold">International Fellowships</h3>
            </div>

            <div className="space-y-4">
              {fellowships.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center gap-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-16 h-12 rounded-lg bg-[#F59E0B] flex items-center justify-center shrink-0">
                    <span className="text-[#0F172A] font-bold font-serif">{item.id}</span>
                  </div>
                  <p className="text-gray-300 font-medium leading-tight">
                    {item.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}