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
  maintainAspectRatio: false, // Don't maintain w/h ratio
  animation: {
    duration: 0,
  },
  scales: {
    y:
      {
        // min: 0,
        // max: 1000,
        // stepSize: 5,
      },
    x:
      {
        
      },
  },
};
const initialValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const data = {
  labels: initialValues,
  datasets: [
    {
      label: "Temperature",
      data: initialValues,
      fill: false, // Don't fill area under the line
      borderColor: "#3A98B9", // Line color
    },
  ],
}

export function Presion() {
  const [chartData, setChartData] = useState(data);
  function updateData(newValue) {
    setChartData(prevChartData => {
      const {datasets, labels} = prevChartData;
      const {data} = datasets[0];
      const newData = [...data.slice(1), newValue];
      // console.log(newData);
      return {
        ...prevChartData,
        datasets: [{
          ...prevChartData.datasets[0],
          data: newData
        }]
      }
    })
  }
  
  useEffect(() => {
    ipcRenderer.on('arduino:data', (e, {pres, time}) => {
      updateData(pres);
      // console.log({pres, time});
    })
  }, []);

  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
}
