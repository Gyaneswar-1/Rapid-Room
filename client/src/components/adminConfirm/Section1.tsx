import {motion} from "motion/react"
function Section1() {
  return (
    <div className="mb-24">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
          <img
            src="https://p4.wallpaperbetter.com/wallpaper/270/172/1004/4k-maldives-hotel-wallpaper-preview.jpg"
            className="w-full h-full object-cover"
            alt="Luxury hotel view"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <div className="max-w-lg mx-auto md:mx-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Host with Us?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Join our platform and unlock new opportunities. Earn money effortlessly by listing your hotel,
            reaching thousands of travelers, and maximizing your bookings. Our platform provides the tools and
            support you need to succeed.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
  );
}

export default Section1;
