import MainLogo from "../assets/MainLogo.png";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { CgGym } from "react-icons/cg";
import { CiWifiOn } from "react-icons/ci";
import {
  FaCar,
  FaCity,
  FaFirstAid,
  FaSnowman,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import {
  GiCampfire,
  GiCampingTent,
  GiFarmTractor,
  GiForestEntrance,
  GiHillFort,
  GiLockedFortress,
  GiPoolDive,
  GiPoolTableCorner,
  GiSwamp,
  GiTreeDoor,
  GiTropicalFish,
  GiVillage,
} from "react-icons/gi";
import { IoBoatSharp, IoDiamondOutline, IoTvOutline } from "react-icons/io5";
import {
  LiaSwimmingPoolSolid,
  LiaHotTubSolid,
  LiaUmbrellaBeachSolid,
} from "react-icons/lia";
import { LuTreeDeciduous } from "react-icons/lu";
import {
  MdBalcony,
  MdClose,
  MdKitesurfing,
  MdLocationOn,
  MdOutlineCabin,
  MdOutlineCastle,
  MdOutlineOutdoorGrill,
  MdOutlineShower,
} from "react-icons/md";
import {
  PiWashingMachine,
  PiFireExtinguisher,
  PiCityDuotone,
  PiGlobeStandBold,
  PiIsland,
  PiMountainsBold,
} from "react-icons/pi";
import { TbToolsKitchen3, TbAlarmSmoke } from "react-icons/tb";
import Slide2Buttons from "../components/addHotel/Slide2Buttons";
import { BiHomeSmile } from "react-icons/bi";
import { BsCashStack } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const basicAmenities = [
  { icon: CiWifiOn, name: "Wifi" },
  { icon: IoTvOutline, name: "TV" },
  { icon: TbToolsKitchen3, name: "Kitchen" },
  { icon: MdBalcony, name: "Balcony" },
  { icon: FaComputer, name: "WorkSpace" },
  { icon: PiWashingMachine, name: "Washing Machine" },
  { icon: LuTreeDeciduous, name: "Garden" },
  { icon: FaCar, name: "Parking" },
];

const standOutAmenities = [
  { icon: LiaSwimmingPoolSolid, name: "Pools" },
  { icon: LiaHotTubSolid, name: "Hot tub" },
  { icon: GiCampfire, name: "Firepit" },
  { icon: MdOutlineOutdoorGrill, name: "BBQ grill" },
  { icon: GiPoolTableCorner, name: "Pool table" },
  { icon: CgGym, name: "Exercise equipment" },
  { icon: MdOutlineShower, name: "Outdoor shower" },
];

const safetyItems = [
  { icon: TbAlarmSmoke, name: "smoke" },
  { icon: FaFirstAid, name: "First aid Kit" },
  { icon: PiFireExtinguisher, name: "Fire extinguisher" },
];

const categories = [
  { name: "BEACH", icon: <FaUmbrellaBeach /> },
  { name: "CITY", icon: <FaCity /> },
  { name: "MOUNTAIN", icon: <PiMountainsBold /> },
  { name: "RESORT", icon: null },
  { name: "BUDGET", icon: <BsCashStack /> },
  { name: "LUXURY", icon: <IoDiamondOutline /> },
  { name: "AMAZING_VIEWS", icon: <GiForestEntrance /> },
  { name: "AMAZING_POOLS", icon: <GiPoolDive /> },
  { name: "FARMS", icon: <GiFarmTractor /> },
  { name: "HISTORICAL_HOMES", icon: <GiHillFort /> },
  { name: "SURFING", icon: <MdKitesurfing /> },
  { name: "BEACHFRONT", icon: <LiaUmbrellaBeachSolid /> },
  { name: "LAKEFRONT", icon: <GiSwamp /> },
  { name: "CASTLES", icon: <MdOutlineCastle /> },
  { name: "CAMPING", icon: <GiCampingTent /> },
  { name: "BOATS", icon: <IoBoatSharp /> },
  { name: "TROPICAL", icon: <GiTropicalFish /> },
  { name: "TOP_OF_THE_WORLD", icon: <PiGlobeStandBold /> },
  { name: "TOP_CITIES", icon: <PiCityDuotone /> },
  { name: "ARCTIC", icon: <FaSnowman /> },
  { name: "TREEHOUSES", icon: <GiTreeDoor /> },
  { name: "CABINS", icon: <MdOutlineCabin /> },
  { name: "TINY_HOMES", icon: <BiHomeSmile /> },
  { name: "ISLANDS", icon: <PiIsland /> },
  { name: "COUNTRYSIDE", icon: <GiVillage /> },
  { name: "MANSION", icon: <GiLockedFortress /> },
];

type FormData = {
  title: string;
  description: string;
  price: number;
  rooms: number;
  guests: number;
  bathrooms: number;
  beds: number;
  bedrooms: number;
  hotelType: string;
  amenities: string[];
};

interface Location {
  latitude: number;
  longitude: number;
}

const AddHotels = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [images, setImages] = useState<File[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelection = (name: any) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormData) => {
    const formData = {
      ...data,
      images: images,
    };
    console.log("Form Data:", formData);
    // Add your submission logic here
  };

  return (
    <div className="w-full flex ">
      <Navbar show={false} />

      <div className="content bg-white  h-screen w-screen mt-20 overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" xl:px-70 md:px-42  px-2 pt-12 pb-20 w-full flex flex-col justify-center">
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
                {watch("title")?.length || 0}/24
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
                {watch("description")?.length || 0}/500
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

                <form className=" w-full ">
                  <div className="relative flex border border-black items-center max-w-full rounded-md bg-white p-3 gap-1.5">
                    <input
                      type="number"
                      className="bg-white text-gray-900 text-md block w-full px-2.5 border-0 outline-0"
                      placeholder="room number"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            {/* Basic about place */}
            <div className="basic-info flex flex-col flex-wrap w-full bg-white border gap-3.5 py-4 mt-12 rounded-md">
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
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md">
                    <AiOutlineMinus />
                  </div>
                  <p className="text-lg font-bold">0</p>
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md">
                    <AiOutlinePlus />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-8">
                <div className="text">
                  <h1 className="font-bold underline underline-offset-1">
                    Rooms
                  </h1>
                  <p className="text-xs opacity-60">
                    How many Rooms do you have ?
                  </p>
                </div>
                <div className="flex justify-center md:gap-2 items-center">
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md">
                    <AiOutlineMinus />
                  </div>
                  <p className="text-lg font-bold">0</p>
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md">
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
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md">
                    <AiOutlineMinus />
                  </div>
                  <p className="text-lg font-bold">0</p>
                  <div className="p-3 cursor-pointer text-teal-600 border-neutral-800 border m-2 rounded-md">
                    <AiOutlinePlus />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white flex justify-center ">
            <div className="elements md:w-[1000px] pt-8 p-12">
              <h1 className="font-medium text-black text-3xl">
                Tell guests what your place has to offer
              </h1>
              <p>You can add more amenities after you publish your listing</p>
              <div className="pt-8 md:p-5 p-0.5 flex gap-3 flex-wrap w-full justify-start">
                {basicAmenities.map((amenity, index) => (
                  <Slide2Buttons
                    key={index}
                    icon={amenity.icon}
                    text={amenity.name}
                    selected={selectedItems.has(amenity.name)}
                    onClick={() => handleSelection(amenity.name)}
                  />
                ))}
              </div>
              <p>Do you have any standout amenities?</p>
              <div className="pt-8 md:p-5 p-0.5 flex gap-3 flex-wrap w-full justify-start">
                {standOutAmenities.map((amenity, index) => (
                  <Slide2Buttons
                    key={index}
                    icon={amenity.icon}
                    text={amenity.name}
                    selected={selectedItems.has(amenity.name)}
                    onClick={() => handleSelection(amenity.name)}
                  />
                ))}
              </div>
              <p>Do you have any safety items?</p>
              <div className="pt-8 md:p-5 p-0.5 flex gap-3 flex-wrap w-full justify-start">
                {safetyItems.map((amenity, index) => (
                  <Slide2Buttons
                    key={index}
                    icon={amenity.icon}
                    text={amenity.name}
                    selected={selectedItems.has(amenity.name)}
                    onClick={() => handleSelection(amenity.name)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center flex-col">
            <div>
              <label
                htmlFor="HeadlineAct"
                className="block text-2xl font-medium text-gray-900"
              >
                Select Hotel Type
              </label>

              <select
                {...register("hotelType", { required: true })}
                id="HeadlineAct"
                className="mt-1.5 w-[700px] h-12 rounded-xl border-neutral-800  p-2 text-gray-700 sm:text-sm border"
              >
                {categories.map((data, index) => {
                  return (
                    <option value="" key={index}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex w-full h-full justify-center">
            <div className="elements md:w-[700px] pt-8 md:p-12 p-1.5">
              <div className="py-5">
                <h1 className="text-3xl ">Upload some images</h1>
                <p>upload some aesthetics images of your rooms</p>
              </div>
              <div className="uploaded-images p-2 md:overflow-hidden overflow-scroll h-fit rounded-xl w-full border flex gap-1.5 flex-wrap object-cover">
                <div className="w-full text-white bg-neutral-500 h-8 rounded-md flex justify-between items-center px-3">
                  <p className=""> hotel_image_1080x720.png</p>
                  <MdClose className="text-red-200 cursor-pointer text-xl" />
                </div>
                <div className="w-full text-white bg-neutral-500 h-8 rounded-md flex justify-between items-center px-3">
                  <p className=""> hotel_image_1080x720.png</p>
                  <MdClose className="text-red-200 cursor-pointer text-xl" />
                </div>
                <div className="w-full text-white bg-neutral-500 h-8 rounded-md flex justify-between items-center px-3">
                  <p className=""> hotel_image_1080x720.png</p>
                  <MdClose className="text-red-200 cursor-pointer text-xl" />
                </div>
                <div className="w-full text-white bg-neutral-500 h-8 rounded-md flex justify-between items-center px-3">
                  <p className=""> hotel_image_1080x720.png</p>
                  <MdClose className="text-red-200 cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full py-5 pb-20">
              
                <input
                  className="flex w-full text-sm py-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};;

export default AddHotels;
