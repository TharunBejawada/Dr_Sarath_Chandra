import Conditions from "../../components/home/Conditions";
import ServiceCTA from "../../components/services/ServiceCTA";

export const metadata = {
  title: "Conditions Treated | Dr. K. Sarat Chandra",
  description: "Comprehensive list of conditions treatment offered by Dr. K. Sarat Chandra.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Conditions />
      <ServiceCTA />
    </main>
  );
}