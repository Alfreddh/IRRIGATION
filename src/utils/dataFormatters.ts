import { DashboardData, ChartData } from '../types/dashboardTypes';

export const formatTemperatureData = (data: DashboardData): ChartData => ({
  categories: ['Température'],
  series: [data.temperature || 0]  // Handle potential null or undefined
});

export const formatHumidityData = (data: DashboardData): ChartData => ({
  categories: ['Humidité'],
  series: [data.humidity || 0]
});

export const formatWaterFertilizerData = (data: DashboardData): ChartData => ({
  categories: ['Eau', 'Engrais'],
  series: [data.waterUsed || 0, data.fertilizerUsed || 0]
});

export const formatEfficiencyData = (data: DashboardData): ChartData => ({
  categories: ['Efficacité'],
  series: [data.efficiency || 0]
});
