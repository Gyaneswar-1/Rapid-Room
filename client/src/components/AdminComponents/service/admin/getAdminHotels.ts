import { Hotel } from "../../AdminDashboard";

export const _getAdminHotels = async (page: number, pageSize: number) => {
  // Replace with actual API endpoint and logic
  const data: Hotel[] = [
    {
      id: "HTL-1001",
      hotelName: "Sunset Beach Resort",
      address: {city: "Bali"},
      perNight: 120,
      host: "John Smith",
      hostId: "HOST-501",
      submitted: "2023-03-15",
      status: "PENDING",
      images: ["/placeholder.svg?height=80&width=120"],
    },
    {
      id: "HTL-1002",
      hotelName: "Mountain View Lodge",
      address: {city: "Aspen"},
      perNight: 150,
      host: "Emma Johnson",
      hostId: "HOST-502",
      submitted: "2023-03-14",
      status: "APPROVED",
      images: ["/placeholder.svg?height=80&width=120"],
    },
  ];

  return {
    data: data,
    total: data.length,
    page: page,
    pageSize: pageSize,
  };
};

