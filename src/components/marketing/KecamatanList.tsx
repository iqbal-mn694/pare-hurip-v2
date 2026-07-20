'use client';

import { kecamatans } from '@/lib/kecamatan';
import { MapPin } from 'lucide-react';

export function KecamatanList() {
  return (
    <section id="kecamatan" className="py-20 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Visualisasi KSA</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">Peta Interaktif Kecamatan</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Menampilkan ringkasan produksi dan luas panen setiap kecamatan di Tasikmalaya dengan gaya kartu ringkas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {kecamatans.map((kecamatan) => (
            <div key={kecamatan.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{kecamatan.name}</h3>
                  <p className="text-sm text-slate-500">Area: {kecamatan.areaHa} ha</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Produksi harian: <span className="font-normal">{kecamatan.productionDaily}</span></p>
                <p className="font-semibold text-slate-900">Produksi bulanan: <span className="font-normal">{kecamatan.productionMonthly}</span></p>
                <p className="font-semibold text-slate-900">Prediksi bulan depan: <span className="font-normal">{kecamatan.predictedNextMonth}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
