import MainLogo from "../../assets/images/MainLogo.png"

//state management
import { AppDispatch, RootState } from "../../store/store";
import { flipSignUp, flipSignin } from "../../store/reducers/showAuthCard.reducers";
import { useDispatch, useSelector } from "react-redux";

const WelcomePagenavBar = () => {

  //state management
  const { showSignup,showSignin  } = useSelector((state: RootState) => state.showAuthCardReducer);
  const dispatch: AppDispatch = useDispatch();

  return (
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
                  className="cursor-pointer text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 text-center"
                 onClick={()=>{
                  dispatch(flipSignin(showSignin))
                 }}
                >
                  Signin
                </button>
                <button
                  type="button"
                  className="cursor-pointer text-teal-600  border-2 border-teal-600 hover:bg-teal-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 text-center "
                 onClick={()=>{
                  dispatch(flipSignUp(showSignup));
                 }}
                >
                  Signup
                </button>
              </div>
            </div>
            <hr />
          </nav>
        </div>
  )
}

export default WelcomePagenavBar
