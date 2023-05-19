import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
    const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'Dataset 2',
        data: [0,3,6,2,7,4,7,1],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  


export function Velocity() {
    return <Line options={options} data={data} />;
}