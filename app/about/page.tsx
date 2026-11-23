import Navbar from "../components/Navbar";
import { ShieldCheck, Truck, Clock, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#19477F] text-white text-center py-20 px-5">
        <h1 className="text-4xl font-bold">About Transverse</h1>
        <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
          Connecting people and businesses through reliable
          courier and delivery solutions.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#EA6505] font-bold mb-3">WHO WE ARE</p>
          <h2 className="text-3xl font-bold text-[#19477F] mb-5">
            Delivering More Than Just Packages
          </h2>
          <p className="text-gray-600 leading-8">
            Transverse Courier Services is committed to making
            parcel delivery simple, dependable and convenient.
            We understand the importance of every package and
            work to ensure that deliveries reach their intended
            destinations safely.
          </p>
          <p className="text-gray-600 leading-8 mt-4">
            Whether you are sending personal items or business
            packages, our goal is to provide a dependable
            delivery experience.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-10">
          <Truck size={100} className="text-[#EA6505] mx-auto" />
          <h3 className="text-2xl font-bold text-[#19477F] text-center mt-6">
            Your Delivery, Our Responsibility
          </h3>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck size={35} />, title: "Reliability", text: "Dependable delivery services." },
            { icon: <Truck size={35} />, title: "Efficiency", text: "Practical delivery solutions." },
            { icon: <Clock size={35} />, title: "Timeliness", text: "Respect for delivery schedules." },
            { icon: <Target size={35} />, title: "Commitment", text: "Customer-focused service." },
          ].map((item) => (
            <div key={item.title} className="bg-white p-7 rounded-xl text-center shadow-sm">
              <div className="text-[#EA6505] flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#19477F] text-xl">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#19477F] text-white text-center p-6">
        © {new Date().getFullYear()} Transverse Courier Services.
        All rights reserved.
      </footer>
    </main>
  );
}
