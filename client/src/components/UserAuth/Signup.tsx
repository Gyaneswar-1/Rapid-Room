import { useState } from "react";
import { IoMdClose, IoMdEye, IoMdEyeOff } from "react-icons/io";
import facebookLogo from "../../assets/icons/facebook.logo.png";
import googleLogo from "../../assets/icons/google.logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { signupTypeFrontend } from "@bibek-samal/traveltrove";
import { signupManual } from "../../service/exportServices";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../lib/Toast";



const handleGoogleLogin = () => {
  window.open("http://localhost:3000/api/v1/auth/google", "_self");
};

const handleFacebookLogin = () => {
  window.open("http://localhost:3000/api/v1/auth/facebook", "_self");
};


//state management
import { AppDispatch, RootState } from "../../store/store";
import { flipSignUp, flipSignin } from "../../store/reducers/showAuthCard.reducers";
import { useDispatch, useSelector } from "react-redux";


const Signup= () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  
  //state management
  const { showSignup,showSignin  } = useSelector((state: RootState) => state.showAuthCardReducer);
  const dispatch: AppDispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.emailReducer);

  //react-hook form actions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupTypeFrontend>();
  const onSubmit: SubmitHandler<signupTypeFrontend> = async(data) => {
    const res = await signupManual(data);
    if(res.success === true){
      navigate("/home");
      notifySuccess("Welcome to RapidRoom !")
    }
    else{
      notifyError("somthing went wrong")
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-6 flex items-center justify-center  bg-opacity-50 backdrop-brightness-40 backdrop-blur-sm ">
      <div className="flex flex-col items-center  signup-page md:w-[530px] md:h-[620px] w-full h-full bg-neutral-200 rounded-xl ">
        <button
        //close the signup
          onClick={()=>{
            dispatch(flipSignUp(showSignup));
          }}
          className="text-xl cursor-pointer w-full flex items-end justify-end px-5 py-4"
        >
          <IoMdClose />
        </button>
        <h1 className="text-2xl font-semibold ">
          Welcome To <span className="text-teal-600 ">RapidRoom</span>
        </h1>
        <div className=" h-full w-full p-12 flex flex-col lg:justify-start justify-evenly  ">
          <form
            className=" flex flex-col gap-9"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              htmlFor="Fullname"
              className="relative block rounded-md h-12  text-xl p-2 border border-neutral-800 shadow-xs focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600"
            >
              <input
                type="text"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden w-full"
                placeholder="Fullname"
                {...register("fullName", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters and spaces are allowed",
                  },
                })}
              />
              <p className="mt-3 text-sm italic text-red-600">
                {errors.fullName && errors.fullName.message}
              </p>

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-neutral-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Fullname
              </span>
            </label>
            <label
              htmlFor="Email"
              className="relative block rounded-md h-12  text-xl p-2 border border-neutral-800 shadow-xs focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600"
            >
              <input
                type="text"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden w-full"
                defaultValue={email}
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Email must be a valid Gmail address",
                  },
                })}
              />
              <p className="mt-3 text-sm italic text-red-600">
                {errors.email && errors.email.message}
              </p>

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-neutral-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Email
              </span>
            </label>
            <label
              htmlFor="password"
              className="relative block rounded-md h-12 text-xl p-2 border border-neutral-800 shadow-xs focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600"
            >
              <input
                type={showPassword ? "text" : "password"}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden w-full"
                placeholder="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password is too sort",
                  },
                  pattern: {
                    value: /^\S+$/, // Ensures no spaces
                    message: "Password cannot contain spaces",
                  },
                })}
              />
              <p className="mt-3 text-sm italic text-red-600">
                {errors.password && errors.password.message}
              </p>

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-neutral-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                password
              </span>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute end-2.5 top-1/2 transform -translate-y-1/2 text-neutral-800 "
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </label>

            <input
              type="submit"
              className="bg-teal-600 h-11 rounded-md text-neutral-200 focus:ring-3 cursor-pointer focus:ring-teal-900"
            />
          </form>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8  border-0 bg-neutral-700" />
            <span className="absolute px-3 font-medium bg-neutral-200 text-neutral-900 -translate-x-1/2  left-1/2 ">
              &
            </span>
          </div>
          <div className="social-login  h-22 w-full flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between text-neutral-200">
            <button
              className="flex cursor-pointer rounded-md text-black items-center gap-3 border-blue-500  border-2 w-full md:h-fit md:w-fit p-2.5 "
              onClick={handleGoogleLogin}
            >
              <span className="h-6 w-6">
                <img src={googleLogo} alt="" />
              </span>
              Login with google
            </button>
            <button
              className="flex cursor-pointer rounded-md text-black items-center gap-3 border-blue-500 border-2 w-full md:h-fit md:w-fit p-2.5 "
              onClick={handleFacebookLogin}
            >
              <span className="h-6 w-6">
                <img src={facebookLogo} alt="" />
              </span>
              Login with facebook
            </button>
          </div>
          <p className="flex justify-center md:pt-0 pt-12">
            already have an account
            <button
              onClick={()=>{
                dispatch(flipSignUp(showSignup))
                dispatch(flipSignin(showSignin))
              }}
              className="text-blue-700 underline-offset-1 underline cursor-pointer"
            >
              Signin ?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
