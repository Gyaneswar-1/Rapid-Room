

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, MessageCircle } from "lucide-react"

// Mock data for host conversations
const hostConversations = [
  {
    id: "1",
    name: "Oceanview Resort",
    avatar: "/placeholder.svg?height=48&width=48&text=OR",
    lastMessage: "Check-in time is at 3:00 PM. Early check-in may be available upon request.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unread: 2,
  },
  {
    id: "2",
    name: "Mountain Lodge",
    avatar: "/placeholder.svg?height=48&width=48&text=ML",
    lastMessage: "We're looking forward to your stay with us next week!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unread: 0,
  },
  {
    id: "3",
    name: "City Center Hotel",
    avatar: "/placeholder.svg?height=48&width=48&text=CCH",
    lastMessage: "The spa reservation has been confirmed for Saturday at 2 PM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 0,
  },
  {
    id: "4",
    name: "Beachfront Villas",
    avatar: "/placeholder.svg?height=48&width=48&text=BV",
    lastMessage: "Would you like us to arrange airport transportation for you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    unread: 1,
  },
  {
    id: "5",
    name: "Luxury Suites",
    avatar: "/placeholder.svg?height=48&width=48&text=LS",
    lastMessage: "Thank you for your reservation. Please let us know if you have any dietary restrictions.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    unread: 0,
  },
]

export default function MessageHost() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  // Filter hosts based on search query
  const filteredHosts = hostConversations.filter((host) => host.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Format timestamp
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    // Less than 24 hours, show time
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Less than 7 days, show day name
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString([], { weekday: "short" })
    }

    // Otherwise show date
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  const handleHostClick = (hostId: string) => {
    navigate(`/messages/${hostId}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search conversations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Host list */}
          <div className="divide-y divide-gray-200">
            {filteredHosts.length > 0 ? (
              filteredHosts.map((host) => (
                <div
                  key={host.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => handleHostClick(host.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img src={host.avatar || "/placeholder.svg"} alt={host.name} className="h-12 w-12 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{host.name}</p>
                        <p className="text-xs text-gray-500">{formatTime(host.timestamp)}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{host.lastMessage}</p>
                    </div>
                    {host.unread > 0 && (
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-medium">
                          {host.unread}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                  <MessageCircle className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">No conversations found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or start a new conversation.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

