import { HiOutlineUsers, HiOutlineCalendar } from "react-icons/hi"

interface ReservationItem {
  id: string
  guestName: string
  propertyName: string
  dates: string
  guests: number
  image: string
}

interface TodaySectionProps {
  title: string
  items: ReservationItem[]
  emptyMessage: string
}

export default function TodaySection({ title, items, emptyMessage }: TodaySectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 w-full">
                <img src={item.image || "/placeholder.svg"} alt={item.propertyName}  className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{item.guestName}</h3>
                <p className="text-gray-600 text-sm">{item.propertyName}</p>

                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <HiOutlineCalendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span>{item.dates}</span>
                </div>

                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <HiOutlineUsers className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span>
                    {item.guests} {item.guests === 1 ? "guest" : "guests"}
                  </span>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors">
                    Message
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

