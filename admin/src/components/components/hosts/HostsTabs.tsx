interface HostsTabsProps {
  activeSubTab: string
  setActiveSubTab: (tab: string) => void
}

export default function HostsTabs({ activeSubTab, setActiveSubTab }: HostsTabsProps) {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <nav className="flex flex-wrap md:flex-nowrap space-x-2 md:space-x-8 min-w-full pb-1">
        <button
          onClick={() => setActiveSubTab("PENDING")}
          className={`py-3 md:py-4 px-2 md:px-1 text-xs md:text-sm font-medium border-b-2 whitespace-nowrap ${
            activeSubTab === "PENDING"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Pending Verification
        </button>
        <button
          onClick={() => setActiveSubTab("APPROVED")}
          className={`py-3 md:py-4 px-2 md:px-1 text-xs md:text-sm font-medium border-b-2 whitespace-nowrap ${
            activeSubTab === "APPROVED"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setActiveSubTab("REJECTED")}
          className={`py-3 md:py-4 px-2 md:px-1 text-xs md:text-sm font-medium border-b-2 whitespace-nowrap ${
            activeSubTab === "REJECTED"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Rejected
        </button>
        <button
          onClick={() => setActiveSubTab("ALL")}
          className={`py-3 md:py-4 px-2 md:px-1 text-xs md:text-sm font-medium border-b-2 whitespace-nowrap ${
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

