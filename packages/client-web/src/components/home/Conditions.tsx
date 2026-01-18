"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  HeartPulse, 
  AlertTriangle, 
  Activity, 
  Heart, 
  Waves, 
  Gauge, 
  Baby, 
  Droplets 
} from "lucide-react";

// 1. Define Data Types
type ConditionItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

// 2. Icon Map
const iconMap: Record<string, any> = {
  "heart-pulse": HeartPulse,
  "alert": AlertTriangle,
  "activity": Activity,
  "heart": Heart,
  "waves": Waves,
  "gauge": Gauge,
  "baby": Baby,
  "droplets": Droplets,
};

export default function Conditions() {
  const [conditions, setConditions] = useState<ConditionItem[]>([]);

  useEffect(() => {
    // Simulating Data Fetch
    const data = [
      {
        id: "1",
        title: "Coronary Artery Disease (CAD)",
        description: "Narrowing or blockage of coronary arteries due to plaque buildup.",
        icon: "heart-pulse"
      },
      {
        id: "2",
        title: "Heart Attack (Myocardial Infarction)",
        description: "Emergency condition caused by blocked blood flow to the heart.",
        icon: "alert"
      },
      {
        id: "3",
        title: "Heart Failure",
        description: "Condition where the heart cannot pump blood effectively.",
        icon: "activity"
      },
      {
        id: "4",
        title: "Valvular Heart Disease",
        description: "Dysfunction of heart valves affecting blood flow.",
        icon: "heart"
      },
      {
        id: "5",
        title: "Arrhythmias (Irregular Heartbeat)",
        description: "Abnormal heart rhythm including AFib and other conditions.",
        icon: "waves"
      },
      {
        id: "6",
        title: "Hypertension (High Blood Pressure)",
        description: "Persistent elevated blood pressure affecting heart health.",
        icon: "gauge"
      },
      {
        id: "7",
        title: "Congenital Heart Diseases",
        description: "Heart defects present from birth requiring intervention.",
        icon: "baby"
      },
      {
        id: "8",
        title: "Peripheral & Vascular Artery Disease",
        description: "Conditions affecting blood vessels outside the heart.",
        icon: "droplets"
      }
    ];
    setConditions(data);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Fast cascade
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-[#FFFBFB]"> {/* Subtle warm background from image */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-widest mb-4"
          >
            Conditions Treated
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Expert Care for <span className="text-[#A62B2B]">Heart Conditions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Comprehensive treatment for a wide range of cardiovascular conditions using advanced medical techniques.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {conditions.map((item) => {
            const IconComponent = iconMap[item.icon] || Activity;
            
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 h-full flex flex-col"
              >
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-[#A62B2B] mb-5 shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}