import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import MainLogo from "../../assets/images/MainLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Signin from "../UserAuth/Signin";
import Signup from "../UserAuth/Signup";
import OtpVerification from "../UserAuth/OtpVerification";
import ChangePasswordModal from "../UserAuth/ChangePasswordModal";

import {
  flipSignin,
  flipSignUp,
  //@ts-ignore
  flipForgotPass
} from "../../store/reducers/showAuthCard.reducers";
import UserMenu from "../Navbar/UserMenu";

export default function WelcomePageNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //@ts-ignore
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { showSignup, showSignin, showOtpVerificaton,showForgotPass } = useSelector(
    (state: RootState) => state.showAuthCardReducer
  );

  const dispatch: AppDispatch = useDispatch();

  // In Next.js, we'd use a different approach for checking login status
  // This is just to maintain the logic from your original code
  const isLoggedIn =
    typeof window !== "undefined" ? localStorage.getItem("loggedin") : false;

  const handleLogout = async () => {
    // Implement your logout logic here
    console.log("Logging out...");
    // For demo purposes, we'll just simulate the logout
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedin");
      window.location.reload();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer transition hover:opacity-80">
              <img
                className="rounded-full hidden md:block h-10 w-10 object-contain"
                src={MainLogo || "/placeholder.svg"}
                alt="RapidRoom"
              />
              <span className="font-bold text-primary text-xl hidden sm:block">
                RapidRoom
              </span>
            </div>
          </Link>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-2 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/80 hover:text-white transition-colors"
                  onClick={() => dispatch(flipSignUp(showSignup))}
                >
                  Sign Up
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/80 transition-colors"
                  onClick={() => dispatch(flipSignin(showSignin))}
                >
                  Sign In
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <UserMenu showRapidYourRoom={false} />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/destinations"
                  className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Destinations
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              <div className="pt-4 border-t flex flex-col space-y-3">
                {!isLoggedIn ? (
                  <>
                    <button
                      className="w-full px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/80 transition-colors"
                      onClick={() => {
                        console.log("Sign in clicked");
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="w-full px-4 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/80 hover:text-white transition-colors"
                      onClick={() => {
                        console.log("Sign up clicked");
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </Link>
                    <button
                      className="w-full px-4 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSignin && <Signin />}
      {showSignup && <Signup />}
      {showOtpVerificaton && <OtpVerification />}
      {showForgotPass && <ChangePasswordModal></ChangePasswordModal>}
    </header>
  );
}
