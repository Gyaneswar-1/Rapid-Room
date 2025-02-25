import { useNavigate } from "react-router-dom";
import { notifyInfo } from "../../lib/Toast";
import { useState } from "react";
import CardForm from "./CardForm";

function ConfirmButton() {
  const [showCard,setShowCard] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center px-12">
        <fieldset>
          <div className="divide-y divide-gray-200">
            <label className="flex  items-start gap-4 py-4">
              <div className="flex items-center">
                &#8203;
                <input
                  type="checkbox"
                  className="size-4 rounded-sm border-gray-300 cursor-pointer"
                  id="Option1"
                />
              </div>

              <div>
                <strong className="font-medium text-gray-900">
                  I agree with the{" "}
                  <span
                    className="underline text-blue-700 cursor-pointer"
                    onClick={() => {
                      navigate("/admin-terms");
                      notifyInfo("Thanks for registering yourself")
                    }}
                  >
                    terms and conditions.
                  </span>
                </strong>
              </div>
            </label>
          </div>
        </fieldset>
        <button
        onClick={()=>{
            setShowCard(!showCard)
            notifyInfo("Thanks for applying for Host ")
          }}
        className="inline-block rounded-sm   cursor-pointer hover:bg-teal-700 bg-teal-600 px-12 py-3 text-sm font-medium text-white focus:ring-3 focus:outline-hidden">
          Apply for Admin
        </button>
      </div>
      {showCard && <CardForm show={setShowCard}/>}
    </div>
  );
}

export default ConfirmButton;
