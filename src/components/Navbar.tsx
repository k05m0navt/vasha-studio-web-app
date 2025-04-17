"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/gallery", label: "Галерея" },
  { href: "/booking", label: "Бронирование" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-background/80 backdrop-blur border-b border-muted fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary">
          <Image src="/logo.svg" alt="Vasha Studio Logo" width={32} height={32} className="rounded" priority />
          <span className="hidden sm:inline">Vasha Studio</span>
        </Link>
        <button
          className={`sm:hidden ml-2 p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${open ? 'bg-primary/10' : ''}`}
          aria-label="Открыть меню"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <ul className="hidden sm:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-base font-medium px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${pathname === link.href ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col gap-2 px-4 pb-4 bg-background/95 border-t border-muted animate-fade-in-down">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block w-full text-base font-medium px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${pathname === link.href ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
