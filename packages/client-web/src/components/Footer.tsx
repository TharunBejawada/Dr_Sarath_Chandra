"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube 
} from "lucide-react";
import { API_URL } from "../config"; // Adjust path as needed

// --- TYPES ---
interface Service {
  serviceId: string;
  title: string;
  url: string;
}

export default function Footer() {
  const [services, setServices] = useState<Service[]>([]);

  // Configuration for Social Links
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/drksaratchandra/" },
    { icon: Instagram, href: "https://www.instagram.com/drksaratchandra/" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UCr_fYkZiUmig-MCHCjFZMcA" },
  ];

  // --- FETCH SERVICES ---
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_URL}/api/services/getAllServices`);
        if (res.ok) {
          const data = await res.json();
          // Handle API response structure (Items array vs direct array)
          const list = data.Items || (Array.isArray(data) ? data : []);
          setServices(list);
        }
      } catch (error) {
        console.error("Footer: Failed to fetch services", error);
      }
    }
    fetchServices();
  }, []);

  return (
    <footer className="bg-[#1A202C] text-gray-300 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* TOP SECTION: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMN 1: Brand & Bio */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#A62B2B] flex items-center justify-center text-white shrink-0">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <h2 className="font-serif text-xl font-bold text-white leading-tight">
                  Dr. K. Sarat Chandra
                </h2>
                <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                  Interventional Cardiologist
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              Senior Interventional Cardiologist with nearly 40 years of expertise in complex heart procedures and preventive cardiology.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A62B2B] hover:text-white transition duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Doctor", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Conditions Treated", href: "/conditions" },
                { name: "Blog", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#A62B2B] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Services (Dynamic) */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4 text-sm">
              {services.length > 0 ? (
                // Show top 6 services dynamically
                services.slice(0, 6).map((service) => (
                  <li key={service.serviceId}>
                    <Link 
                      href={service.url ? `/services${service.url}` : "#"} 
                      className="hover:text-[#A62B2B] transition-colors line-clamp-1"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback / Loading State (Optional: Keep it empty or show skeleton)
                <li className="text-gray-500 italic">Loading services...</li>
              )}
              
              {/* 'View All' Link if there are many services */}
              {services.length > 6 && (
                <li>
                  <Link href="/services" className="text-[#A62B2B] font-semibold hover:underline mt-2 inline-block">
                    View All Services →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* COLUMN 4: Contact Info */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A62B2B] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jayanthi Super Specialty Hospital, <br/> 7-1-621/11A, near UMESH CHANDRA STAUE, Sanjeeva Reddy Nagar Office Area, Sanjeeva Reddy Nagar, <br /> Hyderabad, Telangana 500038
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#A62B2B] shrink-0" />
                <span>+91 9989925612</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#A62B2B] shrink-0" />
                <span>drksaratchandra@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Dr. K. Sarat Chandra. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="hover:text-white transition">Admin Login</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}