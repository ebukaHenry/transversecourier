
import { NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const requiredFields = [
      "sender_name",
      "sender_phone",
      "receiver_name",
      "receiver_phone",
      "pickup_address",
      "delivery_address",
      "parcel_description",
      "delivery_type",
    ];

    for (const field of requiredFields) {
      if (!body[field] || !String(body[field]).trim()) {
        return NextResponse.json(
          { message: `${field.replaceAll("_", " ")} is required.` },
          { status: 400 }
        );
      }
    }

    if (!["standard", "express"].includes(body.delivery_type)) {
      return NextResponse.json(
        { message: "Invalid delivery type." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        sender_name: body.sender_name.trim(),
        sender_phone: body.sender_phone.trim(),
        receiver_name: body.receiver_name.trim(),
        receiver_phone: body.receiver_phone.trim(),
        pickup_address: body.pickup_address.trim(),
        delivery_address: body.delivery_address.trim(),
        parcel_description: body.parcel_description.trim(),
        delivery_type: body.delivery_type,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Booking error:", error.message);

      return NextResponse.json(
        { message: "Unable to submit booking." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your booking has been submitted successfully.",
        bookingId: data.id,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
