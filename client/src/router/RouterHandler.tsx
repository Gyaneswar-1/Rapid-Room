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
import HostLayout from "../pages/HostDashboard";
import HostDashboard from "../components/HostingComponents/Pages/HostDashboard";
import { HostedHotels } from "../components/HostingComponents/components/analytics/HostedHotels";
import ReservationsPage from "../components/HostingComponents/Pages/ReservationsPage";
import EarningsPage from "../components/HostingComponents/Pages/EarningsPage";
import GuestsPage from "../components/HostingComponents/Pages/GuestsPage";
import AnalyticsPage from "../components/HostingComponents/Pages/AnalyticsPage";
import DeleteAccount from "../pages/DeleteAccount";

function RouterHandler() {
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
          <Route element={<IsAuth />}>
            <Route path="book-hotel" element={<BookingPage />} />

            <Route
              path="host-pending"
              element={<IsHost element={<HostPendingPage />} />}
            />
           
            <Route path="host-confirm" element={<AdminConfirm />} />
            <Route
              path="admin-terms"
              element={<TermsAndConditionsForAdmin />}
            />
            <Route path="profile">
              <Route index element={<UserProfile />} />
              <Route path="edit" element={<EditProfilePage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="bookings" element={<UserBookings />} />
              <Route path="security">
                <Route path="password" />
                <Route path="delete-account" element={<DeleteAccount/>} />
              </Route>
            </Route>
            {/* <Route path="/messages" element={<MessageHost />} />
            <Route path="/messages/:hostId" element={<ChatPage />} /> */}

            {/* <Route path="dashbord" element={<IsHost element={<HostLayout />} />}> */}
            <Route
              path="dashboard"
              element={<IsHost element={<HostLayout />} />}
            >
              <Route index element={<HostDashboard />} />
              <Route path="hotels" element={<HostedHotels />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="earnings" element={<EarningsPage />} />
              <Route path="guests" element={<GuestsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
            </Route>
          </Route>
              <Route path="add-hotel" element={<AddHotels />}/>

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
