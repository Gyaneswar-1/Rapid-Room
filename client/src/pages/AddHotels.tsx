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
  const [location, setLocation] = useState<Location | null>(null);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [images, setImages] = useState<File[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position);
        },
        (error) => {
          console.error("There is a problem:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

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
    <div className="w-full flex">
      <Navbar show={false} />

      <div className="content bg-neutral-100  h-screen w-screen mt-20 overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" xl:px-70 md:px-42  px-2 pt-12 pb-20 w-full flex flex-col justify-center">
            <div className="mb-6 ">
              <label
                htmlFor="large-input"
                className="block  text-2xl font-medium text-black "
              >
                Give title to You'r Hotel
              </label>
              <p className="mb-2 text-black opacity-60">
                short title work best -you can change it later
              </p>
              <input
                {...register("title", { required: true, maxLength: 24 })}
                type="text"
                id="large-input"
                className="block w-full p-4 text-2xl text-black border border-neutral-700 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-black mt-2">
                {watch("title")?.length || 0}/24
              </p>
            </div>
            {/* description */}
            <div>
              <label
                htmlFor="description"
                className="block  text-2xl font-medium text-black "
              >
                Create your Description
              </label>
              <p className="mb-2 text-black opacity-60">
                share what makes your hotel special
              </p>

              <textarea
                {...register("description", { required: true, maxLength: 500 })}
                id="description"
                className="mt-2 p-4 md:md:text-xl text-md w-full rounded-lg border-neutral-700 border align-top shadow-xs text-base bg-white"
                rows={4}
                placeholder="Enter any additional order notes..."
              ></textarea>
              <p className="text-sm text-black mt-2">
                {watch("description")?.length || 0}/500
              </p>
            </div>
            {/* Price and rooms belr */}
            <div className="flex w-full flex-wrap gap-9">
              <div className="grow ">
                <label
                  htmlFor="description"
                  className="block   text-2xl font-medium text-black "
                >
                  Now set your price
                </label>
                <p className="mb-2 text-black opacity-60">
                  can be changed ay time
                </p>

                <div className=" w-full">
                  <div className="relative flex border border-black items-center max-w-full rounded-xl bg-white p-3 gap-1.5">
                    <input
                      type="text"
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      id="quantity-input"
                      data-input-counter
                      aria-describedby="helper-text-explanation"
                      className="bg-white   h-11  text-gray-900 text-md   block w-full px-2.5 border-0 outline-0"
                      placeholder="₹"
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="quantity-input"
                      className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="quantity-input"
                      className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 "
                  >
                    Please select a 5 digit number from 0 to 9.
                  </p>
                </div>
              </div>
              <div className="grow ">
                <label
                  htmlFor="description"
                  className="block  text-2xl font-medium text-black "
                >
                  Define number of rooms
                </label>
                <p className="mb-2 text-black opacity-60">
                  can be increased later on
                </p>

                <form className=" w-full">
                  <div className="relative flex border border-black items-center max-w-full rounded-xl bg-white p-3 gap-1.5">
                    <input
                      type="text"
                      {...register("rooms", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      id="quantity-input"
                      data-input-counter
                      aria-describedby="helper-text-explanation"
                      className="bg-white   h-11  text-gray-900 text-md   block w-full px-2.5 border-0 outline-0"
                      placeholder="₹"
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="quantity-input"
                      className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="quantity-input"
                      className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 "
                  >
                    Please select a 5 digit number from 0 to 9.
                  </p>
                </form>
              </div>
            </div>
            {/* Basic about place */}
            <div className="basic-info flex flex-col flex-wrap w-full bg-white border-2 mt-12 rounded-2xl">
              {["guests", "bathrooms", "beds", "bedrooms"].map((field) => (
                <div
                  key={field}
                  className="border-b-2 w-full flex justify-evenly h-24 items-center grow"
                >
                  <div className="relative flex items-center md:justify-between justify-evenly md:w-1/2 w-full">
                    <span className="md:text-xl text-md text-black">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                    <div className="flex gap-3 items-center">
                      <input
                        type="number"
                        {...register(field as keyof FormData, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        className="w-20 text-center border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-neutral-100 flex justify-center ">
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
                {" "}
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

              <div className="flex items-center justify-center w-full py-5 pb-20">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 ">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="h-full flex justify-center w-full bg-cyan-400 ">
            <div className="bg-blue-200 ">
              This is form
              <button
                onClick={getLocation}
                className="bg-red-400 p-3 rounded-2xl flex justify-center items-center gap-2"
              >
                Share your location
                <MdLocationOn />
              </button>
            </div>
            {location && (
              <p>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </p>
            )}
            <div className="h-fit w-fit">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1586.0609247404705!2d85.84890027516147!3d20.54707027882882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1740100779601!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <button
            type="submit"
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotels;
