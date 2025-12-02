export interface MedicineDetails {
  name: string;
  efficacy: string;
  region: string;
  books: string[];
}

export interface MedicineResponse {
  details: MedicineDetails;
}

export enum AppState {
  COTTAGE = 'COTTAGE',
  CABINET = 'CABINET',
}