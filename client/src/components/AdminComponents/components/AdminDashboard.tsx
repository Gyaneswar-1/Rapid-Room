

import { useState, useEffect } from "react";
import Header from "./Header";
import DashboardView from "./dashboard/DashboardView";
import HotelsView from "./hotels/HotelsView";
import HostsView from "./hosts/HostsView";
import UsersView from "./users/UsersView";
import Modal from "./ui/Modal";
import { HelpCircle } from "lucide-react";
import { getAdminHotels } from "../service/allHotel.service";
import Sidebar from "./Sidebar";

export interface Hotel {
  id: string;
  hotelName: string;
  address: {
    city: string;
  };
  perNight: number;
  host?: string;
  hostId?: string;
  submitted?: string;
  status: string;
  images: string[];
}

export interface Host {
  id: string;
  name: string;
  email: string;
  phone: string;
  submitted: string;
  status: string;
  govId: string;
  govIdType: string;
  avatar: string;
}

export default function AdminDashboard() {
  // State for active tab and sidebar
  const [activeTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent] = useState<any>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    getHotels();

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  async function getHotels() {
    try {
      const response = await getAdminHotels(1, 10);
      console.log("ressss", response.data);
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotels([]);
    }
  }

  // Function to handle approval/rejection
  const handleAction = (
    type: string,
    id: string,
    action: "approve" | "reject"
  ) => {
    console.log(`${action} ${type} with ID: ${id}`);
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          // activeTab={activeTab}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && <DashboardView />}

          {/* Hotels Tab */}
          {activeTab === "hotels" && <HotelsView />}

          {/* Hosts Tab */}
          {activeTab === "hosts" && <HostsView />}

          {/* Users Tab */}
          {activeTab === "users" && <UsersView />}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          modalContent={modalContent}
          setShowModal={setShowModal}
          handleAction={handleAction}
        />
      )}

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 transition-colors">
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
