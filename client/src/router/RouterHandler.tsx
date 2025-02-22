import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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


function RouterHandler() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"  />

          <Route index element={<Welcome />} />
          <Route  path="/home" element={<Home></Home>} />
          <Route  path="/comeingsoon" element={<ComeingSoon></ComeingSoon>} />

          <Route element={<IsAuth />}>
            <Route path="book-hotel" element={<BookingPage />} />
            <Route path="add-hotel" element={<AddHotels />} />

            <Route path="/user-account" element={<AccountLayout />}>
              <Route index element={<Account />} />
              <Route path="edit-user" element={<EditUser />} />
              <Route path="personal-address" element={<PersonalAddress />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouterHandler;
