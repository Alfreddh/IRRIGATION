export type CulturePhase = 'Germination' | 'Croissance' | 'Floraison' | 'Fructification';
export type SystemStatus = 'Normal' | 'Arrosage en cours' | 'Dysfonctionnement';

export interface DashboardData {
  temperature: number;
  humidity: HumidityData[];
  waterFertilizer: WaterFertilizerData[];
  waterUsed: WaterData[];
  // fertilizerUsed: FertilizerData[];
  culturePhase: CulturePhase;
  alerts: string[];
  systemStatus: SystemStatus;
  efficiency: number;
  cultureData : CultureData[]
}

export interface ChartData {
  categories: string[];
  series: number[];
}

export interface HumidityData {
  timestamp: number;
  values: {
    [cultureName: string]: number;
  };
}

export type TimeRange = 'daily' | 'monthly' | 'yearly';


export interface WaterData {
  timestamp: number;
  water: number;
}

// export interface FertilizerData {
//   timestamp: string;
//   fertilizer: number;
// }

export interface WaterFertilizerData {
  timestamp: number;
  water: number;
  fertilizer: number;
}

export interface CultureData {
  name: string;
  area: number;
}