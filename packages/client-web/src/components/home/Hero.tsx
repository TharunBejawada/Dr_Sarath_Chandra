import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-slate-50">
      
      {/* 1. THE IMAGE
        We use a standard img tag with w-full and h-auto.
        This guarantees the aspect ratio is locked, so the bottom text 
        is NEVER cut off, regardless of screen width.
      */}
      <img 
        src="/hero-banner.png" 
        alt="Doctor Hero Banner"
        className="w-full h-auto block"
      />

      {/* 2. THE BUTTONS (Overlay)
        Positioned absolutely on top of the image.
        
        - 'bottom-[5%]': Pins them 5% from the bottom edge (adjust this if they are too high/low).
        - 'left-[4%]': Aligns with the text design in the image.
        - 'xl:bottom-[8%]': Slightly higher adjustment for very large screens.
      */}
      <div className="absolute left-[4%] sm:left-[6%] bottom-[5%] xl:bottom-[8%] max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          
          {/* Button 1: Book Appointment */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#A62B2B] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-md font-semibold text-sm sm:text-lg hover:bg-[#8E2424] transition shadow-md whitespace-nowrap"
          >
            <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Book an Appointment</span>
          </Link>

          {/* Button 2: Call Now */}
          <Link
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#A62B2B] border-2 border-[#A62B2B] px-5 py-3 sm:px-8 sm:py-4 rounded-md font-semibold text-sm sm:text-lg hover:bg-gray-50 transition shadow-sm whitespace-nowrap"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Call Now</span>
          </Link>

        </div>
      </div>

    </section>
  );
}