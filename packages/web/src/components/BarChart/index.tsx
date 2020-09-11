import React from 'react'

import { Bar } from 'react-chartjs-2'

interface IBarChartProps {
  plan: string
  costWithPlan: number
  costWithoutPlan: number
}

const BarChart: React.FC<IBarChartProps> = ({
  plan,
  costWithPlan,
  costWithoutPlan
}) => {
  const data = {
    labels: ['Comparação de custos'],
    datasets: [
      {
        label: 'Sem plano',
        data: [costWithoutPlan],
        borderColor: ['#ABDFF9', '#ABDFF9'],
        backgroundColor: ['#ABDFF9', '#ABDFF9']
      },
      {
        label: `Com plano ${plan}`,
        data: [costWithPlan],
        borderColor: ['#6D90C6', '#6D90C6'],
        backgroundColor: ['#6D90C6', '#6D90C6']
      }
    ]
  }

  const options = {
    title: { display: true, text: 'Custo de chamadas Telzir' },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max:
              costWithoutPlan > costWithPlan ? costWithoutPlan : costWithPlan,
            stepSize: (costWithoutPlan / 10).toFixed()
          }
        }
      ]
    }
  }

  return <Bar data={data} options={options} />
}

export default BarChart
