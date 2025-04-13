import { getHostStats } from "../../../service/manageHostData/getHostStats";
import SetUserDataToStore from "../../../service/userdata/SetDataToStore";
import EarningsOverview from "../components/analytics/EarningsOverview";
import { useEffect, useState } from "react";

interface HotelStatsDataInterface {
  totalRevenue: {
    _sum: {
      hostAmount: number;
    };
  };
  TotalBookings: number;
  OccupancyRate: {
    _avg: {
      numberOfRooms: number;
    };
  };
  averageRating: number;
  totalPendingPayments: number;
  totalReservations: number;
  monthlyPayments: {
    _sum: {
      amount: number;
    };
    paymentDate: string;
  }[];
  userHotelStats: {
    totalHotels: number;
    totalRooms: number;
    averageRoomsPerHotel: number;
  };
}

export default function HostDashboard() {
  const [hotelStats, setHotelStats] = useState<HotelStatsDataInterface | null>(null);

  useEffect(() => {
    const fetchHostStats = async () => {
      const response = await getHostStats();
      if (response.success) {
        setHotelStats(response.data);
      } else {
        console.error("Failed to fetch host stats");
      }
    };
    fetchHostStats();
  }, []);

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
      <SetUserDataToStore />

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
                  <div className="text-2xl font-bold">
                    {hotelStats?.totalRevenue?._sum?.hostAmount || 0}
                  </div>
                  <p className="text-xs text-gray-500">+15% from last month</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Bookings
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">{hotelStats?.TotalBookings || 0}</div>
                  <p className="text-xs text-gray-500">+8% from last month</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Occupancy Rate
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {hotelStats?.OccupancyRate?._avg?.numberOfRooms || 0}%
                  </div>
                  <p className="text-xs text-gray-500">+5% from last month</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Average Rating
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">{hotelStats?.averageRating || 0}</div>
                  <p className="text-xs text-gray-500">+0.2 from last month</p>
                </div>
              </div>
            </div>
          </div>
          <EarningsOverview
            totalEarnings={hotelStats?.totalRevenue?._sum?.hostAmount || 0}
            pendingPayouts={hostData.pendingPayouts}
            totalReservations={hostData.totalReservations}
            activeListings={hostData.activeListings} monthlyPayments={[]} averageRating={0}          />
        </div>
      </main>
    </div>
  );
}
