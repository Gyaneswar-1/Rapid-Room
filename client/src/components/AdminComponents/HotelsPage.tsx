import { useEffect, useState } from "react";
import HotelsView from "./components/hotels/HotelsView";
import AdminLayout from "./components/layout/AdminLayout";
import { getAdminHotels } from "./service/getAdminHotels";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const { data } = await getAdminHotels(1, 10);
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  return (
    <AdminLayout>
      {loading ? (
        <div className="p-6">Loading hotels...</div>
      ) : (
        <HotelsView hotels={hotels} />
      )}
    </AdminLayout>
  );
}

