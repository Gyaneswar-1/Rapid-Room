import { DollarSign, CreditCard, TrendingUp, Percent } from "lucide-react"
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

export default function PaymentStats() {
  // Mock data for payment stats
  const stats = [
    {
      title: "Total Revenue",
      value: "$128,450",
      change: "+15%",
      period: "vs last month",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-teal-100 text-primary",
    },
    {
      title: "Platform Fees",
      value: "$15,890",
      change: "+12%",
      period: "vs last month",
      icon: <Percent className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Transactions",
      value: "1,245",
      change: "+8%",
      period: "vs last month",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Average Commission",
      value: "12.4%",
      change: "+0.5%",
      period: "vs last month",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  // Chart data for payment methods
  const paymentMethodsData = {
    labels: ["Success", "failed", "pending", "refunded"],
    datasets: [
      {
        data: [65, 20, 10, 50],
        backgroundColor: [
          "rgb(20, 184, 166)", // teal-500
          "rgb(59, 130, 246)", // blue-500
          "rgb(139, 92, 246)", // purple-500
          "rgb(245, 158, 11)", // amber-500
        ],
        borderColor: [
          "rgb(255, 255, 255)",
          "rgb(255, 255, 255)",
          "rgb(255, 255, 255)",
          "rgb(255, 255, 255)",
        ],
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
      {/* Stats cards */}
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
          </div>
          <div className="mt-4">
            <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </span>
            <span className="text-xs text-gray-500 ml-1">{stat.period}</span>
          </div>
        </div>
      ))}

      {/* Payment Methods Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-3 lg:col-span-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Methods Distribution</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 relative">
            <Pie data={paymentMethodsData} options={chartOptions} />
          </div>
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="text-sm text-gray-600">Credit Card</span>
              </div>
              <span className="text-sm font-medium">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">PayPal</span>
              </div>
              <span className="text-sm font-medium">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600">Bank Transfer</span>
              </div>
              <span className="text-sm font-medium">10%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm text-gray-600">Crypto</span>
              </div>
              <span className="text-sm font-medium">3%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                <span className="text-sm text-gray-600">Other</span>
              </div>
              <span className="text-sm font-medium">2%</span>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Credit cards remain the most popular payment method, accounting for 65% of all transactions. PayPal
                follows at 20%, while bank transfers make up 10% of payments. Cryptocurrency payments are growing, now
                at 3%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

