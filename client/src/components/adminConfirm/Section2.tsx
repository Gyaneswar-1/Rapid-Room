import {motion} from "motion/react"
function Section2() {
  return (
    <div className="mb-24">
    <div className="flex flex-col-reverse md:flex-row items-center gap-12">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <div className="max-w-lg mx-auto md:mx-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Full Control</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Customize your cancellation policies, house rules, and guest requirements to ensure a smooth hosting
            experience. Access real-time insights and analytics to track performance, occupancy rates, and
            earnings. You're in charge of your property and business.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
          <img
            src="https://media.gettyimages.com/id/459746112/video/stockholm-sweden-skyline-and-grand-hotel-at-twilight-on-water-night-exposure-city-night.jpg?s=640x640&k=20&c=y1A_udMSOScpHRGRxz1zVA1xkTWQmdLUdy4utF6g9hA="
            className="w-full h-full object-cover"
            alt="Hotel at night"
          />
        </div>
      </motion.div>
    </div>
  </div>
  )
}

export default Section2