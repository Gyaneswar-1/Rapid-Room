import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  type ChartOptions,
} from "chart.js"

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title)

interface PieChartData {
  label: string;
  value: number;
  count: number;
}

interface ActivityChartProps {
  pieChartData?: PieChartData[];
  loading?: boolean;
}

export default function ActivityChart({ pieChartData, loading = false }: ActivityChartProps) {
  // Default data for when loading or no data is available
  const defaultData = [
    { label: "Active Users", value: 65, count: 650 },
    { label: "Hosts", value: 25, count: 250 },
    { label: "New Signups", value: 10, count: 100 }
  ];

  const data = pieChartData && pieChartData.length > 0 ? pieChartData : defaultData;

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          "rgb(20, 184, 166)", // teal-500
          "rgb(59, 130, 246)", // blue-500
          "rgb(245, 158, 11)", // amber-500
        ],
        borderColor: ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  // Chart options
  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 10,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">User Activity</h2>
      <div className="h-64 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <Pie data={chartData} options={chartOptions} />
        )}
      </div>
      <div className="mt-6 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className={`w-3 h-3 rounded-full mr-2 ${
                  index === 0 ? "bg-teal-500" : index === 1 ? "bg-blue-500" : "bg-amber-500"
                }`}
              ></div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

