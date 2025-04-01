

import { useState } from "react"
import {
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentReport,
  HiOutlineChartBar,
  HiOutlineArrowSmUp,
  HiOutlineArrowSmDown,
} from "react-icons/hi"

// Mock data for earnings
const mockEarnings = {
  total: 12850,
  pending: 1200,
  paid: 11650,
  monthlyData: [
    { month: "Jan", amount: 950 },
    { month: "Feb", amount: 1100 },
    { month: "Mar", amount: 1250 },
    { month: "Apr", amount: 1400 },
    { month: "May", amount: 1600 },
    { month: "Jun", amount: 1800 },
    { month: "Jul", amount: 1500 },
    { month: "Aug", amount: 1300 },
    { month: "Sep", amount: 1100 },
    { month: "Oct", amount: 900 },
    { month: "Nov", amount: 0 },
    { month: "Dec", amount: 0 },
  ],
  properties: [
    { name: "Beachfront Villa", earnings: 5200, bookings: 12 },
    { name: "Mountain Cabin", earnings: 3800, bookings: 9 },
    { name: "Downtown Loft", earnings: 2100, bookings: 7 },
    { name: "Lakeside Cottage", earnings: 1750, bookings: 5 },
  ],
}

export default function EarningsPage() {
  const [timeframe, setTimeframe] = useState("year") // year, month, week

  // Calculate the highest value for the chart
  const maxValue = Math.max(...mockEarnings.monthlyData.map((item) => item.amount))

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Earnings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-rose-100 text-primary mr-4">
              <HiOutlineCurrencyDollar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total earnings</p>
              <h3 className="text-2xl font-bold text-gray-900">${mockEarnings.total.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <HiOutlineCalendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending payments</p>
              <h3 className="text-2xl font-bold text-gray-900">${mockEarnings.pending.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <HiOutlineDocumentReport className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Paid out</p>
              <h3 className="text-2xl font-bold text-gray-900">${mockEarnings.paid.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Earnings overview</h2>

            <div className="flex space-x-2">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                  timeframe === "week" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                  timeframe === "month" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                  timeframe === "year" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                Year
              </button>
            </div>
          </div>

          <div className="h-64">
            <div className="flex h-full items-end">
              {mockEarnings.monthlyData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full px-1">
                    <div
                      className="w-full bg-primary rounded-t"
                      style={{
                        height: `${(item.amount / maxValue) * 180}px`,
                        minHeight: item.amount > 0 ? "4px" : "0",
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Property performance</h2>

          <div className="space-y-4">
            {mockEarnings.properties.map((property, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-gray-900">{property.name}</h3>
                  <span className="text-sm font-medium text-gray-900">${property.earnings}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{property.bookings} bookings</span>

                  <div className="flex items-center">
                    {index % 2 === 0 ? (
                      <>
                        <HiOutlineArrowSmUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">+{(index + 1) * 3}%</span>
                      </>
                    ) : (
                      <>
                        <HiOutlineArrowSmDown className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">-{(index + 1) * 2}%</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${(property.earnings / mockEarnings.properties[0].earnings) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
            <HiOutlineChartBar className="mr-1.5 h-4 w-4" />
            View detailed report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent transactions</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Beachfront Villa</td>
                <td className="px-4 py-3 text-sm text-gray-500">John Smith</td>
                <td className="px-4 py-3 text-sm text-gray-500">May 1 - May 8, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">$2,450</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Mountain Cabin</td>
                <td className="px-4 py-3 text-sm text-gray-500">Emma Johnson</td>
                <td className="px-4 py-3 text-sm text-gray-500">May 3 - May 8, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">$1,250</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Downtown Loft</td>
                <td className="px-4 py-3 text-sm text-gray-500">Michael Brown</td>
                <td className="px-4 py-3 text-sm text-gray-500">May 15 - May 20, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">$1,000</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Lakeside Cottage</td>
                <td className="px-4 py-3 text-sm text-gray-500">Sarah Wilson</td>
                <td className="px-4 py-3 text-sm text-gray-500">May 10 - May 17, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">$1,960</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

