//import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAdminSession } from "@/app/lib/auth";
import { createAdminClient } from "@/app/lib/supabase/admin";
import {
  createParcel,
  updateParcelStatus,
} from "./actions";

//export const dynamic = "force-dynamic";

export default async function ParcelsPage() {

  const supabase = createAdminClient();

  const { data: parcels, error } = await supabase
    .from("parcels")
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
          Parcel Management
        </h1>

        <p className="text-gray-600 mb-8">
          Register parcels and manage their delivery progress.
        </p>

        {/* Register Parcel */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-5">
            Register New Parcel
          </h2>

          <form action={createParcel} className="grid md:grid-cols-2 gap-4">

            <input
              name="sender_name"
              placeholder="Sender name"
              required
              className="border rounded-lg p-3"
            />

            <input
              name="sender_phone"
              placeholder="Sender phone"
              required
              className="border rounded-lg p-3"
            />

            <input
              name="receiver_name"
              placeholder="Receiver name"
              required
              className="border rounded-lg p-3"
            />

            <input
              name="receiver_phone"
              placeholder="Receiver phone"
              required
              className="border rounded-lg p-3"
            />

            <input
              name="pickup_address"
              placeholder="Pickup address"
              required
              className="border rounded-lg p-3"
            />

            <input
              name="delivery_address"
              placeholder="Delivery address"
              required
              className="border rounded-lg p-3"
            />

            <textarea
              name="parcel_description"
              placeholder="Parcel description"
              required
              className="border rounded-lg p-3 md:col-span-2"
              rows={3}
            />

            <button
              type="submit"
              className="bg-[#19477F] text-white rounded-lg p-3 font-semibold md:col-span-2"
            >
              Register Parcel
            </button>

          </form>
        </section>

        {/* Parcel List */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            Registered Parcels
          </h2>

          {!parcels || parcels.length === 0 ? (
            <p className="text-gray-500">
              No parcels registered yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="p-3">Tracking ID</th>
                    <th className="p-3">Receiver</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Update</th>
                  </tr>
                </thead>

                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.id} className="border-b">
                      <td className="p-3 font-semibold">
                        {parcel.tracking_id}
                      </td>

                      <td className="p-3">
                        {parcel.receiver_name}
                      </td>

                      <td className="p-3">
                        {parcel.delivery_address}
                      </td>

                      <td className="p-3">
                        {parcel.status.replace("_", " ")}
                      </td>

                      <td className="p-3">
                        <form
                          action={updateParcelStatus}
                          className="flex gap-2"
                        >
                          <input
                            type="hidden"
                            name="parcel_id"
                            value={parcel.id}
                          />

                          <select
                            name="status"
                            defaultValue={parcel.status}
                            className="border rounded p-2"
                          >
                            <option value="pending">Pending</option>
                            <option value="picked_up">Picked Up</option>
                            <option value="in_transit">In Transit</option>
                            <option value="delivered">Delivered</option>
                          </select>

                          <button
                            type="submit"
                            className="bg-[#EA6505] text-white px-3 py-2 rounded"
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
