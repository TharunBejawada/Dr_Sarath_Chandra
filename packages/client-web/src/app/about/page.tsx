import AboutHero from "../../components/about/AboutHero";
import Biography from "../../components/about/Biography";
import Qualifications from "../../components/about/Qualifications";
import Awards from "../../components/about/Awards"; 
import AppointmentSection from "../../components/home/AppointmentSection"; 

export const metadata = {
  title: "About Dr. Sarat Chandra | Top Cardiologist Hyderabad",
  description: "Learn about Dr. K. Sarat Chandra's 40+ years of experience in interventional cardiology.",
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