import { useEffect, useState } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import HostsTabs from "./HostsTabs"
import HostsTable from "./HostsTable"
import Pagination from "../ui/Pagination"
import { admin_getAllHosts } from "../../../../service/admin/admin_getAllHosts.service"

export default function HostsView() {
  const [activeSubTab, setActiveSubTab] = useState("pending")
  const [showModal, setShowModal] = useState(false)
  const [, setModalContent] = useState<any>(null)
  // const [hosts,setHosts] = useState

  // Function to open modal with specific content
  const openModal = (type: string, item: any) => {
    setModalContent({ type, item })
    setShowModal(!showModal)
  }

async function getHosts() {
  try {
    const response = await admin_getAllHosts(1,10);
    console.log(response);
  } catch (error) {
    
  }
}


useEffect(()=>{
  getHosts();
},[])

  // Function to handle approval/rejection
  const handleAction = (type: string, id: string, action: "approve" | "reject") => {
    console.log(`${action} ${type} with ID: ${id}`)
    // Here you would make an API call to update the status
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Host Verification</h2>
          <p className="text-sm text-gray-500 mt-1">Verify and approve host applications</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hosts..."
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
        </div>
      </div>

      {/* Tabs */}
      <HostsTabs activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />

      {/* Host Verification Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <HostsTable activeSubTab={activeSubTab} openModal={openModal} handleAction={handleAction} />

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  )
}

