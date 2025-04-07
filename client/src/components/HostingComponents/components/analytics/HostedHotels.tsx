import { Edit, ShovelIcon, Star, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHostHotels } from "../../../../service/manageHostData/getHostHotels";

interface HotelsDataInterface {
  address: {
    city: string;
    country: string;
  };
  bookedRoomsPercentage: number;
  hotelName: string;
  id: number;
  images: images[];
  ratingCount: number;
  reviews: [];
  status: "APPROVED" | "PENDING" | "REJECTED";
}
interface images {
  url: string;
}

export function HostedHotels() {
  const [loader, showLoader] = useState(false);
  const [error, showError] = useState(false);
  const [data, setData] = useState<HotelsDataInterface[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        showLoader(true);
        const response = await getHostHotels();
        console.log(response);

        if (response.success) {
          setData(response.data);
          console.log("datas", data);
        } else {
        }
      } catch (error) {
        showError(true);
      } finally {
        showLoader(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Your Hotels</h3>
          <p className="text-sm text-gray-500">Manage your listed properties</p>
        </div>
        <Link
          to={"/add-hotel"}
          className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Add New Hotel
        </Link>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((hotel: HotelsDataInterface) => (
            <div
              key={hotel.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="relative h-[150px] w-full">
                <img
                  src={hotel.images[0] || "/placeholder.svg"}
                  alt={hotel.hotelName}
                  className="h-full w-full object-cover"
                />
                <span
                  className={`absolute right-2 top-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    hotel.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : hotel.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {hotel.status === "APPROVED"
                    ? "APPROVED"
                    : hotel.status === "REJECTED"
                    ? "REJECTED"
                    : "PENDING"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{hotel.hotelName}</h3>
                <p className="text-sm text-gray-500">
                  {hotel.address.country} • {hotel.address.city}{" "}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {hotel.ratingCount}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({hotel.reviews} reviews)
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Occupancy:</span>{" "}
                  {hotel.bookedRoomsPercentage}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <Trash className="mr-1 h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
