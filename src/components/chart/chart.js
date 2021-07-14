import React from 'react';
import { Line } from 'react-chartjs-2';
import './chart.scss';

function Chart(props) {
  const data = {
    labels: props.date,
    datasets: [
      {
        label: '# of ' + props.message,
        data: props.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className='chart-header'>
        <h2 className='title'>{props.message}</h2>
      </div>
      <Line data={data} options={options} />
    </>
  )

}

export default Chart;
