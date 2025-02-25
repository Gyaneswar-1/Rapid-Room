import React from "react";
import { TfiClose } from "react-icons/tfi";

function CardForm({ show }: { show: any }) {
  return (
    <div className="fixed inset-0 w-full h-full z-15 flex items-center justify-center  bg-opacity-50 backdrop-brightness-70 backdrop-blur-[2px] ">
      <form className="w-fit h-fit p-8 rounded-xl bg-neutral-50">
        <button
          className="cursor-pointer p-2 bg-black rounded-md text-white"
          onClick={() => {
            show(false);
          }}
        >
          <TfiClose />
        </button>

        <div>
          <p>phone number: </p>
          <div className="flex p-5 rounded-xl">
            <div className=" border w-fit h-fit p-1 rounded-l-md">+91</div>
            <input type="number" className="border rounded-r-md" />
          </div>
        </div>
        <div>
          <p>Address: </p>
          <div className="flex p-5 rounded-xl">
            <input type="number" className="border rounded-md" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
