"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  Activity, 
  ShieldCheck, 
  HeartPulse, 
  ArrowRight, 
  Phone, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// --- MOCK DATA (This will come from Backend later) ---
const TAVR_DATA = {
  title: "Transcatheter Aortic Valve Replacement",
  subtitle: "Advanced, minimally invasive treatment for aortic valve disease. Expert care by Dr. K. Sarat Chandra.",
  badge: "TAVR in Hyderabad",
  heroImage: "/service-tavr-hero.jpg", // You'll need to save this image
  
  condition: {
    title: "What Is Aortic Valve Stenosis?",
    description: "Aortic valve stenosis occurs when the aortic valve becomes narrowed, stiff, or calcified, restricting blood flow from the heart to the rest of the body. This condition forces the heart to work harder and, if left untreated, can lead to heart failure, fainting, chest pain, or sudden cardiac death.",
    symptoms: [
      { label: "Breathlessness during activity or rest", icon: "wind" },
      { label: "Chest pain or tightness", icon: "heart" },
      { label: "Dizziness or fainting spells", icon: "alert" },
      { label: "Fatigue and reduced exercise capacity", icon: "activity" }
    ],
    image: "/service-heart-diagram.jpg"
  },

  treatment: {
    title: "What Is TAVR?",
    description: "TAVR is a catheter-based procedure in which a new valve is delivered to the heart through a small incision—usually via the femoral artery in the leg. The new valve is positioned inside the diseased valve and immediately begins functioning, restoring normal blood flow.",
    comparison: [
      "Does not require open-heart surgery",
      "Avoids large chest incisions",
      "Requires shorter hospital stay",
      "Enables quicker recovery and return to daily activities"
    ],
    steps: [
      { id: 1, title: "Catheter Insertion", desc: "A small catheter is inserted through the artery in the leg" },
      { id: 2, title: "Valve Guidance", desc: "The new valve is guided to the heart under imaging guidance" },
      { id: 3, title: "Valve Expansion", desc: "The replacement valve is expanded within the diseased valve" },
      { id: 4, title: "Restoration", desc: "Blood flow is restored immediately" }
    ]
  },

  benefits: [
    { title: "Minimally Invasive", desc: "Safer for high-risk patients with no large chest incisions required", icon: ShieldCheck },
    { title: "Faster Recovery", desc: "Most patients recover within days compared to weeks with open surgery", icon: Clock },
    { title: "Reduced Pain", desc: "Significantly less post-operative pain and discomfort", icon: HeartPulse },
    { title: "Shorter Hospital Stay", desc: "Reduced ICU and overall hospital stay duration", icon: Activity },
    { title: "Improved Quality of Life", desc: "Quick return to daily activities and symptom relief", icon: CheckCircle2 },
    { title: "Fewer Complications", desc: "Lower risk of infection and surgical complications", icon: Activity }
  ],

  candidates: {
    checklist: [
      "Have severe symptomatic aortic stenosis",
      "Are elderly or have multiple medical conditions",
      "Are considered high or intermediate surgical risk",
      "Have been advised against open-heart surgery"
    ],
    evaluation: [
      { id: "01", title: "Echocardiography" },
      { id: "02", title: "CT Scan" },
      { id: "03", title: "Angiography" },
      { id: "04", title: "Clinical Assessment" }
    ]
  },

  doctor: {
    title: "Why Choose Dr. K. Sarat Chandra for TAVR?",
    desc: "With nearly four decades of experience in interventional cardiology, Dr. K. Sarat Chandra brings exceptional expertise in complex valve interventions and structural heart procedures. As the Chief Interventional Cardiologist at Jayanthi Hospitals, he leads a multidisciplinary heart team that follows global protocols.",
    stats: { years: "40+", patients: "10,000+" },
    image: "/doctor-about.jpg"
  },

  faqs: [
    { q: "Is TAVR safe for elderly patients?", a: "Yes, TAVR is specifically designed to be a safer alternative for elderly patients who may not be able to withstand the rigors of open-heart surgery." },
    { q: "How long does recovery take after TAVR?", a: "Most patients are walking within 24 hours and can return home within 2-3 days. Full recovery typically takes a week or two." },
    { q: "How long does the TAVR valve last?", a: "Current data suggests TAVR valves have excellent durability comparable to surgical valves." },
    { q: "Will I need open-heart surgery after TAVR?", a: "No, TAVR is designed to avoid open-heart surgery entirely." },
    { q: "How do I know if I am eligible for TAVR?", a: "Eligibility is determined through a comprehensive evaluation including CT scans and echocardiograms by our heart team." }
  ]
};

// --- COMPONENT ---
export default function ServiceDetail() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={TAVR_DATA.heroImage} alt="TAVR Procedure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-orange-400 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 bg-black/20 backdrop-blur-sm">
              {TAVR_DATA.badge}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
              {TAVR_DATA.title}
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
              {TAVR_DATA.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all shadow-lg shadow-orange-500/30">
                Book Consultation
              </Link>
              <button onClick={() => document.getElementById('about')?.scrollIntoView()} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-md border border-white/20 transition-all">
                Learn About TAVR
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CONDITION (Understanding...) */}
      <section id="about" className="py-24 bg-[#F0FDF4]"> {/* Light green tint */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Understanding Your Condition</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#134E4A] mb-6"> {/* Teal-900 */}
                {TAVR_DATA.condition.title}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {TAVR_DATA.condition.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {TAVR_DATA.condition.symptoms.map((sym, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 mt-1">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">{sym.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src={TAVR_DATA.condition.image} alt="Heart Condition" className="w-full rounded-3xl shadow-2xl" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. WHAT IS TAVR (Green Section) */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto mb-16">
             <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Advanced Heart Valve Treatment</span>
             <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#134E4A] mb-8">{TAVR_DATA.treatment.title}</h2>
             <p className="text-slate-600 text-lg">{TAVR_DATA.treatment.description}</p>
          </div>

          {/* Green Comparison Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#134E4A] rounded-3xl p-8 md:p-12 text-white mb-20 shadow-2xl"
          >
            <h3 className="font-serif text-2xl font-bold mb-8 text-center">Unlike Traditional Valve Replacement Surgery, TAVR:</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {TAVR_DATA.treatment.comparison.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 text-white text-xs">✓</div>
                  <span className="font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Steps Process */}
          <div>
            <h3 className="font-serif text-3xl font-bold text-center text-[#134E4A] mb-12">How Is the TAVR Procedure Performed?</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {TAVR_DATA.treatment.steps.map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg relative group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#FEE2E2] text-[#F97316] font-bold flex items-center justify-center mb-4">
                    {step.id}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  
                  {/* Connector Line (Desktop Only) */}
                  {i !== 3 && (
                    <div className="hidden md:block absolute top-10 -right-4 w-8 h-[2px] bg-slate-200 z-10"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
               <Link href="/contact" className="inline-block px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all shadow-md">
                Am I a Candidate for TAVR?
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BENEFITS */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Why Choose TAVR</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#134E4A]">Benefits of TAVR</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TAVR_DATA.benefits.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFEDD5] text-[#F97316] flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CANDIDATES & EVALUATION */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left: Checklist */}
            <div className="bg-[#F8FAFC] p-10 rounded-3xl border border-slate-100">
              <h3 className="font-serif text-3xl font-bold text-[#134E4A] mb-6">Who Is an Ideal Candidate?</h3>
              <p className="text-slate-600 mb-8">TAVR is recommended for patients who meet specific criteria. Our team conducts thorough evaluations to determine suitability.</p>
              <ul className="space-y-4">
                {TAVR_DATA.candidates.checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-[#134E4A] shrink-0" />
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Evaluation Process */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-[#134E4A] mb-6">Comprehensive Evaluation Process</h3>
              <p className="text-slate-600 mb-8">A detailed evaluation is done to determine suitability for TAVR, including various diagnostic tests.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {TAVR_DATA.candidates.evaluation.map((step, i) => (
                  <div key={i} className="bg-[#134E4A] p-6 rounded-2xl text-center text-white hover:bg-[#115E59] transition-colors">
                    <span className="block text-4xl font-serif font-bold text-[#F97316]/50 mb-2">{step.id}</span>
                    <span className="font-bold text-lg">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE DR CHANDRA (Teal section logic) */}
      <section className="py-24 bg-[#F0FDF4]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
           <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
             {/* Image */}
             <div className="lg:w-2/5 h-[400px] lg:h-auto relative">
               <img src={TAVR_DATA.doctor.image} alt="Dr. Sarat Chandra" className="w-full h-full object-cover" />
             </div>
             {/* Content */}
             <div className="lg:w-3/5 p-10 lg:p-16 flex flex-col justify-center">
               <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-4">Expert Leadership</span>
               <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#134E4A] mb-6">{TAVR_DATA.doctor.title}</h2>
               <p className="text-slate-600 text-lg leading-relaxed mb-10">
                 {TAVR_DATA.doctor.desc}
               </p>
               
               <div className="flex gap-4 mb-10">
                 <div className="bg-[#F8FAFC] px-6 py-3 rounded-xl border border-slate-100">
                    <p className="font-bold text-2xl text-[#134E4A]">{TAVR_DATA.doctor.stats.years}</p>
                    <p className="text-xs text-slate-500 uppercase">Years Experience</p>
                 </div>
                 <div className="bg-[#F8FAFC] px-6 py-3 rounded-xl border border-slate-100">
                    <p className="font-bold text-2xl text-[#134E4A]">{TAVR_DATA.doctor.stats.patients}</p>
                    <p className="text-xs text-slate-500 uppercase">Patients Treated</p>
                 </div>
               </div>

               <div>
                 <Link href="/contact" className="inline-block px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all shadow-md">
                   Book Consultation with Dr. Chandra
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
           <div className="text-center mb-12">
              <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Common Questions</span>
              <h2 className="font-serif text-4xl font-bold text-[#134E4A]">Frequently Asked Questions</h2>
           </div>

           <div className="space-y-4">
             {TAVR_DATA.faqs.map((faq, i) => (
               <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-[#134E4A]">
                 <button 
                   onClick={() => toggleFaq(i)}
                   className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                 >
                   <span className="font-bold text-lg text-[#134E4A]">{faq.q}</span>
                   {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#F97316]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                 </button>
                 {openFaq === i && (
                   <div className="p-6 pt-0 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                     {faq.a}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 8. CTA FOOTER (Green) */}
      <section className="py-24 bg-[#134E4A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Book a TAVR Consultation</h2>
          <p className="text-teal-100 text-lg mb-12 max-w-2xl mx-auto">
            If you or your loved one has been diagnosed with aortic valve disease, early intervention can be life-saving. A timely evaluation can help determine whether TAVR is the right option.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
             <Link href="tel:+919999999999" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
               <Phone className="w-5 h-5" /> Call +91 98765 43210
             </Link>
             <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-lg transition-all">
               <Calendar className="w-5 h-5" /> Schedule Online
             </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
               <Phone className="w-8 h-8 text-[#F97316] mb-4" />
               <h4 className="font-bold text-lg mb-1">Call Us</h4>
               <p className="text-teal-200">+91 98765 43210</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
               <Clock className="w-8 h-8 text-[#F97316] mb-4" />
               <h4 className="font-bold text-lg mb-1">Consultation</h4>
               <p className="text-teal-200">Mon-Sat: 9AM - 6PM</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
               <MapPin className="w-8 h-8 text-[#F97316] mb-4" />
               <h4 className="font-bold text-lg mb-1">Location</h4>
               <p className="text-teal-200">Jayanthi Hospitals, Hyderabad</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}