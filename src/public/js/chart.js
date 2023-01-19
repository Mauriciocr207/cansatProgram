let myChart = echarts.init(
    document.querySelector("#radar"),
    'dark',
    {
        width: 350,
        height: 250,
        renderer: 'svg'
    }
);

const data = [
    [0,0]
];
let option = {
  title: {
    text: 'Radar'
  },
  legend: {
    data: ['line']
  },
  polar: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  angleAxis: {
    type: 'value',
    startAngle: 0,
    min: 0,
    max: 360
  },
  radiusAxis: {
    min: 0,
    max: 5
  },
  series: [
    {
      coordinateSystem: 'polar',
      name: 'line',
      symbolSize: 6,
      type: 'line',
      data: data
    }
  ]
};



let i = 1;
let id = setInterval(() => {
    const point = [
        i,
        Math.random() * 20 
    ]
    data.push(point);
    if(point[0] > 5) option.radiusAxis.max = 10;
    // option.series[0].data = [
    //     [0,0],
    //     point
    // ];
    option.series[0].data.push(point);
    myChart.setOption(option);
    console.log(
        data
    );
    if(i == 10) clearInterval(id);
    i++;
    
}, 1000);
myChart.setOption(option);


