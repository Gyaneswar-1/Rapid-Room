import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TermsAndConditionsForAdmin from "../components/adminConfirm/TermsAndConditionsForAdmin";
import IsAuth from "./IsAuth";
import AddHotels from "../pages/AddHotels";
import AdminConfirm from "../pages/HostConfirm";
import ComeingSoon from "../pages/ComeingSoon";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
// import BookingPage2 from "../pages/BookingPage2";
import WishlistPage from "../pages/WishlistPage";
import UserBookings from "../pages/UserBookings";
// import TodayPage from "../components/HostingPage/TodayPage";
// import ListingsPage from "../components/HostingPage/ListingsPage";
// import MessagesPage from "../components/HostingPage/MessagesPage";
// import ListingDetailPage from "../components/HostingPage/ListingDetailPage";
// import GuidebookPage from "../components/HostingPage/GuidebookPage";
// import EarningsPage from "../components/HostingPage/EarningsPage";
import UserProfile from "../pages/UserProfile";
import IsHost from "./IsHost";
import AdminDashboard from "../pages/AdminDashboard";
import HotelsPage from "../components/AdminComponents/HotelsPage";
import HostsPage from "../components/AdminComponents/HostsPage";
import UsersPage from "../components/AdminComponents/UsersPage";
import SettingsPage from "../components/AdminComponents/SettingsPage";

import BookingPage from "../pages/BookingPage";
import PaymentsPage from "../components/AdminComponents/components/paymentPage";
import HostPendingPage from "../pages/HostPendingPage";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminLoginPage from "../components/AdminComponents/AdminLoginPage";
import EditProfilePage from "../components/userProfile/EditProfilePage";
import HostLayout from "../pages/Dashboard";

function RouterHandler() {
  // Remove the automatic redirect that affects all routes
  // localStorage.setItem("isAdmin", "true");  <- Remove this line
  
  // Admin check only affects the root route
  const AdminRedirect = () => {
    if (localStorage.getItem("isAdmin") === "true") {
      return <Navigate to="/admin" />;
    }
    return <Welcome />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminRedirect />} />

          <Route path="/home" element={<Home />} />
          <Route path="/comeingsoon" element={<ComeingSoon />} />
          {/* need authentication to access */}
          <Route element={<IsAuth />}>
            <Route path="book-hotel" element={<BookingPage />} />

            <Route
              path="host-pending"
              element={<IsHost element={<HostPendingPage />} />}
            />
            <Route
              path="add-hotel"
              element={<IsHost element={<AddHotels />} />}
            />
            <Route path="host-confirm" element={<AdminConfirm />} />
            <Route
              path="admin-terms"
              element={<TermsAndConditionsForAdmin />}
            />
            <Route path="profile" >
               <Route index element={<UserProfile/>} />
               <Route path="edit" element={<EditProfilePage/>} />
               <Route path="wishlist" element={<WishlistPage />} />
               <Route path="bookings" element={<UserBookings />}/>
            </Route>
            {/* <Route path="/messages" element={<MessageHost />} />
            <Route path="/messages/:hostId" element={<ChatPage />} /> */}

            {/* <Route path="dashbord" element={<IsHost element={<HostLayout />} />}> */}
            <Route path="dashbord" element={<HostLayout />} >
              {/* <Route index element={<TodayPage />} />
              <Route path="today" element={<TodayPage />} />
              <Route path="listings" element={<ListingsPage />} />
              <Route path="listings/:id" element={<ListingDetailPage />} />
              <Route path="listings/:id/edit" element={<ComeingSoon />} />
              <Route path="listings/new" element={<ComeingSoon />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="guidebook" element={<GuidebookPage />} />
              <Route path="earnings" element={<EarningsPage />} /> */}
            </Route>
          </Route>

          <Route path="/admin-login" element={<AdminLoginPage />} />
          {/* Admin routes */}
          <Route
            path="/admin"
            element={<ProtectedAdminRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/admin/hotels"
            element={<ProtectedAdminRoute element={<HotelsPage />} />}
          />
          <Route
            path="/admin/hosts"
            element={<ProtectedAdminRoute element={<HostsPage />} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedAdminRoute element={<UsersPage />} />}
          />
          <Route
            path="/admin/settings"
            element={<ProtectedAdminRoute element={<SettingsPage />} />}
          />
          <Route
            path="/admin/payments"
            element={<ProtectedAdminRoute element={<PaymentsPage />} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterHandler;
