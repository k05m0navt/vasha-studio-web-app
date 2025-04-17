"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/gallery", label: "Галерея" },
  { href: "/booking", label: "Бронирование" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-background border-b border-muted fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          Vasha Studio
        </Link>
        <button
          className="sm:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Открыть меню"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <ul className="hidden sm:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-base font-medium px-3 py-2 rounded hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      {open && (
        <ul className="sm:hidden flex flex-col gap-2 px-4 pb-4 bg-background border-t border-muted animate-fade-in-down">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block w-full text-base font-medium px-3 py-2 rounded hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
