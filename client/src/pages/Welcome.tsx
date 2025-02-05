import { useState } from "react";
import Offer from "../components/Offer";
import UserReview from "../components/UserReview";
import WhyBest from "../components/WhyBest";
import MainLogo from "../assets/images/MainLogo.png";
import Signin from "../components/UserAuth/Signin";
import Signup from "../components/UserAuth/Signup";

function Welcome() {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [email, setEmail] = useState("");

  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const toggleSignup = () => {
    setSignup(!signup);
  }

  const toggleSignin = () => {
    setSignin(!signin);
  }

  return (
    <>
      <div className="font-EmCode">
        <div className="Navbar">
          <nav className="bg-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  className="h-10 block"
                  src={MainLogo}
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap hidden md:block">
                  RapidRoom
                </span>
              </div>
              <div className="flex md:order-2 gap-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className= "cursor-pointer text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 text-center"
                  onClick={() => {
                    toggleSignin()
                  }}
                >
                  Signin
                </button>
                <button
                  type="button"
                  className="cursor-pointer text-teal-600  border-2 border-teal-600 hover:bg-teal-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 text-center "
                  onClick={() => {
                    toggleSignup()
                  }}
                >
                  Signup
                </button>
              </div>
            </div>
            <hr />
          </nav>
        </div>
        <div className="Welcome-textPage  bg-scroll  w-full bg-[url(https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720)] relative bg-cover bg-center bg-dark-overlay bg-no-repeat ">
          <div className="w-full h-full py-32 backdrop-blur-[2px] backdrop-brightness-70 flex  items-center justify-center ">
            <section className="">
              <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  We invest in the world’s potential
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                  Here at Flowbite we focus on markets where technology,
                  innovation, and capital can unlock long-term value and drive
                  economic growth.
                </p>
                <form className="w-full max-w-md mx-auto">
                  <label
                    htmlFor="default-email"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Email sign-up
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="default-email"
                      className="block w-full p-4 ps-10 text-sm text-teal-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Enter your email here..."
                      required
                      onChange={handleEmailChange}
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600  "
                      onClick={toggleSignup}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
        <Offer />

        <WhyBest />
        <UserReview />
        <footer className="bg-white  shadow-sm w-full  dark:bg-zinc-600">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
      {signin && (
        <div  >
          <Signin closeSignin={toggleSignin}/>
        </div>
      )}
      {signup && (
        <div>
          <Signup closeSignup={toggleSignup} email={email} />
        </div>
      )}
    </>
  );
}

export default Welcome;
