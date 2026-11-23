
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Unable to sign out. Please try again.");
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="bg-[#EA6505] text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
