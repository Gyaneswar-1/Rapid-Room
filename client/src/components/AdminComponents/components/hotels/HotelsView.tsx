import { useEffect, useState } from "react";
import { Loader, Search } from "lucide-react";
import HotelsTabs from "./HotelsTabs";
import HotelsTable from "./HotelsTable";
import Pagination from "../ui/Pagination";
import { admin_getAllHotels } from "../../../../service/admin/admin_getAllHotels.service";

export interface HotelInterface {
  id: number;
  hotelName: string;
  address: {
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  };
  host: {
    id: number;
    email: string;
    fullName: string;
    profileImage: string;
  };
  images: {
    imageUrl: string;
  }[];
  perNight: number;
  status: string;
  type: string;
  createdAt: string;
}

export default function HotelsView() {
  const [hotels, setHotels] = useState<HotelInterface[]>([]);
  const [loading, setLoading] = useState(false);

  async function getHotels() {
    try {
      setLoading(true);
      const response = await admin_getAllHotels(1, 10);
      setHotels(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHotels();
  }, []);

  const [activeSubTab, setActiveSubTab] = useState("pending");
  const [, setShowModal] = useState(false);
  const [, setModalContent] = useState<any>(null);

  // Function to open modal with specific content
  const openModal = (type: string, item: any) => {
    setModalContent({ type, item });
    setShowModal(true);
  };

  // Function to handle approval/rejection
  const handleAction = (updatedHotel: HotelInterface) => {
    // Update the hotels array with the updated hotel
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === updatedHotel.id ? updatedHotel : hotel
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hotel Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and approve hotel listings
          </p>
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
        </div>
      </div>

      {/* Tabs */}
      <HotelsTabs
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      {/* Hotel Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loader className="animate-spin h-10 w-10" />
          </div>
        ) : (
          <HotelsTable
            hotels={hotels}
            activeSubTab={activeSubTab}
            openModal={openModal}
            handleAction={handleAction}
          />
        )}

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
}
