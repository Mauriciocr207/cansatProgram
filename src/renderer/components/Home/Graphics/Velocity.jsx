import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";
import useComponentSize from "@rehooks/component-size";
import { ipcRenderer } from "electron";

const option = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '70%'],
      min: 0,
      max: 60,
      splitNumber: 6,
      startAngle: 200,
      endAngle: -20,
      radius: '100%',
      animation: false,
      axisLine: {
        lineStyle: {
          color: [[1, '#f00']],
          width: 3
        }
      },
      splitLine: {
        distance: -12,
        length: 12,
        lineStyle: {
          color: '#f00'
        }
      },
      axisTick: {
        distance: -8,
        length: 5,
        lineStyle: {
          color: '#f00'
        }
      },
      axisLabel: {
        distance: -23,
        color: '#f00',
        fontSize: 10
      },
      anchor: {
        show: true,
        size: 20,
        itemStyle: {
          borderColor: '#000',
          borderWidth: 2
        }
      },
      pointer: {
        offsetCenter: [0, '10%'],
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '115%',
        itemStyle: {
          color: '#000'
        }
      },
      // title: {offsetCenter: [0, '-10%']},
      detail: {
        fontSize: 15,
        formatter: '{value} m/s',

      },
      data: [{value: 12, name: ''}]
    },
    {
      type: 'gauge',
      center: ['50%', '70%'],
      min: 0,
      max: 60,
      splitNumber: 6,
      startAngle: 200,
      endAngle: -20,
      animation: false,
      radius: "90%",
      axisLine: {
        lineStyle: {
          color: [[1, '#000']],
          width: 3
        }
      },
      splitLine: {
        distance: -3,
        length: 18,
        lineStyle: {
          color: '#000'
        }
      },
      axisTick: {
        distance: 0,
        length: 10,
        lineStyle: {
          color: '#000'
        }
      },
      axisLabel: {
        distance: 10,
        fontSize: 10,
        color: '#000'
      },
      pointer: {
        show: false
      },
      title: {
        show: false
      },
      anchor: {
        show: true,
        size: 14,
        itemStyle: {
          color: '#000'
        }
      }
    }
  ]
};

export function Velocity() {
  const chart = useRef(null);
  let chartInstance = null;
  const size = useComponentSize(chart);

  function renderChart() {
    const renderInstance = echarts.getInstanceByDom(chart.current);

    if (renderInstance) {
      chartInstance = renderInstance;
    } else {
      chartInstance = echarts.init(chart.current);
    }
    chartInstance.setOption(option);
  }

  useEffect(() => {
    renderChart();
    if (chartInstance != null) {
      chartInstance.resize({
        height: size.height
      });
    }
  }, [size]);

  useEffect(() => {
    ipcRenderer.on('arduino:data', (e, {vel}) => {
      echarts.getInstanceByDom(chart.current).setOption({
        series: [{type: 'gauge', data: [{value:vel}]}]
      });
    })
  }, []);

  return (
    <div
      ref={chart}
      style={{
        width: "100",
        height: "100%",
      }}
    />
  );
};
