import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Widget({ color, icon, title, chartTitle, chartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${chartTitle}`,
      },
    },
  }

  return (
    <div className='p-3 bg-white rounded-md shadow-sm flex-1'>
      <div className='flex gap-2 items-center'>
        <div
          className={`bg-${color}-200 text-white p-1 border-2 border-${color}-500 rounded-md`}
        >
          {icon}
        </div>
        <h1 className={`text-${color}-700 font-bold`}>{title}</h1>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  )
}
