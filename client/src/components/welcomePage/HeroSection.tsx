import heroBanner from "../../assets/welcomepage/heroBanner.avif"


//state management
import { AppDispatch, RootState } from "../../store/store";
import { setEmail } from "../../store/reducers/email.reducer";
import { useDispatch, useSelector } from "react-redux";
import { flipSignUp } from "../../store/reducers/showAuthCard.reducers";


const HeroSection = () => {
  
  //state management
  const dispatch: AppDispatch = useDispatch();
  const { showSignup } = useSelector((state: RootState) => state.showAuthCardReducer);

  return (
    <div className="Welcome-textPage h-96 md:h-full border-amber-600  bg-scroll   bg-[url({})] relative bg-cover bg-center bg-dark-overlay bg-no-repeat ">
          <img
            src={heroBanner}
            alt=""
            className="absolute top-0 h-full w-full"
          />
          <div className="w-full h-full py-32  backdrop-blur-[2px] backdrop-brightness-70 flex  items-center justify-center ">
            <section className="">
              <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                <h1 className="mb-4 text-4xl font-semibold md:font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Your Perfect Stay, Just a
                  <span className="text-green-500"> Click </span>
                  Away
                </h1>
                <p className="mb-8 md:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                  Book instantly, stay comfortably! RapidRoom offers a seamless
                  hotel booking experience with lightning-fast reservations,
                  unbeatable deals, and stays that feel like home. 🌍
                </p>
                <div className="w-full max-w-md mx-auto">
                  <label
                    htmlFor="default-email"
                    className="mb-2 text-sm font-medium  sr-only text-white"
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
                      //handel the email change
                      onChange={(e)=>{
                        dispatch(setEmail(e.target.value));
                      }}
                     
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600  "
                      //go to the signup page
                      onClick={()=>{
                        dispatch(flipSignUp(showSignup))
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
  )
}

export default HeroSection
