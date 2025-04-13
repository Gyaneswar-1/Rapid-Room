import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TermsAndConditionsForAdmin from "../components/adminConfirm/TermsAndConditionsForAdmin";
import IsAuth from "./IsAuth";
import AddHotels from "../pages/AddHotels";
import AdminConfirm from "../pages/HostConfirm";
import ComeingSoon from "../pages/ComeingSoon";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import WishlistPage from "../pages/WishlistPage";
import UserBookings from "../pages/UserBookings";
import UserProfile from "../pages/UserProfile";
import IsHost from "./IsHost";
import AdminDashboard from "../pages/AdminDashboard";
import HotelsPage from "../components/AdminComponents/HotelsPage";
import HostsPage from "../components/AdminComponents/HostsPage";
import UsersPage from "../components/AdminComponents/UsersPage";
import BookingPage from "../pages/BookingPage";
import PaymentsPage from "../components/AdminComponents/components/paymentPage";
import HostPendingPage from "../pages/HostPendingPage";
import HostRejectedPage from "../pages/HostRejectedPage";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminLoginPage from "../components/AdminComponents/AdminLoginPage";
import EditProfilePage from "../components/userProfile/EditProfilePage";
import HostLayout from "../pages/HostDashboard";
import HostDashboard from "../components/HostingComponents/Pages/HostDashboard";
import { HostedHotels } from "../components/HostingComponents/components/analytics/HostedHotels";
import ReservationsPage from "../components/ReservationsPage";
import EarningsPage from "../components/HostingComponents/Pages/EarningsPage";
import DeleteAccount from "../pages/DeleteAccount";
import WhyChooseUs from "../pages/WhyChooseUs";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import TermsAndConditions from "../pages/TermsAndConditions";
import TodayCheckinsPage from "../pages/TodayCheckinsPage";

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
          <Route path="/" element={<AdminRedirect />} loader/>

          <Route path="/home" element={<Home />} />
          <Route path="/comeingsoon" element={<ComeingSoon />} />
          <Route path="/why-choose-us"  element={<WhyChooseUs />} />
          <Route path="/about-us"  element={<AboutUs />} />
          <Route path="/contact-us"  element={<ContactUs />} />
          <Route path="/terms-and-conditions"  element={<TermsAndConditions />} />
          <Route element={<IsAuth />}>
            <Route path="book-hotel" element={<BookingPage />} />
            <Route
              path="/host-pending"
              element={<HostPendingPage/>}
            />
            <Route
              path="/host-rejected"
              element={<HostRejectedPage />}
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
                <Route path="delete-account" element={<DeleteAccount />} />
              </Route>
            </Route>
            <Route
              path="dashboard"
              element={<IsHost element={<HostLayout />} />}
            >
              <Route index element={<HostDashboard />} />
              <Route path="hotels" element={<HostedHotels />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="occupancy" element={<EarningsPage />} />
              <Route path="today-checkin" element={<TodayCheckinsPage />} />
            </Route>
          </Route>
          <Route path="add-hotel" element={<AddHotels />} />

          <Route path="/admin-login" element={<AdminLoginPage />} />
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
