import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sawah.svg"
          alt="Sawah Indonesia"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-8 sm:px-8 lg:px-10">
        <div className="max-w-3xl animate-fade-in space-y-8 text-white">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/70">
            Data pertanian Tasikmalaya
          </p>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Menyediakan data hasil KSA untuk perhitungan prediksi hasil panen padi secara akurat.
            </h1>
            <p className="max-w-xl italic text-white/80 sm:text-lg">
              &ldquo;Menyediakan data pertanian yang lebih baik untuk kesejahteraan petani.&rdquo;
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#phase"
              className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white hover:bg-white/20"
            >
              Analisis Terbaru Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
