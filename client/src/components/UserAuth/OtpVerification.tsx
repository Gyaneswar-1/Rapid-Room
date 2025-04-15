import type React from "react"

import { useState, useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io"


//state management 
import { AppDispatch, RootState } from "../../store/store";
import {
  flipOtpverificaton,
  flipSignin
} from "../../store/reducers/showAuthCard.reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API from "../../service/api";
import { useNavigate } from "react-router-dom"
import { notifyError, notifySuccess } from "../../lib/Toast";

const OtpVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [timer, setTimer] = useState<number>(60)
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true)
  //@ts-ignore
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate();
  const {email } = useSelector(
      (state: RootState) => state.emailReducer
    );
  async function onResend(){
    //send the opt again
    try {
      if(email === ""){
        localStorage.removeItem("loggedin");
        navigate("/");
        window.location.reload();
        return;
      }
      const otpRes = await axios.post(`${API}/send-otp`,{
        email: email
      })
      
      if(otpRes.data.success === true){
        //open the otp pannel
        notifySuccess("Otp send successfully ")
        return;
      }
      else{
        notifyError("Otp Send fail")
        return;
      }


    } catch (error) {
      console.log(error);
      notifyError("Error in otp Rsend");
      return;
    }
  }
  async function onVerify(otpString:any){
    //send the verification reques to the backend
    if(email === "" || !otpString){
      notifyError("Insufficient credential")
      localStorage.removeItem("loggedin");
      return;
    }
    try {
      const emailRes = await axios.post(`${API}/verify-email`,{
        email:email,
        otp: otpString
      })
      console.log(emailRes);
      if(emailRes.data.success === true){
        dispatch(flipOtpverificaton(true))
        dispatch(flipSignin(true));
        localStorage.setItem("loggedin", "true");
        navigate("/home");
        notifySuccess("Welcome to RapidRoom!");
        return;
      }
      else{
        notifyError("Email verification failed Check otp")
      localStorage.removeItem("loggedin");
      return;
      }
    } catch (error) {
      notifyError("Email verification failed Check otp")
      localStorage.removeItem("loggedin");
      return;
    }
  
    

  }
  const { showOtpVerificaton } = useSelector(
    (state: RootState) => state.showAuthCardReducer
  );
  const dispatch: AppDispatch = useDispatch();
  // Initialize timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setIsResendDisabled(false)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key press for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on empty input
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      inputRefs.current[5]?.focus()
    }
  }

  // Handle resend OTP
  const handleResend = () => {
    setIsResendDisabled(true)
    setTimer(60)
    setOtp(Array(6).fill(""))
    onResend()

    // Reset timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setIsResendDisabled(false)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }

  // Handle verify OTP
  const handleVerify = () => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    // setIsVerifying(true)
    onVerify(otpString)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out">
        {/* Close button */}
        <button
          onClick={()=>{
            dispatch(flipOtpverificaton(showOtpVerificaton));
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <IoMdClose className="text-gray-600 text-xl" />
        </button>

        <div className="px-6 pt-12 pb-8 md:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h1>
            <p className="text-gray-500 text-sm">
              We've sent a verification code to <span className="font-medium">{email}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Enter the 6-digit code</label>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              ))}
            </div>
            {error && <p className="mt-2 text-red-500 text-xs italic">{error}</p>}
          </div>

          {/* Timer and Resend */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
            {isResendDisabled ? (
              <p className="text-sm text-gray-500">
                Resend code in <span className="font-medium">{timer}</span> seconds
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
              >
                Resend Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          {isVerifying ? (
            <button
              disabled
              className="w-full py-3 px-4 flex items-center justify-center bg-teal-600 text-white font-medium rounded-lg shadow transition-colors duration-500"
            >
              <div className="flex flex-row gap-2">
                <div
                  className="loader border-t-2 rounded-full border-white bg-transparent animate-spin
                  aspect-square w-5 flex justify-center items-center"
                ></div>
                <span>Verifying...</span>
              </div>
            </button>
          ) : (
            <button
              onClick={handleVerify}
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Verify
            </button>
          )}

          {/* Help text */}
          <p className="mt-6 text-center text-xs text-gray-500">
            If you're having trouble, please contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
