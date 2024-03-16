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

function getData() {
  const labels = [];
  for (let i = 1; i <= 15; i++) {
       labels.push(i);
  }
  return labels;
}

function getValues() {
  const values = [];
  for (let i = 1; i <= 15; i++) {
       values.push(0);
  }
  return values;
}

export function Presion() {
  const [chartData, setChartData] = useState({
    labels: getData(),
    datasets: [
      {
        label: "Temperature",
        data: getValues(),
        fill: false, // Don't fill area under the line
        borderColor: "#3A98B9", // Line color
      },
    ],
  });
  function updateData() {
    setChartData(prevChartData => {
      const {datasets, labels} = prevChartData;
      const {data} = datasets[0];
      const newData = [...data.slice(1), Math.random() * 10];
      console.log(newData);
      return {
        ...prevChartData,
        // labels: []

    
        datasets: [{
          ...prevChartData.datasets[0],
          data: newData
        }]
      }
    })
  }
  
  useEffect(() => {
    setInterval(() => {
      updateData();
    }, 1000);
  }, []);

  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
}
