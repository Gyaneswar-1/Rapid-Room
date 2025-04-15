import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import SetUserDataToStore from "../service/userdata/SetDataToStore"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validatePassword = (value: string) => {
    if (!value) return "Password is required"
    if (value.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter"
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter"
    if (!/[0-9]/.test(value)) return "Password must contain at least one number"
    if (!/[^A-Za-z0-9]/.test(value)) return "Password must contain at least one special character"
    return ""
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthText = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"]
  const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-400", "bg-green-600"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    const passwordError = validatePassword(password)
    const confirmError = !confirmPassword
      ? "Please confirm your password"
      : password !== confirmPassword
        ? "Passwords do not match"
        : ""

    if (passwordError || confirmError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmError,
      })
      return
    }

    // Clear any existing errors
    setErrors({})
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Log the password (for demonstration only - never do this in production!)
      console.log("Password reset to:", password)

      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. You can now use your new password to log in.
            </p>
            <Link
              to="/welcome"
              className="block w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
            <p className="text-gray-600">Please create a new secure password for your RapidRoom account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength:</span>
                    <span className="text-xs font-medium">
                      {passwordStrength > 0 ? strengthText[passwordStrength - 1] : ""}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        passwordStrength > 0 ? strengthColor[passwordStrength - 1] : ""
                      } transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/welcome" className="text-primary hover:text-primary/80 text-sm font-medium">
              Return to Login
            </Link>
          </div>

          {/* Development Warning */}
          <div className="mt-8 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Development Notice:</strong> This demo logs the password to the console for demonstration purposes
              only. In a production environment, passwords should never be logged or stored in plain text.
            </p>
          </div>
        </div>
      </motion.div>
       <SetUserDataToStore/>
    </div>
  )
}
