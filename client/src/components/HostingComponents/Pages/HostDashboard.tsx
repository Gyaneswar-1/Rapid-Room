import SetUserDataToStore from "../../../service/userdata/SetDataToStore";
import EarningsOverview from "../components/analytics/EarningsOverview";

export default function HostDashboard() {


  // Mock data for the host
  const hostData = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalEarnings: 12450.75,
    pendingPayouts: 1250.5,
    totalReservations: 48,
    activeListings: 5,
  };

  return (
    <div className="flex h-screen bg-gray-50">
    <SetUserDataToStore/>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back,{" "}
              <span className="font-bold text-teal-800 text-lg">
                {hostData.name}
              </span>
              . Here's an overview of your hosting activity.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">$12,450.75</div>
                  <p className="text-xs text-gray-500">+15% from last month</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Bookings
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-xs text-gray-500">+8% from last month</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Occupancy Rate
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-gray-500">+5% from last month</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Average Rating
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-gray-500">+0.2 from last month</p>
                </div>
              </div>
            </div>
          </div>
          <EarningsOverview
            totalEarnings={hostData.totalEarnings}
            pendingPayouts={hostData.pendingPayouts}
            totalReservations={hostData.totalReservations}
            activeListings={hostData.activeListings}
          />
        </div>
      </main>
    </div>
  );
}
