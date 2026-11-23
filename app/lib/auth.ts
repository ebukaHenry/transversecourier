import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "transverse_admin_session";

function sign(value: string) {
  return createHmac(
    "sha256",
    process.env.ADMIN_SESSION_SECRET!
  )
    .update(value)
    .digest("hex");
}

export async function createAdminSession() {
  const expires = Date.now() + 8 * 60 * 60 * 1000;
  const payload = `${expires}`;
  const signature = sign(payload);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `${payload}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });
}

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session) return false;

  const [expires, signature] = session.split(".");
  if (!expires || !signature) return false;

  const expected = sign(expires);

  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return false;
  }

  return Number(expires) > Date.now();
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}