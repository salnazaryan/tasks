import React from 'react';
import { Line } from 'react-chartjs-2';

const DEFAULT_CONFIG = {
  labels: [],
  datasets: {
    label: '',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'transparent',
    borderColor: '#ff9332',
    borderCapStyle: 'butt',
    borderDash: [],
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#ff9332',
    pointBorderWidth: 0,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: '#c1c1c1',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 1,
    pointRadius: 0,
    pointHitRadius: 10,
    data: [],
  },
};

interface IChartProps {
  label: string;
  data: number[][];
  labels?: string[];
}

export default function Chart(props: IChartProps) {
  const { label, labels: chartLabels, data: chartDataArr } = props;
  const data = chartDataArr.map((it: number[]) => it[1]);
  const labels = chartLabels || Array(data.length).join('.').split('.');
  const chartData = {
    ...DEFAULT_CONFIG,
    labels: labels,
    datasets: [
      {
        ...DEFAULT_CONFIG.datasets,
        label,
        data,
      },
    ],
  };

  return (
    <div className="cs-chart">
      <Line data={chartData} />
    </div>
  );
}
