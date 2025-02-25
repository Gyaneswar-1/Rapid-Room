// src/components/Page1.jsx
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Page1 = ({ register, errors }:{register:any,errors:any}) => {

 const [guests,setGuests] = useState(1);
 const [beds,setBeds] = useState(1);
 const [bathrooms,setBathrooms] = useState(1);

  return (
          <div className="xl:px-68 md:px-42 px-2 w-full">
            <h1 className="text-3xl mb-6">
              Describe your hotel as good as you can !
            </h1>
            <div className="mb-4 ">
              <label
                htmlFor="large-input"
                className="block  text-lg mb-2 font-medium text-black "
              >
                Hotel Title
              </label>

              <input
                {...register("title", { required: true, maxLength: 24 })}
                type="text"
                placeholder="short title work best"
                className="block w-full p-1 py-2 text-md text-black border  border-neutral-700 rounded-md bg-white  "
              />
              <p className="text-xs text-black mt-2">
                 0/24
              </p>
            </div>
            {/* description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg mb-2 font-medium text-black "
              >
                Create your Description
              </label>

              <textarea
                {...register("description", { required: true, maxLength: 500 })}
                className="p-2 md:md:text-md text-md w-full rounded-md border-neutral-700 border align-top shadow-xs text-md bg-white"
                rows={3}
                placeholder="share what makes your hotel special"
              ></textarea>
              <p className="text-xs text-black mt-2 pb-2">
              </p>
            </div>
            {/* Price and rooms belr */}
            <div className="flex w-full flex-wrap gap-9">
              <div className="grow ">
                <label
                  htmlFor="description"
                  className="block text-lg font-medium pb-2 text-black "
                >
                  Set price
                </label>
                <div className=" w-full">
                  <div className="relative flex border border-black items-center max-w-full rounded-md bg-white p-3 gap-1.5 ">
                    <input
                      type="number"
                      id="quantity-input"
                      className="bg-white text-gray-900 text-md block w-full  border-0 outline-0 "
                      placeholder="Price per night"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grow ">
                <label
                  htmlFor="description"
                  className="block text-lg pb-2 font-medium text-black "
                >
                  Define number of rooms
                </label>

                <div className=" w-full ">
                  <div className="relative flex border border-black items-center max-w-full rounded-md bg-white p-3 gap-1.5">
                    <input
                      type="number"
                      className="bg-white text-gray-900 text-md block w-full px-2.5 border-0 outline-0"
                      placeholder="room number"
                      required
                    />
                  </div>
                <div/>
              </div>
            </div>
            {/* Basic about place */}
            <div className="basic-info flex flex-col flex-wrap w-full bg-white border gap-3.5 py-4 mt-3 rounded-md">
              {/* added the inputs */}
              <div className="flex items-center justify-between px-8">
                <div className="text">
                  <h1 className="font-bold underline underline-offset-1">
                    Guests
                  </h1>
                  <p className="text-xs opacity-60">
                    how meny guests you want ?
                  </p>
                </div>
                <div className="flex justify-center md:gap-2 items-center">
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md" onClick={()=>{
                    setGuests((prev)=> Math.max(1,prev-1))
                  }}>
                    <AiOutlineMinus />
                  </div>
                  <p className="text-lg font-bold">{guests}</p>
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md"  onClick={()=>{
                    setGuests(prev=>Math.max(1, prev + 1))
                  }}>
                    <AiOutlinePlus />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-8">
                <div className="text">
                  <h1 className="font-bold underline underline-offset-1">
                    Beds
                  </h1>
                  <p className="text-xs opacity-60">
                    How many Beds do you have ?
                  </p>
                </div>
                <div className="flex justify-center md:gap-2 items-center">
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md" onClick={()=>{
                    setBeds(prev=>Math.max(1, prev - 1))
                  }}>
                    <AiOutlineMinus />
                  </div>
                  <p className="text-lg font-bold">{beds}</p>
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md" onClick={()=>{
                    setBeds(prev=>Math.max(1, prev + 1))
                  }}>
                    <AiOutlinePlus />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-8">
                <div className="text">
                  <h1 className="font-bold underline underline-offset-1">
                    Bathrooms
                  </h1>
                  <p className="text-xs opacity-60">
                    how meny Bathrooms do you have ?
                  </p>
                </div>
                <div className="flex justify-center md:gap-2 items-center">
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md" onClick={()=>{
                    setBathrooms(prev=>Math.max(1, prev - 1))
                  }}>
                    <AiOutlineMinus />
                  </div>
                  <p className="text-lg font-bold">{bathrooms}</p>
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md" onClick={()=>{
                    setBathrooms(prev=>Math.max(1, prev + 1))
                  }}>
                    <AiOutlinePlus />
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Page1;