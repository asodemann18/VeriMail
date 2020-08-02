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
  const formattedTitles = [{
    format_valid: 'Valid Format',
    // 'MX Found',
    // 'SMTP Check',
    // 'Business Role',
    // 'Disposable',
    // 'Free Domain'
  }]
  const chartData = keys.map(key => {
    const formattedKey = () => {if(key === 'free') {
      return 'Free Domain'
    }}
    return (
      <section className='test'>
        <Doughnut data={chart(statsBreakdown[key], (1-statsBreakdown[key]))} options={{
          responsive: true,
          title: {text: key, display: true}
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