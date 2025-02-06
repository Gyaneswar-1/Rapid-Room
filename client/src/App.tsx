import { ToastContainer } from "react-toastify";
import RouterHandler from "./router/RouterHandler";
function App() {
  return (
    <div>
      <ToastContainer position="bottom-center" hideProgressBar />
      <RouterHandler />
    </div>
  );
}

export default App;
