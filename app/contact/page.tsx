
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Your message form is ready. We'll connect it to the backend shortly.");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-[#19477F] text-white text-center py-20 px-5">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-blue-100">
          We are ready to assist with your delivery needs.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        <div>
          <h2 className="text-2xl font-bold text-[#19477F] mb-7">
            Get in Touch
          </h2>

          <p className="text-gray-600 leading-7 mb-8">
            Have questions about our services or need assistance
            with a delivery? Reach out to our team.
          </p>

          <div className="space-y-7">
            <div className="flex gap-4 items-center">
              <Phone className="text-[#EA6505]" size={27} />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-gray-600">Company phone number</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Mail className="text-[#EA6505]" size={27} />
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-600">Company email address</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <MapPin className="text-[#EA6505]" size={27} />
              <div>
                <h3 className="font-bold">Location</h3>
                <p className="text-gray-600">Company office address</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}
          className="bg-white p-7 md:p-9 rounded-xl shadow-sm space-y-5">

          <h2 className="text-2xl font-bold text-[#19477F]">
            Send Us a Message
          </h2>

          <input name="name" required placeholder="Your name"
            className="w-full border p-3 rounded-lg" />

          <input name="email" type="email" required placeholder="Your email"
            className="w-full border p-3 rounded-lg" />

          <input name="subject" required placeholder="Subject"
            className="w-full border p-3 rounded-lg" />

          <textarea name="message" required rows={5}
            placeholder="Your message"
            className="w-full border p-3 rounded-lg" />

          <button type="submit"
            className="w-full bg-[#EA6505] text-white font-bold p-4 rounded-lg flex justify-center items-center gap-2">
            Send Message <Send size={18} />
          </button>

          {message && (
            <p className="text-sm text-[#19477F]">{message}</p>
          )}
        </form>
      </section>

      <footer className="bg-[#19477F] text-white text-center p-6">
        © {new Date().getFullYear()} Transverse Courier Services.
        All rights reserved.
      </footer>
    </main>
  );
}
