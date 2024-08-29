import { useState, useEffect } from 'react';
import { CulturePhase, DashboardData } from '../types/dashboardTypes';

// Simulez une fonction qui récupère les données du backend
const fetchData = async (): Promise<DashboardData> => {
  // Remplacez ceci par un vrai appel API

  const phases: CulturePhase[] = ['Germination', 'Croissance', 'Floraison', 'Fructification'];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        temperature: Math.random() * 30 + 10,
        humidity: Math.random() * 100,
        waterUsed: Math.random() * 1000,
        fertilizerUsed: Math.random() * 100,
        culturePhase: phases[Math.floor(Math.random() * phases.length)], // Typing correction hereculturePhase: ['Germination', 'Croissance', 'Floraison', 'Fructification'][Math.floor(Math.random() * 4)],
        alerts: Math.random() > 0.7 ? ['Température élevée'] : [],
        systemStatus: Math.random() > 0.9 ? 'Dysfonctionnement' : 'Normal',
        efficiency: Math.random() * 100
      });
    }, 1000);
  });
};

export const useRealTimeData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const newData = await fetchData();
        setData(newData);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      }
    };

    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};