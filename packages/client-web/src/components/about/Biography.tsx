"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Biography() {
  const expertise = [
    "Coronary Angioplasty",
    "Heart Valve Procedures",
    "Structural Heart Interventions",
    "Minimally Invasive Cardiac Therapies",
    "Atherectomy",
    "Stent Implantation",
    "Valve Interventions",
    "Structural Heart Defect Closures"
  ];

  return (
    <section id="biography" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Biography Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold uppercase tracking-widest mb-6">
              About The Doctor
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0F172A] mb-8 leading-tight">
              Decades of Excellence in <br />
              <span className="text-[#D97706]">Cardiac Care</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Dr. K. Sarat Chandra is a highly respected Senior Interventional Cardiologist with nearly 40 years of clinical excellence in diagnosing and treating complex heart conditions. He currently serves as the Chief Interventional Cardiologist at Jayanthi Hospitals, Hyderabad, where he leads advanced cardiac care and life-saving interventions.
              </p>
              <p>
                Renowned for his expertise in coronary angioplasty, heart valve procedures, structural heart interventions, and minimally invasive cardiac therapies, Dr. Sarat Chandra combines global training with cutting-edge technology to deliver safe, patient-focused outcomes.
              </p>
              <p>
                His commitment to clinical precision, preventive cardiology, and ethical care has earned him national and international recognition, making him one of the most trusted names in cardiology in Hyderabad.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Expertise Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#FDFBF7] rounded-[2rem] p-8 lg:p-12 border border-[#F3EFE5]"
          >
            <h3 className="font-serif text-2xl font-bold text-[#0F172A] mb-8">
              Areas of Expertise
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white px-4 py-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 hover:border-[#D97706] hover:shadow-md transition-all duration-300 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 font-medium text-sm leading-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}