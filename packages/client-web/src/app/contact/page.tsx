import ContactSection from "../../components/contact/ContactSection";
import MapSection from "../../components/contact/MapSection";

export const metadata = {
  title: "Contact Us | Dr. K. Sarat Chandra",
  description: "Get in touch with Dr. K. Sarat Chandra's clinic for appointments and inquiries.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ContactSection />
      <MapSection />
    </main>
  );
}