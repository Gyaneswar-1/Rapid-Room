import { BrowserRouter, Route, Routes } from "react-router-dom";
import TermsAndConditionsForAdmin from "../components/adminConfirm/TermsAndConditionsForAdmin";
import AccountLayout from "../components/Useraccount/AccountLayout";
import EditUser from "../components/Useraccount/EditUser";
import PersonalAddress from "../components/Useraccount/PersonalAddress";
import IsAuth from "../components/UserAuth/IsAuth";
import Account from "../pages/Account";
import AddHotels from "../pages/AddHotels";
import AdminConfirm from "../pages/AdminConfirm";
import BookingPage from "../pages/BookingPage";
import ComeingSoon from "../pages/ComeingSoon";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import Welcome from "../pages/Welcome";

function RouterHandler() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/comeingsoon" element={<ComeingSoon />} />
          {/* need authentication to access */}
          <Route element={<IsAuth />}>
            <Route path="book-hotel" element={<BookingPage />} />
            <Route path="add-hotel" element={<AddHotels />} />
            <Route path="admin-confirm" element={<AdminConfirm />} />
            <Route
              path="admin-terms"
              element={<TermsAndConditionsForAdmin />}
            />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="user-account" element={<AccountLayout />}>
              <Route index element={<Account />} />
              <Route path="edit-user" element={<EditUser />} />
              <Route path="personal-address" element={<PersonalAddress />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterHandler;
