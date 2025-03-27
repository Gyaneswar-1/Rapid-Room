"use client"

import { Home, Users, Building2, Settings, LogOut, X, BarChart3 } from "lucide-react"
import MainLogo from "../../assets/images/MainLogo.png"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isMobile: boolean
}

export default function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, isMobile }: SidebarProps) {
  return (
    <aside
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-[url(https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      {/* Logo */}
      <div className="backdrop-blur-xs h-full w-full backdrop-brightness-40">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className=" rounded-lg ">
              <img src={MainLogo} alt="" className="w-12 h-10 text-white" />
            </div>
            <span className="text-xl font-bold">RapidRoom</span>
          </div>
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
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "dashboard" ? "bg-teal-600 text-white" : "text-gray-300 hover:bg-gray-800"
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
                  activeTab === "hotels" ? "bg-teal-600 text-white" : "text-gray-300 hover:bg-gray-800"
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
                  activeTab === "hosts" ? "bg-teal-600 text-white" : "text-gray-300 hover:bg-gray-800"
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
                  activeTab === "users" ? "bg-teal-600 text-white" : "text-gray-300 hover:bg-gray-800"
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
                  activeTab === "settings" ? "bg-teal-600 text-white" : "text-gray-300 hover:bg-gray-800"
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
      </div>
    </aside>
  )
}

