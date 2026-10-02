import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminLoginPage from "../components/AdminLoginPage";
import DashboardPage from "../components/DashboardPage";
import HotelsPage from "../components/HotelsPage";
import HostsPage from "../components/HostsPage";
import UsersPage from "../components/UsersPage";
import PaymentsPage from "../components/components/paymentPage";

export default function RouterHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/admin-login" element={<Navigate to="/login" replace />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={<ProtectedAdminRoute element={<DashboardPage />} />}
        />
        <Route
          path="/admin"
          element={<ProtectedAdminRoute element={<DashboardPage />} />}
        />

        {/* Hotels */}
        <Route
          path="/hotels"
          element={<ProtectedAdminRoute element={<HotelsPage />} />}
        />
        <Route
          path="/admin/hotels"
          element={<ProtectedAdminRoute element={<HotelsPage />} />}
        />

        {/* Hosts */}
        <Route
          path="/hosts"
          element={<ProtectedAdminRoute element={<HostsPage />} />}
        />
        <Route
          path="/admin/hosts"
          element={<ProtectedAdminRoute element={<HostsPage />} />}
        />

        {/* Users */}
        <Route
          path="/users"
          element={<ProtectedAdminRoute element={<UsersPage />} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedAdminRoute element={<UsersPage />} />}
        />

        {/* Payments */}
        <Route
          path="/payments"
          element={<ProtectedAdminRoute element={<PaymentsPage />} />}
        />
        <Route
          path="/admin/payments"
          element={<ProtectedAdminRoute element={<PaymentsPage />} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
