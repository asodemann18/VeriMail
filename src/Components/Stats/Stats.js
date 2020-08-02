import React, { useEffect, useState } from 'react';
import './Stats.css';
import { Doughnut } from 'react-chartjs-2';

const Stats = ({statsBreakdown, avgScore}) => {
  const chart = (trueData, falseData) => {
    return (
      {labels: ['True', 'False'],
      datasets: [
        {label: 'theLabel',
        backgroundColor: [
          'green',
          'red',
        ],
        data: [trueData, falseData],
        }
      ]}
    )
  }
  const keys = Object.keys(statsBreakdown)
  const chartData = keys.map(key => {
    const formattedKey = () => {
      if(key === 'free') {
      return '% Free Domain'
      } else if(key === 'format_valid') {
      return '% Valid Format';
      } else if(key === 'role') {
        return '% Role'
      } else if(key === 'disposable') {
        return '% Disposable'
      } else if (key === 'mx_found') {
        return '% Valid Domain'
      } else if (key === 'smtp_check') {
        return '% Valid User'
      }
    }
    return (
      <section className='test'>
        <Doughnut data={chart(statsBreakdown[key], (100-statsBreakdown[key]))} options={{
          responsive: true,
          title: {text: formattedKey(), display: true},
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
              }
            }
          }
        }}/>
      </section>
    );
  })

  return (
    <section className='chart-section'>
      {chartData}
    </section>
  )

}

export default Stats;