'use client'

import React, { useState, useMemo } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import ReactApexcharts from '@/libs/ApexCharts'
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { WaterFertilizerData } from '@/types/dashboardTypes';

type TimeRange = 'daily' | 'monthly';

interface ConsumptionData {
  timestamp: string;
  water: number;
  fertilizer: number;
}

const WaterFertilizerChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const { data, loading, error } = useRealTimeData();

  const formatData = useMemo(() => {
    if (!data || !data.waterFertilizer) return [];

    const consumptionData: WaterFertilizerData[] = data.waterFertilizer;

    switch (timeRange) {
      case 'daily':
        return [
          {
            name: 'Eau',
            data: consumptionData.map(d => [new Date(d.timestamp).getTime(), d.water])
          },
          {
            name: 'Engrais',
            data: consumptionData.map(d => [new Date(d.timestamp).getTime(), d.fertilizer])
          }
        ];
      case 'monthly':
        const monthlyData = consumptionData.reduce((acc, d) => {
          const date = new Date(d.timestamp);
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
          if (!acc[monthKey]) {
            acc[monthKey] = { water: 0, fertilizer: 0, count: 0 };
          }
          acc[monthKey].water += d.water;
          acc[monthKey].fertilizer += d.fertilizer;
          acc[monthKey].count += 1;
          return acc;
        }, {} as Record<string, { water: number; fertilizer: number; count: number }>);

        return [
          {
            name: 'Eau',
            data: Object.entries(monthlyData).map(([monthKey, values]) => [
              new Date(monthKey).getTime(),
              values.water / values.count
            ])
          },
          {
            name: 'Engrais',
            data: Object.entries(monthlyData).map(([monthKey, values]) => [
              new Date(monthKey).getTime(),
              values.fertilizer / values.count
            ])
          }
        ];
    }
  }, [data, timeRange]);

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      stacked: false,
    },
    title: {
      text: 'Consommation d\'eau et d\'engrais'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: [
      {
        title: {
          text: 'Eau (L)'
        },
      },
      {
        opposite: true,
        title: {
          text: 'Engrais (kg)'
        }
      }
    ],
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 1]
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  }), [timeRange]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <div className='flex justify-center items-center mb-4'>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='small'>
          <Button 
            color={timeRange === 'daily' ? 'primary' : 'inherit'}
            onClick={() => setTimeRange('daily')}
          >
            Journalier
          </Button>
          <Button 
            color={timeRange === 'monthly' ? 'primary' : 'inherit'}
            onClick={() => setTimeRange('monthly')}
          >
            Mensuel
          </Button>
        </ButtonGroup>
      </div>
      <ReactApexcharts
        options={chartOptions}
        series={formatData}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default WaterFertilizerChart;