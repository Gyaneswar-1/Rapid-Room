import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import ErrorPage from "../pages/ErrorPage";
import BookingPage from "../pages/BookingPage";
import AddHotels from "../pages/AddHotels";
import Account from "../pages/Account";
import EditUser from "../components/Useraccount/EditUser";
import PersonalAddress from "../components/Useraccount/PersonalAddress";
import AccountLayout from "../components/Useraccount/AccountLayout";

function RouterHandler() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    if (user === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* If user is logged in, redirect them from /welcome */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Welcome />}
          />

          <Route path="/home" element={<Home />} />
          <Route path="/book-hotel" element={<BookingPage />} />
          <Route path="/add-hotel" element={<AddHotels />} />
          {/* <Route path="/" /> */}

          <Route path="/user-account" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="edit-user" element={<EditUser />} />
            <Route path="personal-address" element={<PersonalAddress />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouterHandler;
