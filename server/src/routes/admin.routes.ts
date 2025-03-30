import { Router } from "express";
import { admin_getAllHotels } from "../controller/admin_getAllHotels.js";
import { admin_getAllUsers } from "../controller/admin_getAllUsers.js";
import { admin_approveHotel } from "../controller/admin_approveHotel.js";
import { admin_rejectHotel } from "../controller/admin_rejectHotels.js";
import { admin_getAllHosts } from "../controller/admin_getAllHosts.js";
import { admin_approveHost } from "../controller/admin_approveHost.js";
import { admin_rejectHost } from "../controller/admin_rejectHost.js";
import { admin_getAnalysis } from "../controller/admin_getAnalysis.js";

const AdminRouter = Router();



// Hotel management routes
AdminRouter.route("/hotels").get(admin_getAllHotels);
AdminRouter.route("/hotels/:hotelId/approve").put(admin_approveHotel);
AdminRouter.route("/hotels/:hotelId/reject").put(admin_rejectHotel);

AdminRouter.route("/users").get(admin_getAllUsers);


AdminRouter.route("/host").get(admin_getAllHosts);
AdminRouter.route("/host/:userId/approve").put(admin_approveHost);
AdminRouter.route("/host/:userId/reject").put(admin_rejectHost);

// Dashboard statistics routes
AdminRouter.route("/stats/dashboard").get(admin_getAnalysis);

// Booking management routes
AdminRouter.route("/bookings").get(/* adminGetAllBookings controller */);

// Payment management routes
AdminRouter.route("/payments").get(/* adminGetAllPayments controller */);

export default AdminRouter;