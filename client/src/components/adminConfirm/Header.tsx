import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="mb-16">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-8 rounded-2xl shadow-sm">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Become a Host</h1>
        <p className="mt-2 text-lg text-gray-600">Discover the benefits of hosting with us</p>
      </motion.div>

      <motion.div
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => navigate("/admin-terms")}
          className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <span className="text-gray-800 font-medium">Learn more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </motion.div>
    </div>
  </div>
  );
}

export default Header;
