;

import { CurrencyIcon, CalendarIcon, Star } from "lucide-react";
import { useState } from "react";

interface EarningsOverviewProps {
  totalEarnings: number;
  pendingPayouts: number;
  totalReservations: number;
  activeListings: number;
  monthlyPayments: {
    _sum: {
      amount: number;
    };
    paymentDate: string;
  }[];
  averageRating: number;
}

export function EarningsOverview({
  totalEarnings,
  pendingPayouts,
  totalReservations,
  activeListings,
  monthlyPayments,
  averageRating,
}: EarningsOverviewProps) {
  const [timeframe, setTimeframe] = useState("month");

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Mock data for the chart
  const monthlyEarnings = monthlyPayments?.map((item) => {
    const date = new Date(item.paymentDate);
    const month = date.toLocaleString('default', { month: 'short' });
    return { month: month, amount: item._sum.amount || 0 };
  }) || [];

  // Find the max value for scaling
  const maxAmount = Math.max(...monthlyEarnings.map((item) => item.amount));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Earnings Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Earnings Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-baseline mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalEarnings)}
            </h3>
            <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              12.5%
            </span>
            <span className="ml-2 text-sm text-gray-500">
              vs last {timeframe}
            </span>
          </div>

          <div className="h-64 flex items-end space-x-2">
            {monthlyEarnings.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group"
              >
                <div
                  className="w-full relative bg-gradient-to-t bg-primary   rounded-t transition-all duration-200 cursor-pointer"
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

        <div className="bg-white rounded-lg shadow-sm border  border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-teal-100 text-teal-600">
              <CurrencyIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Pending Payouts
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(pendingPayouts)}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
              View payout schedule →
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Reservations
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {totalReservations}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-600 font-medium flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Star className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Host Rating</h3>
              <p className="text-2xl font-semibold text-gray-900">{averageRating}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-600 font-medium flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
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
  );
}

// Also export as default for backward compatibility
export default EarningsOverview;
