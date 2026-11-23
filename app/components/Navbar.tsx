"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm px-6 md:px-16 py-4 relative z-50">
      <div className="flex items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/transverse-logo.jpeg"
            alt="Transverse Courier Services"
            width={180}
            height={80}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#EA6505] transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/track"
            className="hidden sm:block bg-[#19477F] text-white px-5 py-3 rounded-lg hover:bg-blue-900"
          >
            Track Parcel
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#19477F] p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
          <div className="flex flex-col p-6 gap-5 font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#EA6505]"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/track"
              onClick={() => setMenuOpen(false)}
              className="bg-[#19477F] text-white text-center py-3 rounded-lg"
            >
              Track Parcel
            </Link>

            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="bg-[#EA6505] text-white text-center py-3 rounded-lg"
            >
              Book a Delivery
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
