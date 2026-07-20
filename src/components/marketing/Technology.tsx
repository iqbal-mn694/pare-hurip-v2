'use client';

import { Leaf, Sprout, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const plantingPhases = [
  {
    title: 'LSTM',
    icon: Leaf,
    description: 'Model deret waktu yang mengamati pola produksi harian dan bulanan.',
    points: ['Tren historis', 'Prediksi volume', 'Respon cepat terhadap perubahan'],
  },
  {
    title: 'Transformer',
    icon: Sprout,
    description: 'Model modern yang menangkap konteks panjang untuk prediksi yang lebih stabil.',
    points: ['Memahami korelasi jarak jauh', 'Prediksi harga dan panen', 'Lebih robust terhadap noise'],
  },
  {
    title: 'Geospatial',
    icon: ShieldCheck,
    description: 'Pemetaan wilayah untuk analisis produksi dan ketahanan sosial tiap kecamatan.',
    points: ['Visualisasi pemetaan', 'Kebijakan berbasis ruang', 'Analisis wilayah detail'],
  },
];

export function Technology() {
  return (
    <section id="fitur" className="relative overflow-hidden bg-slate-50 py-20 text-slate-900">
      <div className="wave-animation" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollReveal className="text-center mb-16 space-y-4" direction="right">
          <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Fitur Utama</p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Teknologi Deep Learning di balik prediksi</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-700 sm:text-lg">
            Gabungan LSTM, Transformer, dan peta geospasial untuk memahami produksi padi, luas panen, dan dinamika harga pada level kecamatan.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {plantingPhases.map((phase, index) => {
            const Icon = phase.icon;
            const cardColors = [
              'border-emerald-200 bg-white hover:border-emerald-300',
              'border-sky-200 bg-white hover:border-sky-300',
              'border-amber-200 bg-white hover:border-amber-300',
            ];

            return (
              <ScrollReveal key={phase.title} className={`rounded-3xl border p-8 shadow-xl transition duration-300 ${cardColors[index]}`} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-2xl bg-slate-50 p-3 shadow-sm">
                    <Icon className="h-6 w-6 text-slate-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{phase.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-slate-700">{phase.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {phase.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
