import { Router } from "express";
import { addWishlist } from "../controller/addWishlist.controller.js";
import { removeWishlist } from "../controller/removeWishlist.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getWishlist } from "../controller/getWishlists.controller.js";

const wishlist = Router();

wishlist.route("/add").post(authMiddleware, addWishlist);
wishlist.route("/remove").delete(authMiddleware, removeWishlist);
wishlist.route("/get").get(authMiddleware, getWishlist);

export default wishlist;
