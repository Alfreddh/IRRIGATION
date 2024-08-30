'use client'

import React, { useState, useMemo } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import ReactApexcharts from '@/libs/ApexCharts'
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { WaterData } from '@/types/dashboardTypes';


type TimeRange = 'daily' | 'monthly';
const WaterUsedChart: React.FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('daily');
    const { data, loading, error } = useRealTimeData();
  
    const formatData = useMemo(() => {
      if (!data || !data.waterUsed) return [];
  
      const consumptionData: WaterData[] = data.waterUsed;
  
      switch (timeRange) {
        case 'daily':
          return [{
            name: 'Consommation d\'eau',
            data: consumptionData.map(d => [new Date(d.timestamp).getTime(), d.water])
          }];
        case 'monthly':
          const monthlyData = consumptionData.reduce((acc, d) => {
            const date = new Date(d.timestamp);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (!acc[monthKey]) {
              acc[monthKey] = { water: 0, count: 0 };
            }
            acc[monthKey].water += d.water;
            acc[monthKey].count += 1;
            return acc;
          }, {} as Record<string, { water: number; count: number }>);
  
          return [{
            name: 'Consommation moyenne d\'eau',
            data: Object.entries(monthlyData).map(([monthKey, values]) => [
              new Date(monthKey).getTime(),
              values.water / values.count
            ])
          }];
      }
    }, [data, timeRange]);
  
    const chartOptions: ApexOptions = useMemo(() => ({
      chart: {
        type: timeRange === 'daily' ? 'area' : 'bar',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      title: {
        text: 'Consommation d\'eau'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Eau (L)'
        },
        labels: {
          formatter: (value) => value.toFixed(1)
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
          formatter: (value) => `${value.toFixed(1)} L`
        }
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
          type={timeRange === 'daily' ? 'area' : 'bar'}
          height={350}
        />
      </div>
    );
  };
  
  export default WaterUsedChart;