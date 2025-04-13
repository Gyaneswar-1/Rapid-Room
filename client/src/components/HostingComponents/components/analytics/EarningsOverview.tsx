

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
  monthlyPayments,
}: EarningsOverviewProps) {

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
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
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
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
    </div>
  );
}

// Also export as default for backward compatibility
export default EarningsOverview;
