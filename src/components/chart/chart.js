import React from 'react';
import { Line } from 'react-chartjs-2';
import './chart.scss';

function Chart(props) {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
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
        <h1 className='title'>{props.message}</h1>
      </div>
      <Line data={data} options={options} />
    </>
  )

}

export default Chart;
