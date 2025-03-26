import { useState, useEffect } from "react"
import {
  Home,
  Users,
  Building2,
  Shield,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  BarChart3,
  PieChart,
  Calendar,
  HelpCircle,
  ChevronLeft,
} from "lucide-react"
import { getAdminHotels } from "../service/admin/allHotel.service"

export default function AdminDashboard() {
  // State for active tab and sidebar
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)
  const [activeSubTab, setActiveSubTab] = useState("pending")
  const [hotels,setHotels] = useState<any[]>([]);



  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
      
    }

    getHotels()
    
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  async function getHotels(){
    const response = await getAdminHotels(1,10)
    console.log("ressss",response.data);
    setHotels(response.data)
    
  }

  // Mock data for dashboard
  const stats = [
    { title: "Total Users", value: "8,249", change: "+12%", icon: <Users className="w-6 h-6" /> },
    { title: "Active Hosts", value: "1,423", change: "+5%", icon: <Building2 className="w-6 h-6" /> },
    { title: "Listed Hotels", value: "3,872", change: "+8%", icon: <Home className="w-6 h-6" /> },
    { title: "Pending Approvals", value: "42", change: "-3%", icon: <Bell className="w-6 h-6" /> }
  ]

  // Mock data for hotel approval requests
  const hotelRequests = [
    {
      id: "HTL-1001",
      name: "Sunset Beach Resort",
      location: "Bali, Indonesia",
      host: "John Smith",
      hostId: "HOST-501",
      submitted: "2023-03-15",
      status: "pending",
      images: ["/placeholder.svg?height=80&width=120"]
    },
    {
      id: "HTL-1002",
      name: "Mountain View Lodge",
      location: "Aspen, Colorado",
      host: "Emma Johnson",
      hostId: "HOST-502",
      submitted: "2023-03-14",
      status: "pending",
      images: ["/placeholder.svg?height=80&width=120"]
    },
    {
      id: "HTL-1003",
      name: "City Center Suites",
      location: "Paris, France",
      host: "Robert Chen",
      hostId: "HOST-503",
      submitted: "2023-03-12",
      status: "approved",
      images: ["/placeholder.svg?height=80&width=120"]
    },
    {
      id: "HTL-1004",
      name: "Lakeside Cabins",
      location: "Lake Tahoe, California",
      host: "Sarah Williams",
      hostId: "HOST-504",
      submitted: "2023-03-10",
      status: "rejected",
      images: ["/placeholder.svg?height=80&width=120"]
    },
    {
      id: "HTL-1005",
      name: "Historic Downtown Inn",
      location: "Charleston, South Carolina",
      host: "Michael Brown",
      hostId: "HOST-505",
      submitted: "2023-03-09",
      status: "pending",
      images: ["/placeholder.svg?height=80&width=120"]
    }
  ]

  // Mock data for host verification requests
  const hostRequests = [
    {
      id: "USR-2001",
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 (555) 123-4567",
      submitted: "2023-03-16",
      status: "pending",
      govId: "ID-12345678",
      govIdType: "Passport",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-2002",
      name: "Lisa Garcia",
      email: "lisa.garcia@example.com",
      phone: "+1 (555) 987-6543",
      submitted: "2023-03-15",
      status: "pending",
      govId: "ID-87654321",
      govIdType: "Driver's License",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-2003",
      name: "James Taylor",
      email: "james.taylor@example.com",
      phone: "+1 (555) 456-7890",
      submitted: "2023-03-14",
      status: "approved",
      govId: "ID-23456789",
      govIdType: "National ID",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-2004",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      phone: "+1 (555) 789-0123",
      submitted: "2023-03-12",
      status: "rejected",
      govId: "ID-34567890",
      govIdType: "Passport",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-2005",
      name: "Thomas Lee",
      email: "thomas.lee@example.com",
      phone: "+1 (555) 234-5678",
      submitted: "2023-03-10",
      status: "pending",
      govId: "ID-45678901",
      govIdType: "Driver's License",
      avatar: "/placeholder.svg?height=40&width=40"
    }
  ]

  // Mock data for all users
  const allUsers = [
    {
      id: "USR-1001",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      role: "User",
      joined: "2023-01-15",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-1002",
      name: "Michael Smith",
      email: "michael.smith@example.com",
      role: "Host",
      joined: "2023-01-10",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-1003",
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
      role: "User",
      joined: "2023-02-05",
      status: "Inactive",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-1004",
      name: "Daniel Wilson",
      email: "daniel.wilson@example.com",
      role: "Host",
      joined: "2023-02-20",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: "USR-1005",
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      role: "Admin",
      joined: "2022-12-01",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40"
    }
  ]

  // Function to open modal with specific content
  const openModal = (type: string, item: any) => {
    setModalContent({ type, item })
    setShowModal(true)
  }

  // Function to handle approval/rejection
  const handleAction = (type: string, id: string, action: 'approve' | 'reject') => {
    console.log(`${action} ${type} with ID: ${id}`)
    // Here you would make an API call to update the status
    setShowModal(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="bg-teal-500 rounded-lg p-1.5">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">RapidRoom</span>
          </div>
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main</p>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "dashboard" 
                    ? "bg-teal-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("hotels")}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "hotels" 
                    ? "bg-teal-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Building2 className="w-5 h-5 mr-3" />
                Hotels
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("hosts")}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "hosts" 
                    ? "bg-teal-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                Hosts
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "users" 
                    ? "bg-teal-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Users
              </button>
            </li>
          </ul>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-4">Settings</p>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "settings" 
                    ? "bg-teal-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => console.log("Logout clicked")}
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            {/* Mobile menu button */}
            {isMobile && !isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {/* Page title */}
            <h1 className="text-xl font-semibold text-gray-800 ml-2">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "hotels" && "Hotel Management"}
              {activeTab === "hosts" && "Host Verification"}
              {activeTab === "users" && "User Management"}
              {activeTab === "settings" && "Settings"}
            </h1>

            {/* Search and profile */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <div className="flex items-center space-x-3">
                <button className="relative text-gray-500 hover:text-gray-700">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Admin profile"
                      
                      className="object-cover"
                    />
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        stat.title === "Pending Approvals" ? "bg-amber-100 text-amber-600" : "bg-teal-100 text-teal-600"
                      }`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className={`text-xs font-medium ${
                        stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity and Pending Approvals */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Approvals */}
                <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Pending Approvals</h2>
                    <button className="text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center">
                      View All <ArrowUpRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-center space-x-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <Building2 className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New Hotel: Sunset Beach Resort</p>
                          <p className="text-sm text-gray-500">Submitted by John Smith • 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-green-600 hover:text-green-800">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-red-600 hover:text-red-800">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Host Verification: Lisa Garcia</p>
                          <p className="text-sm text-gray-500">Submitted ID verification • 5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-green-600 hover:text-green-800">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-red-600 hover:text-red-800">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-center space-x-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <Building2 className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New Hotel: Mountain View Lodge</p>
                          <p className="text-sm text-gray-500">Submitted by Emma Johnson • 1 day ago</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-green-600 hover:text-green-800">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-red-600 hover:text-red-800">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">User Activity</h2>
                  <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                      <PieChart className="w-24 h-24 mx-auto text-gray-300" />
                      <p className="mt-4 text-sm text-gray-500">
                        Chart visualization would appear here. <br />
                        Showing user activity breakdown.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Active Users</span>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Hosts</span>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm text-gray-600">New Signups</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Hotels */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recently Added Hotels</h2>
                  <button className="text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center">
                    View All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {hotelRequests.slice(0, 3).map((hotel) => (
                        <tr key={hotel.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="relative flex-shrink-0 w-10 h-10 rounded-md overflow-hidden">
                                <img
                                  src={hotel.images[0] || "/placeholder.svg"}
                                  alt={hotel.name}
                                  
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{hotel.name}</p>
                                <p className="text-xs text-gray-500">{hotel.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hotel.location}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hotel.host}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(hotel.submitted).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              hotel.status === 'pending' 
                                ? 'bg-amber-100 text-amber-800' 
                                : hotel.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => openModal('hotel', hotel)}
                              className="text-teal-600 hover:text-teal-900"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Hotels Tab */}
          {activeTab === "hotels" && (
            <div className="space-y-6">
              {/* Header with filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Hotel Management</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage and approve hotel listings</p>
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
                  
                  <div className="relative">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                      <Filter className="w-5 h-5" />
                      <span>Filters</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                    Export Data
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveSubTab("pending")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "pending"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Pending Approval
                  </button>
                  <button
                    onClick={() => setActiveSubTab("approved")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "approved"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setActiveSubTab("rejected")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "rejected"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Rejected
                  </button>
                  <button
                    onClick={() => setActiveSubTab("all")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "all"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    All Hotels
                  </button>
                </nav>
              </div>

              {/* Hotel Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {hotels.map((hotel) => (
                        <tr key={hotel.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="relative flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                                <img
                                  src={hotel.images[0] || "/placeholder.svg"}
                                  alt={hotel.hotelName}
                                  
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{hotel.hotelName}</p>
                                <p className="text-xs text-gray-500">{hotel.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hotel.address.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hotel.perNight}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {/* {new Date(hotel.submitted).toLocaleDateString()} */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              hotel.status === 'PENDING' 
                                ? 'bg-amber-100 text-amber-800' 
                                : hotel.status === 'APPROVED' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => openModal('hotel', hotel)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              {hotel.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleAction('hotel', hotel.id, 'approve')}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={() => handleAction('hotel', hotel.id, 'reject')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                        <span className="font-medium">12</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <a
                          href="#"
                          aria-current="page"
                          className="z-10 bg-teal-50 border-teal-500 text-teal-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          1
                        </a>
                        <a
                          href="#"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          2
                        </a>
                        <a
                          href="#"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          3
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronDown className="h-5 w-5 rotate-270" aria-hidden="true" />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hosts Tab */}
          {activeTab === "hosts" && (
            <div className="space-y-6">
              {/* Header with filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Host Verification</h2>
                  <p className="text-sm text-gray-500 mt-1">Verify and approve host applications</p>
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
                  
                  <div className="relative">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                      <Filter className="w-5 h-5" />
                      <span>Filters</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveSubTab("pending")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "pending"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Pending Verification
                  </button>
                  <button
                    onClick={() => setActiveSubTab("approved")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "approved"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setActiveSubTab("rejected")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "rejected"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Rejected
                  </button>
                  <button
                    onClick={() => setActiveSubTab("all")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSubTab === "all"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    All Hosts
                  </button>
                </nav>
              </div>

              {/* Host Verification Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {hostRequests
                        .filter(host => {
                          if (activeSubTab === "all") return true;
                          return host.status === activeSubTab;
                        })
                        .map((host) => (
                        <tr key={host.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                                <img
                                  src={host.avatar || "/placeholder.svg"}
                                  alt={host.name}
                                  
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{host.name}</p>
                                <p className="text-xs text-gray-500">{host.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-500">{host.email}</p>
                            <p className="text-sm text-gray-500">{host.phone}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {host.govIdType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(host.submitted).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              host.status === 'pending' 
                                ? 'bg-amber-100 text-amber-800' 
                                : host.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {host.status.charAt(0).toUpperCase() + host.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => openModal('host', host)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              {host.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleAction('host', host.id, 'approve')}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={() => handleAction('host', host.id, 'reject')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                        <span className="font-medium">8</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <a
                          href="#"
                          aria-current="page"
                          className="z-10 bg-teal-50 border-teal-500 text-teal-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          1
                        </a>
                        <a
                          href="#"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          2
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronDown className="h-5 w-5 rotate-270" aria-hidden="true" />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Header with filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage all users on the platform</p>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="relative">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                      <Filter className="w-5 h-5" />
                      <span>Filters</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                                <img
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                  
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === 'Admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : user.role === 'Host' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.joined).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                        <span className="font-medium">25</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <a
                          href="#"
                          aria-current="page"
                          className="z-10 bg-teal-50 border-teal-500 text-teal-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          1
                        </a>
                        <a
                          href="#"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          2
                        </a>
                        <a
                          href="#"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          3
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronDown className="h-5 w-5 rotate-270" aria-hidden="true" />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {modalContent?.type === 'hotel' ? (
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Hotel Details
                      </h3>
                      <div className="mt-2 space-y-4">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                          <img
                            src={modalContent.item.images[0] || "/placeholder.svg"}
                            alt={modalContent.item.name}
                            
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Hotel Name</p>
                            <p className="text-sm text-gray-900">{modalContent.item.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Location</p>
                            <p className="text-sm text-gray-900">{modalContent.item.location}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Host</p>
                            <p className="text-sm text-gray-900">{modalContent.item.host}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Submission Date</p>
                            <p className="text-sm text-gray-900">{new Date(modalContent.item.submitted).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              modalContent.item.status === 'pending' 
                                ? 'bg-amber-100 text-amber-800' 
                                : modalContent.item.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {modalContent.item.status.charAt(0).toUpperCase() + modalContent.item.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                          <p className="text-sm text-gray-900">
                            This is a beautiful property located in {modalContent.item.location}. The hotel offers stunning views and excellent amenities for guests.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Host Verification Details
                      </h3>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <img
                              src={modalContent.item.avatar || "/placeholder.svg"}
                              alt={modalContent.item.name}
                              
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-900">{modalContent.item.name}</p>
                            <p className="text-sm text-gray-500">{modalContent.item.id}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-sm text-gray-900">{modalContent.item.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="text-sm text-gray-900">{modalContent.item.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">ID Type</p>
                            <p className="text-sm text-gray-900">{modalContent.item.govIdType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">ID Number</p>
                            <p className="text-sm text-gray-900">{modalContent.item.govId}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Submission Date</p>
                            <p className="text-sm text-gray-900">{new Date(modalContent.item.submitted).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              modalContent.item.status === 'pending' 
                                ? 'bg-amber-100 text-amber-800' 
                                : modalContent.item.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {modalContent.item.status.charAt(0).toUpperCase() + modalContent.item.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Government ID</p>
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-center">
                              <div className="text-center">
                                <Calendar className="w-12 h-12 mx-auto text-gray-400" />
                                <p className="mt-2 text-sm text-gray-500">ID Document Preview</p>
                                <p className="text-xs text-gray-400">For security reasons, actual document is only viewable after authentication</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {modalContent?.item.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleAction(modalContent.type, modalContent.item.id, 'approve')}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleAction(modalContent.type, modalContent.item.id, 'reject')}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors">
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  )
}

