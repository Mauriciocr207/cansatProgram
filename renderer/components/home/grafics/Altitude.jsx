import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Temperatura',
    },
  },
  maintainAspectRatio: false,
};

const data = {
  labels: [0,0,0,0],
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,4],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export function Altitude() {
  return <Bar options={options} data={data} />;
}
