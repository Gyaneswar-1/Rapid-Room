import MainLogo from "../../assets/images/MainLogo.png";
import { logOutServices } from "../../service/userAuth/logOutServices";
import UserMenu from "../Navbar/UserMenu";

//state management
import { useDispatch, useSelector } from "react-redux";
import { setShowLoader } from "../../store/reducers/loader.reducer";
import { flipSignUp, flipSignin } from "../../store/reducers/showAuthCard.reducers";
import { AppDispatch, RootState } from "../../store/store";



const WelcomePagenavBar = () => {
  const isLoggedIn = localStorage.getItem("loggedin")
  
  //state management
  const { showSignup,showSignin  } = useSelector((state: RootState) => state.showAuthCardReducer);
  const dispatch: AppDispatch = useDispatch();
  


  async function handelLoagout(){
    dispatch(setShowLoader());

    const res = await logOutServices();
    if(res.success === true){
      dispatch(setShowLoader());
    }
    
  }

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

              { !isLoggedIn ? (<div className="flex md:order-2 gap-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
              </div>) : <div className="flex items-center gap-5">
                <UserMenu showRapidYourRoom={false} ></UserMenu>
              <button
                  type="button"
                  className="cursor-pointer text-teal-600  border-2 border-teal-600 hover:bg-teal-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 text-center "
                 onClick={()=>{
                  handelLoagout();
                 }}
                >
                  Logout
                </button>
              </div>}
            </div>
            <hr />
          </nav>
        </div>
  )
}

export default WelcomePagenavBar
