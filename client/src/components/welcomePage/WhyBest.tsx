

import { motion } from "framer-motion"
import { Zap, Shield, DollarSign, ArrowUpRight } from "lucide-react"

export default function WhyBest() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Instant Booking ⚡",
      description:
        "Skip the Wait, Book in Seconds! With RapidRoom, find and reserve your perfect stay instantly—no delays, no hassle!",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Best Price Guarantee 💰",
      description:
        "Luxury & Comfort at the Best Rates! We ensure you get the best deals, making every stay affordable without compromising quality.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Trusted & Secure 🔒",
      description:
        "Our verified hotels and secure payment options ensure a smooth, risk-free booking experience. Your safety is our priority!",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img src="https://images.unsplash.com/photo-1501952476817-d7ae22e8ee4e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-gray-900/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
        >
          Why Choose RapidRoom?
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center text-primary font-medium hover:text-primary transition-colors group"
                >
                  Learn More
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

