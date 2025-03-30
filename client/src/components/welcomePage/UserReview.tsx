

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function UserReview() {
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    {
      quote:
        "I've used many booking sites before, but RapidRoom is by far the easiest. I booked my stay in just a few minutes, and the room exceeded my expectations! The best part? I got an amazing deal. Definitely my go-to for future trips!",
      name: "Priya K.",
      role: "Frequent Traveler",
      avatar: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The customer service at RapidRoom is exceptional. When I needed to modify my booking last minute, they were incredibly helpful and accommodating. The process was smooth and stress-free!",
      name: "Michael T.",
      role: "Business Traveler",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "As someone who travels with family, finding the right accommodations is crucial. RapidRoom made it easy to filter for family-friendly options, and the detailed descriptions helped me choose the perfect place for our vacation.",
      name: "Sarah J.",
      role: "Family Traveler",
      avatar: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Travelers Say</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Review Cards */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="absolute top-0 left-0 w-20 h-20 bg-teal-500 rounded-br-2xl flex items-center justify-center">
              <Quote className="text-white w-10 h-10" />
            </div>

            <div className="pt-16 pb-10 px-6 md:px-16">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentReview === index ? 1 : 0,
                    x: currentReview === index ? 0 : 100,
                    position: currentReview === index ? "relative" : "absolute",
                  }}
                  transition={{ duration: 0.5 }}
                  className={`${currentReview === index ? "block" : "hidden"}`}
                >
                  <blockquote>
                    <p className="text-xl md:text-2xl italic font-medium text-gray-800 mb-8 leading-relaxed">
                      "{review.quote}"
                    </p>
                  </blockquote>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-teal-500">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={`${review.name} profile picture`}
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                      <p className="text-gray-600">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>

            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentReview === index ? "bg-teal-500 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

