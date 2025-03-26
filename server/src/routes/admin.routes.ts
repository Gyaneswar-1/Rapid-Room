import { Router } from "express";
import { admin_getAllHotels } from "../controller/admin_getAllHotels.js";
import { admin_getAllUsers } from "../controller/admin_getAllUsers.js";
import { admin_approveHotel } from "../controller/admin_approveHotel.js";
import { admin_rejectHotel } from "../controller/admin_rejectHotels.js";
import { admin_approveUser } from "../controller/admin_approveUser.js";
import admin_rejectUser from "../controller/admin_rejectUser.js";

const AdminRouter = Router();



// Hotel management routes
AdminRouter.route("/hotels").get(admin_getAllHotels);
AdminRouter.route("/hotels/:hotelId/approve").put(admin_approveHotel);
AdminRouter.route("/hotels/:hotelId/reject").put(admin_rejectHotel);


AdminRouter.route("/users").get(admin_getAllUsers);
AdminRouter.route("/users/:userId/approve").put(admin_approveUser);
AdminRouter.route("/users/:userId/reject").put(admin_rejectUser);

// Dashboard statistics routes
AdminRouter.route("/stats/dashboard").get(/* adminDashboardStats controller */);

// Booking management routes
AdminRouter.route("/bookings").get(/* adminGetAllBookings controller */);

// Payment management routes
AdminRouter.route("/payments").get(/* adminGetAllPayments controller */);

export default AdminRouter;