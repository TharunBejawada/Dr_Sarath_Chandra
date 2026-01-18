"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Activity, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { API_URL } from "../../../config";

export default function ServicesList() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/api/services/getAllServices`)
      .then(res => res.json())
      .then(data => setServices(data.Items || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Services</h1>
           <p className="text-slate-500 mt-1">Manage your medical treatments and procedures.</p>
        </div>
        <button
          onClick={() => router.push("/admin/services/add")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 font-bold shadow-lg"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      {loading ? (
        <p className="text-center text-slate-500 py-12">Loading services...</p>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No services added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.serviceId}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col"
              onClick={() => router.push(`/admin/services/${service.serviceId}`)}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.heroImage || "https://placehold.co/600x400?text=Service"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                    {service.badge || "General"}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                 <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
                    {service.badge}
                 </p>
                 
                 <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                        {service.enabled ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Active
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                                <XCircle className="w-3.5 h-3.5" /> Hidden
                            </span>
                        )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}