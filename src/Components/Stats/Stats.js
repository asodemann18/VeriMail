import React, { useEffect, useState } from 'react';
import './Stats.css';
import { Doughnut } from 'react-chartjs-2';

const Stats = ({statsBreakdown, avgScore}) => {
  // const [chartData, setChartData] = useState([]);

  const chart = (trueData, falseData) => {
    // setChartData({
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
    // })
  }
  const keys = Object.keys(statsBreakdown)
  const chartData = keys.map(key => {
    return <Doughnut data={chart(statsBreakdown[key], (1-statsBreakdown[key]))}/>;
  })

  // useEffect(() => {
  //   chart();
  // }, [])

  return (
    <section className='chart-section'>
      {chartData}
    </section>
  )

}

export default Stats;