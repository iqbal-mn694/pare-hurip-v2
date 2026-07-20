'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ChartLine, MapPin, Layers } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { kecamatans, KecamatanData } from '@/lib/kecamatan';

const trainingSeries = [
  { label: 'Jan', value: 120 },
  { label: 'Feb', value: 130 },
  { label: 'Mar', value: 140 },
  { label: 'Apr', value: 150 },
  { label: 'Mei', value: 155 },
  { label: 'Jun', value: 160 },
  { label: 'Jul', value: 165 },
  { label: 'Agu', value: 170 },
  { label: 'Sep', value: 175 },
  { label: 'Okt', value: 180 },
  { label: 'Nov', value: 185 },
  { label: 'Des', value: 190 },
];

const forecastSeries = [
  { label: 'Jan', value: 193 },
  { label: 'Feb', value: 195 },
  { label: 'Mar', value: 198 },
  { label: 'Apr', value: 200 },
  { label: 'Mei', value: 202 },
  { label: 'Jun', value: 205 },
  { label: 'Jul', value: 208 },
  { label: 'Agu', value: 210 },
  { label: 'Sep', value: 212 },
  { label: 'Okt', value: 214 },
  { label: 'Nov', value: 215 },
  { label: 'Des', value: 217 },
];

const series = [
  ...trainingSeries.map((item) => ({ ...item, type: 'history' as const })),
  ...forecastSeries.map((item) => ({ ...item, type: 'forecast' as const })),
];

const graphPoints = <T extends { label: string; value: number }>(
  data: T[],
  startIndex = 0,
  totalPoints = series.length,
) => {
  const maxValue = Math.max(...series.map((item) => item.value));
  const minValue = Math.min(...series.map((item) => item.value));
  const range = maxValue - minValue || 1;
  const step = 100 / (totalPoints - 1);

  return data.map((item, index) => ({
    ...item,
    x: 10 + (startIndex + index) * step,
    y: 90 - ((item.value - minValue) / range) * 78,
  }));
};

const yAxisTicks = (() => {
  const minValue = Math.min(...series.map((item) => item.value));
  const maxValue = Math.max(...series.map((item) => item.value));
  const bottom = Math.max(0, Math.floor(minValue / 50) * 50);
  const top = Math.ceil(maxValue / 50) * 50;
  const steps = 6;
  const step = (top - bottom) / (steps - 1);

  return Array.from({ length: steps }, (_, index) => Math.round(bottom + index * step));
})();

const phaseSeries = [
  { label: 'Jan', cibereum: 1, indihiang: 2, mangkubumi: 3 },
  { label: 'Feb', cibereum: 2, indihiang: 3, mangkubumi: 1 },
  { label: 'Mar', cibereum: 3, indihiang: 4, mangkubumi: 2 },
  { label: 'Apr', cibereum: 4, indihiang: 5, mangkubumi: 3 },
  { label: 'Mei', cibereum: 5, indihiang: 6, mangkubumi: 4 },
  { label: 'Jun', cibereum: 6, indihiang: 5, mangkubumi: 4 },
  { label: 'Jul', cibereum: 5, indihiang: 4, mangkubumi: 3 },
  { label: 'Agu', cibereum: 4, indihiang: 3, mangkubumi: 2 },
  { label: 'Sep', cibereum: 3, indihiang: 2, mangkubumi: 1 },
  { label: 'Okt', cibereum: 2, indihiang: 1, mangkubumi: 2 },
  { label: 'Nov', cibereum: 3, indihiang: 2, mangkubumi: 3 },
  { label: 'Des', cibereum: 4, indihiang: 3, mangkubumi: 4 },
];

const phaseLabels = ['Vegetatif 1', 'Vegetatif 2', 'Generatif 1', 'Generatif 2', 'Generatif 3', 'Panen'];

const phasePoints = (data: { label: string; cibereum: number; indihiang: number; mangkubumi: number }[], key: 'cibereum' | 'indihiang' | 'mangkubumi') => {
  return data.map((item, index) => ({
    ...item,
    x: 12 + index * 7.4,
    y: 92 - ((item[key] - 1) / (phaseLabels.length - 1)) * 76,
  }));
};

const markerLocations: Record<string, { top: string; left: string }> = {
  bantarkalong: { top: '10%', left: '20%' },
  bojonggambir: { top: '22%', left: '43%' },
  cisayong: { top: '40%', left: '15%' },
  cibalanarik: { top: '62%', left: '20%' },
  cikatomas: { top: '50%', left: '40%' },
  cihaurbeuti: { top: '58%', left: '54%' },
  cisalak: { top: '30%', left: '60%' },
  garutmanuju: { top: '18%', left: '72%' },
  karangnunggal: { top: '35%', left: '80%' },
  mangunreja: { top: '45%', left: '70%' },
  padakembang: { top: '72%', left: '32%' },
  pacet: { top: '68%', left: '55%' },
  panjalu: { top: '55%', left: '18%' },
  salawu: { top: '15%', left: '55%' },
  sukareng: { top: '82%', left: '60%' },
};

export default function FaseTanamPage() {
  const [selectedKecamatan, setSelectedKecamatan] = useState<KecamatanData>(kecamatans[0]);
  const combinedPoints = useMemo(() => graphPoints(series), []);
  const historyPoints = useMemo(
    () => combinedPoints.filter((item) => item.type === 'history'),
    [combinedPoints],
  );
  const forecastPoints = useMemo(
    () => combinedPoints.filter((item) => item.type === 'forecast'),
    [combinedPoints],
  );
  const xLabelPoints = useMemo(
    () => historyPoints.filter((_, index) => index % 2 === 0),
    [historyPoints],
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-linear-to-b from-white via-slate-100 to-slate-50 px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-8 space-y-4" direction="left">
            <p className="text-sm uppercase tracking-[0.28em] text-green-700">Visualisasi Hasil</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Visualisasi Hasil Analisis Kerangka Sampel Area
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              Jelajahi KSA terbaru dan prediksi untuk 12 bulan ke depan. Anda dapat menggunakan filter untuk melihat tren per kecamatan, atau lihat sebaran fase tanam pada peta geospasial interaktif.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 grid-cols-1">
            <div className="space-y-6">
              <ScrollReveal className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm" direction="right">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Prediksi LSTM</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Grafik Prediksi Siklus Pertumbuhan Padi</h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                      Visualisasi LSTM berdasarkan data KSA historis untuk 12 bulan ke depan. Grafik ini menampilkan pola fase pertumbuhan tanaman padi dengan prediksi produksi pada seluruh wilayah kecamatan.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                    <ChartLine className="h-4 w-4 text-green-700" /> Full-width chart
                  </div>
                </div>
                <div className="relative mt-8 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-slate-50 shadow-inner shadow-slate-200/10">
                  <div className="absolute inset-x-6 top-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-300">
                    <span className="uppercase tracking-[0.18em] text-slate-400">LSTM model: prediksi fase tanam</span>
                    <span className="font-semibold text-slate-300">12 Bulan ke Depan</span>
                  </div>
                  <div className="absolute right-6 top-24 hidden flex-col gap-2 rounded-3xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-slate-300 shadow-lg sm:flex">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-400">Legend</div>
                    <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Historis
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-2 text-sm text-sky-300">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Forecast
                    </div>
                  </div>
                  <div className="absolute left-6 bottom-6 hidden w-[220px] flex-col gap-1 rounded-3xl bg-slate-900/95 px-4 py-4 text-slate-200 shadow-xl sm:flex">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Ringkasan LSTM</p>
                    <p className="text-sm font-semibold text-white">Nilai historis terakhir: {trainingSeries[trainingSeries.length - 1].value}</p>
                    <p className="text-sm font-semibold text-white">Nilai forecast akhir: {forecastSeries[forecastSeries.length - 1].value}</p>
                    <p className="text-xs leading-5 text-slate-400">Prediksi menunjukkan tren naik dengan batas variabilitas fase produksi padi.</p>
                  </div>
                  <div className="mt-10">
                    <svg viewBox="0 0 120 100" className="h-[520px] w-full">
                      <defs>
                        <linearGradient id="lstmLine" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#34d399" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.12" />
                        </linearGradient>
                        <linearGradient id="forecastLine" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.12" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="120" height="100" fill="transparent" />
                      {yAxisTicks.map((value) => {
                        const y = 90 - ((value - yAxisTicks[0]) / (yAxisTicks[yAxisTicks.length - 1] - yAxisTicks[0] || 1)) * 78;
                        return (
                          <g key={value}>
                            <line x1="10" y1={y} x2="110" y2={y} stroke="#334155" strokeWidth="0.35" />
                            <text x="8" y={y + 2} fill="#94a3b8" fontSize="3.5" textAnchor="start">{value}</text>
                          </g>
                        );
                      })}
                      <line x1="10" y1="90" x2="110" y2="90" stroke="#64748b" strokeWidth="0.4" />
                      <line x1="10" y1="10" x2="10" y2="90" stroke="#64748b" strokeWidth="0.4" />
                      <path
                        d={`${historyPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} L ${historyPoints[historyPoints.length - 1].x} 90 L 10 90 Z`}
                        fill="url(#lstmLine)"
                        opacity="0.65"
                      />
                      <path
                        d={`${forecastPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} L 110 90 L ${forecastPoints[0].x} 90 Z`}
                        fill="url(#forecastLine)"
                        opacity="0.45"
                      />
                      <path
                        d={historyPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                      />
                      <path
                        d={forecastPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1={historyPoints[historyPoints.length - 1].x}
                        y1="10"
                        x2={historyPoints[historyPoints.length - 1].x}
                        y2="90"
                        stroke="#94a3b8"
                        strokeWidth="0.6"
                        strokeDasharray="2 2"
                      />
                      <text x={historyPoints[historyPoints.length - 1].x + 3} y="18" fill="#94a3b8" fontSize="3" textAnchor="start">
                        Forecast
                      </text>
                      {historyPoints.map((point) => (
                        <g key={`history-${point.label}`}>
                          <circle cx={point.x} cy={point.y} r="2.5" fill="#22c55e" stroke="#ffffff" strokeWidth="0.5" />
                        </g>
                      ))}
                      {forecastPoints.map((point) => (
                        <g key={`forecast-${point.label}`}>
                          <circle cx={point.x} cy={point.y} r="2.5" fill="#0ea5e9" stroke="#ffffff" strokeWidth="0.5" />
                        </g>
                      ))}
                      {forecastPoints.length > 0 && (
                        <path
                          d={`M ${historyPoints[historyPoints.length - 1].x} ${historyPoints[historyPoints.length - 1].y} L ${forecastPoints[0].x} ${forecastPoints[0].y}`}
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      )}
                      {xLabelPoints.map((point, index) => (
                        <text key={`x-${index}-${point.label}`} x={point.x} y="97" fill="#94a3b8" fontSize="3.5" textAnchor="middle">
                          {point.label}
                        </text>
                      ))}
                      <text x="6" y="8" fill="#94a3b8" fontSize="3.5" textAnchor="start">Produksi</text>
                      <text x="115" y="96" fill="#94a3b8" fontSize="3.5" textAnchor="end">Bulan</text>
                    </svg>
                  </div>
                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-100 ring-1 ring-slate-700/60">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Nilai Prediksi</p>
                      <p className="mt-4 text-2xl font-semibold text-white">{forecastSeries[forecastSeries.length - 1].value}</p>
                      <p className="mt-2 text-sm text-slate-300">Prediksi akhir Desember berdasarkan model LSTM.</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-100 ring-1 ring-slate-700/60">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Data Historis</p>
                      <p className="mt-4 text-2xl font-semibold text-white">{trainingSeries[trainingSeries.length - 1].value}</p>
                      <p className="mt-2 text-sm text-slate-300">Nilai terakhir data historis sebelum prediksi.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm" direction="left">
                <div className="flex items-center gap-3 text-slate-900">
                  <Layers className="h-5 w-5 text-green-700" />
                  <h2 className="text-2xl font-bold">Visualisasi Tren Siklus Padi</h2>
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Tren siklus pertumbuhan padi divisualisasikan menggunakan LSTM untuk menangkap pola waktu dan perubahan fase tanam. Referensi data dan konsep visual diambil dari GitHub Padu: Prediksi KSA & Luas Panen Padi.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Sumber: <a href="https://pare-hurip.vercel.app/visualisasi-ksa" className="text-emerald-700 underline">Prediksi KSA & Luas Panen Padi</a>
                </p>
              </ScrollReveal>
            </div>

            <section className="space-y-6">
              <ScrollReveal className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm" direction="left">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Sebaran KSA</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Peta Geospasial Interaktif</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                    <MapPin className="h-4 w-4 text-green-700" /> Lihat Per Kec.
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <label className="block text-sm font-medium text-slate-700">Filter Kecamatan</label>
                    <select
                      value={selectedKecamatan.id}
                      onChange={(event) => setSelectedKecamatan(kecamatans.find((item) => item.id === event.target.value) ?? kecamatans[0])}
                      className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500"
                    >
                      {kecamatans.map((kecamatan) => (
                        <option key={kecamatan.id} value={kecamatan.id}>
                          {kecamatan.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-3 text-sm text-slate-600">
                      Klik kecamatan untuk melihat data prediksi dan sebaran fase tanam.
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-4xl bg-slate-900 p-6 text-slate-50">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.25),transparent_30%)]" />
                    <div className="relative h-80 overflow-hidden rounded-4xl border border-slate-700 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 p-4">
                      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_40%)]" />
                      <div className="absolute left-1/2 top-4 h-16 w-16 -translate-x-1/2 rounded-full bg-emerald-500/10" />
                      <div className="relative h-full w-full rounded-[28px] bg-slate-800">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_45%)]" />
                        <div className="absolute inset-0 border border-dashed border-slate-700" />
                        {Object.entries(markerLocations).map(([key, pos]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedKecamatan(kecamatans.find((item) => item.id === key) ?? kecamatans[0])}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition ${
                              selectedKecamatan.id === key
                                ? 'bg-emerald-500 border-emerald-300 text-white'
                                : 'bg-white text-slate-900 border-slate-200 hover:bg-emerald-100'
                            }`}
                            style={{ top: pos.top, left: pos.left }}
                          >
                            {kecamatans.find((item) => item.id === key)?.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-6">
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Kecamatan Terpilih</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900">{selectedKecamatan.name}</h3>
                      <p className="mt-3 text-sm text-slate-600">Prediksi produksi 12 bulan: {selectedKecamatan.predictedNextMonth}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6">
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Area</p>
                      <p className="mt-2 text-3xl font-bold text-slate-900">{selectedKecamatan.areaHa} ha</p>
                      <p className="mt-3 text-sm text-slate-600">Produksi harian: {selectedKecamatan.productionDaily}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-900">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Detail Lokasi</p>
                        <h3 className="mt-2 text-xl font-semibold">Koordinat & status</h3>
                      </div>
                      <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Aktif</div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Latitude</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">{selectedKecamatan.coordinates.lat.toFixed(3)}</p>
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Longitude</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">{selectedKecamatan.coordinates.lng.toFixed(3)}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-600">
                      Interpretasi peta ini membantu melihat sebaran fase tanam dan tren produksi untuk masing-masing kecamatan.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
