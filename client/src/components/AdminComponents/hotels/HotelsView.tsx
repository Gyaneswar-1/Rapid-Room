import { Search, Filter, ChevronDown } from "lucide-react"
import HotelsTabs from "./HotelsTabs"
import HotelsTable from "../hosts/HostsTable"
import Pagination from "../ui/Pagination"
import type { HotelInterface } from "../AdminDashboard"

interface HotelsViewProps {
  activeSubTab: string
  setActiveSubTab: (tab: string) => void
  hotels: HotelInterface[]
  openModal: (type: string, item: any) => void
  handleAction: (type: string, id: string, action: "approve" | "reject") => void
}

export default function HotelsView({
  activeSubTab,
  setActiveSubTab,
  hotels,
  openModal,
  handleAction,
}: HotelsViewProps) 



{

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hotel Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and approve hotel listings</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hotels..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <button className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <HotelsTabs activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />

      {/* Hotel Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <HotelsTable hotels={hotels} activeSubTab={activeSubTab} openModal={openModal} handleAction={handleAction} />

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  )
}

