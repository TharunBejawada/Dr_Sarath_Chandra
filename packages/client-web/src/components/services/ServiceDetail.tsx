"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  ChevronUp, 
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_URL } from "../../config";

// --- TYPES ---
interface ServiceData {
  serviceId: string;
  title: string;
  seoTitle?: string;
  badge?: string;
  heroImage: string;
  description: string;
  
  conditions?: Array<{
    title: string;
    description: string;
    image?: string;
    symptoms: string[]; 
  }>;

  treatments?: Array<{
    title: string;
    description: string;
    instructions?: string[];
    procedureSteps?: string[]; 
    evaluationProcess?: {
      title: string;
      description: string;
      steps: string[];
    };
    idealCandidate?: {
      title: string;
      description: string;
      steps: string[];
    };
  }>;

  benefits?: {
    title: string;
    description?: string;
    list: Array<{ title: string; description: string }>;
  };

  faqs?: Array<{ question: string; answer: string }>;

  whyChoose?: {
    title: string;
    description: string;
    image: string;
  };
  
  booking?: {
    title: string;
    description: string;
  };
}

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // --- FETCH DATA ---
  useEffect(() => {
    async function fetchServiceData() {
      if (!slug) return;

      try {
        const urlParam = slug.startsWith('/') ? slug : `/${slug}`;
        
        const res = await fetch(`${API_URL}/api/services/getServiceByUrl${urlParam}`);
        
        if (!res.ok) throw new Error("Service not found");
        
        const data = await res.json();
        const item = data.Item || data;
        setService(item);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServiceData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-[#F97316] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Service Not Found</h1>
        <Link href="/services" className="px-6 py-3 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition">
          View All Services
        </Link>
      </div>
    );
  }

  const mainTreatment = service.treatments?.[0];
  
  const getIconForBenefit = (index: number) => {
    const icons = [ShieldCheck, Clock, HeartPulse, Activity, CheckCircle2, Activity];
    return icons[index % icons.length];
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={service.heroImage || "https://placehold.co/1920x1080?text=Medical+Service"} 
            alt={service.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full text-white">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-6xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-orange-400/50 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 bg-black/30 backdrop-blur-sm shadow-lg">
              {service.badge || "Advanced Cardiac Care"}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-lg break-words">
              {service.title}
            </h1>
            
            {/* FIX: Left aligned hero text, prose-invert for white text */}
            <div 
              className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed text-left prose prose-invert prose-lg max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all shadow-lg shadow-orange-500/30 transform hover:-translate-y-1">
                Book Consultation
              </Link>
              <button 
                onClick={() => document.getElementById('conditions')?.scrollIntoView({ behavior: 'smooth' })} 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-md border border-white/20 transition-all hover:shadow-lg"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. CONDITIONS BLOCK (Text Left / Image Right) */}
      {service.conditions && service.conditions.length > 0 && (
        <section id="conditions" className="py-24 bg-[#F0FDF4] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-24">
            
            {service.conditions.map((condition, index) => (
              <div key={index} className={`grid gap-12 lg:gap-16 items-start ${condition.image ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                
                {/* Text Side - Always Left Aligned */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className="w-full text-left"
                >
                  <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Understanding The Condition</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#134E4A] mb-6 break-words">
                    {condition.title}
                  </h2>
                  
                  {/* FIX: Forced lists with [&_ul]:list-disc and text-left */}
                  <div 
                    className="text-slate-600 text-lg leading-relaxed mb-8 text-left prose prose-slate prose-lg max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: condition.description }}
                  />
                  
                  {condition.symptoms && condition.symptoms.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-bold text-[#134E4A] mb-4 flex items-center gap-2">
                        <HeartPulse className="w-5 h-5 text-[#F97316]" /> Common Symptoms
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {condition.symptoms.map((sym, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex items-start gap-3 hover:shadow-md transition-shadow text-left"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#F97316] mt-2 shrink-0"></div>
                            <span className="text-slate-700 text-sm font-medium leading-snug">{sym}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Image Side - Always Right */}
                {condition.image && (
                  <motion.div 
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative w-full"
                  >
                    <img 
                      src={condition.image} 
                      alt={condition.title} 
                      className="w-full rounded-3xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-500 max-h-[500px] object-cover" 
                    />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F97316]/10 rounded-full blur-3xl -z-10"></div>
                  </motion.div>
                )}

              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. TREATMENT / PROCEDURE */}
      {mainTreatment && (
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            
            {/* Description - Center Heading, Left Text */}
            <div className="w-full mb-16">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-center"
               >
                 <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Advanced Treatment</span>
                 <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#134E4A] mb-8 break-words">{mainTreatment.title}</h2>
               </motion.div>

               {/* FIX: Centered Container but TEXT LEFT ALIGNED for bullet points */}
               <div className="max-w-5xl mx-auto">
                 <div 
                   className="text-slate-600 text-lg text-left prose prose-slate prose-lg max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2 [&_strong]:text-[#134E4A]"
                   dangerouslySetInnerHTML={{ __html: mainTreatment.description }}
                 />
               </div>
            </div>

            {/* Pre-Procedure Instructions */}
            {mainTreatment.instructions && mainTreatment.instructions.length > 0 && (
              <div className="mb-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-amber-50 rounded-3xl p-8 md:p-12 border border-amber-100"
                >
                  <h3 className="font-serif text-2xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#F97316]" />
                    How is the Procedure Performed?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {mainTreatment.instructions.map((inst, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center shrink-0 text-sm">
                          {i + 1}
                        </div>
                        <p className="text-amber-900/80 leading-relaxed font-medium pt-1 text-left">{inst}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Steps Process */}
            {mainTreatment.procedureSteps && mainTreatment.procedureSteps.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#134E4A] mb-12">Step-by-Step Process</h3>
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {mainTreatment.procedureSteps.map((step, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeInUp}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg relative group hover:-translate-y-2 transition-transform duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#FEE2E2] text-[#F97316] font-bold flex items-center justify-center mb-4 text-lg shadow-sm">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium break-words text-left">{step}</p>
                      
                      {i !== mainTreatment.procedureSteps!.length - 1 && (
                        <div className="hidden lg:block absolute top-10 -right-4 w-8 h-[2px] bg-slate-200 z-10"></div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* CTA */}
            <div className="text-center mt-20">
               <Link href="/contact" className="inline-block px-10 py-5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-lg rounded-full transition-all shadow-lg transform hover:scale-105">
                Am I a Candidate?
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* 4. IDEAL CANDIDATE & EVALUATION */}
      {mainTreatment && (mainTreatment.idealCandidate || mainTreatment.evaluationProcess) && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Left: Ideal Candidate */}
              {mainTreatment.idealCandidate && (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm h-full"
                >
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#134E4A] mb-6">{mainTreatment.idealCandidate.title}</h3>
                  
                  {/* FIX: Left aligned text with list support */}
                  <div 
                    className="text-slate-600 mb-8 text-left prose prose-slate prose-lg max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5" 
                    dangerouslySetInnerHTML={{__html: mainTreatment.idealCandidate.description}} 
                  />
                  
                  <ul className="space-y-4">
                    {mainTreatment.idealCandidate.steps.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 text-left">
                        <CheckCircle2 className="w-5 h-5 text-[#134E4A] shrink-0 mt-0.5" />
                        <span className="text-slate-800 font-medium text-sm leading-relaxed break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Right: Evaluation Process */}
              {mainTreatment.evaluationProcess && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col h-full"
                >
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#134E4A] mb-6">{mainTreatment.evaluationProcess.title}</h3>
                  
                  {/* FIX: Left aligned text with list support */}
                  <div 
                    className="text-slate-600 mb-8 text-left prose prose-slate prose-lg max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5" 
                    dangerouslySetInnerHTML={{__html: mainTreatment.evaluationProcess.description}} 
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mainTreatment.evaluationProcess.steps.map((step, i) => (
                      <div key={i} className="bg-[#134E4A] p-6 rounded-2xl text-center text-white hover:bg-[#115E59] transition-colors shadow-lg group flex flex-col items-center justify-center">
                        <span className="block text-4xl font-serif font-bold text-[#F97316]/50 mb-2 group-hover:text-[#F97316] transition-colors">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-bold text-sm md:text-base leading-tight block break-words text-center">{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* 5. BENEFITS */}
      {service.benefits && service.benefits.list && service.benefits.list.length > 0 && (
        <section className="py-24 bg-[#F8FAFC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Why Choose This Treatment</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#134E4A]">{service.benefits.title}</h2>
              {service.benefits.description && (
                 <div 
                   className="mt-4 text-slate-600 w-full max-w-5xl mx-auto text-left prose prose-slate prose-lg max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5" 
                   dangerouslySetInnerHTML={{__html: service.benefits.description}} 
                 />
              )}
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {service.benefits.list.map((item, i) => {
                const Icon = getIconForBenefit(i);
                return (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FFEDD5] text-[#F97316] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 text-left">{item.title}</h3>
                    {/* FIX: Left aligned text for benefit description */}
                    <div 
                      className="text-slate-500 leading-relaxed text-sm text-left prose prose-sm max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5" 
                      dangerouslySetInnerHTML={{__html: item.description}} 
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* 6. WHY CHOOSE DR CHANDRA */}
      {service.whyChoose && (
        <section className="py-24 bg-[#F0FDF4]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
             <div className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
               {/* Image */}
               <div className="lg:w-2/5 h-[300px] lg:h-auto relative overflow-hidden">
                 <img 
                   src={service.whyChoose.image || "/doctor-placeholder.jpg"} 
                   alt="Dr. Sarat Chandra" 
                   className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
               </div>
               {/* Content */}
               <div className="lg:w-3/5 p-8 lg:p-16 flex flex-col justify-center text-left">
                 <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-4">Expert Leadership</span>
                 <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#134E4A] mb-6">{service.whyChoose.title}</h2>
                 
                 {/* FIX: Left aligned */}
                 <div 
                   className="text-slate-600 text-lg leading-relaxed mb-10 text-left prose prose-green prose-lg max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5"
                   dangerouslySetInnerHTML={{ __html: service.whyChoose.description }}
                 />
                 
                 <div>
                   <Link href="/contact" className="inline-block px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg">
                     Book Consultation with Dr. Chandra
                   </Link>
                 </div>
               </div>
             </div>
          </div>
        </section>
      )}

      {/* 7. FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
             <div className="text-center mb-12">
                <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase mb-2 block">Common Questions</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#134E4A]">Frequently Asked Questions</h2>
             </div>

             <div className="space-y-4">
               {service.faqs.map((faq, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                   viewport={{ once: true }}
                   className="border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-[#134E4A] hover:shadow-md"
                 >
                   <button 
                     onClick={() => toggleFaq(i)}
                     className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                   >
                     <span className="font-bold text-lg text-[#134E4A] pr-4 break-words text-left">{faq.question}</span>
                     {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#F97316] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                   </button>
                   <AnimatePresence>
                     {openFaq === i && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                         className="overflow-hidden"
                       >
                         {/* FIX: Left aligned */}
                         <div 
                           className="p-6 pt-0 bg-white text-slate-600 leading-relaxed border-t border-slate-100 text-left prose prose-sm max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5"
                           dangerouslySetInnerHTML={{ __html: faq.answer }}
                         />
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* 8. CTA FOOTER */}
      {service.booking && (
        <section className="py-24 bg-[#134E4A] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 break-words">{service.booking.title}</h2>
            {/* FIX: Left aligned text on large screens if desired, or centered for footer look. Kept left for readability if it has lists */}
            <div 
              className="text-teal-100 text-lg mb-12 max-w-4xl mx-auto prose prose-invert prose-lg max-w-none break-words text-center"
              dangerouslySetInnerHTML={{ __html: service.booking.description }}
            />
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
               <Link href="tel:+919989925612" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                 <Phone className="w-5 h-5" /> Call +91 99899 25612
               </Link>
               <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-lg transition-all">
                 <Calendar className="w-5 h-5" /> Schedule Online
               </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                 <Phone className="w-8 h-8 text-[#F97316] mb-4" />
                 <h4 className="font-bold text-lg mb-1">Call Us</h4>
                 <p className="text-teal-200">+91 99899 25612</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                 <Clock className="w-8 h-8 text-[#F97316] mb-4" />
                 <h4 className="font-bold text-lg mb-1">Consultation</h4>
                 <p className="text-teal-200">Mon-Sat: 9AM - 6PM</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                 <MapPin className="w-8 h-8 text-[#F97316] mb-4" />
                 <h4 className="font-bold text-lg mb-1">Location</h4>
                 <p className="text-teal-200">Jayanthi Hospitals, Hyderabad</p>
              </div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}