import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import DashboardView from "./dashboard/DashboardView"
import HotelsView from "./hotels/HotelsView"
import HostsView from "./hosts/HostsView"
import UsersView from "./users/UsersView"
import Modal from "./ui/Modal"
import { HelpCircle } from "lucide-react"
import { admin_getAdminHotels } from "../../service/admin/admin_getAdminHotels.service"

// Hotel interface for admin dashboard
export interface HotelInterface {
  id: number;
  hotelName: string;
  perNight: number;
  type: HotelType;
  status: "PENDING" | "APPROVED" | "REJECTED";
  address: {
    country: string;
    city: string;
  };
  images: {
    imageUrl: string;
  }[];
  reviews: {
    overallRating?: number;
    // Add other review fields if needed
  }[];
}

// Hotel type enum
export enum HotelType {
  BEACH = "BEACH",
  CITY = "CITY",
  MOUNTAIN = "MOUNTAIN",
  RESORT = "RESORT",
  BUDGET = "BUDGET",
  LUXURY = "LUXURY",
  AMAZING_VIEWS = "AMAZING_VIEWS",
  AMAZING_POOLS = "AMAZING_POOLS",
  FARMS = "FARMS",
  HISTORICAL_HOMES = "HISTORICAL_HOMES",
  SURFING = "SURFING",
  BEACHFRONT = "BEACHFRONT",
  LAKEFRONT = "LAKEFRONT",
  CASTLES = "CASTLES",
  CAMPING = "CAMPING",
  BOATS = "BOATS",
  TROPICAL = "TROPICAL",
  TOP_OF_THE_WORLD = "TOP_OF_THE_WORLD",
  TOP_CITIES = "TOP_CITIES",
  ARCTIC = "ARCTIC",
  TREEHOUSES = "TREEHOUSES",
  CABINS = "CABINS",
  TINY_HOMES = "TINY_HOMES",
  ISLANDS = "ISLANDS",
  COUNTRYSIDE = "COUNTRYSIDE",
  MANSIONS = "MANSIONS"
}

export interface Host {
  id: string
  name: string
  email: string
  phone: string
  submitted: string
  status: "APPROVED" | "PENDING" | "REJECTED"
  govId: string
  govIdType: string
  avatar: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)
  const [activeSubTab, setActiveSubTab] = useState("pending")
  const [hotels, setHotels] = useState<HotelInterface[]>([])

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    getHotels()

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  async function getHotels() {
    try {
      const response = await admin_getAdminHotels(1, 10)
      console.log("ressss", response.data)
      setHotels(response.data)
    } catch (error) {
      console.error("Error fetching hotels:", error)
      setHotels([])
    }
  }

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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          activeTab={activeTab}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && <DashboardView openModal={openModal} handleAction={handleAction} />}

          {/* Hotels Tab */}
          {activeTab === "hotels" && (
            <HotelsView
              activeSubTab={activeSubTab}
              setActiveSubTab={setActiveSubTab}
              hotels={hotels}
              openModal={openModal}
              handleAction={handleAction}
            />
          )}

          {/* Hosts Tab */}
          {activeTab === "hosts" && (
            <HostsView
              activeSubTab={activeSubTab}
              setActiveSubTab={setActiveSubTab}
              openModal={openModal}
              handleAction={handleAction}
            />
          )}

          {/* Users Tab */}
          {activeTab === "users" && <UsersView />}
        </main>
      </div>

      {/* Modal */}
      {showModal && <Modal modalContent={modalContent} setShowModal={setShowModal} handleAction={handleAction} />}

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors">
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  )
}

