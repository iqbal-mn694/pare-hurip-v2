'use client';

import { ShieldCheck, Cpu, Globe2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const insights = [
  {
    title: 'Standalone & Offline',
    icon: Cpu,
    description: 'Aplikasi PARE HURIP V2 dapat berjalan lokal tanpa koneksi internet eksternal untuk inti analisis dan prediksi.',
  },
  {
    title: 'Prediksi Multi-Model',
    icon: Globe2,
    description: 'Menggunakan LSTM, Transformer, dan Geospatial untuk menangkap pola waktu dan konteks lokasi secara lebih baik.',
  },
  {
    title: 'Role: Superadmin, Admin, User',
    icon: ShieldCheck,
    description: 'Pengguna dibagi berdasarkan peran dengan akses dashboard, manajemen data, dan promosi pengguna.',
  },
];

export function ModelInsights() {
  return (
    <section id="tech-stack" className="py-20 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollReveal className="text-center mb-12 space-y-4" direction="right">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-green-700">🛠️ Tech Stack</p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Teknologi dan Data</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600">
            Next.js, Tailwind CSS, Framer Motion, Leaflet, dan model machine learning bekerja bersama untuk menyajikan analisis produksi padi dan KSA secara akurat.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {insights.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-green-100 text-green-700">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{item.description}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
