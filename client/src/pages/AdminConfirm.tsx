import Section1 from "../components/adminConfirm/Section1";
import Profit from "../components/adminConfirm/Profit";
import Navbar from "../components/Navbar/Navbar";
import Section2 from "../components/adminConfirm/Section2";
import Header from "../components/adminConfirm/Header";
import ConfirmButton from "../components/adminConfirm/ConfirmButton";
import TermsAndConditionsForAdmin from "../components/adminConfirm/TermsAndConditionsForAdmin";
import { useNavigate } from "react-router-dom";

function AdminConfirm() {
    const navigate = useNavigate()
  return (
    <div>
      <Navbar show={false} />
      <div className="pt-28 md:p-12 p-2">
        <Header />
        <Section1 />
        <Section2 />
        {/*profit section*/}
        <Profit/>
        <section className="px-12 py-12 pb-12 bg-gray-200 mb-12 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
          <p className="text-gray-700">
            To become a host, you must be at least 18 years old and have the legal right to
            list and manage a property. You are responsible for ensuring your hotel complies
            with local laws and regulations.
          </p>

          <h2 className="text-xl font-semibold mb-2">2. Property Listing</h2>
          <p className="text-gray-700">
            Hosts must provide accurate details about their properties, including pricing,
            availability, and amenities. Misleading or false information may result in listing
            removal. Additionally, hosts should keep their listings up to date to avoid any
            confusion for potential guests <br /> ......
          </p>
          <span onClick={()=>{
            navigate("/admin-terms")
          }} className="text-blue-600 text-lg underline cursor-pointer" >show more</span>
        </section>    
            <ConfirmButton />
      </div>
    </div>
  );
}

export default AdminConfirm;
