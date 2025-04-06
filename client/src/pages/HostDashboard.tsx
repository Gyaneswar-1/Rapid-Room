import { useState, useEffect } from "react";
import HostSidebar from "../components/HostingComponents/components/analytics/HostSidebar";
import HostHeader from "../components/HostingComponents/components/analytics/HostHeader";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";
import SetUserDataToStore from "../service/userdata/SetDataToStore";

export default function HostLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      setShowAnimation(false);
    }, 2500);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (showAnimation) {
    return (
      <>
        {/* <SetUserDataToStore /> */}
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-primary"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.h1
            className="text-4xl font-bold text-neutral-900"
            initial={{ scale: 0.5 }}
            animate={{ scale: 3 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            Welcome to Dashboard
          </motion.h1>
        </motion.div>
      </>
    );
  }

  return (
    <div>
      <Navbar show={false} />
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
