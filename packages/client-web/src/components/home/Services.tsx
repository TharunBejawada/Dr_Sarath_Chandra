"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Zap, 
  Settings, 
  Disc, 
  Waves, 
  ShieldAlert 
} from "lucide-react";

// 1. Define the Data Shape (matches your future DB Schema)
type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string; // We store icon names as strings in DB
};

// 2. Icon Mapper (Maps DB string -> Lucide Component)
const iconMap: Record<string, any> = {
  "heart": Heart,
  "stethoscope": Stethoscope,
  "activity": Activity,
  "zap": Zap,
  "settings": Settings,
  "disc": Disc,
  "waves": Waves,
  "shield": ShieldAlert,
};

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Simulate Backend Fetch
  useEffect(() => {
    // In the future, this will be: const res = await fetch('/api/services');
    const fetchServices = async () => {
      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setServices([
        {
          id: "1",
          title: "Coronary Angioplasty & Stenting (PCI)",
          description: "Minimally invasive procedure to open blocked coronary arteries and restore blood flow to the heart.",
          icon: "heart"
        },
        {
          id: "2",
          title: "Cardiac Catheterisation & Angiogram",
          description: "Diagnostic procedure to visualize blood vessels and chambers of the heart accurately.",
          icon: "stethoscope"
        },
        {
          id: "3",
          title: "Coronary Artery Bypass Grafting (CABG)",
          description: "Surgical procedure to improve blood flow to the heart by bypassing blocked arteries.",
          icon: "activity"
        },
        {
          id: "4",
          title: "TAVR (Transcatheter Aortic Valve Replacement)",
          description: "Minimally invasive valve replacement for patients with severe aortic stenosis.",
          icon: "settings"
        },
        {
          id: "5",
          title: "Mitral Valve Repair / Replacement",
          description: "Advanced surgical and transcatheter solutions including MitraClip for mitral valve disease.",
          icon: "disc"
        },
        {
          id: "6",
          title: "Pacemaker & ICD / CRT Implantation",
          description: "Device therapy for heart rhythm disorders and heart failure management.",
          icon: "zap"
        },
        {
          id: "7",
          title: "Carotid Artery Angioplasty & Stenting",
          description: "Treatment for carotid artery disease to prevent stroke and improve blood flow.",
          icon: "waves"
        },
        {
          id: "8",
          title: "Aortic Aneurysm Repair",
          description: "Endovascular and surgical repair of aortic aneurysms to prevent rupture.",
          icon: "shield"
        },
        {
          id: "9",
          title: "Electrophysiology Study & Cardiac Ablation",
          description: "Treatment that uses energy (heat/cold) delivered via catheters to destroy the small areas of heart tissue causing the arrhythmia, effectively curing it",
          icon: "waves"
        },
        {
          id: "10",
          title: "Device Closure for Congenital Heart Defects (ASD / VSD / PDA)",
          description: "Minimally invasive closure of atrial and ventricular septal defects and patent ductus arteriosus.",
          icon: "shield"
        }
      ]);
      setLoading(false);
    };

    fetchServices();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Delays each card by 0.15s
      }
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
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header Section */}
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

        {/* Grid Section */}
        {loading ? (
          // Simple Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Activity;
              
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-red-50/50 hover:border-red-100 transition-all duration-300 group cursor-default"
                >
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-[#A62B2B] mb-6 group-hover:bg-[#A62B2B] group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-[#A62B2B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}