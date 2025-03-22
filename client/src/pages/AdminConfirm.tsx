import Section1 from "../components/adminConfirm/Section1";
import Profit from "../components/adminConfirm/Profit";
import Navbar from "../components/Navbar/Navbar";
import Section2 from "../components/adminConfirm/Section2";
import Header from "../components/adminConfirm/Header";
import ConfirmButton from "../components/adminConfirm/ConfirmButton";
import CompareTable from "../components/adminConfirm/CompareTable";
import TermsSection from "../components/adminConfirm/TermsSection";

function AdminConfirm() {
  return (
    <div>
      <Navbar show={false} />
      <div className="container mx-auto pt-24 px-4 md:px-6 lg:px-8 pb-16">
        <Header />
        <Section1 />
        <Section2 />
        <Profit />
        <CompareTable/>
        <TermsSection/>
        <ConfirmButton />
      </div>
    </div>
  );
}

export default AdminConfirm;
