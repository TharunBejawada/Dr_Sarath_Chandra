"use client";

import { useState } from "react";
import { 
  Calendar, 
  Phone, 
  Mail, 
  Send, 
  User, 
  Smartphone, 
  Loader2, 
  CheckCircle2 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AppointmentSection() {
  const router = useRouter();
  
  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // --- HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          page: "Home Page - Appointment Section" // Identifies the source
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", mobile: "", email: "", message: "" }); // Reset form
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // Shared input styles
  const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none text-gray-900 placeholder:text-gray-400";

  return (
    // Background: Deep Red Gradient
    <section className="bg-gradient-to-br from-[#A62B2B] to-[#8E2424] py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="text-white space-y-8 pt-4">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight">
              Schedule Your Consultation Today
            </h2>
            
            {/* Description */}
            <p className="text-red-100 text-lg leading-relaxed max-w-xl opacity-90">
              Consult an experienced Interventional Cardiologist for accurate diagnosis and advanced treatment. Our team is ready to provide you with world-class cardiac care.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 pt-4">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-red-200 text-sm">Call Us</p>
                  <p className="text-xl font-bold">+91 7729910108</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-red-200 text-sm">Email Us</p>
                  <p className="text-lg font-medium break-all">drksaratchandra@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl min-h-[500px] flex flex-col justify-center">
            
            {status === "success" ? (
              // --- SUCCESS STATE ---
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Request Sent!</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  Thank you for booking an appointment. Our team will contact you shortly to confirm the timings.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition"
                >
                  Book Another
                </button>
              </motion.div>
            ) : (
              // --- FORM STATE ---
              <>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">
                  Request an Appointment
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name Input */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={inputClass}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      required
                      placeholder="Phone Number" 
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className={inputClass}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={inputClass}
                    />
                  </div>

                  {/* Message Input */}
                  <textarea 
                    rows={4}
                    placeholder="Describe your concern..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none text-gray-900 placeholder:text-gray-400 resize-none"
                  ></textarea>

                  {/* Error Message */}
                  {status === "error" && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center border border-red-100">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#A62B2B] text-white font-bold py-4 rounded-lg hover:bg-[#8E2424] transition shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Booking...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Book Appointment
                      </>
                    )}
                  </button>

                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}