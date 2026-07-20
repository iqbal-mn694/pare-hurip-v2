import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden pt-12">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="max-w-3xl space-y-10 text-white">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.26em] text-emerald-300">PARE HURIP V2</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Menyediakan data hasil KSA untuk perhitungan prediksi hasil panen padi secara akurat.
            </h1>
            <p className="max-w-2xl text-lg text-slate-200 sm:text-xl italic">
              “Menyediakan data pertanian yang lebih baik untuk kesejahteraan petani.”
            </p>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Klik tombol Coba Sekarang untuk melihat prediksi per kecamatan dan tren fase tanam secara langsung.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/fase-tanam" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-400">
              Coba Sekarang
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Masuk Admin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
