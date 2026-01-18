import Link from "next/link";
import { Phone, Heart } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Doctor", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Conditions Treated", href: "/conditions" },
    // { name: "Awards", href: "/awards" },
    // { name: "Testimonials", href: "/testimonials" },
    { name: "Blogs", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-24 flex items-center justify-between">
        
        {/* LEFT: Logo Section */}
        <Link href="/" className="flex items-center gap-4 group">
          {/* Heart Icon Circle */}
          <div className="w-12 h-12 rounded-full bg-[#A62B2B] flex items-center justify-center text-white shrink-0 group-hover:bg-[#8E2424] transition">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          
          {/* Name & Title */}
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl font-bold text-gray-900 leading-tight">
              Dr. K. Sarat Chandra
            </h1>
            <span className="text-sm text-gray-500 font-medium tracking-wide">
              Senior Interventional Cardiologist | Hyderabad
            </span>
          </div>
        </Link>

        {/* CENTER: Navigation Links (Hidden on Mobile) */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-[#A62B2B] font-medium text-[15px] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: Call Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="tel:+919876543210"
            className="flex items-center gap-2 bg-[#A62B2B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#8E2424] transition shadow-md hover:shadow-lg"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>Call Now</span>
          </Link>
        </div>

        {/* Mobile Menu Icon (Placeholder for now) */}
        <div className="xl:hidden">
             {/* You can add a hamburger menu here later if needed */}
             <button className="text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
             </button>
        </div>

      </div>
    </nav>
  );
}