import { useState, useEffect } from "react"
import StatsCards from "./StatsCards"
import ActivityChart from "./ActivityChart"
import { admin_getAnalysis } from "../../../../service/admin/admin_getAnalysis.service"

interface PieChartData {
  label: string;
  value: number;
  count: number;
}

interface HotelImage {
  id: number;
  imageUrl: string;
  hotelId: number;
}

interface Hotel {
  id: number;
  hotelName: string;
  status: string;
  images: HotelImage[];
}

interface DashboardData {
  activeHosts: number;
  listedHotels: number;
  newSignups: number;
  pendingApprovals: number;
  pendingHotels: number;
  pendingUsers: number;
  totalUsers: number;
  pieChartData: PieChartData[];
  recentHotels: Hotel[];
}

export default function DashboardView() {


  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardData | undefined>();

  useEffect(() => {
    async function getStatsData() {
      try {
        setLoading(true);
        const response = await admin_getAnalysis();
        console.log("Stats response:", response);
        setStats(response.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getStatsData();
  }, [])


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome to your admin dashboard</p>
      </div>

      <StatsCards 
        totalUsers={stats?.totalUsers}
        activeHosts={stats?.activeHosts}
        listedHotels={stats?.listedHotels}
        pendingApprovals={stats?.pendingApprovals}
        loading={loading}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityChart 
          pieChartData={stats?.pieChartData}
          loading={loading}
        />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-4 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Failed to load recent activity
            </div>
          ) : stats?.recentHotels && stats.recentHotels.length > 0 ? (
            <div className="space-y-4">
              {stats.recentHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                    {hotel.images && hotel.images.length > 0 ? (
                      <img 
                        src={hotel.images[0].imageUrl} 
                        alt={hotel.hotelName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">
                        No img
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{hotel.hotelName}</p>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        hotel.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        hotel.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {hotel.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">New hotel listing</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No recent hotel activity
            </div>
          )}
        </div>
      </div>

      {/* We can remove this comment since we're showing hotels in the activity section */}
      {/* Recent Hotels */}
      {/* <RecentHotels openModal={openModal} /> */}
    </div>
  )
}

