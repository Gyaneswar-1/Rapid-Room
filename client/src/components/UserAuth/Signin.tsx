import { useState } from "react";
import { IoMdClose, IoMdEye, IoMdEyeOff } from "react-icons/io";
import facebookLogo from "../../assets/icons/facebook.logo.png";
import googleLogo from "../../assets/icons/google.logo.png";
import { SigninType } from "@bibek-samal/traveltrove";
import { useForm, SubmitHandler } from "react-hook-form";
import { signinManual } from "../../service/exportServices";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../lib/Toast";

// State management
import { AppDispatch, RootState } from "../../store/store";
import {
  flipOtpverificaton,
  flipSignUp,
  flipSignin,
  flipForgotPass
} from "../../store/reducers/showAuthCard.reducers";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../store/reducers/email.reducer";
import axios from "axios";
import API from "../../service/api";

const handleGoogleLogin = () => {
  localStorage.setItem("loggedin", "true");
  window.open(`${API}/auth/google`, "_self");
};

const handleFacebookLogin = () => {
  localStorage.setItem("loggedin", "true");
  window.open(`${API}/auth/facebook`, "_self");
};

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  //@ts-ignore
  const { email } = useSelector((state: RootState) => state.emailReducer);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // State management
  const { showSignup, showSignin, showOtpVerificaton,showForgotPass } = useSelector(
    (state: RootState) => state.showAuthCardReducer
  );
  const dispatch: AppDispatch = useDispatch();

  // React-hook form actions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninType>();

  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    setShowLoader(true);
    const res = await signinManual(data);
    console.log("are rs", res);
    if (res.success === true) {
      if (res.isEmailVerifyed) {
        // signin the user if the email is verifyed
        localStorage.setItem("loggedin", "true");
        setShowLoader(false);
        navigate("/home");
        notifySuccess("Welcome back!");
        dispatch(flipSignin(showSignin));

        
      } else {
        //store the email in the store
        
        try {
          dispatch(setEmail(res.email));
          
          const otpRes = await axios.post(`${API}/send-otp`, {
            email: res.email,
          });

          if (otpRes.data.success === true) {
            //open the otp pannel
            notifySuccess("Otp send successfully ");
            dispatch(flipSignin(showSignin));
            dispatch(flipOtpverificaton(showOtpVerificaton));
            return;
          } else {
            notifyError("Otp Send fail");
            return;
          }
        } catch (error) {
          notifyError("Failed to send the otp");
          setShowLoader(false);
          return;
        }
        
      }
    } else {
      notifyError("Signin failed!");
      setShowLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out">
        {/* Close button */}
        <button
          onClick={() => {
            dispatch(flipSignin(showSignin));
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <IoMdClose className="text-gray-600 text-xl" />
        </button>

        <div className="px-6 pt-12 pb-8 md:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back to <span className="text-primary">RapidRoom</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200"
              >
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 pt-6 pb-2 bg-transparent focus:outline-none text-gray-800"
                  placeholder=" "
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Email must be a valid Gmail address",
                    },
                  })}
                />
                <span className="absolute top-2 left-4 text-xs font-medium text-gray-500">
                  Email
                </span>
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs italic ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 pt-6 pb-2 bg-transparent focus:outline-none text-gray-800"
                  placeholder=" "
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    pattern: {
                      value: /^\S+$/, // Ensures no spaces
                      message: "Password cannot contain spaces",
                    },
                  })}
                />
                <span className="absolute top-2 left-4 text-xs font-medium text-gray-500">
                  Password
                </span>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={20} />
                  ) : (
                    <IoMdEye size={20} />
                  )}
                </button>
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs italic ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <button
                onClick={()=>{
                  dispatch(flipSignin(showSignin));
                  dispatch(flipForgotPass(showForgotPass));
                }}
                className="text-sm text-primary hover:text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}

            {showLoader ? (
              <button className="w-full py-3 px-4 flex items-center justify-center bg-primary hover:bg-primary/80 text-white font-medium rounded-lg shadow transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                <div className="flex flex-row gap-2">
                  <div
                    className="loader border-t-2 rounded-full border-teal-950 bg-transparent animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700"
                  ></div>
                </div>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src={googleLogo || "/placeholder.svg"}
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button
              onClick={handleFacebookLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src={facebookLogo || "/placeholder.svg"}
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">
                Facebook
              </span>
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => {
                dispatch(flipSignin(showSignin));
                dispatch(flipSignUp(showSignup));
              }}
              className="font-medium text-primary hover:text-primary hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
