import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  animation: {duration: 0},
  // scales: {y: {min: 0, max: 100, stepSize: 10}, x: {min: 0, max: 100, stepSize: 10}},
};
const initialValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const data = {
  labels: initialValues,
  datasets: [
    {
      label: "Temperatura",
      data: initialValues,
      fill: false,
      borderColor: "#3A98B9",
    },
    {
      label: "Presión",
      data: initialValues,
      fill: false,
      borderColor: "#7A18B0",
    },
    {
      label: "Altitud",
      data: initialValues,
      fill: false,
      borderColor: "#3E0",
    },
  ],
}

export function PTA() {
  const [chartData, setChartData] = useState(data);
  function updateData(temp, presion, altitud) {
    setChartData(prevChartData => {
      const {datasets, labels} = prevChartData;

      let {data:tempData} = datasets[0];
      let {data:presionData} = datasets[1];
      let {data:altitudData} = datasets[2];

      tempData = [...tempData.slice(1), temp];
      presionData = [...presionData.slice(1), presion];
      altitudData = [...altitudData.slice(1), altitud];

    
      // console.log(newData);
      return {
        ...prevChartData,
        datasets: [
          {...prevChartData.datasets[0], data: tempData},
          {...prevChartData.datasets[1], data: presionData},
          {...prevChartData.datasets[2], data: altitudData},
        ]
      }
    })
  }
  
  useEffect(() => {
    ipcRenderer.on('arduino:data', (e, {pres, temp, alt}) => {
      if(pres, temp, alt) {
        // updateData(pres, temp);
      }
    })
  }, []);

  return (<><Line data={chartData} options={options}/></>);
}
