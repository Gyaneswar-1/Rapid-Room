

interface HostsTabsProps {
  activeSubTab: string
  setActiveSubTab: (tab: string) => void
}

export default function HostsTabs({ activeSubTab, setActiveSubTab }: HostsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        <button
          onClick={() => setActiveSubTab("PENDING")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "PENDING"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Pending Verification
        </button>
        <button
          onClick={() => setActiveSubTab("APPROVED")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "APPROVED"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setActiveSubTab("REJECTED")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "REJECTED"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Rejected
        </button>
        <button
          onClick={() => setActiveSubTab("ALL")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "ALL"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          All Hosts
        </button>
      </nav>
    </div>
  )
}

