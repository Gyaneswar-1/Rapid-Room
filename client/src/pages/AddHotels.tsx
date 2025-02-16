import { useState } from "react";
import Slide1 from "../components/addHotel/Slide1";
import Slide2 from "../components/addHotel/Slide2";
import Slide3 from "../components/addHotel/Slide3";
import MainLogo from "../assets/images/MainLogo.png"
import Slide4 from "../components/addHotel/Slide4";
import { useNavigate } from "react-router-dom";

const AddHotels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample slides data
  const slides = [
    { id: 1, content: <Slide1 /> },
    { id: 2, content: <Slide2 /> },
    { id: 3, content: <Slide3 /> },
    { id: 3, content: <Slide4 /> },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };
  const navigate = useNavigate();
  return (
    <div className="w-full flex">
      <div className="bg-zinc-400 flex gap-5 top-0 fixed items-center w-full h-20 justify-between z-2 p-5">
        <div className="flex items-center gap-3 px-5 "
        onClick={()=>navigate("/home")}
        >
          <img src={MainLogo} alt="" height={45} width={45} />
          <h1 className="text-xl md:block hidden">RapidRoom</h1>
        </div>
        <div className="flex gap-4">
          <button className="text-white p-3 rounded-4xl px-6 cursor-pointer hover:bg-neutral border-2 hidden md:block"
          onClick={()=>navigate("/home")}
          >Help?</button>
          <button className="text-white p-3 rounded-4xl px-6 cursor-pointer hover:bg-neutral border-2 md:block hidden"
          onClick={()=>navigate("/home")}
          >Skip</button>
          <button className="text-white p-3 rounded-4xl px-6 cursor-pointer hover:bg-neutral border-2 md:hidden">more</button>
        </div>
      </div>
      <div className="content bg-neutral-100 h-[calc(100vh-8rem)] w-full mt-20 overflow-auto">
        {slides[currentIndex].content}
      </div>
      <div className="bg-zinc-400 flex gap-5 bottom-0 fixed w-full justify-between z-2 p-5">
        <button onClick={handlePrev} className="bg-teal-600 text-white p-3 rounded-xl px-6 mx-4 cursor-pointer hover:bg-neutral-800" disabled={currentIndex === 0}>Back</button>
        <button onClick={handleNext} className="bg-teal-600 text-white p-3 rounded-xl px-6 mx-4 cursor-pointer hover:bg-neutral-800" disabled={currentIndex === slides.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default AddHotels;
