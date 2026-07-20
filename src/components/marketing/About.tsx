'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbulb, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function About() {
  const [isKsaCardClicked, setIsKsaCardClicked] = useState(false);

  return (
    <div className="space-y-20 py-20 bg-slate-50 text-slate-900">
      <section id="about-ksa" className="relative overflow-hidden scroll-mt-20">
        <div className="wave-animation" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <ScrollReveal className="space-y-8" direction="left">
              <div className="space-y-6">
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  KSA itu Apa Sih?
                </h2>
                <div className="h-2 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
              </div>

              <button
                onClick={() => setIsKsaCardClicked(!isKsaCardClicked)}
                className={`w-full text-left space-y-4 rounded-3xl border-2 p-8 transition-all duration-300 ${
                  isKsaCardClicked ? 'border-emerald-300 bg-white shadow-xl shadow-slate-200' : 'border-slate-200 bg-white shadow-sm shadow-slate-100'
                }`}
              >
                <div className="space-y-2 pb-4 border-b-2 border-emerald-300">
                  <h3 className="text-2xl font-extrabold text-slate-900">Kerangka Sampel Area (KSA)</h3>
                  <p className="text-base font-bold text-emerald-700">Survei Luas Panen Padi Secara Cepat</p>
                </div>
                <p className="text-base leading-relaxed text-slate-600">
                  KSA (Kerangka Sampel Area) adalah survei berbasis area yang dilakukan dengan pengamatan langsung terhadap sampel segmen dan bertujuan untuk mengestimasi luasan dengan ekstrapolasi dari sampel ke populasi dalam periode yang relatif pendek.
                </p>
                <p className="text-base leading-relaxed text-slate-600">
                  Survei ini membantu mendukung data luas panen objektif, modern, dan andal untuk kebijakan ketahanan pangan.
                </p>
              </button>
            </ScrollReveal>

            <ScrollReveal className="overflow-hidden rounded-3xl shadow-lg" direction="right">
                <div className="relative h-96">
                <Image src="/images/right-example.svg" alt="KSA - Kerangka Sampel Area" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="about-usefulness" className="relative overflow-hidden scroll-mt-20">
        <div className="wave-animation" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <ScrollReveal className="space-y-6" direction="left">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Kegunaan KSA</h2>
                  <div className="h-2 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
                </div>
                <p className="max-w-xl text-slate-600">Memberdayakan Analisis Pertanian</p>
              </div>
              <div className="space-y-5 text-slate-600">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="font-bold text-slate-900">Peningkatan Produktivitas</p>
                  <p className="mt-2 text-sm">Optimalkan penggunaan lahan dan manajemen pemupukan berdasarkan data.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="font-bold text-slate-900">Peringatan Dini Risiko</p>
                  <p className="mt-2 text-sm">Deteksi potensi hama dan kekeringan sebelum masalah meluas.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="font-bold text-slate-900">Prediksi Hasil</p>
                  <p className="mt-2 text-sm">Perencanaan panen dan pasar yang lebih matang dengan data prediksi akurat.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="relative h-96 rounded-3xl overflow-hidden" direction="right">
              <div className="relative h-96 w-full">
                <Image src="/images/right-example.svg" alt="Example" fill className="object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="about-methods" className="relative overflow-hidden scroll-mt-20">
        <div className="wave-animation" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <ScrollReveal className="space-y-6" direction="left">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Metode KSA</h2>
                  <div className="h-2 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
                </div>
                <p className="max-w-xl text-slate-600">Metode yang Digunakan</p>
              </div>
              <div className="space-y-5 text-slate-600">
                <div>
                  <h4 className="font-bold text-emerald-700">Analisis Multispektral</h4>
                  <p className="mt-2 text-sm">Satelit dan drone membantu memetakan keadaan tanaman secara detail.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-700">Machine Learning</h4>
                  <p className="mt-2 text-sm">Model belajar dari pola historis untuk prediksi lebih baik.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-700">Analisis Time Series</h4>
                  <p className="mt-2 text-sm">LSTM dan Transformer menangkap dinamika produksi dari waktu ke waktu.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-700">Visualisasi Geospasial</h4>
                  <p className="mt-2 text-sm">Data wilayah ditampilkan dalam konteks kecamatan untuk pemetaan strategis.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal className="relative h-96 rounded-3xl overflow-hidden" direction="right">
              <div className="relative h-96 w-full">
                <Image src="/images/right-example.svg" alt="Example" fill className="object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
