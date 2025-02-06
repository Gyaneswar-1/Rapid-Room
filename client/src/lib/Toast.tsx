// utils/toastNotifications.ts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiTicktick } from "react-icons/si";
import { BiError, BiInfoCircle } from "react-icons/bi";
import { BsInfoLg } from "react-icons/bs";

/**
 * Display a success toast
 * @param message - The success message to display
 */
export const notifySuccess = (message: string): void => {
  toast.success(message, {
    icon: <SiTicktick />,
    style: {
      fontWeight: "bold",
      backgroundColor: "white",
      color: "#16A34A",
      border: "3px solid #16A34A",
    },
  });
};

/**
 * Display an error toast
 * @param message - The error message to display
 */
export const notifyError = (message: string): void => {
  toast.error(message, {
    icon: <BiError />,
    style: {
      fontWeight: "bold",
      backgroundColor: "white",
      color: "#DC2626",
      border: "3px solid #DC2626",
    },
  });
};

/**
 * Display a warning toast
 * @param message - The warning message to display
 */
export const notifyWarn = (message: string): void => {
  toast.warn(message, {
    icon: <BiInfoCircle />,
    style: {
      fontWeight: "bold",
      backgroundColor: "white",
      color: "#F97316",
      border: "3px solid #F97316",
    },
  });
};

/**
 * Display an info toast
 * @param message - The information message to display
 */
export const notifyInfo = (message: string): void => {
  toast.info(message, {
    icon: <BsInfoLg />,
    style: {
      fontWeight: "bold",
      backgroundColor: "white",
      color: "#363636",
      border: "3px solid #363636",
    },
  });
};

// Export ToastContainer for global use in the app
export { ToastContainer };
