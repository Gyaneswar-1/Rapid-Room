"use client"

interface HostsTabsProps {
  activeSubTab: string
  setActiveSubTab: (tab: string) => void
}

export default function HostsTabs({ activeSubTab, setActiveSubTab }: HostsTabsProps) {
  return (
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
  )
}

