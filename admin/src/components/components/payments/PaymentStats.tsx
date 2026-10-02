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

interface PaymentStatsProps {
  data: {
    pieChart: {
      [key: string]: number;
    };
    topCards: {
      AverageCommission: number;
      PlatformFees: number;
      TotalRevenue: number;
      TotalTransactions: number;
    };
  };
}

export default function PaymentStats({ data }: PaymentStatsProps) {
  // Create stats from passed data
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${data.topCards.TotalRevenue.toLocaleString()}`,
      change: "+15%", // You might want to calculate this dynamically in the future
      period: "vs last month",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-teal-100 text-primary",
    },
    {
      title: "Platform Fees",
      value: `₹${data.topCards.PlatformFees.toLocaleString()}`,
      change: "+12%",
      period: "vs last month",
      icon: <Percent className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "Total Transactions",
      value: data.topCards.TotalTransactions.toLocaleString(),
      change: "+8%",
      period: "vs last month",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Average Commission",
      value: `${data.topCards.AverageCommission.toFixed(1)}%`,
      change: "+0.5%",
      period: "vs last month",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  // Get pie chart data from the passed data
  const pieChartLabels = Object.keys(data.pieChart);
  const pieChartValues = Object.values(data.pieChart);

  // Chart data for payment methods
  const paymentMethodsData = {
    labels: pieChartLabels,
    datasets: [
      {
        data: pieChartValues,
        backgroundColor: [
          "rgb(20, 184, 166)", // teal-500
          "rgb(59, 130, 246)", // blue-500
          "rgb(139, 92, 246)", // purple-500
          "rgb(245, 158, 11)", // amber-500
          "rgb(156, 163, 175)", // gray-400 - in case there are more than 4 categories
        ],
        borderColor: [
          "rgb(255, 255, 255)",
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

  // Helper function to get a color based on index
  const getColorClass = (index: number) => {
    const colors = [
      "bg-primary",
      "bg-teal-500", 
      "bg-purple-500",
      "bg-amber-500",
      "bg-gray-400"
    ];
    return colors[index % colors.length];
  };

  // Create the list of payment methods from the pie chart data
  const paymentMethodsList = pieChartLabels.map((label, index) => {
    const value = pieChartValues[index];
    return (
      <div key={index} className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${getColorClass(index)} mr-2`}></div>
          <span className="text-sm text-gray-600">{label}</span>
        </div>
        <span className="text-sm font-medium">{value}%</span>
      </div>
    );
  });

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
            {paymentMethodsList}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                This chart shows the distribution of payment methods used on the platform.
                The most popular payment method accounts for {Math.max(...pieChartValues)}% of all transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

