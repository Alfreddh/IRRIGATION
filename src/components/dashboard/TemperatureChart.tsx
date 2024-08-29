'use client'

import React from 'react';
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { formatTemperatureData } from '../../utils/dataFormatters';
import { temperatureChartOptions } from '../../utils/chartOptions';

// Component Imports
import ReactApexcharts from '@/libs/ApexCharts'


const TemperatureChart: React.FC = () => {
  const { data, loading, error } = useRealTimeData();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return null;

  const chartData = formatTemperatureData(data);

  const series = [{
    name: 'Température',
    data: chartData.series
  }];

  const options: ApexOptions = {
    ...temperatureChartOptions,
    xaxis: {
      categories: chartData.categories
    }
  };

  return (
    <ReactApexcharts
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default TemperatureChart;