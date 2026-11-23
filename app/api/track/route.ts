
import { NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { trackingId } = await request.json();

    if (!trackingId || typeof trackingId !== "string") {
      return NextResponse.json(
        { message: "Please provide a valid tracking ID." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: parcel, error: parcelError } = await supabase
      .from("parcels")
      .select("id, tracking_id, status, created_at, updated_at")
      .eq("tracking_id", trackingId.trim().toUpperCase())
      .maybeSingle();

    if (parcelError) {
      throw parcelError;
    }

    if (!parcel) {
      return NextResponse.json(
        { message: "No parcel found with that tracking ID." },
        { status: 404 }
      );
    }

    const { data: history, error: historyError } = await supabase
      .from("parcel_history")
      .select("status, message, created_at")
      .eq("parcel_id", parcel.id)
      .order("created_at", { ascending: true });

    if (historyError) {
      throw historyError;
    }

    return NextResponse.json({
      success: true,
      parcel,
      history: history || [],
    });
  } catch (error) {
    console.error("Tracking error:", error);

    return NextResponse.json(
      { message: "Unable to retrieve tracking information." },
      { status: 500 }
    );
  }
}
