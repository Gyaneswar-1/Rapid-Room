import { BrowserRouter, Route, Routes } from "react-router-dom";
import TermsAndConditionsForAdmin from "../components/adminConfirm/TermsAndConditionsForAdmin";
import IsAuth from "./IsAuth";
import AddHotels from "../pages/AddHotels";
import AdminConfirm from "../pages/HostConfirm";
import BookingPage from "../pages/BookingPage";
import ComeingSoon from "../pages/ComeingSoon";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
// import BookingPage2 from "../pages/BookingPage2";
import MessageHost from "../pages/MessageHost";
import ChatPage from "../components/messageHost/Chatpage";
import WishlistPage from "../pages/WishlistPage";
import UserBookings from "../pages/UserBookings";
import TodayPage from "../components/HostingPage/TodayPage";
import ListingsPage from "../components/HostingPage/ListingsPage";
import MessagesPage from "../components/HostingPage/MessagesPage";
import ListingDetailPage from "../components/HostingPage/ListingDetailPage";
import GuidebookPage from "../components/HostingPage/GuidebookPage";
import EarningsPage from "../components/HostingPage/EarningsPage";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/Dashboard";
import IsHost from "./IsHost";
import AdminDashboard from "../pages/AdminDashboard";
import HotelsPage from "../components/AdminComponents/HotelsPage";
import HostsPage from "../components/AdminComponents/HostsPage";
import UsersPage from "../components/AdminComponents/UsersPage";
import SettingsPage from "../components/AdminComponents/SettingsPage";

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
            <Route
              path="add-hotel"
              element={<IsHost element={<AddHotels />} />}
            />
            <Route
              path="my-bookings"
              element={<UserBookings/>}
            ></Route>
            <Route path="host-confirm" element={<AdminConfirm />} />
            <Route
              path="admin-terms"
              element={<TermsAndConditionsForAdmin />}
            />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/messages" element={<MessageHost />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/messages/:hostId" element={<ChatPage />} />

            <Route path="dashbord" element={<IsHost element={<Dashboard />} />}>
              <Route index element={<TodayPage />} />
              <Route path="today" element={<TodayPage />} />
              <Route path="listings" element={<ListingsPage />} />
              <Route path="listings/:id" element={<ListingDetailPage />} />
              <Route path="listings/:id/edit" element={<ComeingSoon />} />
              <Route path="listings/new" element={<ComeingSoon />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="guidebook" element={<GuidebookPage />} />
              <Route path="earnings" element={<EarningsPage />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/hotels" element={<HotelsPage />} />
          <Route path="/admin/hosts" element={<HostsPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterHandler;
