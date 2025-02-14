import { ToastContainer } from "react-toastify";
import RouterHandler from "./router/RouterHandler";
function App() {
  return (
    <div>
      <ToastContainer position="bottom-center" hideProgressBar autoClose={1000} />
      <RouterHandler />
    </div>
  );
}

export default App;
