import StatsCards from "./StatsCards"
import PendingApprovals from "./PendingApprovals"
import ActivityChart from "./ActivityChart"
import RecentHotels from "./RecentHotels"

interface DashboardViewProps {
  openModal: (type: string, item: any) => void
  handleAction: (type: string, id: string, action: "approve" | "reject") => void
}

export default function DashboardView({ openModal, handleAction }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsCards />

      {/* Recent Activity and Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <PendingApprovals handleAction={handleAction} />

        {/* Activity Chart */}
        <ActivityChart />
      </div>

      {/* Recent Hotels */}
      <RecentHotels openModal={openModal} />
    </div>
  )
}

