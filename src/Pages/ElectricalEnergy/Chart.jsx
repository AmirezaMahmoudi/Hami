import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components and the data labels plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const OutletChart = ({ outlets }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: outlets.map((outlet, index) => `Outlet ${index + 1}`), // Use outlets for the x-axis
    datasets: [
      {
        label: 'Energy (kw/h)',
        data: outlets.map(outlet => outlet.energy), // Map each outlet's energy to the y-axis
        backgroundColor: 'rgba(54, 162, 235, 1)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        datalabels: {
          align: 'end', // Aligns the labels to the top of the bars
          anchor: 'end', // Anchors the labels at the end of the bar
          color: '#ffff', // Label color
          formatter: (value) => `${value} kw/h`, // Format to display value + "kW/h"
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffff', // Legend text color
        },
      },
      title: {
        display: false,
        text: 'Energy Consumption by Outlet (kw/h)',
      },
      datalabels: {
        display: true,
        color: '#ffff', // Data labels color
        formatter: (value) => `${value} kW/h`, // Format data labels to show value + "kW/h"
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Outlets',
          color: '#ffff', // X-axis title color
        },
        ticks: {
          color: '#ffff', // X-axis tick color
        },
      },
      y: {
        title: {
          display: true,
          text: 'KW / H',
          color: '#ffff', // Y-axis title color
        },
        ticks: {
          color: '#FFff', // Y-axis tick color
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px', margin: 'auto' }} className='bg-slate-700 rounded-xl p-2'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default OutletChart;
