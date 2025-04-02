import { Users, Building2, Settings, LogOut, X, RainbowIcon, BarChart3, UserRoundCheck, CreditCard } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
interface SidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isMobile: boolean
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, isMobile }: SidebarProps) {
  const {pathname} = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    navigate("/admin-login")
  }

  return (
    <aside
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-[url(https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      {/* Logo */}
      <div className="backdrop-blur-xs h-full w-full backdrop-brightness-40">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-1.5">
              <RainbowIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">RapidRoom</span>
          </Link>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main</p>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/admin" ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/hotels"
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/admin/hotels" ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Building2 className="w-5 h-5 mr-3" />
                Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/admin/hosts"
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/admin/hosts" ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <UserRoundCheck  className="w-5 h-5 mr-3" />
                Hosts
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/admin/users" ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/payments"
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/admin/payments" ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Payments
              </Link>
            </li>
          </ul>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-4">Settings</p>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/admin/settings" ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

