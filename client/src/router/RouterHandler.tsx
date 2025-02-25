import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import ErrorPage from "../pages/ErrorPage";
import BookingPage from "../pages/BookingPage";
import AddHotels from "../pages/AddHotels";
import Account from "../pages/Account";
import EditUser from "../components/Useraccount/EditUser";
import PersonalAddress from "../components/Useraccount/PersonalAddress";
import AccountLayout from "../components/Useraccount/AccountLayout";
import IsAuth from "../components/UserAuth/IsAuth";
import ComeingSoon from "../pages/ComeingSoon";
import OfflinePage from "../pages/OfflinePage";
import TermsAndConditionsForAdmin from "../components/adminConfirm/TermsAndConditionsForAdmin";
import AdminConfirm from "../pages/AdminConfirm";

function RouterHandler() {
  return (
    <>
      <Online>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/comeingsoon" element={<ComeingSoon />} />
            <Route path="/offline" element={<OfflinePage />} />

            <Route element={<IsAuth />}>
              <Route path="book-hotel" element={<BookingPage />} />
              <Route path="add-hotel" element={<AddHotels />} />
              <Route path="/admin-confirm" element={<AdminConfirm />} />
              <Route path="/admin-terms" element={<TermsAndConditionsForAdmin />} />
              <Route path="/user-account" element={<AccountLayout />}>
                <Route index element={<Account />} />
                <Route path="edit-user" element={<EditUser />} />
                <Route path="personal-address" element={<PersonalAddress />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Online>
      <Offline>
        <OfflinePage />
      </Offline>
    </>
  );
}

export default RouterHandler;
