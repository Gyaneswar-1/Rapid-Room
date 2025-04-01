import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HostingTabs from "../components/HostingPage/section/HostingTabs";
import { Outlet } from "react-router-dom";
import Fotter from "../components/HostingPage/section/Fotter";

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <AnimatePresence>
        {showWelcome && (
          <div>
            {/* First message: "Welcome" */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0, y: -1000 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute inset-0 h-screen flex justify-center items-center bg-primary z-53"
            >
              <h1 className="text-6xl text-white font-bold">Welcome</h1>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-grow bg-gray-50">
          <HostingTabs />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mt-6">
              <Outlet />
            </div>
          </div>
        </div>
        <Fotter />
      </div>
    </div>
  );
}

