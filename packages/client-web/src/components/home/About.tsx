import Link from "next/link";
import { Clock, Users, Heart, Award, ChevronRight } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Image with Decorative Background */}
          <div className="relative">
            {/* Decorative Outline/Shape behind the image */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#A62B2B]/20 rounded-tr-[3rem] rounded-bl-[3rem] -z-10 translate-x-4 translate-y-4"></div>
            
            {/* The Image Container */}
            <div className="relative rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden shadow-xl">
               {/* Replace this src with your actual image file.
                  Ensure 'doctor-about.jpg' is in your public folder.
               */}
              <img 
                src="/doctor-about.jpg" 
                alt="Dr. K. Sarat Chandra" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#A62B2B]"></span>
              About the Doctor
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Dr. K. Sarat Chandra
            </h2>
            
            {/* Subheading */}
            <p className="text-[#A62B2B] font-semibold text-lg mb-6 leading-relaxed">
              Senior Interventional Cardiologist | Chief Cardiologist – Jayanthi Hospitals, Hyderabad
            </p>

            {/* Body Text */}
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Dr. K. Sarat Chandra is a highly respected Senior Interventional Cardiologist with nearly <b>40 years of clinical excellence</b> in diagnosing and treating complex heart conditions. He currently serves as the <b>Chief Interventional Cardiologist at Jayanthi Hospitals, Hyderabad</b>, where he leads advanced cardiac care and life-saving interventions.
              </p>
              <p>
                Renowned for his expertise in <b>coronary angioplasty, heart valve procedures, structural heart interventions, and minimally invasive cardiac therapies</b>, Dr. Sarat Chandra combines global training with cutting-edge technology to deliver safe, patient-focused outcomes.
              </p>
              <p>
                His commitment to <b>clinical precision, preventive cardiology, and ethical care</b> has earned him national and international recognition, making him one of the most trusted names in cardiology in Hyderabad.
              </p>
            </div>

            {/* CTA Button */}
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#A62B2B] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#8E2424] transition shadow-md mb-12"
            >
              Book a Consultation <ChevronRight className="w-5 h-5" />
            </Link>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
              {[
                { icon: Clock, val: "40+", label: "Years Experience" },
                { icon: Users, val: "50K+", label: "Patients Treated" },
                { icon: Heart, val: "25K+", label: "Procedures Done" },
                { icon: Award, val: "15+", label: "Awards Won" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-6 h-6 text-[#A62B2B] mx-auto mb-3" />
                  <p className="text-2xl font-serif font-bold text-gray-900">{stat.val}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}