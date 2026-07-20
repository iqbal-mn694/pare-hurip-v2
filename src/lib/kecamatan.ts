export interface KecamatanData {
  id: string;
  name: string;
  productionDaily: number;
  productionMonthly: number;
  predictedNextMonth: number;
  areaHa: number;
  coordinates: { lat: number; lng: number };
}

export const kecamatans: KecamatanData[] = [
  { id: 'bantarkalong', name: 'Bantarkalong', productionDaily: 420, productionMonthly: 9600, predictedNextMonth: 9800, areaHa: 1320, coordinates: { lat: -7.634, lng: 108.150 } },
  { id: 'bojonggambir', name: 'Bojonggambir', productionDaily: 380, productionMonthly: 8350, predictedNextMonth: 8600, areaHa: 1180, coordinates: { lat: -7.521, lng: 108.195 } },
  { id: 'cisayong', name: 'Cisayong', productionDaily: 510, productionMonthly: 10400, predictedNextMonth: 10650, areaHa: 1450, coordinates: { lat: -7.637, lng: 108.040 } },
  { id: 'cibalanarik', name: 'Cibalanarik', productionDaily: 290, productionMonthly: 6500, predictedNextMonth: 6750, areaHa: 980, coordinates: { lat: -7.424, lng: 108.028 } },
  { id: 'cikatomas', name: 'Cikatomas', productionDaily: 460, productionMonthly: 9600, predictedNextMonth: 9900, areaHa: 1325, coordinates: { lat: -7.498, lng: 108.096 } },
  { id: 'cihaurbeuti', name: 'Cihaurbeuti', productionDaily: 340, productionMonthly: 7600, predictedNextMonth: 7800, areaHa: 1100, coordinates: { lat: -7.507, lng: 108.124 } },
  { id: 'cisalak', name: 'Cisompet', productionDaily: 390, productionMonthly: 8300, predictedNextMonth: 8550, areaHa: 1205, coordinates: { lat: -7.546, lng: 108.107 } },
  { id: 'garutmanuju', name: 'Garut Manuju', productionDaily: 280, productionMonthly: 6500, predictedNextMonth: 6650, areaHa: 950, coordinates: { lat: -7.606, lng: 108.207 } },
  { id: 'karangnunggal', name: 'Karangnunggal', productionDaily: 530, productionMonthly: 11200, predictedNextMonth: 11500, areaHa: 1530, coordinates: { lat: -7.533, lng: 108.126 } },
  { id: 'mangunreja', name: 'Mangunreja', productionDaily: 370, productionMonthly: 7900, predictedNextMonth: 8150, areaHa: 1190, coordinates: { lat: -7.621, lng: 108.176 } },
  { id: 'padakembang', name: 'Padakembang', productionDaily: 260, productionMonthly: 5700, predictedNextMonth: 5900, areaHa: 870, coordinates: { lat: -7.600, lng: 108.047 } },
  { id: 'pacet', name: 'Pacet', productionDaily: 310, productionMonthly: 6900, predictedNextMonth: 7100, areaHa: 1020, coordinates: { lat: -7.493, lng: 108.075 } },
  { id: 'panjalu', name: 'Panjalu', productionDaily: 430, productionMonthly: 9200, predictedNextMonth: 9450, areaHa: 1290, coordinates: { lat: -7.588, lng: 108.137 } },
  { id: 'salawu', name: 'Salawu', productionDaily: 495, productionMonthly: 10650, predictedNextMonth: 10900, areaHa: 1465, coordinates: { lat: -7.490, lng: 108.159 } },
  { id: 'sukaresik', name: 'Sukaresik', productionDaily: 470, productionMonthly: 10200, predictedNextMonth: 10450, areaHa: 1380, coordinates: { lat: -7.559, lng: 108.061 } },
];
