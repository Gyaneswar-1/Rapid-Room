import { ToastContainer } from "react-toastify";
import RouterHandler from "./router/RouterHandler";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={2000}
      />
      <RouterHandler />
    </div>
  );
}
