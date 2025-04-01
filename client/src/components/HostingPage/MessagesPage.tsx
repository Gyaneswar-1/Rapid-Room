import { HiOutlineClock } from "react-icons/hi"

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    sender: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Hi, I'm interested in your Beachfront Villa. Is it available for the first week of June?",
    timestamp: "2 hours ago",
    isRead: false,
    reservation: {
      propertyName: "Beachfront Villa",
      dates: "June 1 - June 8, 2023",
    },
  },
  {
    id: "2",
    sender: {
      name: "Emma Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Thank you for hosting us! We had a wonderful time at your Mountain Cabin. The views were breathtaking and the amenities were perfect.",
    timestamp: "Yesterday",
    isRead: true,
    reservation: {
      propertyName: "Mountain Cabin",
      dates: "May 3 - May 8, 2023",
    },
  },
  {
    id: "3",
    sender: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Hello, I have a question about the check-in process for the Downtown Loft. What time can we arrive?",
    timestamp: "2 days ago",
    isRead: true,
    reservation: {
      propertyName: "Downtown Loft",
      dates: "May 15 - May 20, 2023",
    },
  },
  {
    id: "4",
    sender: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Is there a grill available at the Lakeside Cottage? We're planning to have a small barbecue during our stay.",
    timestamp: "3 days ago",
    isRead: true,
    reservation: {
      propertyName: "Lakeside Cottage",
      dates: "May 10 - May 17, 2023",
    },
  },
]

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {mockMessages.map((message, index) => (
          <div
            key={message.id}
            className={`p-4 ${
              index !== mockMessages.length - 1 ? "border-b border-gray-200" : ""
            } ${!message.isRead ? "bg-rose-50" : ""}`}
          >
            <div className="flex items-start">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <img
                  src={message.sender.avatar || "/placeholder.svg"}
                  alt={message.sender.name}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900">{message.sender.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 ml-2">
                    <HiOutlineClock className="mr-1 h-3 w-3" />
                    {message.timestamp}
                  </div>
                </div>

                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{message.content}</p>

                <div className="mt-2 text-xs text-gray-500">
                  <span className="font-medium">{message.reservation.propertyName}</span>
                  <span className="mx-1">·</span>
                  <span>{message.reservation.dates}</span>
                </div>

                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-rose-700 transition-colors">
                    Reply
                  </button>
                  {!message.isRead && (
                    <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition-colors">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

