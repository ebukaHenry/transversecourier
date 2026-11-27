
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { verifyAdminSession } from "@/app/lib/auth";
import { createAdminClient } from "@/app/lib/supabase/admin";

export async function createParcel(formData: FormData) {
  if (!(await verifyAdminSession())) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();

  const trackingId = `TCS-${randomUUID()
    .replace(/-/g, "")
    .slice(0, 12)
    .toUpperCase()}`;

  const parcel = {
    tracking_id: trackingId,
    sender_name: String(formData.get("sender_name") || ""),
    sender_phone: String(formData.get("sender_phone") || ""),
    receiver_name: String(formData.get("receiver_name") || ""),
    receiver_phone: String(formData.get("receiver_phone") || ""),
    pickup_address: String(formData.get("pickup_address") || ""),
    delivery_address: String(formData.get("delivery_address") || ""),
    parcel_description: String(formData.get("parcel_description") || ""),
    status: "pending",
  };

  const { error } = await supabase.from("parcels").insert(parcel);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/parcels");
}

export async function updateParcelStatus(formData: FormData) {
  if (!(await verifyAdminSession())) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();

  const parcelId = String(formData.get("parcel_id") || "");
  const status = String(formData.get("status") || "");

  const allowedStatuses = [
    "pending",
    "picked_up",
    "custom_clearance",
    "withheld",
    "released",
    "in_transit",
    "delivered",
  ];

  if (!parcelId || !allowedStatuses.includes(status)) {
    throw new Error("Invalid parcel or status.");
  }

  const { error } = await supabase
    .from("parcels")
    .update({ status })
    .eq("id", parcelId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/parcels");
}

/**parcel locations */
export async function updateParcelLocation(formData: FormData) {
  if (!(await verifyAdminSession())) redirect("/admin/login");

  const supabase = createAdminClient();

  const parcelId = String(formData.get("parcel_id") || "");
  const location = String(formData.get("current_location") || "").trim();
  const note = String(formData.get("location_note") || "").trim();

  if (!parcelId || !location) {
    throw new Error("Parcel ID and current location are required.");
  }

  const { data: parcel, error: fetchError } = await supabase
    .from("parcels")
    .select("status")
    .eq("id", parcelId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const { error: updateError } = await supabase
    .from("parcels")
    .update({
      current_location: location,
      location_note: note || null,
    })
    .eq("id", parcelId);

  if (updateError) throw new Error(updateError.message);

  const { error: historyError } = await supabase
    .from("parcel_history")
    .insert({
      parcel_id: parcelId,
      status: parcel.status,
      message: note
        ? `Location updated to ${location}. ${note}`
        : `Parcel location updated to ${location}.`,
    });

  if (historyError) throw new Error(historyError.message);

  revalidatePath("/admin/parcels");
  revalidatePath("/track");
}
