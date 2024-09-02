'use client'

import React, { useMemo } from 'react';
// Component Imports
import ReactApexcharts from '@/libs/ApexCharts'
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { CultureData } from '@/types/dashboardTypes';


const CultureDistributionChart: React.FC = () => {
    const { data, loading, error } = useRealTimeData();
  
    const formatData = useMemo(() => {
      if (!data || !data.cultureData) return { series: [], labels: [] };
  
      const cultureData: CultureData[] = data.cultureData;
      // const totalArea = cultureData.reduce((sum, culture) => sum + culture.area, 0);
  
      // // const series = cultureData.map(culture => (culture.area / totalArea) * 100);
      // const series = cultureData.map(culture => (culture.area / totalArea) * 100);
      // const labels = cultureData.map(culture => culture.name);

      // Utiliser directement les valeurs de superficie pour la série
      const series = cultureData.map(culture => culture.area);
      const labels = cultureData.map(culture => culture.name);
  
      return { series, labels };
    }, [data]);
  
    const chartOptions: ApexOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Distribution des Cultures',
        align: 'center',
      },
      labels: formatData.labels,
      legend: {
        position: 'bottom',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      tooltip: {
        y: {
          formatter: (value) => `${value.toFixed(1)}m²`
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`
      },
    };
  
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (!data) return null;
  
    return (
      <div>
        <ReactApexcharts
          options={chartOptions}
          series={formatData.series}
          type="pie"
          height={350}
        />
      </div>
    );
  };
  
  export default CultureDistributionChart;