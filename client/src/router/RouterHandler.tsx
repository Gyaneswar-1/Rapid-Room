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
// import BookingPage2 from "../pages/BookingPage2";
import Hosting from "../pages/Hosting";
import MessageHost from "../pages/MessageHost";
import ChatPage from "../components/messageHost/Chatpage";
import WishlistPage from "../pages/WishlistPage";
import SecurityAndAuth from "../components/Useraccount/SecurityAndAuth";
import UserBookings from "../pages/UserBookings";


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
            {/* <Route path="book-hotel2" element={<BookingPage2 />} /> */}
            <Route path="add-hotel" element={<AddHotels />} />
            <Route path="my-bookings" element={<UserBookings></UserBookings>}></Route>
            <Route path="admin-confirm" element={<AdminConfirm />} />
            <Route
              path="admin-terms"
              element={<TermsAndConditionsForAdmin />}
            />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="/messages" element={<MessageHost />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/messages/:hostId" element={<ChatPage />} />
            <Route path="user-account" element={<AccountLayout />}>
              <Route index element={<Account />} />
              <Route path="edit-user" element={<EditUser />} />
              <Route path="personal-address" element={<PersonalAddress />} />
              <Route path="security" element={<SecurityAndAuth/>} />
            </Route>
            <Route path="hosting">
              <Route index element={<Hosting />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterHandler;
