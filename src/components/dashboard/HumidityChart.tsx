'use client'
import { ButtonGroup } from '@mui/material';
import {Button} from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { TimeRange } from '../../types/dashboardTypes';
import ReactApexcharts from '@/libs/ApexCharts'




// const Chart = dynamic(() => import('../../libs/Apexcharts'), { ssr: false });

const HumidityChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const { data, loading, error } = useRealTimeData();

  const formatData = useMemo(() => {
    if (!data || !data.humidity) return [];

    // console.log("data : ", data)

    const cultures = Object.keys(data.humidity[0].values);
    console.log("cultures : ", cultures)
    // const cultures = ["culture A", "culture B", "culture C"]

    switch (timeRange) {
        case 'daily':
          return cultures.map(culture => ({
            name: culture,
            data: data.humidity.map(h => [h.timestamp, h.values[culture]])
          }));
  
        case 'monthly':
          const dailyAvg = data.humidity.reduce((acc, h) => {
            const date = new Date(h.timestamp).toISOString().split('T')[0];
            if (!acc[date]) acc[date] = { sum: {}, count: {} };
            cultures.forEach(culture => {
              acc[date].sum[culture] = (acc[date].sum[culture] || 0) + h.values[culture];
              acc[date].count[culture] = (acc[date].count[culture] || 0) + 1;
            });
            return acc;
          }, {} as Record<string, { sum: Record<string, number>, count: Record<string, number> }>);
  
          return cultures.map(culture => ({
            name: culture,
            data: Object.entries(dailyAvg).map(([date, { sum, count }]) => [
              new Date(date).getTime(),
              sum[culture] / count[culture]
            ])
          }));
  
        case 'yearly':
          const monthlyAvg = data.humidity.reduce((acc, h) => {
            const date = new Date(h.timestamp);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (!acc[monthKey]) acc[monthKey] = { sum: {}, count: {} };
            cultures.forEach(culture => {
              acc[monthKey].sum[culture] = (acc[monthKey].sum[culture] || 0) + h.values[culture];
              acc[monthKey].count[culture] = (acc[monthKey].count[culture] || 0) + 1;
            });
            return acc;
          }, {} as Record<string, { sum: Record<string, number>, count: Record<string, number> }>);
  
          return cultures.map(culture => ({
            name: culture,
            data: Object.entries(monthlyAvg).map(([monthKey, { sum, count }]) => [
              new Date(monthKey).getTime(),
              sum[culture] / count[culture]
            ])
          }));
      }
    }, [data, timeRange]);
  

  // Options du graphique
  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: timeRange === 'daily' ? 'area' : 'bar',
      animations: {
        enabled: timeRange === 'daily',
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: timeRange === 'daily' ? 2 : 0
    },
    title: {
      text: 'Humidité des cultures'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Humidité (%)'
      },
      max: 100,
      tickAmount: 11, // Assure d'avoir des ticks à chaque intervalle de 10 (0, 10, 20, ... 100)
      labels: {
        formatter: (value) => `${value.toFixed(0)}`
      }

      
    },
    dataLabels: {
      enabled: timeRange !== 'daily'
    },
    tooltip: {
      shared: true,
      intersect: false
    }
  }), [timeRange]);


  if (loading) return <div>Chargement... </div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <div className='flex justify-center items-center'>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='small'>
            <Button color="error" onClick={() => setTimeRange('daily')}> Journalier</Button>
            <Button color="primary" onClick={() => setTimeRange('monthly')}> Mensuel</Button>
            <Button color="secondary" onClick={() => setTimeRange('yearly')}> Annuel</Button>
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

export default HumidityChart;



{/* <Button
  color="info"
  onClick={onEdit}
  // startIcon={<EditIcon />}
>
  Edit
</Button>
<Button
  color="error"
  onClick={() => setOpenDeleteDialog(true)}
  // startIcon={<DeleteIcon />}
>
  Delete
</Button> */}

