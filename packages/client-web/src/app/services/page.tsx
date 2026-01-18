import ServicesList from "../../components/services/ServicesList";
import ServiceCTA from "../../components/services/ServiceCTA";

export const metadata = {
  title: "Services | Dr. K. Sarat Chandra",
  description: "Comprehensive list of interventional cardiology procedures offered by Dr. K. Sarat Chandra.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <ServicesList />
      <ServiceCTA />
    </main>
  );
}