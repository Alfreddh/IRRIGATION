'use client'

import React from 'react';
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { formatWaterFertilizerData } from '../../utils/dataFormatters';
import { waterFertilizerChartOptions } from '../../utils/chartOptions';

// Component Imports
import ReactApexcharts from '@/libs/ApexCharts'

const WaterFertilizerChart: React.FC = () => {
  const { data, loading, error } = useRealTimeData();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return null;

  const chartData = formatWaterFertilizerData(data);

  const series = [{
    name: 'Quantité',
    data: chartData.series
  }];

  const options: ApexOptions = {
    ...waterFertilizerChartOptions,
    xaxis: {
      categories: chartData.categories
    }
  };

  return (
    <ReactApexcharts
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default WaterFertilizerChart;