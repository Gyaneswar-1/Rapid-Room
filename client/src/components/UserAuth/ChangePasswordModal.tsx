import type React from "react";
import { useState, useRef } from "react";
// Icons
import { IoMdClose } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
// Services and APIs
import { updatePass } from "../../service/userAuth/updatePassService";
import axios from "axios";
import API from "../../service/api";
// State management
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  flipForgotPass,
  flipSignin,
} from "../../store/reducers/showAuthCard.reducers";
import { setEmail } from "../../store/reducers/email.reducer";
// Utils
import { notifyError, notifySuccess } from "../../lib/Toast";

/**
 * ChangePasswordModal Component
 * Handles the password reset flow with email, new password, and OTP verification
 */
export default function ChangePasswordModal() {
  // Form state
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  // Loading states
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // References for OTP input fields
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redux state and dispatch
  const { showSignin, showForgotPass } = useSelector(
    (state: RootState) => state.showAuthCardReducer
  );
  const { email } = useSelector((state: RootState) => state.emailReducer);
  const dispatch: AppDispatch = useDispatch();

  /**
   * Validates email format
   * @param email - Email to validate
   * @returns boolean indicating if email is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handles OTP input change and manages focus between fields
   * @param index - Index of the current OTP input
   * @param value - Input value
   */
  const handleOtpChange = (index: number, value: string): void => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handles keyboard navigation in OTP fields
   */
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on empty input
      inputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Handles paste event for OTP
   */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  /**
   * Handles sending OTP to user email
   */
  const handleSendOTP = async (): Promise<void> => {
    // Form validation
    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
      return;
    }

    if (newPassword.length < 8) {
      notifyError("Password must be at least 8 characters");
      return;
    }

    setIsSendingOtp(true);

    try {
      const otpRes = await axios.post(`${API}/send-otp`, { email: email });
      console.log("Here is the optres", otpRes);
      if (otpRes.data.success) {
        notifySuccess("OTP sent successfully");
        setOtpSent(true);
      } else {
        notifyError("Failed to send OTP");
      }
    } catch (error) {
      console.log("catch erro", error);
      notifyError("Failed to send OTP");
      dispatch(setEmail(""));
      dispatch(flipForgotPass(showForgotPass));
      dispatch(flipSignin(showSignin));
    } finally {
      setIsSendingOtp(false);
      setError("");
    }
  };

  /**
   * Handles returning to email/password screen from OTP screen
   */
  const handleEditCredentials = (): void => {
    setOtpSent(false);
  };

  /**
   * Handles password update with OTP verification
   */
  const handleUpdatePassword = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Join OTP digits to create a single string
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }
    if (!newPassword || newPassword === "") {
      notifyError("Failed to update pass");
      dispatch(flipForgotPass(showForgotPass));
      dispatch(flipSignin(showSignin));
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const res = await updatePass(email, otpString, newPassword);

      if (res.success) {
        notifySuccess("Password updated successfully");
        dispatch(setEmail(""));
        dispatch(flipForgotPass(showForgotPass));
        dispatch(flipSignin(showSignin));
      } else {
        notifyError("Password update failed");
        return;
      }
    } catch (error) {
      notifyError("Password update failed");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  /**
   * Toggles password visibility
   */
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  /**
   * Handles modal closing
   */
  const handleClose = (): void => {
    dispatch(flipForgotPass(showForgotPass));
    dispatch(flipSignin(showSignin));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <IoMdClose className="text-gray-600 text-xl" />
        </button>

        <div className="px-6 pt-12 pb-8 md:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-teal-100 p-3 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <CiLock className="text-teal-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {otpSent ? "Verify OTP" : "Change Password"}
            </h1>
            {otpSent ? (
              <p className="text-gray-500 text-sm">
                We've sent a verification code to{" "}
                <span className="font-medium">{email}</span>
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Enter your email, new password and verify with OTP
              </p>
            )}
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            {/* Show email and password fields only when OTP is not sent */}
            {!otpSent && (
              <>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your email address"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <MdEmail size={18} />
                    </span>
                  </div>
                </div>

                {/* New Password Input with Eye Toggle */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>
              </>
            )}

            {/* OTP Input - only show when OTP is sent */}
            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter the 6-digit OTP
                </label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  ))}
                </div>

                {/* Option to edit email/password */}
                <button
                  type="button"
                  onClick={handleEditCredentials}
                  className="mt-3 text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Edit Email & Password
                </button>
              </div>
            )}

            {/* Action Button */}
            <button
              type={otpSent ? "submit" : "button"}
              onClick={otpSent ? undefined : handleSendOTP}
              disabled={
                (!otpSent &&
                  (!validateEmail(email) || newPassword.length < 8)) ||
                isSendingOtp ||
                isUpdatingPassword
              }
              className={`w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                (!otpSent &&
                  (!validateEmail(email) || newPassword.length < 8)) ||
                isSendingOtp ||
                isUpdatingPassword
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-teal-700"
              }`}
            >
              {otpSent
                ? isUpdatingPassword
                  ? "Updating..."
                  : "Update Password"
                : isSendingOtp
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleClose}
              disabled={isSendingOtp || isUpdatingPassword}
              className={`w-full py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 ${
                isSendingOtp || isUpdatingPassword
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
