import Navbar from "../components/Navbar";
import Link from "next/link";
import { Package, Truck, MapPin, Zap, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: <Package size={40} />,
      title: "Parcel Delivery",
      description: "Reliable collection and delivery of personal and business packages."
    },
    {
      icon: <Truck size={40} />,
      title: "Express Delivery",
      description: "Priority delivery solutions for time-sensitive packages."
    },
    {
      icon: <MapPin size={40} />,
      title: "Door-to-Door Delivery",
      description: "Convenient parcel collection and delivery to your preferred addresses."
    },
    {
      icon: <Zap size={40} />,
      title: "Business Logistics",
      description: "Delivery support for businesses and organisations."
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-[#19477F] text-white text-center py-20 px-5">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="mt-4 text-blue-100">
          Delivery solutions that move your world forward.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title}
              className="border rounded-xl p-8 hover:shadow-lg transition">
              <div className="text-[#EA6505] mb-5">
                {service.icon}
              </div>

              <h2 className="text-2xl font-bold text-[#19477F] mb-3">
                {service.title}
              </h2>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-[#19477F]">
            Need a Delivery?
          </h2>

          <p className="text-gray-600 mt-3 mb-7">
            Let us help you move your package.
          </p>

          <Link href="/booking"
            className="inline-flex items-center gap-2 bg-[#EA6505] text-white px-8 py-4 rounded-lg font-bold">
            Book a Delivery <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="bg-[#19477F] text-white text-center p-6">
        © {new Date().getFullYear()} Transverse Courier Services.
        All rights reserved.
      </footer>
    </main>
  );
}
