import { deleteOnCloudinary } from "../utils/cloudinaryImageHandel.js";
import { ApiError } from "../utils/ApiError.js";
export const deleteImage = async (req, res) => {
    try {
        // Get the image URL from the request body
        const { imageUrl } = req.body;
        if (!imageUrl) {
            res.status(400).json(new ApiError(false, {}, "BadRequest", "Image URL is required", 400));
            return;
        }
        // Check if the URL is a valid Cloudinary URL
        if (!imageUrl.includes('cloudinary.com')) {
            res.status(400).json(new ApiError(false, {}, "BadRequest", "Invalid Cloudinary image URL", 400));
            return;
        }
        // Delete the image from Cloudinary
        const result = await deleteOnCloudinary(imageUrl);
        if (!result) {
            res.status(500).json(new ApiError(false, {}, "ServerError", "Failed to delete image from Cloudinary", 500));
            return;
        }
        // Return success response
        res.status(200).json({
            success: true,
            data: {},
            status: "Success",
            message: "Image deleted successfully",
            statusCode: 200
        });
    }
    catch (error) {
        console.error("Error in image deletion controller:", error);
        res.status(500).json(new ApiError(false, {}, "ServerError", "Something went wrong while deleting the image", 500));
    }
};
