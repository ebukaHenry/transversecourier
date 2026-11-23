"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-[#19477F] mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 mb-6">
          Sign in to manage courier operations.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-3"
                placeholder="Admin email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-3"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#19477F] text-white py-3 rounded-lg font-semibold hover:bg-[#12365f] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <Link
          href="/"
          className="block text-center text-sm text-gray-500 mt-6"
        >
          Back to website
        </Link>
      </div>
    </main>
  );
}


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { LockKeyhole, Mail, ArrowLeft } from "lucide-react";
// import { createClient } from "../../lib/supabase/client";

// export default function AdminLogin() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     setLoading(true);
//     setError("");

//     const { error: loginError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (loginError) {
//       setError("Invalid email or password.");
//       setLoading(false);
//       return;
//     }

//     const { data: userData } = await supabase.auth.getUser();

//     const { data: admin } = await supabase
//       .from("admin_users")
//       .select("user_id")
//       .eq("user_id", userData.user?.id)
//       .maybeSingle();

//     if (!admin) {
//       await supabase.auth.signOut();
//       setError("You are not authorized to access this dashboard.");
//       setLoading(false);
//       return;
//     }

//     router.replace("/admin/dashboard");
//     router.refresh();
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5">

//       <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 md:p-10">

//         <Link href="/" className="flex items-center gap-2 text-[#19477F] mb-8">
//           <ArrowLeft size={18} />
//           Back to website
//         </Link>

//         <div className="text-center mb-8">
//           <div className="bg-blue-100 text-[#19477F] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <LockKeyhole size={30} />
//           </div>

//           <h1 className="text-2xl font-bold text-[#19477F]">
//             Admin Login
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Transverse Courier Management
//           </p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-5">

//           <div>
//             <label className="block font-semibold mb-2">
//               Email Address
//             </label>

//             <div className="relative">
//               <Mail className="absolute left-3 top-3.5 text-gray-400" size={19} />

//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Admin email"
//                 className="w-full border rounded-lg py-3 pl-11 pr-4 outline-none focus:border-[#19477F]"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block font-semibold mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               className="w-full border rounded-lg p-3 outline-none focus:border-[#19477F]"
//             />
//           </div>

//           {error && (
//             <p className="text-red-600 text-sm">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#19477F] hover:bg-blue-900 text-white font-bold py-4 rounded-lg disabled:opacity-60"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>

//         </form>

//         <p className="text-center text-xs text-gray-400 mt-8">
//           Authorized personnel only.
//         </p>

//       </div>
//     </main>
//   );
// }
