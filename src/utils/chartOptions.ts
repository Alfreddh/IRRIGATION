import { ApexOptions } from 'apexcharts';

// Palette de couleurs commune
const commonColors = ['#FF4560', '#008FFB', '#00E396', '#FEB019'];

export const temperatureChartOptions: ApexOptions = {
  chart: {
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    }
  },
  colors: [commonColors[0]], // Utilisation de la couleur commune
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Température'
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    title: {
      text: '°C'
    }
  }
};

export const humidityChartOptions: ApexOptions = {
  chart: {
    type: 'area'
  },
  colors: [commonColors[1]],
  title: {
    text: 'Humidité'
  },
  yaxis: {
    title: {
      text: '%'
    },
    max: 100
  }
};

export const waterFertilizerChartOptions: ApexOptions = {
  chart: {
    type: 'bar'
  },
  colors: [commonColors[2], commonColors[3]], // Eau et Engrais avec différentes couleurs
  title: {
    text: 'Utilisation d\'eau et d\'engrais'
  },
  xaxis: {
    categories: ['Eau', 'Engrais']
  },
  yaxis: {
    title: {
      text: 'Quantité'
    }
  }
};

export const efficiencyGaugeOptions: ApexOptions = {
  chart: {
    type: 'radialBar'
  },
  colors: [commonColors[0]], // Couleur de l'efficacité
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: '16px',
          color: undefined,
          offsetY: 120
        },
        value: {
          offsetY: 76,
          fontSize: '22px',
          color: undefined,
          formatter: function (val) {
            return val + "%";
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91]
    },
  },
  stroke: {
    dashArray: 4
  },
  labels: ['Efficacité du système'],
};
