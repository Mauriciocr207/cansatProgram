const barChar = document.querySelector('#barChar')
export const barChart = echarts.init(
  barChar, 
  'dark', 
  {
    width: 400,
    height: 270,
    renderer:'svg'
  }
);
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
barChart.setOption(option);

export function pushDataBarChart(chart = {}, newData, time) {
  const option = chart.getOption();
  // const xAxislength = option.xAxis[0].data.length;
  option.xAxis[0].data.push(time);
  option.series[0].data.push(newData);
  chart.setOption(option);
  console.log(
  );
}

