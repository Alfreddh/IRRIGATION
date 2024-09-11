'use client'

import { useState, useEffect } from 'react';
import { CultureData, CulturePhase, DashboardData, HumidityData, WaterData, WaterFertilizerData } from '../types/dashboardTypes';



const phases: CulturePhase[] = ['Germination', 'Croissance', 'Floraison', 'Fructification'];
const generateCoherentHumidityData = (count: number): HumidityData[] => {
  const now = Date.now();
  const baseHumidity = {
    'Culture A': 50 + Math.random() * 10,
    'Culture B': 60 + Math.random() * 10,
    'Culture C': 70 + Math.random() * 10,
  };
  
  // Simuler une fluctuation journalière
  const hourlyFluctuation = (hour: number) => 
    Math.sin((hour / 24) * Math.PI * 2) * 5;

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now - (count - i - 1) * 60000);
    const hourFluct = hourlyFluctuation(date.getHours());
    
    return {
      timestamp: date.getTime(),
      values: {
        'Culture A': Math.max(0, Math.min(100, baseHumidity['Culture A'] + hourFluct + (Math.random() - 0.5) * 2)),
        'Culture B': Math.max(0, Math.min(100, baseHumidity['Culture B'] + hourFluct + (Math.random() - 0.5) * 2)),
        'Culture C': Math.max(0, Math.min(100, baseHumidity['Culture C'] + hourFluct + (Math.random() - 0.5) * 2)),
      }
    };
  });
};

const generateConsumptionData = (count: number): WaterFertilizerData[] => {
  const now = Date.now();
  const baseConsumption = {
    water: 100, // Litres par jour
    fertilizer: 2, // Kilogrammes par jour
  };
  
  // Simuler une fluctuation journalière
  const hourlyFluctuation = (hour: number) => 
    Math.sin((hour / 24) * Math.PI * 2) * 0.5 + 0.5; // Fluctuation entre 0 et 1

  // Simuler une fluctuation mensuelle (saisons)
  const monthlyFluctuation = (month: number) =>
    Math.sin((month / 12) * Math.PI * 2) * 0.3 + 1; // Fluctuation entre 0.7 et 1.3

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now - (count - i - 1) * 60 * 60 * 1000); // Données horaires
    const hourFluct = hourlyFluctuation(date.getHours());
    const monthFluct = monthlyFluctuation(date.getMonth());
    
    // Ajouter un peu de bruit aléatoire
    const randomNoise = () => (Math.random() - 0.5) * 0.2;

    const waterConsumption = baseConsumption.water * hourFluct * monthFluct * (1 + randomNoise());
    const fertilizerConsumption = baseConsumption.fertilizer * hourFluct * monthFluct * (1 + randomNoise());

    return {
      timestamp: date.getTime(),
      water: Math.max(0, waterConsumption),
      fertilizer: Math.max(0, fertilizerConsumption),
    };
  });
};

const generateWaterData = (count: number): WaterData[] => {
  const now = Date.now();
  const baseWaterConsumption = 100; // Litres par jour
  
  const hourlyFluctuation = (hour: number) => 
    Math.sin((hour / 24) * Math.PI * 2) * 0.5 + 0.5;

  const monthlyFluctuation = (month: number) =>
    Math.sin((month / 12) * Math.PI * 2) * 0.3 + 1;

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now - (count - i - 1) * 60 * 60 * 1000);
    const hourFluct = hourlyFluctuation(date.getHours());
    const monthFluct = monthlyFluctuation(date.getMonth());
    const randomNoise = (Math.random() - 0.5) * 0.2;

    return {
      timestamp: date.getTime(),
      water: Math.max(0, baseWaterConsumption * hourFluct * monthFluct * (1 + randomNoise)),
    };
  });
};


const generateCultureData = (): CultureData[] => {
  const cultures = ["Culture A", "Culture B", "Culture C", "Culture D"];
  return cultures.map(name => ({
    name : name ,
    area: Math.floor(Math.random() * 200) + 50 // Surface aléatoire entre 50 et 250
  }));
};


const fetchData = async (): Promise<DashboardData> => {
  // Simuler un délai de réseau
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    temperature: Math.random() * 30 + 10,
    waterFertilizer: generateConsumptionData(24 * 30),
    waterUsed: generateWaterData(24 * 30),
    // fertilizerUsed: Math.random() * 100,
    culturePhase: phases[Math.floor(Math.random() * phases.length)], // Typing correction hereculturePhase: ['Germination', 'Croissance', 'Floraison', 'Fructification'][Math.floor(Math.random() * 4)],
    alerts: Math.random() > 0.7 ? ['Température élevée'] : [],
    systemStatus: Math.random() > 0.9 ? 'Dysfonctionnement' : 'Normal',
    efficiency: Math.random() * 100,
    humidity: generateCoherentHumidityData(1440), // Données pour 24 heures
    cultureData: generateCultureData()
  };
};

export const useRealTimeData = () => {
  // console.log("*********************************************************************************************************")
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const newData = await fetchData();
        setData(prevData => {
          if (!prevData) return newData;
          // Mise à jour cohérente des données d'humidité
          const lastData = prevData.humidity[prevData.humidity.length - 1];
          const newHumidityData = generateCoherentHumidityData(1)[0];
          newHumidityData.values = {
            'Culture A': lastData.values['Culture A'] + (Math.random() - 0.5) * 0.5,
            'Culture B': lastData.values['Culture B'] + (Math.random() - 0.5) * 0.5,
            'Culture C': lastData.values['Culture C'] + (Math.random() - 0.5) * 0.5,
          };
          return {
            ...newData,
            humidity: [
              ...prevData.humidity.slice(-1439),
              newHumidityData
            ]
          };
        });
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      }
    };

    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 60000); // Mise à jour toutes les minutes

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};