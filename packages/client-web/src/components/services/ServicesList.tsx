"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Coronary Angioplasty & Stenting (PCI)",
    description: "A minimally invasive procedure to open blocked or narrowed coronary arteries. A balloon-tipped catheter is used to widen the artery, and a stent (small mesh tube) is placed to keep it open, restoring blood flow to the heart muscle.",
    image: "/service-pci.jpg"
  },
  {
    id: 2,
    title: "Cardiac Catheterisation & Coronary Angiogram",
    description: "A diagnostic procedure where a thin catheter is inserted through a blood vessel to the heart. Contrast dye is injected to visualize the coronary arteries on X-ray, helping detect blockages, valve problems, or other heart conditions.",
    image: "/service-cath.jpg"
  },
  {
    id: 3,
    title: "Coronary Artery Bypass Grafting (CABG)",
    description: "An open-heart surgery that creates new pathways for blood to flow around blocked coronary arteries. Healthy blood vessels from other parts of the body are used to bypass the blocked sections, improving blood supply to the heart.",
    image: "/service-cabg.jpg"
  },
  {
    id: 4,
    title: "Transcatheter Aortic Valve Replacement (TAVR)",
    description: "A minimally invasive procedure to replace a diseased aortic valve without open-heart surgery. A new valve is delivered via catheter through the leg or chest, expanding inside the old valve to restore normal blood flow.",
    image: "/service-tavr.jpg"
  },
  {
    id: 5,
    title: "Mitral Valve Repair / Replacement (Including MitraClip)",
    description: "Procedures to fix or replace a damaged mitral valve. MitraClip is a catheter-based technique that clips the valve leaflets together to reduce regurgitation, offering an alternative to traditional surgery for high-risk patients.",
    image: "/service-mitral.jpg"
  },
  {
    id: 6,
    title: "Pacemaker & ICD / CRT Implantation",
    description: "Implantation of cardiac devices to regulate heart rhythm. Pacemakers treat slow heartbeats, ICDs prevent sudden cardiac arrest, and CRT helps the heart chambers beat in sync.",
    image: "/service-pacemaker.jpg"
  },
  {
    id: 7,
    title: "Electrophysiology Study & Cardiac Ablation",
    description: "A diagnostic test to map the heart's electrical system and identify abnormal rhythms. Cardiac ablation uses heat or cold energy to destroy small areas of heart tissue causing arrhythmias, restoring normal heart rhythm.",
    image: "/service-ablation.jpg"
  },
  {
    id: 8,
    title: "Device Closure for Congenital Heart Defects (ASD / VSD / PDA)",
    description: "A minimally invasive catheter-based procedure to close holes in the heart (ASD, VSD) or abnormal blood vessel connections (PDA). A closure device is delivered through a catheter and deployed to seal the defect permanently.",
    image: "/service-device.jpg"
  },
  {
    id: 9,
    title: "Carotid Artery Angioplasty & Stenting",
    description: "A procedure to open narrowed carotid arteries in the neck that supply blood to the brain. A stent is placed to keep the artery open, reducing the risk of stroke in patients with carotid artery disease.",
    image: "/service-carotid.jpg"
  },
  {
    id: 10,
    title: "Aortic Aneurysm Repair (Endovascular / Surgical)",
    description: "Treatment for weakened, bulging sections of the aorta. Endovascular repair uses a stent graft delivered via catheter, while surgical repair involves replacing the damaged section with a synthetic graft to prevent rupture.",
    image: "/service-aortic.jpg"
  }
];

export default function ServicesList() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold uppercase tracking-widest mb-4"
          >
            Comprehensive Cardiac Care
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold text-[#0F172A] mb-6"
          >
            Our Services
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Advanced interventional cardiology procedures and cardiac care delivered with precision, compassion, and nearly four decades of expertise.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="h-64 sm:h-80 overflow-hidden relative">
                {/* IMPORTANT: Replace these src placeholders with your actual images 
                   uploaded to /public folder 
                */}
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback if image not found
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x600/f1f5f9/94a3b8?text=Medical+Procedure";
                  }}
                />
                
                {/* Overlay Gradient (Optional for better text readability if text was on image) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10">
                <h3 className="font-serif text-2xl font-bold text-[#0F172A] mb-4 group-hover:text-[#A62B2B] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}