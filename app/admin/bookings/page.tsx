// export default function BookingsPage() {
//   return (
//     <main className="p-10">
//       <h1 className="text-3xl font-bold">
//         Booking Management
//       </h1>

//       <p>Bookings page is working!</p>
//     </main>
//   );
// }



import { 
  createParcelFromBooking,
  updateBookingStatus
 } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAdminSession } from "@/app/lib/auth";
import { createAdminClient } from "@/app/lib/supabase/admin";

export default async function BookingsPage() {
  const isAdmin = await verifyAdminSession();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/admin/dashboard"
          className="text-[#19477F] font-medium"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-[#19477F] mt-6 mb-2">
          Booking Management
        </h1>

        <p className="text-gray-600 mb-8">
          View and manage customer delivery requests.
        </p>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            Customer Bookings
          </h2>

          {!bookings || bookings.length === 0 ? (
            <p className="text-gray-500">
              No bookings received yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="p-3">Sender</th>
                    <th className="p-3">Receiver</th>
                    <th className="p-3">Pickup</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Delivery Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Update Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="p-3">
                        <strong>{booking.sender_name}</strong>
                        <br />
                        {booking.sender_phone}
                      </td>

                      <td className="p-3">
                        <strong>{booking.receiver_name}</strong>
                        <br />
                        {booking.receiver_phone}
                      </td>

                      <td className="p-3">
                        {booking.pickup_address}
                      </td>

                      <td className="p-3">
                        {booking.delivery_address}
                      </td>

                      <td className="p-3 capitalize">
                        {booking.delivery_type}
                      </td>

                      <td className="p-3 capitalize">
                        {booking.status}
                      </td>

                      <td className="p-3">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                            {booking.status === "processed" ? (
                              <span className="text-green-600 font-medium">
                                Processed
                              </span>
                            ) : (
                              <form action={createParcelFromBooking}>
                                <input
                                  type="hidden"
                                  name="booking_id"
                                  value={booking.id}
                                />

                                <button
                                  type="submit"
                                  className="bg-[#EA6505] text-white px-3 py-2 rounded"
      >
                                  Register Parcel
                                </button>
                              </form>
                             )}
                        </td>

                        <td className="p-3">
                          <form action={updateBookingStatus} className="flex gap-2">
                            <input
                              type="hidden"
                              name="booking_id"
                              value={booking.id}
                            />

                            <select
                              name="status"
                              defaultValue={booking.status}
                              className="border rounded p-2"
                            >
                              <option value="pending">Pending</option>
                              <option value="processed">Processed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                              type="submit"
                              className="bg-[#19477F] text-white px-3 py-2 rounded"
                            >
                              Save
                            </button>
                          </form>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

