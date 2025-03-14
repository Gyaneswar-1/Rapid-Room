import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CardForm from "./CardForm";
import { motion } from "framer-motion";

function ConfirmButton() {
  const [showCard, setShowCard] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center md:px-12">
        <fieldset>
          <div className="divide-y divide-gray-200">
            <label className="flex items-start gap-4 py-4">
              <div className="flex items-center gap-2">
                &#8203;
                <input
                  type="checkbox"
                  className="size-5 rounded-4xl cursor-pointer"
                  id="Option1"
                  onClick={() => {
                    setCheckbox(!checkbox);
                  }}
                />
              </div>

              <div>
                <strong className="font-medium text-gray-900">
                  I agree with the
                  <span
                    className="underline  pl-1.5 text-blue-700 cursor-pointer"
                    onClick={() => {
                      navigate("/admin-terms");
                    }}
                  >
                    terms and conditions.
                  </span>
                </strong>
              </div>
            </label>
          </div>
        </fieldset>

        {checkbox ? (
          <motion.button
           whileHover={{
            scale:1.2
          }}
          whileTap={{
            scale:0.9
          }}
            onClick={() => {
              setShowCard(!showCard);
            }}
            className="inline-block rounded-sm cursor-pointer hover:bg-teal-700 bg-teal-600 md:px-12 md:py-3 px-5 py-3 text-sm font-medium text-white focus:ring-3 focus:outline-hidden"
          >
            Apply for Host
          </motion.button>
        ) : (
          <button
         

            className="inline-block rounded-sm cursor-not-allowed  bg-teal-600 opacity-50 md:px-12 md:py-3 px-5 py-3 text-sm font-medium text-white focus:ring-3 focus:outline-hidden"
          >
            Apply for Host
          </button>
        )}
      </div>
      {showCard && (
        <div

          className="overflow-hidden"
        >
          <CardForm show={setShowCard} />
        </div>
      )}
    </div>
  );
}

export default ConfirmButton;
