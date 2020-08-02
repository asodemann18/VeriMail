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
          'rgba(6, 214, 160, .8)',
          'rgba(255, 129, 123, 1)',
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
      <section className='chart'  data-testid='chart' key={key}>
        <Doughnut data={chart(statsBreakdown[key], (100-statsBreakdown[key]))} options={{
          responsive: true,
          title: {text: formattedKey(), 
            display: true, 
            fontFamily: 'Open Sans', 
            // fontColor: '#ef476f',
            fontColor: 'rgba(17,138,178, 1)',
            fontSize: 18,},
          legend: {
            position: 'bottom',
            labels: {
              fontFamily: 'Open Sans',
              fontSize: 14,
            }
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
              }
            }
          }
        }}/>
      </section>
    )
  })

  return (
    <section className='chart-section'>
      <section className='chart'>
        <h3 id='avg-title'>Average Overall Score</h3>
        <p id='avg-score'>{avgScore + '%'}</p>
      </section>
      {chartData}
    </section>
  )

}

export default Stats;