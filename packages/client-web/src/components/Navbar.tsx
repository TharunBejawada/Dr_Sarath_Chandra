"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Doctor", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Conditions Treated", href: "/conditions" },
    { name: "Blogs", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-24 flex items-center justify-between relative bg-white z-50">
        
        {/* LEFT: Logo Section */}
        <Link href="/" className="flex items-center gap-4 group">
          {/* Heart Icon Circle */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#A62B2B] flex items-center justify-center text-white shrink-0 group-hover:bg-[#8E2424] transition">
            <Heart className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </div>
          
          {/* Name & Title */}
          <div className="flex flex-col">
            <h1 className="font-serif text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              Dr. K. Sarat Chandra
            </h1>
            <span className="text-[10px] md:text-sm text-gray-500 font-medium tracking-wide">
              Senior Interventional Cardiologist | Hyderabad
            </span>
          </div>
        </Link>

        {/* CENTER: Desktop Navigation (Hidden on Mobile/Tablet) */}
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

        {/* RIGHT: Call Button (Visible on Tablet+, Hidden on small Mobile) */}
        <div className="hidden md:flex items-center">
          <Link
            href="tel:+919989925612"
            className="flex items-center gap-2 bg-[#A62B2B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#8E2424] transition shadow-md hover:shadow-lg"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>Call Now</span>
          </Link>
        </div>

        {/* MOBILE TOGGLE BUTTON (Visible up to XL) */}
        <div className="xl:hidden">
             <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-[#A62B2B] transition"
                aria-label="Toggle Menu"
             >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
             </button>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-gray-100 overflow-hidden shadow-lg absolute top-24 left-0 w-full z-40"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Close menu on click
                  className="text-lg font-medium text-gray-700 hover:text-[#A62B2B] hover:pl-2 transition-all duration-300 border-b border-gray-50 pb-2"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Call Button (Only visible here if screen is small) */}
              <Link
                href="tel:+919989925612"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 bg-[#A62B2B] text-white px-6 py-4 rounded-md font-bold text-lg hover:bg-[#8E2424] transition shadow-md"
              >
                <Phone className="w-5 h-5 fill-current" />
                <span>Call +91 99899 25612</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}