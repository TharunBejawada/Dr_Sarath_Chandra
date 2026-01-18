"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Trash2, LayoutList, Activity, Plus, X, UploadCloud, Loader2, Star, HelpCircle, Link } from "lucide-react";
import RichTextEditor from "../../../../components/admin/ServiceRichTextEditor";
import { API_URL } from "../../../../config";

// --- 1. HELPER: STRING ARRAY INPUT ---
const ArrayInput = ({ label, items, onChange }: { label: string, items: string[], onChange: (items: string[]) => void }) => {
  const [input, setInput] = useState("");
  const handleAdd = () => {
    if (input.trim()) {
      onChange([...items, input.trim()]);
      setInput("");
    }
  };
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 mb-2 block uppercase">{label}</label>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 bg-slate-50 p-2 rounded border border-slate-200 text-sm items-center">
             <span className="flex-1">{item}</span>
             <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))}><X className="w-4 h-4 text-red-400 hover:text-red-600"/></button>
          </div>
        ))}
        <div className="flex gap-2">
          <input 
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500" 
            placeholder={`Add ${label.toLowerCase()}...`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          />
          <button type="button" onClick={handleAdd} className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-bold">ADD</button>
        </div>
      </div>
    </div>
  );
};

// --- 2. HELPER: IMAGE UPLOADER ---
const ImageUploader = ({ label, value, onChange }: { label: string, value: string, onChange: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      // Ensure this endpoint matches your backend
      const res = await fetch(`${API_URL}/api/services/uploadServiceImage`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.imageUrl);
    } catch (error) {
      console.error("Upload error", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-xs font-bold text-slate-500 mb-2 block uppercase">{label}</label>
      <div className="relative group cursor-pointer">
        <input type="file" className="hidden" id={`upload-${label}`} onChange={handleFileChange} disabled={uploading} />
        <label htmlFor={`upload-${label}`} className={`
            flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all relative overflow-hidden bg-white
            ${value ? 'border-blue-500' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
        `}>
            {uploading ? (
                <div className="flex flex-col items-center text-blue-600">
                    <Loader2 className="w-6 h-6 animate-spin mb-2" />
                    <span className="text-xs font-bold">Uploading...</span>
                </div>
            ) : value ? (
                <img src={value} className="w-full h-full object-cover rounded-xl" alt="Preview" />
            ) : (
                <div className="text-center p-4 text-slate-400">
                    <UploadCloud className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-xs font-bold">Click to Upload</span>
                </div>
            )}
        </label>
        {value && !uploading && (
            <button type="button" onClick={(e) => { e.preventDefault(); onChange(""); }} 
              className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition">
              <Trash2 className="w-4 h-4" />
            </button>
        )}
      </div>
    </div>
  );
};

export default function AddService() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- STATE ---
  const [service, setService] = useState({
    heroImage: "",
    title: "",
    badge: "",
    description: "",
    
    conditions: [] as any[],
    treatments: [] as any[],
    
    benefits: { title: "", description: "", list: [] as any[] },
    
    whyChoose: { title: "", description: "", image: "", expertise: [] as any[] },
    
    faqTitle: "",
    faqs: [] as any[],
    
    booking: { title: "", description: "" },
    
    seoTitle: "",
    metaDescription: "",
    metaKeywords: "",
    url: "",

    backlinkSchema: [] as { headline: string; links: { name: string; url: string }[] }[]
  });

  // --- SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/services/addService`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      if (res.ok) router.push("/admin/services");
      else alert("Failed to add service");
    } catch(e) { console.error(e); } 
    finally { setIsSubmitting(false); }
  };

  // --- BACKLINK SCHEMA HANDLERS ---
const addBacklinkSchemaBlock = () => {
  setService({
    ...service,
    backlinkSchema: [...service.backlinkSchema, { headline: "", links: [{ name: "", url: "" }] }]
  });
};

const removeBacklinkSchemaBlock = (index: number) => {
  const updated = service.backlinkSchema.filter((_, i) => i !== index);
  setService({ ...service, backlinkSchema: updated });
};

const updateBacklinkHeadline = (index: number, value: string) => {
  const updated = [...service.backlinkSchema];
  updated[index].headline = value;
  setService({ ...service, backlinkSchema: updated });
};

const addBacklinkLink = (blockIndex: number) => {
  const updated = [...service.backlinkSchema];
  updated[blockIndex].links.push({ name: "", url: "" });
  setService({ ...service, backlinkSchema: updated });
};

const removeBacklinkLink = (blockIndex: number, linkIndex: number) => {
  const updated = [...service.backlinkSchema];
  updated[blockIndex].links = updated[blockIndex].links.filter((_, i) => i !== linkIndex);
  setService({ ...service, backlinkSchema: updated });
};

const updateBacklinkLink = (blockIndex: number, linkIndex: number, field: "name" | "url", value: string) => {
  const updated = [...service.backlinkSchema];
  updated[blockIndex].links[linkIndex][field] = value;
  setService({ ...service, backlinkSchema: updated });
};

  // --- STYLES ---
  const sectionClass = "bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6 mb-8";
  const inputClass = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900";
  const labelClass = "block text-xs font-bold text-slate-500 mb-1.5 uppercase";

  return (
    <div className="max-w-7xl mx-auto pb-40">
      <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-slate-50 py-4">
         <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 bg-white border rounded-lg hover:bg-slate-50"><ChevronLeft className="w-5 h-5"/></button>
            <h1 className="text-2xl font-bold text-slate-900">Add New Service</h1>
         </div>
         <button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
            <Save className="w-5 h-5" /> {isSubmitting ? "Saving..." : "Save Service"}
         </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* === LEFT COLUMN (MAIN DATA) === */}
        <div className="xl:col-span-2">
           
           {/* 1. Conditions Section */}
           <div className={sectionClass}>
              <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800"><LayoutList className="w-5 h-5 text-blue-500"/> Conditions Treated</h2>
                  <button type="button" onClick={() => setService({...service, conditions: [...service.conditions, { title: "", description: "", symptoms: [], image: "" }]})} 
                    className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-md font-bold hover:bg-black flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Condition
                  </button>
              </div>
              
              {service.conditions.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No conditions added yet.</p>}

              {service.conditions.map((cond, idx) => (
                 <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 relative group">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-700 text-sm uppercase">Condition #{idx + 1}</h3>
                        <button type="button" onClick={() => setService({...service, conditions: service.conditions.filter((_, i) => i !== idx)})}
                           className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className={labelClass}>Condition Title</label>
                                <input className={inputClass} value={cond.title} onChange={e => {
                                    const list = [...service.conditions]; list[idx].title = e.target.value; setService({...service, conditions: list});
                                }} />
                            </div>
                            <div>
                                <label className={labelClass}>Description</label>
                                <RichTextEditor value={cond.description} onChange={val => {
                                    const list = [...service.conditions]; list[idx].description = val; setService({...service, conditions: list});
                                }} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ImageUploader label="Condition Image" value={cond.image} onChange={(url) => {
                                const list = [...service.conditions]; list[idx].image = url; setService({...service, conditions: list});
                            }} />
                            <ArrayInput label="Symptoms" items={cond.symptoms} onChange={(items) => {
                                const list = [...service.conditions]; list[idx].symptoms = items; setService({...service, conditions: list});
                            }} />
                        </div>
                    </div>
                 </div>
              ))}
           </div>

           {/* 2. Treatments Section */}
           <div className={sectionClass}>
              <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800"><Activity className="w-5 h-5 text-purple-500"/> Treatments</h2>
                  <button type="button" onClick={() => setService({...service, treatments: [...service.treatments, { 
                      title: "", description: "", instructions: [], procedureSteps: [], 
                      idealCandidate: { title: "", description: "", steps: [] },
                      evaluationProcess: { title: "", description: "", steps: [], bottomDescription: "" }
                  }]})} 
                    className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-md font-bold hover:bg-black flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Treatment
                  </button>
              </div>

              {service.treatments.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No treatments added yet.</p>}

              {service.treatments.map((treat, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-8 relative">
                      <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                        <h3 className="font-bold text-slate-800 text-lg">{treat.title || `Treatment #${idx + 1}`}</h3>
                        <button type="button" onClick={() => setService({...service, treatments: service.treatments.filter((_, i) => i !== idx)})}
                           className="text-slate-400 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                      </div>

                      {/* Basic Info */}
                      <div className="space-y-4">
                         <input className={inputClass} placeholder="Treatment Title" value={treat.title} onChange={e => {
                             const list = [...service.treatments]; list[idx].title = e.target.value; setService({...service, treatments: list});
                         }} />
                         <div>
                            <label className={labelClass}>Overview Description</label>
                            <RichTextEditor value={treat.description} onChange={val => {
                                const list = [...service.treatments]; list[idx].description = val; setService({...service, treatments: list});
                            }} />
                         </div>
                      </div>

                      {/* Steps & Instructions */}
                      <div className="grid md:grid-cols-2 gap-6">
                         <ArrayInput label="Pre-op Instructions" items={treat.instructions} onChange={val => {
                             const list = [...service.treatments]; list[idx].instructions = val; setService({...service, treatments: list});
                         }} />
                         <ArrayInput label="Procedure Steps" items={treat.procedureSteps} onChange={val => {
                             const list = [...service.treatments]; list[idx].procedureSteps = val; setService({...service, treatments: list});
                         }} />
                      </div>
                      
                      {/* Ideal Candidate */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2"><Star className="w-4 h-4"/> Ideal Candidate</h3>
                          <input className={inputClass} placeholder="Section Title (e.g. Is this for you?)" value={treat.idealCandidate.title} onChange={e => {
                              const list = [...service.treatments]; list[idx].idealCandidate.title = e.target.value; setService({...service, treatments: list});
                          }} />
                          <div>
                            <label className={labelClass}>Description</label>
                            <RichTextEditor value={treat.idealCandidate.description} onChange={val => {
                                const list = [...service.treatments]; list[idx].idealCandidate.description = val; setService({...service, treatments: list});
                            }} />
                          </div>
                          <ArrayInput label="Candidate Criteria (Points)" items={treat.idealCandidate.steps} onChange={val => {
                              const list = [...service.treatments]; list[idx].idealCandidate.steps = val; setService({...service, treatments: list});
                          }} />
                      </div>

                      {/* Evaluation Process */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2"><Activity className="w-4 h-4"/> Evaluation Process</h3>
                          <input className={inputClass} placeholder="Section Title" value={treat.evaluationProcess.title} onChange={e => {
                              const list = [...service.treatments]; list[idx].evaluationProcess.title = e.target.value; setService({...service, treatments: list});
                          }} />
                          <div>
                            <label className={labelClass}>Description</label>
                            <RichTextEditor value={treat.evaluationProcess.description} onChange={val => {
                                const list = [...service.treatments]; list[idx].evaluationProcess.description = val; setService({...service, treatments: list});
                            }} />
                          </div>
                          <ArrayInput label="Process Steps" items={treat.evaluationProcess.steps} onChange={val => {
                              const list = [...service.treatments]; list[idx].evaluationProcess.steps = val; setService({...service, treatments: list});
                          }} />
                          <div>
                             <label className={labelClass}>Bottom Summary / Closing</label>
                             <RichTextEditor value={treat.evaluationProcess.bottomDescription} onChange={val => {
                                const list = [...service.treatments]; list[idx].evaluationProcess.bottomDescription = val; setService({...service, treatments: list});
                            }} />
                          </div>
                      </div>
                  </div>
              ))}
           </div>
           
           {/* 3. Benefits & FAQ */}
           <div className={sectionClass}>
               <h2 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-green-500"/> Benefits & FAQs</h2>
               
               {/* BENEFITS */}
               <div className="space-y-4 mb-8">
                  <input className={inputClass} placeholder="Benefits Main Title" value={service.benefits.title} onChange={e => setService({...service, benefits: {...service.benefits, title: e.target.value}})} />
                  <div>
                    <label className={labelClass}>Benefits Intro Description</label>
                    <RichTextEditor value={service.benefits.description} onChange={val => setService({...service, benefits: {...service.benefits, description: val}})} />
                  </div>
                  
                  {/* Benefits List Repeater */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                     <label className={labelClass}>Benefits List Points</label>
                     {service.benefits.list.map((benefit, i) => (
                        <div key={i} className="bg-white p-4 rounded border border-slate-200 mb-3 relative">
                            <button type="button" onClick={() => {
                                const updatedList = service.benefits.list.filter((_, idx) => idx !== i);
                                setService({...service, benefits: {...service.benefits, list: updatedList}});
                            }} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><X className="w-4 h-4"/></button>
                            
                            <input className={`${inputClass} mb-2 font-bold`} placeholder="Benefit Title" value={benefit.title} onChange={e => {
                                const list = [...service.benefits.list]; list[i].title = e.target.value;
                                setService({...service, benefits: {...service.benefits, list}});
                            }} />
                            <RichTextEditor value={benefit.description} onChange={val => {
                                const list = [...service.benefits.list]; list[i].description = val;
                                setService({...service, benefits: {...service.benefits, list}});
                            }} />
                        </div>
                     ))}
                     <button type="button" onClick={() => {
                        const list = [...service.benefits.list, { title: "", description: "" }];
                        setService({...service, benefits: {...service.benefits, list}});
                     }} className="text-xs bg-slate-800 text-white px-3 py-2 rounded font-bold">+ Add Benefit Point</button>
                  </div>
               </div>
               
               {/* FAQs */}
               <div className="border-t pt-6">
                  <input className={`${inputClass} mb-4`} placeholder="FAQ Section Title" value={service.faqTitle} onChange={e => setService({...service, faqTitle: e.target.value})} />
                  
                  <div className="space-y-4">
                    {service.faqs.map((faq, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded border border-slate-200 relative">
                             <button type="button" onClick={() => {
                                 const list = service.faqs.filter((_, idx) => idx !== i);
                                 setService({...service, faqs: list});
                             }} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><X className="w-4 h-4"/></button>

                             <label className={labelClass}>Question</label>
                             <input className={`${inputClass} mb-3`} placeholder="Enter question..." value={faq.question} onChange={e => {
                                 const list = [...service.faqs]; list[i].question = e.target.value; setService({...service, faqs: list});
                             }}/>
                             
                             <label className={labelClass}>Answer</label>
                             <RichTextEditor value={faq.answer} onChange={val => {
                                 const list = [...service.faqs]; list[i].answer = val; setService({...service, faqs: list});
                             }}/>
                        </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setService({...service, faqs: [...service.faqs, { question: "", answer: "" }]})} 
                    className="mt-4 text-xs bg-slate-800 text-white px-3 py-2 rounded font-bold">+ Add FAQ</button>
               </div>
           </div>
           {/* 4. Backlink Schema Section */}
<div className={sectionClass}>
  <div className="flex justify-between items-center border-b pb-4">
    <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
      <Link className="w-5 h-5 text-indigo-500" /> Backlink Schema
    </h2>
    <button
      type="button"
      onClick={addBacklinkSchemaBlock}
      className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-md font-bold hover:bg-black flex items-center gap-1"
    >
      <Plus className="w-3 h-3" /> Add Schema Block
    </button>
  </div>

  {service.backlinkSchema.length === 0 && (
    <p className="text-sm text-slate-400 italic text-center py-4">
      No backlink schema blocks added yet.
    </p>
  )}

  <div className="space-y-6 mt-4">
    {service.backlinkSchema.map((block, hIndex) => (
      <div key={hIndex} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-700 text-sm uppercase">Schema Block #{hIndex + 1}</h3>
          <button
            type="button"
            onClick={() => removeBacklinkSchemaBlock(hIndex)}
            className="text-slate-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Headline Input */}
        <div className="mb-4">
          <label className={labelClass}>Block Headline</label>
          <input
            type="text"
            placeholder="e.g. Related Treatments"
            value={block.headline}
            onChange={(e) => updateBacklinkHeadline(hIndex, e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Links List */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <label className={`${labelClass} mb-3 block`}>Links</label>
          
          <div className="space-y-3">
            {block.links.map((link, lIndex) => (
              <div key={lIndex} className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Link Name</span>
                  <input
                    type="text"
                    placeholder="Link Name"
                    value={link.name}
                    onChange={(e) => updateBacklinkLink(hIndex, lIndex, "name", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="flex-1 w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Destination URL</span>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => updateBacklinkLink(hIndex, lIndex, "url", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeBacklinkLink(hIndex, lIndex)}
                  className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition border border-red-100"
                  title="Remove Link"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addBacklinkLink(hIndex)}
            className="mt-4 text-xs bg-slate-100 text-slate-600 border border-slate-300 px-3 py-2 rounded font-bold hover:bg-slate-200 flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Link Row
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>

        {/* === RIGHT COLUMN (SIDEBAR) === */}
        <div className="space-y-6">
            
            {/* 1. Basic Info */}
            <div className={sectionClass}>
                <h2 className="font-bold text-sm uppercase text-slate-500 mb-4">Service Details</h2>
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Title</label>
                        <input className={inputClass} placeholder="e.g. Rhinoplasty" value={service.title} onChange={e => setService({...service, title: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelClass}>Badge</label>
                        <input className={inputClass} placeholder="e.g. Popular" value={service.badge} onChange={e => setService({...service, badge: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelClass}>Short Description</label>
                        <RichTextEditor value={service.description} onChange={val => setService({...service, description: val})} />
                    </div>
                </div>
            </div>

            {/* 2. Hero Image */}
            <div className={sectionClass}>
                <ImageUploader label="Hero Image" value={service.heroImage} onChange={(url) => setService({...service, heroImage: url})} />
            </div>

            {/* 3. Why Choose Us */}
            <div className={sectionClass}>
                <h2 className="font-bold text-sm uppercase text-slate-500 mb-4">Why Choose Us</h2>
                <div className="space-y-4">
                    <input className={inputClass} placeholder="Section Title" value={service.whyChoose.title} onChange={e => setService({...service, whyChoose: {...service.whyChoose, title: e.target.value}})} />
                    
                    <ImageUploader label="Doctor / Team Image" value={service.whyChoose.image} onChange={(url) => setService({...service, whyChoose: {...service.whyChoose, image: url}})} />

                    <div>
                        <label className={labelClass}>Description</label>
                        <RichTextEditor value={service.whyChoose.description} onChange={val => setService({...service, whyChoose: {...service.whyChoose, description: val}})} />
                    </div>
                </div>
            </div>

            {/* 4. Booking CTA */}
            <div className={sectionClass}>
                <h2 className="font-bold text-sm uppercase text-slate-500 mb-4">Booking CTA</h2>
                <div className="space-y-4">
                    <input className={inputClass} placeholder="Title" value={service.booking.title} onChange={e => setService({...service, booking: {...service.booking, title: e.target.value}})} />
                    <div>
                        <label className={labelClass}>Description</label>
                        <RichTextEditor value={service.booking.description} onChange={val => setService({...service, booking: {...service.booking, description: val}})} />
                    </div>
                </div>
            </div>
            
            {/* 5. SEO */}
            <div className={sectionClass}>
                <h2 className="font-bold text-sm uppercase text-slate-500 mb-4">SEO Settings</h2>
                <div className="space-y-4">
                    <input className={inputClass} placeholder="SEO Title" value={service.seoTitle} onChange={e => setService({...service, seoTitle: e.target.value})} />
                    <textarea rows={3} className={inputClass} placeholder="Meta Description" value={service.metaDescription} onChange={e => setService({...service, metaDescription: e.target.value})} />
                    <input className={inputClass} placeholder="Keywords" value={service.metaKeywords} onChange={e => setService({...service, metaKeywords: e.target.value})} />
                    <input className={inputClass} placeholder="URL Slug" value={service.url} onChange={e => setService({...service, url: e.target.value})} />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}