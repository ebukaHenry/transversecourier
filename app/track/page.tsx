
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PackageSearch,
  ArrowLeft,
  Search,
  ShieldCheck,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

type Parcel = {
  id: string;
  tracking_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type HistoryItem = {
  status: string;
  message: string | null;
  created_at: string;
};

export default function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");
  const [message, setMessage] = useState("");
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleTracking(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!trackingId.trim()) {
      setMessage("Please enter your tracking ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setParcel(null);
    setHistory([]);

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Tracking lookup failed.");
      }

      setParcel(result.parcel);
      setHistory(result.history);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to track parcel."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatStatus(status: string) {
    return status.replaceAll("_", " ");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 md:px-16 py-5">
        <Link href="/" className="text-[#19477F] font-bold flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </header>

      <section className="px-5 py-16 flex justify-center">
        <div className="w-full max-w-3xl">

          <div className="text-center mb-10">
            <div className="inline-flex bg-blue-100 text-[#19477F] p-5 rounded-full mb-5">
              <PackageSearch size={45} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#19477F]">
              Track Your Parcel
            </h1>

            <p className="text-gray-600 mt-4">
              Know where your package is and stay updated on its delivery progress.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
            <h2 className="text-xl font-bold mb-2">
              Enter Your Tracking ID
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              Enter the unique tracking number provided by Transverse Courier Services.
            </p>

            <form onSubmit={handleTracking}>
              <label className="block text-sm font-semibold mb-2">
                Tracking Number
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    setMessage("");
                  }}
                  placeholder="e.g. TCS-2026-00125"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-4 outline-none focus:border-[#19477F]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#EA6505] hover:bg-orange-700 disabled:opacity-50 text-white font-bold px-7 py-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <Search size={19} />
                  {loading ? "Tracking..." : "Track"}
                </button>
              </div>

              {message && (
                <p className="mt-4 text-sm text-red-600">
                  {message}
                </p>
              )}
            </form>

            {parcel && (
              <div className="mt-8 border-t pt-6">
                <div className="bg-blue-50 rounded-xl p-5 mb-8">
                  <p className="text-sm text-gray-500">
                    Tracking Number
                  </p>

                  <h3 className="text-xl font-bold text-[#19477F]">
                    {parcel.tracking_id}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500">
                    Current Status
                  </p>

                  <p className="text-lg font-bold text-[#EA6505] capitalize">
                    {formatStatus(parcel.status)}
                  </p>
                </div>

                <h3 className="text-xl font-bold mb-6">
                  Delivery History
                </h3>

                {history.length === 0 ? (
                  <p className="text-gray-500">
                    No delivery updates available yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {history.map((item, index) => (
                      <div key={`${item.created_at}-${index}`} className="flex gap-4">
                        <div className="mt-1 text-green-600">
                          {item.status === "delivered" ? (
                            <CheckCircle size={23} />
                          ) : item.status === "in_transit" ? (
                            <Truck size={23} />
                          ) : (
                            <Clock size={23} />
                          )}
                        </div>

                        <div>
                          <p className="font-bold capitalize text-[#19477F]">
                            {formatStatus(item.status)}
                          </p>

                          {item.message && (
                            <p className="text-sm text-gray-600 mt-1">
                              {item.message}
                            </p>
                          )}

                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(item.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="border-t mt-8 pt-6 flex items-start gap-3">
              <ShieldCheck className="text-green-600 shrink-0" size={25} />

              <div>
                <h3 className="font-semibold">
                  Secure Parcel Tracking
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Your tracking number gives you access to your parcel's delivery information without creating an account.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Need assistance?{" "}
            <Link href="/contact" className="text-[#EA6505] font-semibold">
              Contact our team
            </Link>
          </p>
        </div>
      </section>

      <footer className="bg-[#19477F] text-white text-center p-6">
        © {new Date().getFullYear()} Transverse Courier Services.
        All rights reserved.
      </footer>
    </main>
  );
}



// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { PackageSearch, ArrowLeft, Search, ShieldCheck } from "lucide-react";

// export default function TrackParcel() {
//   const [trackingId, setTrackingId] = useState("");
//   const [message, setMessage] = useState("");

//   function handleTracking(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     if (!trackingId.trim()) {
//       setMessage("Please enter your tracking ID.");
//       return;
//     }

//     setMessage(
//       "Tracking lookup will be activated when we connect the parcel database."
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50">

//       {/* Header */}
//       <header className="bg-white shadow-sm px-6 md:px-16 py-5">
//         <Link href="/" className="text-[#19477F] font-bold flex items-center gap-2">
//           <ArrowLeft size={20} />
//           Back to Home
//         </Link>
//       </header>

//       {/* Tracking Section */}
//       <section className="px-5 py-20 flex justify-center">
//         <div className="w-full max-w-2xl">

//           <div className="text-center mb-10">
//             <div className="inline-flex bg-blue-100 text-[#19477F] p-5 rounded-full mb-5">
//               <PackageSearch size={45} />
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-[#19477F]">
//               Track Your Parcel
//             </h1>

//             <p className="text-gray-600 mt-4">
//               Know where your package is and stay updated
//               on its delivery progress.
//             </p>
//           </div>

//           {/* Tracking Form */}
//           <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">

//             <h2 className="text-xl font-bold mb-2">
//               Enter Your Tracking ID
//             </h2>

//             <p className="text-gray-500 text-sm mb-6">
//               Enter the unique tracking number provided
//               by Transverse Courier Services.
//             </p>

//             <form onSubmit={handleTracking}>
//               <label className="block text-sm font-semibold mb-2">
//                 Tracking Number
//               </label>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   type="text"
//                   value={trackingId}
//                   onChange={(e) => {
//                     setTrackingId(e.target.value);
//                     setMessage("");
//                   }}
//                   placeholder="e.g. TRV-2026-00125"
//                   className="flex-1 border border-gray-300 rounded-lg px-4 py-4 outline-none focus:border-[#19477F]"
//                 />

//                 <button
//                   type="submit"
//                   className="bg-[#EA6505] hover:bg-orange-700 text-white font-bold px-7 py-4 rounded-lg flex items-center justify-center gap-2"
//                 >
//                   <Search size={19} />
//                   Track
//                 </button>
//               </div>

//               {message && (
//                 <p className="mt-4 text-sm text-[#19477F]">
//                   {message}
//                 </p>
//               )}
//             </form>

//             <div className="border-t mt-8 pt-6 flex items-start gap-3">
//               <ShieldCheck className="text-green-600 shrink-0" size={25} />
//               <div>
//                 <h3 className="font-semibold">
//                   Secure Parcel Tracking
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Your tracking number gives you access to
//                   your parcel's delivery information without
//                   creating an account.
//                 </p>
//               </div>
//             </div>

//           </div>

//           <p className="text-center text-gray-500 text-sm mt-8">
//             Need assistance?{" "}
//             <Link href="/contact" className="text-[#EA6505] font-semibold">
//               Contact our team
//             </Link>
//           </p>

//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#19477F] text-white text-center p-6">
//         © {new Date().getFullYear()} Transverse Courier Services.
//         All rights reserved.
//       </footer>

//     </main>
//   );
// }
