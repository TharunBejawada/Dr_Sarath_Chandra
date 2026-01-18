"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Edit, EyeOff, Eye, Loader2, CheckCircle2, 
  Activity, LayoutList, HelpCircle, Star, Hash, Globe, ChevronRight 
} from "lucide-react";
import { API_URL } from "../../../../config";

export default function ViewService({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/services/getServiceById/${id}`)
      .then(res => res.json())
      .then(data => setService(data.Item))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleStatus = async () => {
    if (!service) return;
    setIsToggling(true);
    try {
      const newStatus = !service.enabled;
      const res = await fetch(`${API_URL}/api/services/${id}/toggle`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled: newStatus })
      });
      if (res.ok) setService({ ...service, enabled: newStatus });
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) return <div className="flex h-screen justify-center items-center"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;
  if (!service) return <div className="text-center py-20">Service not found.</div>;

  // Helper to render HTML content safely
  const HTMLContent = ({ content }: { content: string }) => (
    <div className="prose prose-sm prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
  );

  return (
    <div className="max-w-7xl mx-auto pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-8">
         <button onClick={() => router.push('/admin/services')} className="flex items-center text-slate-500 hover:text-blue-600 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to List</span>
         </button>
         
         <div className="flex gap-3">
             <button onClick={toggleStatus} disabled={isToggling}
                className={`px-5 py-2.5 rounded-lg font-bold text-white flex items-center gap-2 transition shadow-md ${service.enabled ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`}>
                {isToggling ? <Loader2 className="w-4 h-4 animate-spin"/> : (service.enabled ? <><EyeOff className="w-4 h-4"/> Disable</> : <><Eye className="w-4 h-4"/> Enable</>)}
             </button>
             <button onClick={() => router.push(`/admin/services/${id}/edit`)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition">
                <Edit className="w-4 h-4" /> Edit Service
             </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* === LEFT COLUMN: MAIN CONTENT === */}
        <div className="xl:col-span-2 space-y-8">
            
            {/* 1. HERO SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="h-64 md:h-80 w-full relative bg-slate-100">
                  <img src={service.heroImage || "https://placehold.co/1200x400"} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                     {service.enabled ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> ACTIVE</span>
                     ) : (
                        <span className="bg-slate-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"><EyeOff className="w-3 h-3"/> HIDDEN</span>
                     )}
                  </div>
               </div>
               <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 uppercase">{service.badge || "Service"}</span>
                  </div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">{service.title}</h1>
                  <HTMLContent content={service.description} />
               </div>
            </div>

            {/* 2. CONDITIONS TREATED */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <LayoutList className="w-5 h-5 text-blue-500"/> Conditions Treated
               </h2>
               <div className="grid md:grid-cols-2 gap-6">
                  {service.conditions?.map((cond: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                         <div className="flex gap-4">
                             {cond.image && <img src={cond.image} className="w-20 h-20 rounded-lg object-cover bg-white border" />}
                             <div>
                                <h3 className="font-bold text-slate-800">{cond.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mt-1">{cond.description}</p>
                             </div>
                         </div>
                         <div className="mt-4 flex flex-wrap gap-2">
                            {cond.symptoms?.map((sym: string, i: number) => (
                                <span key={i} className="text-xs bg-white border px-2 py-1 rounded text-slate-600">{sym}</span>
                            ))}
                         </div>
                      </div>
                  ))}
               </div>
            </div>

            {/* 3. TREATMENTS */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <Activity className="w-5 h-5 text-purple-500"/> Treatments
               </h2>
               <div className="space-y-8">
                  {service.treatments?.map((treat: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                          <div className="p-6 bg-white border-b">
                             <h3 className="text-xl font-bold text-slate-800 mb-2">{treat.title}</h3>
                             <HTMLContent content={treat.description} />
                          </div>
                          <div className="p-6 grid gap-6">
                             {/* Steps */}
                             <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Pre-op Instructions</h4>
                                    <ul className="list-disc pl-4 text-sm space-y-1 text-slate-600">
                                        {treat.instructions?.map((it: string, i: number) => <li key={i}>{it}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Procedure Steps</h4>
                                    <ul className="list-decimal pl-4 text-sm space-y-1 text-slate-600">
                                        {treat.procedureSteps?.map((it: string, i: number) => <li key={i}>{it}</li>)}
                                    </ul>
                                </div>
                             </div>
                             {/* Candidate */}
                             <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2"><Star className="w-4 h-4"/> Ideal Candidate</h4>
                                <p className="text-sm text-slate-700 font-bold mb-2">{treat.idealCandidate?.title}</p>
                                <HTMLContent content={treat.idealCandidate?.description} />
                             </div>
                          </div>
                      </div>
                  ))}
               </div>
            </div>

            {/* 4. BENEFITS & FAQ */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <HelpCircle className="w-5 h-5 text-green-500"/> Benefits & FAQs
               </h2>
               
               <div className="mb-8">
                  <h3 className="font-bold text-lg mb-2">{service.benefits?.title}</h3>
                  <HTMLContent content={service.benefits?.description} />
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                     {service.benefits?.list?.map((b: any, i: number) => (
                        <div key={i} className="flex gap-3">
                           <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                           <div>
                              <p className="font-bold text-slate-800 text-sm">{b.title}</p>
                              <div className="text-sm text-slate-500 mt-1"><HTMLContent content={b.description}/></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="border-t pt-8">
                   <h3 className="font-bold text-lg mb-6">{service.faqTitle}</h3>
                   <div className="space-y-4">
                      {service.faqs?.map((faq: any, i: number) => (
                          <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <p className="font-bold text-slate-800 text-sm mb-2">Q: {faq.question}</p>
                             <div className="text-sm text-slate-600 pl-4 border-l-2 border-slate-300"><HTMLContent content={faq.answer}/></div>
                          </div>
                      ))}
                   </div>
               </div>
            </div>

        </div>

        {/* === RIGHT COLUMN: SIDEBAR === */}
        <div className="space-y-6">
            
            {/* Why Choose Us */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-sm uppercase text-slate-500 mb-4">Why Choose Us</h3>
                <img src={service.whyChoose?.image || "https://placehold.co/400x300"} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h4 className="font-bold text-slate-900">{service.whyChoose?.title}</h4>
                <div className="mt-2 text-sm text-slate-600"><HTMLContent content={service.whyChoose?.description} /></div>
            </div>

            {/* Booking */}
            <div className="bg-blue-600 rounded-xl shadow-lg shadow-blue-200 p-6 text-white">
                <h3 className="font-bold text-lg mb-2">{service.booking?.title}</h3>
                <div className="text-blue-100 text-sm"><HTMLContent content={service.booking?.description} /></div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-sm uppercase text-slate-500 mb-4 flex items-center gap-2"><Globe className="w-4 h-4"/> SEO Metadata</h3>
               <div className="space-y-3 text-sm">
                  <div>
                     <p className="text-xs font-bold text-slate-400">SEO Title</p>
                     <p>{service.seoTitle}</p>
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-400">URL Slug</p>
                     <p className="font-mono bg-slate-100 px-2 rounded inline-block">/services/{service.url}</p>
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-400">Keywords</p>
                     <p className="text-slate-500">{service.metaKeywords}</p>
                  </div>
               </div>
            </div>
        </div>

      </div>
    </div>
  );
}