export interface AdminData {
  title: string;
  description: string;
  productionToday: number;
  activeAreas: number;
  fileName?: string;
  fileType?: string;
  fileData?: string;
  updatedAt: string;
}

let currentAdminData: AdminData | null = null;

export function getAdminData(): AdminData | null {
  return currentAdminData;
}

export function setAdminData(data: Omit<AdminData, 'updatedAt'>): AdminData {
  currentAdminData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return currentAdminData;
}
