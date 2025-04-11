import { useState, useEffect } from "react";
import { getEarningByHotels } from "../../../service/manageHostData/getEarningByHotels";

interface HotelStatsInterface {
  id: number;
  hotelName: string;
  city: string;
  country: string;
  numberOfBookings: number;
  occupancyRate: number;
  totalEarnings: number;
}
export default function EarningsPage() {
  const [earningsData, setEarningsData] = useState<HotelStatsInterface[]>([]);
  
  useEffect(() => {
    const fetchEarnings = async () => {
      const response = await getEarningByHotels();      
      if(response.success) {
        console.log("Earnings data:", response.data);
        setEarningsData(response.data.hotelStats);
        console.log(earningsData);
        
      }
    };
    
    fetchEarnings();
  }, []);



  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-1">
              Track your earnings and payouts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"></div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Earnings by Hotel
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hotel
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bookings
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Occupancy Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {earningsData.map((hotel) => (
                    <tr key={hotel.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {hotel.hotelName}
                        </div>
                        <div className="text-xs text-gray-500">{hotel.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hotel.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {hotel.numberOfBookings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${hotel.occupancyRate}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-900">
                            {hotel.occupancyRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {hotel.totalEarnings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>         
        </div>
      </main>
    </div>
  );
}
