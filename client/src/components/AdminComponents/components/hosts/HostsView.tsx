import { useEffect, useState } from "react";
import { Search, Loader } from "lucide-react";
import HostsTabs from "./HostsTabs";
import HostsTable from "./HostsTable";
import Pagination from "../ui/Pagination";
import { admin_getAllHosts } from "../../../../service/admin/admin_getAllHosts.service";

interface Address {
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  state: string | null;
  street: string | null;
}

interface Hotel {
  id: number;
  hotelName: string;
  images: { imageUrl: string }[];
}

export interface HostInterface {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  GovID: string;
  isEmailVerified: boolean;
  isHost: boolean;
  profileImage: string | null;
  createdAt: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  address: Address | null;
  listedHotels: Hotel[];
}

export default function HostsView() {
  const [activeSubTab, setActiveSubTab] = useState("PENDING"); // Default to PENDING
  const [hosts, setHosts] = useState<HostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  //@ts-ignore
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  async function getHosts() {
    try {
      setLoading(true);
      // Use pagination parameters
      const response = await admin_getAllHosts(currentPage, itemsPerPage);
      if (response.success) {
        setHosts(response.data);
      } else {
        setErrorMsg("Failed to fetch host data");
      }
    } catch (error) {
      console.error("Error fetching hosts:", error);
      setErrorMsg("An error occurred while fetching host data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHosts();
  }, [currentPage, itemsPerPage, activeSubTab]);

  // Function to handle host data updates
  const updateHosts = (updatedHosts: HostInterface[]) => {
    setHosts(updatedHosts);
  };

  if (errorMsg) {
    return <div>ERROR</div>;
  }

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Host Verification</h2>
          <p className="text-sm text-gray-500 mt-1">
            Verify and approve host applications
          </p>
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
        </div>
      </div>

      {/* Tabs */}
      <HostsTabs
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      {/* Host Verification Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <HostsTable
          activeSubTab={activeSubTab}
          handleAction={updateHosts}
          data={hosts}
        />

        {/* Pagination */}
        <Pagination 
          // currentPage={currentPage} 
          // totalItems={hosts.length} 
          // itemsPerPage={itemsPerPage}
          // onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
