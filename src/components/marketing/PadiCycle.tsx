'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface PadiStage {
  id: string;
  name: string;
  duration: string;
  description: string;
  details: string[];
  color: 'blue' | 'green' | 'yellow';
  image: string;
}

const stages: PadiStage[] = [
  {
    id: 'persiapan-lahan',
    name: 'Persiapan Lahan',
    duration: '2-3 minggu',
    color: 'blue',
    description: 'Tahap mempersiapkan lahan untuk penanaman padi dengan membersihkan, mengolah tanah, dan memastikan irigasi yang baik.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pembersihan lahan dari sisa tanam sebelumnya',
      'Pengolahan tanah dengan traktor atau cangkul',
      'Pemeriksaan dan perbaikan sistem irigasi',
      'Pembuatan bedengan dan saluran air',
      'Penyiapan bibit di tempat pembibitan',
    ],
  },
  {
    id: 'vegetatif-1',
    name: 'Vegetatif 1',
    duration: '2-3 minggu',
    color: 'green',
    description: 'Fase awal pertumbuhan padi setelah tanam dengan pembentukan akar dan daun-daun pertama.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pemindahan bibit ke lahan utama',
      'Pembentukan sistem akar primer',
      'Pertumbuhan daun-daun awal (3-4 daun)',
      'Pengendalian gulma pada fase awal',
      'Pemantauan kesehatan tanaman',
    ],
  },
  {
    id: 'vegetatif-2',
    name: 'Vegetatif 2',
    duration: '3-4 minggu',
    color: 'yellow',
    description: 'Fase perluasan daun dan penambahan anakan (tillers) dengan pertumbuhan batang yang lebih kuat.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pembentukan anakan padi (tillering)',
      'Perluasan daun secara eksponensial',
      'Penguatan sistem perakaran',
      'Pemeliharaan kelembaban lahan optimal',
      'Penerapan pupuk nitrogen untuk pertumbuhan maksimal',
    ],
  },
  {
    id: 'generatif-1',
    name: 'Generatif 1',
    duration: '2-3 minggu',
    color: 'blue',
    description: 'Fase transisi dari pertumbuhan vegetatif ke reproduktif dengan persiapan pembentukan bunga.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pembentukan primordia malai (calon bunga)',
      'Penutupan anakan muda (maximum tiller)',
      'Pengurangan laju pertumbuhan daun',
      'Persiapan translokasi energi ke malai',
      'Monitoring hama dan penyakit',
    ],
  },
  {
    id: 'generatif-2',
    name: 'Generatif 2',
    duration: '2-3 minggu',
    color: 'green',
    description: 'Fase pembentukan dan pengembangan bunga dengan pemanjangan malai dan pembukaan bunga.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pemanjangan malai di dalam pelepah daun',
      'Peningkatan kebutuhan air yang signifikan',
      'Pembukaan bunga (antesis)',
      'Penyerbukan dan pembuahan',
      'Kontrol hama pemasok dan penyakit blas',
    ],
  },
  {
    id: 'generatif-3',
    name: 'Generatif 3',
    duration: '3-4 minggu',
    color: 'yellow',
    description: 'Fase pengisian dan pematangan biji dengan pembentukan endosperm dan pengeringan biji.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pengisian buah (grain filling)',
      'Pengeringan biji secara gradual',
      'Translokasi nutrisi dari daun ke biji',
      'Penurunan kadar air biji',
      'Perubahan warna biji dari hijau menjadi kuning keemasan',
    ],
  },
  {
    id: 'panen',
    name: 'Panen',
    duration: '1-2 minggu',
    color: 'blue',
    description: 'Fase pemanenan padi yang sudah matang dengan kadar air berkurang menjadi 20-25%.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pemeriksaan tingkat kematangan padi',
      'Penentuan jadwal panen optimal',
      'Pemotongan padi dengan peralatan yang tepat',
      'Pengeringan dan perontokan padi',
      'Pengangkutan dan penyimpanan hasil panen',
    ],
  },
  {
    id: 'bera',
    name: 'Bera',
    duration: '2-3 minggu',
    color: 'green',
    description: 'Periode istirahat lahan untuk pemulihan kesuburan tanah sebelum tanam berikutnya.',
    image: '/images/hero-sawah.svg',
    details: [
      'Pembersihan sisa tanaman dari lahan',
      'Pengomposan limbah pertanian',
      'Analisis kesuburan tanah',
      'Perbaikan sistem drainase jika diperlukan',
      'Persiapan untuk musim tanam berikutnya',
    ],
  },
];

export function PadiCycle() {
  return (
    <section id="siklus-pertumbuhan-padi" className="min-h-screen flex items-center justify-center py-20 scroll-mt-20 bg-white relative overflow-hidden">
      <div className="wave-animation"></div>
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 w-full">
        <ScrollReveal className="text-center mb-6 space-y-4" direction="right">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900">
            Siklus Pertumbuhan Padi
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
            Kenali setiap fase dalam siklus hidup padi, dari persiapan lahan hingga masa panen yang menentukan.
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-6" direction="left">
          <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            <div className="flex gap-5 snap-x snap-mandatory px-1">
              {stages.map((stage) => (
                <div key={stage.id} className="snap-start min-w-[280px] max-w-[320px] flex-shrink-0 rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg">
                  <div className="relative h-52 overflow-hidden rounded-t-3xl bg-slate-100">
                    <img src={stage.image} alt={stage.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{stage.name}</p>
                    <p className="text-sm text-slate-500">{stage.duration}</p>
                    <p className="text-sm leading-6 text-slate-600">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
