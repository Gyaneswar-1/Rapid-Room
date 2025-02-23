import heroBanner from "../../assets/welcomepage/heroBanner.avif";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedin")



  return (
    <div className="Welcome-textPage h-96 md:h-full border-amber-600  bg-scroll   bg-[url({})] relative bg-cover bg-center bg-dark-overlay bg-no-repeat ">
      <img src={heroBanner} alt="" className="absolute top-0 h-full w-full" />
      <div className="w-full h-full py-32  backdrop-blur-[2px] backdrop-brightness-70 flex  items-center justify-center ">
        <section className="">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
         
            {!isLoggedIn ? 
               <h1 className="mb-4 text-4xl font-semibold md:font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
               Your Perfect Stay, Just a
               <span className="text-green-500"> Click </span>
               Away
             </h1>:   <h1 className="mb-4 text-4xl font-semibold md:font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Explore and Book your
              <span className="text-green-500"> Rooms </span>
              
            </h1>

            }
            <p className="mb-8 md:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
              Book instantly, stay comfortably! RapidRoom offers a seamless
              hotel booking experience with lightning-fast reservations,
              unbeatable deals, and stays that feel like home. 🌍
            </p>

            <button className=" text-white w-full flex  justify-center  text-xl">
              <div
                onClick={() => {
                  navigate("/home");
                }}
                className="w-fit  bg-neutral-900 hover:bg-neutral-950 cursor-pointer flex justify-center items-center gap-1.5 p-3 rounded-lg"
              >
                Explore <MdOutlineArrowForwardIos />
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
