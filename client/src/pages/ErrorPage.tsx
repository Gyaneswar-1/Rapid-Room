import { useNavigate } from "react-router-dom";
import SetUserDataToStore from "../service/userdata/SetDataToStore";
function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <p className="mt-4 text-gray-500">We can't find that page.</p>
        <a
          className="mt-6 inline-block rounded cursor-pointer bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/80 focus:outline-none focus:ring"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back Home
        </a>
      </div>
       <SetUserDataToStore/>
    </div>
  );
}

export default ErrorPage;
