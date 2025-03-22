

import { useState } from "react"
import { IoMdClose, IoMdEye, IoMdEyeOff } from "react-icons/io"
import facebookLogo from "../../assets/icons/facebook.logo.png"
import googleLogo from "../../assets/icons/google.logo.png"
import { useForm, type SubmitHandler } from "react-hook-form"
import type { signupTypeFrontend } from "@bibek-samal/traveltrove"
import { signupManual } from "../../service/exportServices"
import { useNavigate } from "react-router-dom"
import { notifyError, notifySuccess } from "../../lib/Toast"

// State management
import type { AppDispatch, RootState } from "../../store/store"
import { flipSignUp, flipSignin } from "../../store/reducers/showAuthCard.reducers"
import { useDispatch, useSelector } from "react-redux"

const handleGoogleLogin = () => {
  window.open("http://localhost:3000/api/v1/auth/google", "_self")
  localStorage.setItem("loggedin", "true")
}

const handleFacebookLogin = () => {
  window.open("http://localhost:3000/api/v1/auth/facebook", "_self")
  localStorage.setItem("loggedin", "true")
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // State management
  const { showSignup, showSignin } = useSelector((state: RootState) => state.showAuthCardReducer)
  const dispatch: AppDispatch = useDispatch()
  const { email } = useSelector((state: RootState) => state.emailReducer)

  // React-hook form actions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupTypeFrontend>()

  const onSubmit: SubmitHandler<signupTypeFrontend> = async (data) => {
    const res = await signupManual(data)
    if (res.success === true) {
      localStorage.setItem("loggedin", "true")
      navigate("/home")
      notifySuccess("Welcome to RapidRoom!")
      dispatch(flipSignUp(showSignup))
    } else {
      notifyError("Something went wrong")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out">
        {/* Close button */}
        <button
          onClick={() => {
            dispatch(flipSignUp(showSignup))
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
              Join <span className="text-teal-600">RapidRoom</span> today
            </h1>
            <p className="text-gray-500 text-sm">Create your account to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full name field */}
            <div className="space-y-1">
              <label
                htmlFor="fullName"
                className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200"
              >
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 pt-6 pb-2 bg-transparent focus:outline-none text-gray-800"
                  placeholder=" "
                  {...register("fullName", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces are allowed",
                    },
                  })}
                />
                <span className="absolute top-2 left-4 text-xs font-medium text-gray-500">Full Name</span>
              </label>
              {errors.fullName && <p className="text-red-500 text-xs italic ml-1">{errors.fullName.message}</p>}
            </div>

            {/* Email field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200"
              >
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 pt-6 pb-2 bg-transparent focus:outline-none text-gray-800"
                  placeholder=" "
                  defaultValue={email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Email must be a valid Gmail address",
                    },
                  })}
                />
                <span className="absolute top-2 left-4 text-xs font-medium text-gray-500">Email</span>
              </label>
              {errors.email && <p className="text-red-500 text-xs italic ml-1">{errors.email.message}</p>}
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200"
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^\S+$/, // Ensures no spaces
                      message: "Password cannot contain spaces",
                    },
                  })}
                />
                <span className="absolute top-2 left-4 text-xs font-medium text-gray-500">Password</span>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                </button>
              </label>
              {errors.password && <p className="text-red-500 text-xs italic ml-1">{errors.password.message}</p>}
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-teal-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or sign up with</span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <img src={googleLogo || "/placeholder.svg"} alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button
              onClick={handleFacebookLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <img src={facebookLogo || "/placeholder.svg"} alt="Facebook" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => {
                dispatch(flipSignUp(showSignup))
                dispatch(flipSignin(showSignin))
              }}
              className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup

