import AboutHero from "../../components/about/AboutHero";
import Biography from "../../components/about/Biography";
import Qualifications from "../../components/about/Qualifications";
import Awards from "../../components/about/Awards"; 
import AppointmentSection from "../../components/home/AppointmentSection"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr Sarat Chandra | Cardiology & Heart Hospital in SR Nagar & Ameerpet, Hyderabad",
  description: "Consult Dr. Sarat Chandra, a leading cardiologist in Hyderabad associated with top heart hospitals in SR Nagar and Ameerpet. Expert cardiac diagnosis and advanced treatment.",
  keywords: ["Dr Sarat Chandra hospitals", "Cardiologist hospital in SR Nagar,Hyderabad", "Heart hospitals in Sr Nagar Hyderabad"],
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      <Biography />
      <Qualifications />
      <Awards />
      <AppointmentSection />
    </main>
  );
}