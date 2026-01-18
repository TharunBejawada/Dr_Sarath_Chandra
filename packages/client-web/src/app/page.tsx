import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import AppointmentSection from "../components/home/AppointmentSection";
import Conditions from "../components/home/Conditions";
import Awards from "../components/home/Awards";
import Testimonials from "../components/home/Testimonials";
import LatestBlog from "../components/home/LatestBlog";

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
       <LatestBlog />
    </div>
  );
}