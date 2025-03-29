import { ApiResponse } from "../utils/ApiResponse.js";
export async function userLogout(req, res) {
    //clear the cookie
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/"
    });
    return res.status(200).json(new ApiResponse(true, {}, "Success", "cookie rmove successfully", 200));
}
