
import { NextResponse } from "next/server";
import { createAdminSession } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (
      !adminEmail ||
      !adminPassword ||
      email !== adminEmail ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    await createAdminSession();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
