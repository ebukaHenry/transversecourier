import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { Package, Truck, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#19477F] text-white px-6 md:px-16 py-24">
        <div className="max-w-4xl">
          <p className="text-[#FF8A32] font-bold mb-4">
            TRANSVERSE COURIER SERVICES
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Delivering Your Packages,
            <span className="text-[#FF8A32]"> Connecting Your World.</span>
          </h1>

          <p className="text-lg text-blue-100 mb-8 max-w-2xl">
            Reliable, secure and efficient courier solutions.
            We make sending and receiving packages easier.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="bg-[#EA6505] px-7 py-4 rounded-lg font-bold"
            >
              Book a Delivery <ArrowRight className="inline ml-2" size={18} />
            </Link>

            <Link
              href="/track"
              className="bg-white text-[#19477F] px-7 py-4 rounded-lg font-bold"
            >
              Track Your Parcel
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-16 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#19477F]">
            Our Services
          </h2>
          <p className="text-gray-600 mt-3">
            Delivery solutions designed around your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Package size={35} />,
              title: "Parcel Delivery",
              description: "Safe and reliable delivery of your packages."
            },
            {
              icon: <Truck size={35} />,
              title: "Express Delivery",
              description: "Fast delivery solutions when time matters."
            },
            {
              icon: <MapPin size={35} />,
              title: "Package Tracking",
              description: "Stay informed about your parcel's progress."
            }
          ].map((service, index) => (
            <div key={index} className="p-8 border rounded-xl hover:shadow-lg transition">
              <div className="text-[#EA6505] mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#19477F] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 text-center px-6 py-16">
        <h2 className="text-3xl font-bold text-[#19477F] mb-4">
          Ready to Send a Package?
        </h2>
        <p className="text-gray-600 mb-7">
          Let Transverse take care of your delivery.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-[#EA6505] text-white px-8 py-4 rounded-lg font-bold"
        >
          Book Your Delivery
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#19477F] text-white text-center p-6">
        © {new Date().getFullYear()} Transverse Courier Services. All rights reserved.
      </footer>

    </main>
  );
}
