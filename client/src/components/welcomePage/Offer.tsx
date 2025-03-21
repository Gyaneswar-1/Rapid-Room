"use client"

import { motion } from "framer-motion"

export default function Offer() {
  const destinations = [
    {
      image: "/placeholder.svg?height=240&width=240",
      title: "India",
      nearby: "Pakistan, Sri Lanka, Nepal, Bhutan",
    },
    {
      image: "/placeholder.svg?height=240&width=240",
      title: "France",
      nearby: "Belgium, Luxembourg, Germany",
    },
    {
      image: "/placeholder.svg?height=240&width=240",
      title: "Thailand",
      nearby: "Laos, Myanmar, Vietnam",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Best Offers At
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.title}
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-2xl mb-2 text-gray-800">{destination.title}</h3>
                <p className="text-gray-600">{destination.nearby}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-teal-600 font-medium hover:text-teal-800 transition-colors flex items-center gap-1">
                    Explore deals
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

