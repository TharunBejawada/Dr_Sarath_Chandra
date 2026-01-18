"use client";

import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";

export default function ServiceForm() {
  const [activeTab, setActiveTab] = useState("basic");
  
  // Tabs to organize the massive amount of data
  const tabs = [
    { id: "basic", label: "Basic Info & SEO" },
    { id: "hero", label: "Hero & Condition" },
    { id: "treatment", label: "Treatment Details" },
    { id: "benefits", label: "Benefits & Candidates" },
    { id: "faqs", label: "FAQs" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Tab Header */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        <form className="space-y-8">
          
          {/* TAB 1: BASIC INFO & SEO */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-2">General Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Service Title</label>
                  <input type="text" className="admin-input" placeholder="e.g. Transcatheter Aortic Valve Replacement" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Badge Text</label>
                  <input type="text" className="admin-input" placeholder="e.g. TAVR in Hyderabad" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Short Subtitle</label>
                  <textarea className="admin-input" rows={2} placeholder="Advanced, minimally invasive treatment..." />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mt-8">SEO Metadata</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Meta Title</label>
                  <input type="text" className="admin-input" placeholder="TAVR Procedure | Dr. Sarat Chandra" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">URL Slug</label>
                  <div className="flex">
                    <span className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg px-3 py-2 text-slate-500 text-sm flex items-center">/services/</span>
                    <input type="text" className="admin-input rounded-l-none" placeholder="tavr-procedure" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Meta Description</label>
                  <textarea className="admin-input" rows={2} placeholder="Learn about TAVR, a minimally invasive alternative..." />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Keywords (comma separated)</label>
                  <input type="text" className="admin-input" placeholder="TAVR, Aortic Stenosis, Heart Valve, Hyderabad" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & CONDITION */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Hero Image</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-blue-50 transition cursor-pointer">
                <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Click to upload Hero Image (1920x1080)</p>
              </div>

              <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mt-8">Condition Section</h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-sm font-medium text-slate-700">Condition Title</label>
                    <input type="text" className="admin-input" placeholder="What Is Aortic Valve Stenosis?" />
                 </div>
                 <div>
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea className="admin-input" rows={4} />
                 </div>
                 <div>
                    <label className="text-sm font-medium text-slate-700">Condition Diagram (Image)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50 text-sm text-slate-500">
                       Upload Diagram
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* TAB 3: TREATMENT */}
          {activeTab === "treatment" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Treatment Overview</h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-sm font-medium text-slate-700">Treatment Title</label>
                    <input type="text" className="admin-input" placeholder="What Is TAVR?" />
                 </div>
                 <div>
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea className="admin-input" rows={4} />
                 </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mt-8">Procedure Steps</h3>
              {/* This would map through a dynamic list in a real app */}
              <div className="space-y-4 bg-slate-50 p-4 rounded-xl">
                 <div className="flex items-start gap-4">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded">1</span>
                    <div className="flex-1 space-y-2">
                       <input type="text" className="admin-input" placeholder="Step Title (e.g. Catheter Insertion)" />
                       <textarea className="admin-input" rows={2} placeholder="Step Description" />
                    </div>
                    <button type="button" className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                 </div>
                 <button type="button" className="text-sm text-blue-600 font-semibold flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Step
                 </button>
              </div>
            </div>
          )}
          
          {/* TAB 4: BENEFITS & CANDIDATES */}
          {activeTab === "benefits" && (
             <div className="space-y-6">
                <p className="text-slate-500 italic">This section would have dynamic list editors for Benefits cards and Candidate Checklist similar to the Steps editor above.</p>
             </div>
          )}

          {/* TAB 5: FAQs */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                 {/* FAQ Item 1 */}
                 <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <div className="space-y-3">
                       <input type="text" className="admin-input font-medium" placeholder="Question" defaultValue="Is TAVR safe for elderly patients?" />
                       <textarea className="admin-input" rows={3} placeholder="Answer" defaultValue="Yes, TAVR is specifically designed..." />
                    </div>
                 </div>
                 
                 {/* Add Button */}
                 <button type="button" className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Add New FAQ
                 </button>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
             <button type="button" className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition">Cancel</button>
             <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition">Save Changes</button>
          </div>

        </form>
      </div>

      {/* Global Admin Styles */}
      <style jsx global>{`
        .admin-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.2s;
        }
        .admin-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
}