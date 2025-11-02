import type { SaathiData } from './api';

const SAATHI_ID_KEY = 'saathi_id';
const SAATHI_DATA_KEY = 'saathi_data';

export const auth = {
  getSaathiId: (): string | null => {
    return localStorage.getItem(SAATHI_ID_KEY);
  },
  
  setSaathiId: (id: string): void => {
    localStorage.setItem(SAATHI_ID_KEY, id);
  },
  
  getSaathiData: (): SaathiData | null => {
    const data = localStorage.getItem(SAATHI_DATA_KEY);
    return data ? JSON.parse(data) : null;
  },
  
  setSaathiData: (data: SaathiData): void => {
    localStorage.setItem(SAATHI_DATA_KEY, JSON.stringify(data));
  },
  
  clearAuth: (): void => {
    localStorage.removeItem(SAATHI_ID_KEY);
    localStorage.removeItem(SAATHI_DATA_KEY);
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(SAATHI_ID_KEY);
  },
};
