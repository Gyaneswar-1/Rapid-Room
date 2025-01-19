import { Router } from "express";
import { addWishlist } from "../controller/addWishlist.controller.js";
import { removeWishlist } from "../controller/removeWishlist.controller.js";
const wishlist = Router();


wishlist.route("/add").post(addWishlist);
wishlist.route("/remove").delete(removeWishlist);

export default wishlist;