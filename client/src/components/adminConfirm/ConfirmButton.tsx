import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import CardForm from "./CardForm";

function ConfirmButton() {
  const [showCard, setShowCard] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-2xl">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms-checkbox"
          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-teal-500 mt-1"
          onChange={() => setCheckbox(!checkbox)}
        />
        <label htmlFor="terms-checkbox" className="text-gray-700">
          I agree with the
          <button
            onClick={() => navigate("/admin-terms")}
            className="text-primary font-medium hover:text-primary transition-colors ml-1"
          >
            terms and conditions
          </button>
        </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => checkbox && setShowCard(!showCard)}
        className={`px-8 py-3 rounded-lg text-white font-medium ${
          checkbox
            ? "bg-primary hover:bg-primary/80 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        } transition-colors`}
        disabled={!checkbox}
      >
        Apply for Host
      </motion.button>
      {showCard && <CardForm show={setShowCard} />}
    </div>
  );
}

export default ConfirmButton;
