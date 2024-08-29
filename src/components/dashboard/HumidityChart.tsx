'use client'

import React from 'react';
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { formatHumidityData } from '../../utils/dataFormatters';
import { humidityChartOptions } from '../../utils/chartOptions';

// Component Imports
import ReactApexcharts from '@/libs/ApexCharts'

const HumidityChart: React.FC = () => {
  const { data, loading, error } = useRealTimeData();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return null;

  const chartData = formatHumidityData(data);

  const series = [{
    name: 'Humidité',
    data: chartData.series
  }];

  const options: ApexOptions = {
    ...humidityChartOptions,
    xaxis: {
      categories: chartData.categories
    }
  };

  return (
    <ReactApexcharts
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default HumidityChart;