export type CulturePhase = 'Germination' | 'Croissance' | 'Floraison' | 'Fructification';
export type SystemStatus = 'Normal' | 'Arrosage en cours' | 'Dysfonctionnement';

export interface DashboardData {
  temperature: number;
  humidity: number;
  waterUsed: number;
  fertilizerUsed: number;
  culturePhase: CulturePhase;
  alerts: string[];
  systemStatus: SystemStatus;
  efficiency: number;
}

export interface ChartData {
  categories: string[];
  series: number[];
}