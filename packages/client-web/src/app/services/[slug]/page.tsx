import ServiceDetail from "../../../components/services/ServiceDetail";

export function generateMetadata({ params }: { params: { slug: string } }) {
  // In the future, fetch service name from backend using params.slug
  return {
    title: `Transcatheter Aortic Valve Replacement (TAVR) | Dr. K. Sarat Chandra`,
    description: "Expert TAVR procedure in Hyderabad by Dr. K. Sarat Chandra.",
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  // Currently, we just render the TAVR component regardless of the slug.
  // In the future, you will pass 'params.slug' to the component to fetch real data.
  return <ServiceDetail />;
}