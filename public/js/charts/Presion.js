import { Chart } from "./Chart_Init.js";
// Set options
const option = {
  xAxis: {
    type: 'category',
    data: [0]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [0],
      type: 'line'
    }
  ]
};

// Create Echart
export const presion = new Chart(
  document.querySelector('#Presion'),
  option
);

presion.pushData = function(newData, time) {
  // Se encuentran las opciones del chart
  const option = this.chart.getOption();
  //  Se realizan las operaciones para agregar datos
  option.xAxis[0].data.push(time);
  option.series[0].data.push(newData);
  this.chart.setOption(option);
};
