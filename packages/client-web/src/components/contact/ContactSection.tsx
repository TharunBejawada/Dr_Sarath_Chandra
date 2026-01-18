"use client";

import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare 
} from "lucide-react";

export default function ContactSection() {
  
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      value: "+91 98765 43210",
      sub: "Mon-Sat 9am to 6pm",
      action: "tel:+919876543210"
    },
    {
      icon: Mail,
      title: "Email Address",
      value: "info@drsaratchandra.com",
      sub: "Online support 24/7",
      action: "mailto:info@drsaratchandra.com"
    },
    {
      icon: MapPin,
      title: "Hospital Location",
      value: "Jayanthi Hospitals",
      sub: "Secunderabad, Hyderabad 500003",
      action: "#map"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-widest mb-4"
          >
            Get in Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-gray-900"
          >
            We are here to help you.
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.action}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-red-100 hover:shadow-lg hover:shadow-red-50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-[#A62B2B] group-hover:bg-[#A62B2B] group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">{item.title}</h3>
                  <p className="text-[#A62B2B] font-medium">{item.value}</p>
                  <p className="text-gray-400 text-sm">{item.sub}</p>
                </div>
              </motion.a>
            ))}

            {/* Emergency Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-8 bg-[#0F172A] rounded-2xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#F59E0B]" /> Emergency Hours
              </h3>
              <p className="text-gray-400 mb-6">
                Our emergency department is open 24/7 for critical cardiac care.
              </p>
              <a href="tel:108" className="inline-block bg-[#A62B2B] hover:bg-[#8E2424] text-white font-bold py-3 px-6 rounded-lg transition">
                Call Emergency: 108
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
          >
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              Send us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Your Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea 
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#A62B2B] text-white font-bold py-4 rounded-xl hover:bg-[#8E2424] transition shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}