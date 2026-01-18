export default function MapSection() {
  return (
    <section id="map" className="h-[450px] w-full bg-gray-200 relative">
      {/* Replace the src below with the actual "Embed Map" link from Google Maps 
         for "Jayanthi Hospitals, Hyderabad"
      */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.857644976725!2d78.4975!3d17.4435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a3b5c3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sSecunderabad%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
        width="100%" 
        height="100%" 
        style={{ border: 0, filter: "grayscale(100%) hover:grayscale(0%) transition duration-500" }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      {/* Optional: Overlay Card */}
      <div className="absolute bottom-6 left-6 md:left-12 bg-white p-4 rounded-xl shadow-lg max-w-xs hidden sm:block">
         <p className="font-bold text-gray-900">Jayanthi Hospitals</p>
         <p className="text-xs text-gray-500">Directions via Google Maps</p>
      </div>
    </section>
  );
}