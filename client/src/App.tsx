import { ToastContainer } from "react-toastify";
import RouterHandler from "./router/RouterHandler";
import SetUserDataToStore from "./service/userdata/SetDataToStore";
function App() {
  return (
    <div>
      <SetUserDataToStore />

      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={2000}
      />
      <RouterHandler />
    </div>
  );
}

export default App;
