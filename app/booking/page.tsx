
"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Package, Send } from "lucide-react";

export default function BookingPage() {
  const [status, setStatus] = useState("");

  // function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   setStatus("Booking form is ready. Database integration is coming next.");
  // }


async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  setStatus("Submitting your booking...");

  const formData = new FormData(event.currentTarget);

  const bookingData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Booking submission failed.");
    }

    setStatus(
      `Booking submitted successfully! Your booking reference is ${result.bookingId}.`
    );

    event.currentTarget.reset();

  } catch (error) {
    setStatus(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
}


  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-[#19477F] text-white text-center py-16 px-5">
        <Package size={45} className="mx-auto mb-4 text-[#EA6505]" />

        <h1 className="text-3xl md:text-4xl font-bold">
          Book a Delivery
        </h1>

        <p className="mt-3 text-blue-100">
          Let us handle your package with care.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-14">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 md:p-10 space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#19477F]">
            Delivery Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-2">
                Sender's Name
              </label>
              <input
                name="senderName"
                required
                className="w-full border rounded-lg p-3"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Sender's Phone
              </label>
              <input
                name="senderPhone"
                type="tel"
                required
                className="w-full border rounded-lg p-3"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Receiver's Name
              </label>
              <input
                name="receiverName"
                required
                className="w-full border rounded-lg p-3"
                placeholder="Receiver's full name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Receiver's Phone
              </label>
              <input
                name="receiverPhone"
                type="tel"
                required
                className="w-full border rounded-lg p-3"
                placeholder="Receiver's phone"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Pickup Address
            </label>
            <textarea
              name="pickupAddress"
              required
              rows={3}
              className="w-full border rounded-lg p-3"
              placeholder="Where should we collect the parcel?"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Delivery Address
            </label>
            <textarea
              name="deliveryAddress"
              required
              rows={3}
              className="w-full border rounded-lg p-3"
              placeholder="Where should we deliver the parcel?"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Parcel Description
            </label>
            <input
              name="parcelDescription"
              required
              className="w-full border rounded-lg p-3"
              placeholder="What are you sending?"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Preferred Delivery Type
            </label>
            <select
              name="deliveryType"
              required
              defaultValue=""
              className="w-full border rounded-lg p-3 bg-white"
            >
              <option value="" disabled>Select delivery type</option>
              <option value="standard">Standard Delivery</option>
              <option value="express">Express Delivery</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EA6505] hover:bg-orange-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2"
          >
            Submit Booking <Send size={18} />
          </button>

          {status && (
            <p className="text-center text-[#19477F] text-sm">
              {status}
            </p>
          )}

          <p className="text-center text-gray-500 text-sm">
            Need help? <Link href="/contact" className="text-[#EA6505]">Contact us</Link>
          </p>
        </form>
      </section>

      <footer className="bg-[#19477F] text-white text-center p-6">
        © {new Date().getFullYear()} Transverse Courier Services.
        All rights reserved.
      </footer>
    </main>
  );
}
