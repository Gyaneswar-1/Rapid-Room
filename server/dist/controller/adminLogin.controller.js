import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
// Hardcoded admin credentials
const HARDCODED_ADMINS = [
    {
        email: process.env.ADMIN_EMAIL || "rapidroomadmin@gmail.com",
        password: process.env.ADMIN_PASSWORD || "rapidadmin",
    },
    {
        email: "admin@rapidroom.com",
        password: "admin123",
    },
];
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json(new ApiError(false, {}, "Validation Error", "Email and password are required", 400));
    }
    const matchedAdmin = HARDCODED_ADMINS.find((admin) => admin.email.toLowerCase() === email.trim().toLowerCase() &&
        admin.password === password);
    if (!matchedAdmin) {
        console.warn(`[Admin Login Failed] Invalid attempt for email: ${email}`);
        return res
            .status(401)
            .json(new ApiError(false, {}, "Unauthorized", "Invalid admin email or password", 401));
    }
    console.log(`[Admin Login Success] Admin logged in: ${matchedAdmin.email}`);
    const token = jwt.sign({
        email: matchedAdmin.email,
        role: "admin",
        isAdmin: true,
    }, process.env.JWT_SECRET || "okok", { expiresIn: "7d" });
    res.cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("adminToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(new ApiResponse(true, {
        token,
        email: matchedAdmin.email,
        role: "admin",
    }, "success", "Admin login successful", 200));
};
export const adminMe = async (req, res) => {
    let token = req.cookies?.adminToken ||
        req.cookies?.token ||
        req.headers.authorization?.replace("Bearer ", "");
    if (token && token.startsWith("Bearer ")) {
        token = token.replace("Bearer ", "");
    }
    if (!token) {
        return res
            .status(401)
            .json(new ApiError(false, {}, "Unauthorized", "No admin session found", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "okok");
        if (decoded.role === "admin" || decoded.isAdmin) {
            return res.status(200).json(new ApiResponse(true, {
                email: decoded.email,
                role: "admin",
            }, "success", "Admin session valid", 200));
        }
        return res
            .status(403)
            .json(new ApiError(false, {}, "Forbidden", "Not authorized as admin", 403));
    }
    catch {
        return res
            .status(401)
            .json(new ApiError(false, {}, "Unauthorized", "Invalid or expired admin session", 401));
    }
};
export const adminLogout = async (_req, res) => {
    res.clearCookie("adminToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res
        .status(200)
        .json(new ApiResponse(true, {}, "success", "Admin logged out successfully", 200));
};
