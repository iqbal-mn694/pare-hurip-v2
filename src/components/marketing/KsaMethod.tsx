'use client';

import Image from 'next/image';
import { MapPin, Layers, CalendarDays } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const methodSteps = [
  {
    title: 'Segmen & Subsegmen',
    description: 'Satu segmen terdiri dari 9 subsegmen, masing-masing mewakili unit observasi yang sistematis.',
    icon: Layers,
  },
  {
    title: 'Luas 1 Hektar',
    description: 'Setiap subsegmen berukuran 1 hektar dengan penempatan geografis yang konsisten untuk estimasi yang akurat.',
    icon: MapPin,
  },
  {
    title: 'Observasi 7 Hari',
    description: 'Koordinat segmen diamati selama 7 hari terakhir setiap bulan untuk menggambarkan kondisi lahan pada periode singkat.',
    icon: CalendarDays,
  },
];

export function KsaMethod() {
  return (
    <section id="metode-ksa" className="relative overflow-hidden bg-slate-50 py-20 text-slate-900">
      <div className="wave-animation" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal className="space-y-6" direction="left">
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Metode KSA</p>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Metode KSA untuk estimasi luas panen padi</h2>
            <p className="max-w-xl text-base text-slate-700 sm:text-lg">
              Metode KSA merupakan pendekatan statistik spasial untuk mengestimasi luas panen dan produksi padi. Pendekatan ini dirancang untuk memberikan data yang objektif dan cepat, mendukung kebijakan ketahanan pangan dengan dasar survei lapangan area.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {methodSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                      <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

            <ScrollReveal className="overflow-hidden rounded-3xl" direction="right">
              <div className="relative aspect-[4/3] w-full">
                <Image src="/images/right-example.svg" alt="Diagram Metode KSA" fill className="object-cover" />
              </div>
            </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
