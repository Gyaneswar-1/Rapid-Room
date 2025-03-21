"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
// import { useRouter } from "react-router-dom"

export default function HeroSection() {
  const navigate = useNavigate()
  // In Next.js, we'd use a different approach for checking login status
  // This is just to maintain the logic from your original code
  const isLoggedIn = typeof window !== "undefined" ? localStorage.getItem("loggedin") : false

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/placeholder.svg?height=700&width=1400"
          alt="Travel destination"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {!isLoggedIn ? (
                <>
                  Your Perfect Stay, Just a<span className="text-green-400"> Click </span>
                  Away
                </>
              ) : (
                <>
                  Explore and Book your
                  <span className="text-green-400"> Rooms </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
            >
              Book instantly, stay comfortably! RapidRoom offers a seamless hotel booking experience with lightning-fast
              reservations, unbeatable deals, and stays that feel like home. 🌍
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/home")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-4 px-8 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex justify-center gap-4"
            >
              {["Hotels", "Flights", "Cars", "Experiences"].map((item, index) => (
                <motion.span
                  key={index}
                  whileHover={{ y: -3 }}
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-white/20 transition-all"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

