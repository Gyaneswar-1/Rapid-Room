import { FaKey } from "react-icons/fa";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";

export default function Feature(){
  return(
    <div className="feture md:py-8 border-b border-b-gray-300 flex flex-col gap-8">
          <div className="flex items-center">
            <div className="shrink-0">
              <IoBedOutline className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-lg font-medium  truncate ">
                Room in a guest suite
              </p>
              <p className="text-lg  font-thin  truncat">
                Your own room in a home, plus access to shared spaces.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="shrink-0">
              <FaKey className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-lg font-medium  truncate ">
                Exceptional check-in experience
              </p>
              <p className="text-lg  font-thin  truncat">
                Recent guests gave the check-in process a 5-star rating.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="shrink-0">
              <FaPersonBreastfeeding className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-lg font-medium  truncate ">
                Alexey is a Superhost
              </p>
              <p className="text-lg  font-thin  truncat">
                Superhosts are experienced, highly rated Hosts.
              </p>
            </div>
          </div>
        </div>
  )
}