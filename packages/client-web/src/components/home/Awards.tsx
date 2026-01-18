"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, Star } from "lucide-react";

export default function Awards() {
  const awards = [
    {
      id: 1,
      year: "2009",
      title: "Life Time Achievement Award",
      organization: "World Congress on Clinical, Preventive & Geriatric Cardiology",
      icon: Trophy,
    },
    {
      id: 2,
      year: "2010",
      title: "Vaidya Siromani Award",
      organization: "Thyagaraja Gana Sabha",
      icon: Award,
    },
    {
      id: 3,
      year: "2020-2021",
      title: "Dr. Abdul Kalam Award",
      organization: "Eminent Medical Person Recognition",
      icon: Medal,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Star className="w-3 h-3 fill-current" />
            Recognition
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Awards & <span className="text-[#A62B2B]">Achievements</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Recognized nationally and internationally for excellence in cardiac care and contributions to the field of cardiology.
          </motion.p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 flex flex-col items-center text-center relative group"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#A62B2B] mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                {/* Ping animation behind icon */}
                <div className="absolute w-full h-full rounded-full bg-red-100 opacity-0 group-hover:animate-ping"></div>
                <award.icon className="w-8 h-8 relative z-10" />
              </div>

              {/* Year Badge */}
              <span className="bg-[#A62B2B] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
                {award.year}
              </span>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                {award.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {award.organization}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}