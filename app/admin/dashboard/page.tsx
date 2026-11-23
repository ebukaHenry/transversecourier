//import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAdminSession } from "@/app/lib/auth";
import SignOutButton from "../SignOutButton";

//export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const isAdmin = await verifyAdminSession();

// await connection();

// if (!(await verifyAdminSession())) {
//   redirect("/admin/login");
// }
  
  // if (!isAdmin) {
  //   redirect("/admin/login");
  // }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#19477F]">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome to Transverse Courier Services.
            </p>
          </div>

          <SignOutButton />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/admin/parcels"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-[#19477F]">
              Manage Parcels
            </h2>
            <p className="text-gray-600 mt-2">
              Register parcels and update delivery status.
            </p>
          </Link>

          <Link
            href="/admin/bookings"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-[#19477F]">
              Manage Bookings
            </h2>
            <p className="text-gray-600 mt-2">
              View customer delivery requests.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}


// import { redirect } from "next/navigation";
// import { createClient } from "../../lib/supabase/server";
// import Link from "next/link";
// import { Package, Truck, LogOut } from "lucide-react";
// import SignOutButton from "../SignOutButton";

// export default async function AdminDashboard() {
//   const supabase = await createClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/admin/login");
//   }

//   const { data: admin } = await supabase
//     .from("admin_users")
//     .select("user_id")
//     .eq("user_id", user.id)
//     .maybeSingle();

//   if (!admin) {
//     redirect("/admin/login");
//   }

//   return (
//     <main className="min-h-screen bg-gray-50">

//       <header className="bg-[#19477F] text-white px-6 md:px-12 py-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-xl font-bold">
//             Transverse Admin
//           </h1>
//           <p className="text-sm text-blue-200">
//             Courier Management Dashboard
//           </p>
//         </div>

//         <SignOutButton />
//       </header>

//       <section className="max-w-7xl mx-auto px-6 py-12">

//         <h2 className="text-3xl font-bold text-[#19477F]">
//           Welcome, Administrator
//         </h2>

//         <p className="text-gray-500 mt-2">
//           Manage your courier operations from here.
//         </p>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

//           <Link href="/admin/parcels"
//             className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
//             <Package size={40} className="text-[#EA6505] mb-5" />
//             <h3 className="text-xl font-bold text-[#19477F]">
//               Manage Parcels
//             </h3>
//             <p className="text-gray-500 mt-2">
//               Register parcels and update delivery status.
//             </p>
//           </Link>

//           <Link href="/admin/bookings"
//             className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
//             <Truck size={40} className="text-[#EA6505] mb-5" />
//             <h3 className="text-xl font-bold text-[#19477F]">
//               Customer Bookings
//             </h3>
//             <p className="text-gray-500 mt-2">
//               View incoming delivery requests.
//             </p>
//           </Link>

//         </div>

//         <div className="mt-10 bg-white rounded-xl p-6 shadow-sm">
//           <h3 className="font-bold text-[#19477F]">
//             Administrator Account
//           </h3>
//           <p className="text-gray-600 mt-2">
//             Signed in as: {user.email}
//           </p>
//         </div>

//       </section>
//     </main>
//   );
// }
