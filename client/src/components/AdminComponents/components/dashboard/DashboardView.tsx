
import { useState, useEffect } from "react"
import StatsCards from "./StatsCards"
import ActivityChart from "./ActivityChart"
import { admin_getAnalysis } from "../../../../service/admin/admin_getAnalysis.service"

interface PieChartData {
  label: string;
  value: number;
  count: number;
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
}

export default function DashboardView() {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)

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

  // Function to open modal with specific content
  const openModal = (type: string, item: any) => {
    setModalContent({ type, item })
    setShowModal(true)
  }

  // Function to handle approval/rejection
  const handleAction = (type: string, id: string, action: "approve" | "reject") => {
    console.log(`${action} ${type} with ID: ${id}`)
    // Here you would make an API call to update the status
    setShowModal(false)
  }

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
          ) : (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">New hotel listing submitted</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Hotels */}
      {/* <RecentHotels openModal={openModal} /> */}
    </div>
  )
}

