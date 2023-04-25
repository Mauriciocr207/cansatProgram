  import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

  const options = {
    responsive: true,
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

  


export function Temperatura() {
    useEffect(() => {
      ipcRenderer.on('Arduino:data', (event, data) => {
        const {acel} = data;
        const {x} = acel;
        console.log(data);
      });
    }, []);
    return <Line options={options} data={data} />;
}