import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";
import useComponentSize from "@rehooks/component-size";
import { ipcRenderer } from "electron";

const option = {
    legend: {
      data: ['line']
    },
    polar: {
      radius: "75%",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    angleAxis: {
      type: 'value',
      min: 0,
      max: 360,
      axisLabel: {inside:true, fontSize: 8, interval: 1, formatter: (value) => {
        return value % 20 === 0 ? value : '';
      }}
    },
    radiusAxis: {
      max: 20,
      axisLabel: {fontSize: 8, interval: 1, formatter: (value) => {
        return value % 10 === 0 ? value : '';
      }}
    },
    series: [
      {
        coordinateSystem: 'polar',
        type: 'line',
        data: [[5, 30]]
      }
    ]
  };

export function Position() {
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
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            data: [[5, 30]]
        }]
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
