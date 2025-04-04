"use client"

import { CurrencyIcon, CalendarIcon } from "lucide-react"
import { useState } from "react"

interface EarningsOverviewProps {
  totalEarnings: number
  pendingPayouts: number
  totalReservations: number
  activeListings: number
}

export function EarningsOverview({
  totalEarnings,
  pendingPayouts,
  totalReservations,
  activeListings,
}: EarningsOverviewProps) {
  const [timeframe, setTimeframe] = useState("month")

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Mock data for the chart
  const monthlyEarnings = [
    { month: "Jan", amount: 950 },
    { month: "Feb", amount: 1200 },
    { month: "Mar", amount: 1100 },
    { month: "Apr", amount: 1400 },
    { month: "May", amount: 1300 },
    { month: "Jun", amount: 1600 },
    { month: "Jul", amount: 1800 },
    { month: "Aug", amount: 2100 },
    { month: "Sep", amount: 1900 },
    { month: "Oct", amount: 2200 },
    { month: "Nov", amount: 2000 },
    { month: "Dec", amount: 2400 },
  ]

  // Mock data for booking sources
  const bookingSources = [
    { source: "Direct Website", percentage: 45, color: "bg-primary" },
    { source: "Online Travel Agencies", percentage: 30, color: "bg-teal-500" },
    { source: "Travel Agents", percentage: 15, color: "bg-green-500" },
    { source: "Corporate Bookings", percentage: 10, color: "bg-amber-500" },
  ]

  // Find the max value for scaling
  const maxAmount = Math.max(...monthlyEarnings.map((item) => item.amount))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Earnings Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Earnings Overview</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeframe("month")}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === "month" ? "bg-primary text-teal-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeframe("year")}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === "year" ? "bg-primary text-teal-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Year
            </button>
            <button
              onClick={() => setTimeframe("all")}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === "all" ? "bg-primary text-teal-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Time
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalEarnings)}</h3>
            <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
              <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              12.5%
            </span>
            <span className="ml-2 text-sm text-gray-500">vs last {timeframe}</span>
          </div>

          {/* Enhanced bar chart with hover effects and gradient */}
          <div className="h-64 flex items-end space-x-2">
            {monthlyEarnings.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div
                  className="w-full relative bg-gradient-to-t from-teal-600 to-teal-400 hover:from-teal-700 hover:to-teal-500 rounded-t transition-all duration-200 cursor-pointer"
                  style={{ height: `${(item.amount / maxAmount) * 200}px` }}
                >
                  {/* Tooltip */}
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity">
                    {formatCurrency(item.amount)}
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards and Booking Sources Pie Chart */}
      <div className="space-y-6">
        {/* Booking Sources Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-primary text-teal-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">Booking Sources</h3>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              {/* Create pie chart segments */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-100"></div>

                {/* Pie segments */}
                <div
                  className="absolute inset-0 bg-primary"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)`,
                    opacity: bookingSources[0].percentage / 100,
                  }}
                ></div>
                <div
                  className="absolute inset-0 bg-teal-500"
                  style={{
                    clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`,
                    opacity: bookingSources[1].percentage / 100,
                  }}
                ></div>
                <div
                  className="absolute inset-0 bg-green-500"
                  style={{
                    clipPath: `polygon(50% 50%, 100% 100%, 0 100%)`,
                    opacity: bookingSources[2].percentage / 100,
                  }}
                ></div>
                <div
                  className="absolute inset-0 bg-amber-500"
                  style={{
                    clipPath: `polygon(50% 50%, 0 100%, 0 0, 50% 0)`,
                    opacity: bookingSources[3].percentage / 100,
                  }}
                ></div>
              </div>

              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">Sources</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {bookingSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${source.color} mr-2`}></div>
                  <span className="text-sm text-gray-600">{source.source}</span>
                </div>
                <span className="text-sm font-medium">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary text-teal-600">
              <CurrencyIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Payouts</h3>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(pendingPayouts)}</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
              View payout schedule →
            </button>
          </div>
        </div>

        {/* Total Reservations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Reservations</h3>
              <p className="text-2xl font-semibold text-gray-900">{totalReservations}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-600 font-medium flex items-center">
              <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              8.2%
            </span>
            <span className="ml-2 text-sm text-gray-500">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Also export as default for backward compatibility
export default EarningsOverview

