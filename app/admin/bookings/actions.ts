
"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/app/lib/auth";
import { createAdminClient } from "@/app/lib/supabase/admin";

export async function createParcelFromBooking(formData: FormData) {
  if (!(await verifyAdminSession())) {
    redirect("/admin/login");
  }

  const bookingId = String(formData.get("booking_id") || "");

  if (!bookingId) {
    throw new Error("Booking ID is required.");
  }

  const supabase = createAdminClient();

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (bookingError || !booking) {
    throw new Error("Booking not found.");
  }

  const { data: existingParcel } = await supabase
    .from("parcels")
    .select("id")
    .eq("booking_id", bookingId)
    .maybeSingle();

  if (existingParcel) {
    throw new Error("A parcel has already been created for this booking.");
  }

  const trackingId = `TCS-${randomUUID()
    .replace(/-/g, "")
    .slice(0, 12)
    .toUpperCase()}`;

  const { error: parcelError } = await supabase
    .from("parcels")
    .insert({
      booking_id: booking.id,
      tracking_id: trackingId,
      sender_name: booking.sender_name,
      sender_phone: booking.sender_phone,
      receiver_name: booking.receiver_name,
      receiver_phone: booking.receiver_phone,
      pickup_address: booking.pickup_address,
      delivery_address: booking.delivery_address,
      parcel_description: booking.parcel_description,
      status: "pending",
    });

  if (parcelError) {
    throw new Error(parcelError.message);
  }

  const { error: updateError } = await supabase
    .from("bookings")
    .update({ status: "processed" })
    .eq("id", bookingId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/parcels");
}


export async function updateBookingStatus(formData: FormData) {
  if (!(await verifyAdminSession())) {
    redirect("/admin/login");
  }

  const bookingId = String(formData.get("booking_id") || "");
  const status = String(formData.get("status") || "");

  const allowedStatuses = ["pending", "processed", "cancelled"];

  if (!bookingId || !allowedStatuses.includes(status)) {
    throw new Error("Invalid booking or status.");
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/bookings");
}
