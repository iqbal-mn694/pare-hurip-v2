import { NextResponse } from 'next/server';

export async function GET() {
  const apiBaseUrl = process.env.PARE_HURIP_API_URL ?? 'http://127.0.0.1:8000';

  try {
    const response = await fetch(`${apiBaseUrl}/dashboard/summary`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(2_000),
    });

    if (response.ok) {
      return NextResponse.json(await response.json());
    }
  } catch {
    // Backend FastAPI belum berjalan; gunakan data demo lokal agar dashboard tetap usable.
  }

  return NextResponse.json({
    summary: {
      productionToday: 14750,
      activeAreas: 72,
      updatedAt: new Date().toISOString(),
    },
    comparison: [
      { model: 'Transformer', rmse: 9.4, mae: 7.1, description: 'Deep learning berbasis konteks panjang untuk prediksi produksi.' },
      { model: 'LSTM', rmse: 11.8, mae: 8.9, description: 'Model RNN yang kuat untuk tren time-series bulanan dan harian.' },
      { model: 'Geospatial', rmse: 10.2, mae: 7.5, description: 'Analisis area dan peta untuk mendukung prediksi lokasi spesifik.' },
    ],
    forecast: {
      daily: [
        { label: 'Sen', value: 14300 },
        { label: 'Sel', value: 14700 },
        { label: 'Rab', value: 14900 },
        { label: 'Kam', value: 14550 },
        { label: 'Jum', value: 15120 },
      ],
      monthly: [
        { label: 'Jan', value: 300 },
        { label: 'Feb', value: 320 },
        { label: 'Mar', value: 340 },
        { label: 'Apr', value: 330 },
        { label: 'Mei', value: 360 },
      ],
    },
  });
}
