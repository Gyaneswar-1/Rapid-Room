
import { useState, useEffect } from "react";
import HostSidebar from "../components/HostingComponents/components/analytics/HostSidebar";
import HostHeader from "../components/HostingComponents/components/analytics/HostHeader";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
// import Navbar from "../components/HostingComponents/components/Navbar";

export default function HostLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  return (
    <div>
      <Navbar show={false}/>
      <div className="flex h-screen pt-2 md:pt-14 bg-gray-50">
        <HostSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-col flex-1 overflow-hidden pt-9 md:pt-0">
          <HostHeader
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
