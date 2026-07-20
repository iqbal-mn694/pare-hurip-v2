'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { TrendingUp, ChartBar, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { kecamatans } from '@/lib/kecamatan';

const priceSeries = [
  { label: 'Jan', price: 8500 },
  { label: 'Feb', price: 8700 },
  { label: 'Mar', price: 8600 },
  { label: 'Apr', price: 8900 },
  { label: 'Mei', price: 9050 },
  { label: 'Jun', price: 9200 },
];

const productionSeries = [
  { label: 'Jan', value: 9200 },
  { label: 'Feb', value: 9400 },
  { label: 'Mar', value: 9600 },
  { label: 'Apr', value: 9800 },
  { label: 'Mei', value: 10050 },
  { label: 'Jun', value: 10200 },
];

const transformPoints = (series: { label: string; value: number }[]) => {
  const maxValue = Math.max(...series.map((item) => item.value));
  return series.map((item, index) => ({
    ...item,
    x: 10 + index * 15,
    y: 90 - (item.value / maxValue) * 70,
  }));
};

export default function LuasPanenHargaBerasPage() {
  const pricePoints = useMemo(
    () => priceSeries.map((item, index) => ({ ...item, x: 10 + index * 15, y: 90 - (item.price / 9200) * 70 })),
    [],
  );
  const productionPoints = useMemo(() => transformPoints(productionSeries), []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-100 to-slate-50 px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-8 space-y-4" direction="left">
            <p className="text-sm uppercase tracking-[0.28em] text-green-700">Luas Panen & Harga Beras</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Analisis Volume dan Harga Padi
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              Halaman ini menampilkan tren harga beras dan luas panen secara terpisah agar fokus pada analisis ekonomi pertanian.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <ScrollReveal className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm" direction="right">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Harga Beras</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Pergerakan Harga</h2>
                  </div>
                  <TrendingUp className="h-6 w-6 text-green-700" />
                </div>
                <div className="relative mt-8 overflow-hidden rounded-3xl bg-white px-6 py-8 text-slate-900">
                  <svg viewBox="0 0 100 100" className="h-72 w-full">
                    <rect x="0" y="0" width="100" height="100" fill="transparent" />
                    <path
                      d={pricePoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    {pricePoints.map((point) => (
                      <circle key={point.label} cx={point.x} cy={point.y} r="1.5" fill="#34d399" />
                    ))}
                    <g stroke="#64748b" strokeWidth="0.3">
                      {[20, 35, 50, 65, 80, 95].map((y) => (
                        <line key={y} x1="10" y1={y} x2="90" y2={y} />
                      ))}
                    </g>
                  </svg>
                </div>
              </ScrollReveal>

              <ScrollReveal className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm" direction="left">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Luas Panen</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Tren Produksi</h2>
                  </div>
                  <ChartBar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="relative mt-8 overflow-hidden rounded-3xl bg-white px-6 py-8 text-slate-900">
                  <svg viewBox="0 0 100 100" className="h-72 w-full">
                    <rect x="0" y="0" width="100" height="100" fill="transparent" />
                    <path
                      d={productionPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    {productionPoints.map((point) => (
                      <circle key={point.label} cx={point.x} cy={point.y} r="1.5" fill="#38bdf8" />
                    ))}
                    <g stroke="#64748b" strokeWidth="0.3">
                      {[20, 35, 50, 65, 80, 95].map((y) => (
                        <line key={y} x1="10" y1={y} x2="90" y2={y} />
                      ))}
                    </g>
                  </svg>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal className="rounded-3xl overflow-hidden" direction="left">
              <div className="relative h-96 w-full">
                <Image src="/images/right-example.svg" alt="Example" fill className="object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
