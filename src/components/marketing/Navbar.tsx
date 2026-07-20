"use client";

import { useState } from "react";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { id: "beranda", label: "Beranda", href: "/" },
  { id: "fase-tanam", label: "Fase Tanam", href: "/fase-tanam" },
  { id: "siklus-pertumbuhan-padi", label: "Siklus Pertumbuhan Padi", href: "/luas-panen-harga-beras" },
  { id: "dashboard", label: "Coba Sekarang", href: "/dashboard" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3 text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 transition duration-300 group-hover:border-emerald-500">
            <Image src="/images/logo-leaf.svg" alt="PARE HURIP logo" width={28} height={28} priority />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-[0.18em] text-emerald-700">PARE</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-900">HURIP</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-800">V2</span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-slate-900 transition md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="flex h-5 w-5 flex-col justify-between">
            <span className="block h-0.5 w-full rounded-full bg-current transition-transform duration-300" />
            <span className="block h-0.5 w-full rounded-full bg-current transition-opacity duration-300" />
            <span className="block h-0.5 w-full rounded-full bg-current transition-transform duration-300" />
          </div>
        </button>
      </div>

      <div className={`md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-all duration-300`}>
        <div className="rounded-b-3xl border-t border-slate-200 bg-white px-6 py-6 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col gap-4">
              {navItems.map((item) => (
              <Link key={item.id} href={item.href} onClick={() => setOpen(false)} className="text-base font-semibold text-slate-900 transition hover:text-emerald-700">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
