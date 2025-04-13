export const getHostReservations = async () => {
    // Placeholder implementation. Replace with actual API call.
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get today's date for mock data
        const today = new Date()
        today.setHours(0, 0, 0, 0)
  
        // Format today for check-in dates
        const todayISO = today.toISOString()
  
        const mockData = {
          success: true,
          data: {
            reservations: [
              {
                id: 1,
                ReservationStatus: "active",
                amountPaid: 150,
                checkIn: todayISO, // Today's check-in
                checkOut: "2024-07-20T12:00:00.000Z",
                hotel: {
                  hotelName: "Oceanview Resort",
                  id: 101,
                  images: [{ imageUrl: "/mock-hotel-a.jpg" }],
                  perNight: 30,
                },
                payment: {
                  amount: 150,
                  id: 201,
                  paymentDate: "2024-07-15T10:00:00.000Z",
                  paymentMethod: "UPI",
                  status: "success",
                },
                paymentStatus: "success",
                reservationsDuration: 5,
                room: {
                  id: 301,
                  roomNumber: 101,
                },
                user: {
                  id: 401,
                  fullName: "John Doe",
                  email: "john.doe@example.com",
                  profileImage: "/mock-user-a.jpg",
                },
              },
              {
                id: 2,
                ReservationStatus: "pending",
                amountPaid: 0,
                checkIn: todayISO, // Today's check-in
                checkOut: "2024-08-05T12:00:00.000Z",
                hotel: {
                  hotelName: "Mountain Lodge",
                  id: 102,
                  images: [{ imageUrl: "/mock-hotel-b.jpg" }],
                  perNight: 40,
                },
                payment: {
                  amount: 0,
                  id: 202,
                  paymentDate: null,
                  paymentMethod: "Credit Card",
                  status: "pending",
                },
                paymentStatus: "pending",
                reservationsDuration: 4,
                room: {
                  id: 302,
                  roomNumber: 201,
                },
                user: {
                  id: 402,
                  fullName: "Jane Smith",
                  email: "jane.smith@example.com",
                  profileImage: "/mock-user-b.jpg",
                },
              },
              {
                id: 3,
                ReservationStatus: "active",
                amountPaid: 350,
                checkIn: todayISO, // Today's check-in
                checkOut: "2024-08-10T12:00:00.000Z",
                hotel: {
                  hotelName: "City Center Hotel",
                  id: 103,
                  images: [{ imageUrl: "/mock-hotel-c.jpg" }],
                  perNight: 70,
                },
                payment: {
                  amount: 350,
                  id: 203,
                  paymentDate: "2024-07-25T14:30:00.000Z",
                  paymentMethod: "PayPal",
                  status: "success",
                },
                paymentStatus: "success",
                reservationsDuration: 5,
                room: {
                  id: 303,
                  roomNumber: 305,
                },
                user: {
                  id: 403,
                  fullName: "Robert Johnson",
                  email: "robert.j@example.com",
                  profileImage: "/mock-user-c.jpg",
                },
              },
              {
                id: 4,
                ReservationStatus: "active",
                amountPaid: 200,
                checkIn: "2024-07-30T12:00:00.000Z", // Not today
                checkOut: "2024-08-02T12:00:00.000Z",
                hotel: {
                  hotelName: "Lakeside Inn",
                  id: 104,
                  images: [{ imageUrl: "/mock-hotel-d.jpg" }],
                  perNight: 50,
                },
                payment: {
                  amount: 200,
                  id: 204,
                  paymentDate: "2024-07-20T09:15:00.000Z",
                  paymentMethod: "Credit Card",
                  status: "success",
                },
                paymentStatus: "success",
                reservationsDuration: 4,
                room: {
                  id: 304,
                  roomNumber: 110,
                },
                user: {
                  id: 404,
                  fullName: "Emily Wilson",
                  email: "emily.w@example.com",
                  profileImage: "/mock-user-d.jpg",
                },
              },
            ],
          },
        }
        resolve(mockData)
      }, 500)
    })
  }
  