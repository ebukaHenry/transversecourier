
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
