'use client'

import React from 'react';
import { ApexOptions } from 'apexcharts';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { CulturePhase } from '../../types/dashboardTypes';

// Component Imports
import ReactApexcharts from '@/libs/ApexCharts'

const CulturePhaseChart: React.FC = () => {
  const { data, loading, error } = useRealTimeData();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return null;

  const phases: CulturePhase[] = ['Germination', 'Croissance', 'Floraison', 'Fructification'];
  const currentPhaseIndex = phases.indexOf(data.culturePhase);

  const series = [{
    data: phases.map((_, index) => index <= currentPhaseIndex ? 100 : 0)
  }];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: 'Phase de Culture'
    },
    xaxis: {
      categories: phases,
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val === 100 ? "Complété" : "En cours";
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
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

export default CulturePhaseChart;