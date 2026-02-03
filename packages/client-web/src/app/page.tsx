import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import AppointmentSection from "../components/home/AppointmentSection";
import Conditions from "../components/home/Conditions";
import Awards from "../components/home/Awards";
import Testimonials from "../components/home/Testimonials";
import LatestBlog from "../components/home/LatestBlog";
import { Metadata } from "next";
import HomeTestimonials from "../components/home/HomeTestimonials";

export const metadata: Metadata = {
  title: "Dr Sarat Chandra | Best Cardiologist & Heart Specialist in Hyderabad",
  description: "Sr. Consultant - Dr Sarat Chandra, one of Hyderabad’s leading cardiologists and heart specialists offering advanced cardiac care in SR Nagar and Ameerpet.",
  keywords: ["Dr Sarat Chandra", "Cardiologist in SR Nagar,Hyderabad", "Heart Specialist in Sr Nagar Hyderabad"],
  
  // Robots
  robots: {
    index: true,
    follow: true,
  },

  // Verification
  verification: {
    google: "scztKMUE8-nr2Qf6dxnsby90Sk_vkos17Q8f3-Chbw8",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <AppointmentSection />
       <Services /> 
       <Conditions />
       <Awards />
       <Testimonials />
       <HomeTestimonials />
       <LatestBlog />
    </div>
  );
}