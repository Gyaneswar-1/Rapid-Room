"use client"

import { useState } from "react"
import HostSidebar from "@/components/host/host-sidebar"
import HostHeader from "@/components/host/host-header"
import {
  CalendarIcon,
  ArrowDownTrayIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"

export default function EarningsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [timeframe, setTimeframe] = useState("month")
  const [selectedYear, setSelectedYear] = useState(2023)

  // Mock data for the host
  const hostData = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalEarnings: 12450.75,
    pendingPayouts: 1250.5,
    totalReservations: 48,
    activeListings: 5,
  }

  // Mock data for earnings
  const earningsData = {
    monthly: [
      { month: "Jan", amount: 950, bookings: 4, change: 12 },
      { month: "Feb", amount: 1200, bookings: 5, change: 26 },
      { month: "Mar", amount: 1100, bookings: 4, change: -8 },
      { month: "Apr", amount: 1400, bookings: 6, change: 27 },
      { month: "May", amount: 1300, bookings: 5, change: -7 },
      { month: "Jun", amount: 1600, bookings: 7, change: 23 },
      { month: "Jul", amount: 1800, bookings: 8, change: 12 },
      { month: "Aug", amount: 2100, bookings: 9, change: 17 },
      { month: "Sep", amount: 1900, bookings: 8, change: -10 },
      { month: "Oct", amount: 2200, bookings: 10, change: 16 },
      { month: "Nov", amount: 2000, bookings: 9, change: -9 },
      { month: "Dec", amount: 2400, bookings: 11, change: 20 },
    ],
    yearly: [
      { year: 2019, amount: 8500, bookings: 35, change: 0 },
      { year: 2020, amount: 10200, bookings: 42, change: 20 },
      { year: 2021, amount: 14500, bookings: 60, change: 42 },
      { year: 2022, amount: 18950, bookings: 78, change: 31 },
      { year: 2023, amount: 22000, bookings: 90, change: 16 },
    ],
  }

  // Mock data for payouts
  const payoutsData = [
    { id: "PAY-1001", date: "2023-06-01", amount: 1850.0, status: "completed", method: "Bank Transfer" },
    { id: "PAY-1002", date: "2023-05-15", amount: 2100.0, status: "completed", method: "Bank Transfer" },
    { id: "PAY-1003", date: "2023-05-01", amount: 1950.0, status: "completed", method: "Bank Transfer" },
    { id: "PAY-1004", date: "2023-04-15", amount: 1750.0, status: "completed", method: "Bank Transfer" },
    { id: "PAY-1005", date: "2023-04-01", amount: 1600.0, status: "completed", method: "Bank Transfer" },
    { id: "PAY-1006", date: "2023-06-15", amount: 1250.5, status: "pending", method: "Bank Transfer" },
  ]

  // Mock data for hotel earnings
  const hotelEarningsData = [
    {
      id: "HTL-1001",
      name: "Sunset Beach Resort",
      location: "Bali, Indonesia",
      amount: 4850.0,
      bookings: 18,
      occupancyRate: 85,
    },
    {
      id: "HTL-1002",
      name: "Mountain View Lodge",
      location: "Aspen, Colorado",
      amount: 3600.0,
      bookings: 12,
      occupancyRate: 78,
    },
    {
      id: "HTL-1003",
      name: "City Center Suites",
      location: "Paris, France",
      amount: 2880.0,
      bookings: 8,
      occupancyRate: 65,
    },
    {
      id: "HTL-1004",
      name: "Lakeside Cabin",
      location: "Lake Tahoe, California",
      amount: 2400.0,
      bookings: 6,
      occupancyRate: 72,
    },
    {
      id: "HTL-1005",
      name: "Urban Apartment",
      location: "New York, USA",
      amount: 1280.0,
      bookings: 4,
      occupancyRate: 45,
    },
  ]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Get data based on timeframe
  const getChartData = () => {
    return timeframe === "month" ? earningsData.monthly : earningsData.yearly
  }

  // Find the max value for scaling
  const chartData = getChartData()
  const maxAmount = Math.max(...chartData.map((item) => item.amount))

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <HostSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <HostHeader
          hostName={hostData.name}
          hostAvatar={hostData.avatar}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
              <p className="text-gray-600 mt-1">Track your earnings and payouts</p>
            </div>

            {/* Earnings Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Earnings Chart */}
              <div className="bg-white rounded-lg shadow lg:col-span-2">
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Earnings Overview</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setTimeframe("month")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        timeframe === "month" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setTimeframe("year")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        timeframe === "year" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Year
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(hostData.totalEarnings)}</h3>
                    <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                      <ArrowUpIcon className="w-3 h-3 mr-1" />
                      12.5%
                    </span>
                    <span className="ml-2 text-sm text-gray-500">vs last {timeframe}</span>
                  </div>

                  {/* Simple bar chart */}
                  <div className="h-64 flex items-end space-x-2">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-t transition-all duration-200 relative group"
                          style={{ height: `${(item.amount / maxAmount) * 200}px` }}
                        >
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {formatCurrency(item.amount)}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-2">
                          {timeframe === "month" ? item.month : item.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="space-y-6">
                {/* Pending Payouts */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Pending Payouts</h3>
                      <p className="text-2xl font-semibold text-gray-900">{formatCurrency(hostData.pendingPayouts)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      View payout schedule →
                    </button>
                  </div>
                </div>

                {/* Total Reservations */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <CalendarIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Total Reservations</h3>
                      <p className="text-2xl font-semibold text-gray-900">{hostData.totalReservations}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <ArrowUpIcon className="w-3 h-3 mr-1" />
                      8.2%
                    </span>
                    <span className="ml-2 text-sm text-gray-500">vs last month</span>
                  </div>
                </div>

                {/* Download Report */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Download Reports</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Monthly Statement
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Tax Summary
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Earnings */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Earnings by Hotel</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Hotel
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bookings
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Occupancy Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Earnings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hotelEarningsData.map((hotel) => (
                      <tr key={hotel.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                          <div className="text-xs text-gray-500">{hotel.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.bookings}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-indigo-600 h-2.5 rounded-full"
                                style={{ width: `${hotel.occupancyRate}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-900">{hotel.occupancyRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(hotel.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Payout History</h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Payout ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Method
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payoutsData.map((payout) => (
                      <tr key={payout.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payout.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(payout.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(payout.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.method}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              payout.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">{payoutsData.length}</span> of{" "}
                      <span className="font-medium">{payoutsData.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                      <a
                        href="#"
                        aria-current="page"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

