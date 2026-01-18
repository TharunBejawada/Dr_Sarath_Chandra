import { Calendar, Phone, Mail, Send, User, Smartphone } from "lucide-react";

export default function AppointmentSection() {
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
                  <p className="text-xl font-bold">+91 98765 43210</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-red-200 text-sm">Email Us</p>
                  <p className="text-lg font-medium break-all">appointments@drsaratchandra.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              Request an Appointment
            </h3>

            <form className="space-y-5">
              
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Phone Input */}
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Message Input */}
              <textarea 
                rows={4}
                placeholder="Describe your concern..."
                className="w-full p-4 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-[#A62B2B] focus:ring-0 transition outline-none text-gray-900 placeholder:text-gray-400 resize-none"
              ></textarea>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#A62B2B] text-white font-bold py-4 rounded-lg hover:bg-[#8E2424] transition shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-5 h-5" />
                Book Appointment
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}