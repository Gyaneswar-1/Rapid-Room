import React from "react";

const BookingPageSkeliton = () => {
  return (
    <div className="w-screen h-screen fixed flex  items-center justify-center">
      <div className="main h-full md:w-4/6 flex flex-col gap-6 py-6">
        <div className="heading md:w-3/5 h-12  bg-gray-200 rounded-lg"></div>
        <div className="md:h-4/7  h-1/3 md:max-h-4/7 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2 ">
          <div className="left  bg-gray-200 rounded-xl"></div>
          <div className="h-full  rounded-lg  md:flex flex-col gap-2">
            <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-2">
              <div className=" rounded-lg  bg-gray-200"></div>
              <div className=" rounded-lg  bg-gray-200"></div>
            </div>
            <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-2">
              <div className="  rounded-lg  bg-gray-200"></div>
              <div className=" rounded-lg  bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="button md:h-36  flex">
          <div className="left h-full w-1/2  flex items-start">
            <div className="bar w-3/4   bg-gray-200 h-12 rounded-lg"></div>
          </div>
          <div className="rith h-full w-1/2 flex flex-col justify-end items-end">
            <div className="bar w-3/4  bg-gray-200 h-12 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPageSkeliton;
