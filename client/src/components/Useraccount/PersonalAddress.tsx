// import { CiLocationOn } from "react-icons/ci";
import Breadcrumb from "../../components/Useraccount/edituser/Breadcrumb";
import AddressFormEdit from "./edituseraddress/UserAddressEdit";
// import UserFormEdit from "../../components/Useraccount/EditUser/UserFormEdit";

const addressInfo = [
  { title: "Street", content: "123 Main Street", button: "edit" },
  { title: "City", content: "San Francisco", button: "edit" },
  { title: "State", content: "California", button: "edit" },
  { title: "Zip Code", content: "94105", button: "edit" },
  { title: "Country", content: "United States", button: "edit" },
  { title: "Longitude", content: "-122.4194", button: "edit" },
  { title: "Latitude", content: "37.7749", button: "edit" },
];

function PersonalAddress() {
  return (
    <div className="h-screen w-screen flex  justify-center">
      <div className=" w-[1200px]  p-15 flex flex-col gap-2">
        <div>
          <Breadcrumb />
        </div>
        <h1 className="text-4xl font-semibold">Edit Personal Address</h1>
        <div></div>
        <div className="cards mt-18 flex flex-wrap justify-start gap-16 h-full md:w-4/5 w-full">
          {addressInfo.map((item, index) => {
            return <AddressFormEdit key={index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PersonalAddress;
