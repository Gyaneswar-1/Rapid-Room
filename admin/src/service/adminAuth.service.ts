import axios from "axios";
import API from "./api";

export interface AdminLoginData {
  email: string;
  password: string;
}

export const adminLoginService = async (data: AdminLoginData) => {
  try {
    const response = await axios.post(`${API}/admin/login`, data, {
      withCredentials: true,
    });
    if (response.data.success) {
      if (response.data.data?.token) {
        localStorage.setItem("adminToken", response.data.data.token);
      }
      localStorage.setItem("isAdmin", "true");
      return { success: true, data: response.data.data };
    }
    return {
      success: false,
      message: response.data.message || "Invalid credentials",
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during admin login";
    return { success: false, message };
  }
};

export const adminLogoutService = async () => {
  try {
    await axios.post(
      `${API}/admin/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
  }
};

export const adminCheckAuthService = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(`${API}/admin/me`, {
      withCredentials: true,
      headers,
    });

    if (response.data.success) {
      localStorage.setItem("isAdmin", "true");
      return { isAuthenticated: true, admin: response.data.data };
    }
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    return { isAuthenticated: false };
  } catch {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    return { isAuthenticated: false };
  }
};
