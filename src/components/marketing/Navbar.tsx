"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Beranda", href: "#hero" },
  { label: "Fase Tanam", href: "#phase" },
  { label: "Luas Panen & Harga Beras", href: "#harvest" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="#hero" className="group flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl border border-white/20 bg-white/10 transition duration-300 group-hover:border-emerald-400">
            <Image
              src="/images/logo-leaf.svg"
              alt="PARE HURIP logo"
              width={28}
              height={28}
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[0.18em] text-emerald-400">PARE</span>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">HURIP</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#phase"
            className="rounded-full border border-emerald-500 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:bg-emerald-500/15"
          >
            Coba Sekarang
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-emerald-400 hover:bg-emerald-500/10 md:hidden"
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

      <div
        className={`md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-all duration-300`}
      >
        <div className="rounded-b-3xl border-t border-white/10 bg-black/95 px-6 py-6 shadow-xl shadow-black/40">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/90 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#phase"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-emerald-500 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400 hover:bg-emerald-500/15"
            >
              Coba Sekarang
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
