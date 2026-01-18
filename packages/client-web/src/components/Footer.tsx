import Link from "next/link";
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube 
} from "lucide-react";

export default function Footer() {
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
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A62B2B] hover:text-white transition duration-300"
                >
                  <Icon className="w-5 h-5" />
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

          {/* COLUMN 3: Services */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4 text-sm">
              {[
                "Coronary Angioplasty",
                "Heart Valve Procedures",
                "Pacemaker Implantation",
                "Cardiac Catheterisation",
                "TAVR Procedures",
                "Cardiac Ablation"
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="hover:text-[#A62B2B] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact Info */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A62B2B] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jayanthi Hospitals, Secunderabad, <br /> Hyderabad, Telangana 500003
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#A62B2B] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#A62B2B] shrink-0" />
                <span>info@drsaratchandra.com</span>
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