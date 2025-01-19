import { getToken } from "./services/apiManage.service.ts";
import RouterHandler from "./utils/RouterHandler.tsx";
const App = () => {
  console.log(getToken());

  return (
    <>
      <RouterHandler />
    </>
  );
};

export default App;
