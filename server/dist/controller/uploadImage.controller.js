import { upLoadOnCloudinary } from "../utils/cloudinaryImageHandel.js";
import { ApiError } from "../utils/ApiError.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json(new ApiError(false, {}, "BadRequest", "No image file provided", 400));
            return;
        }
        const localFilePath = req.file.path;
        const filename = path.basename(localFilePath);
        const compressedFilePath = path.join(path.dirname(localFilePath), `compressed-${filename}`);
        try {
            // Process and compress the image with sharp
            await sharp(localFilePath)
                .resize(1080) // Resize to reasonable dimensions
                .jpeg({ quality: 80 }) // Compress quality for JPEGs
                .toFile(compressedFilePath);
            // Remove the original file
            fs.unlinkSync(localFilePath);
            // Upload the compressed file to Cloudinary
            const cloudinaryUrl = await upLoadOnCloudinary(compressedFilePath);
            // Check if upload was successful
            if (!cloudinaryUrl) {
                res.status(500).json(new ApiError(false, {}, "ServerError", "Failed to upload image to cloud storage", 500));
                return;
            }
            // Return success response with the Cloudinary URL
            res.status(200).json({
                success: true,
                data: { imageUrl: cloudinaryUrl },
                status: "Success",
                message: "Image uploaded successfully",
                statusCode: 200
            });
        }
        catch (error) {
            console.error("Error compressing image:", error);
            // Still try to upload the original if compression fails
            const cloudinaryUrl = await upLoadOnCloudinary(localFilePath);
            if (!cloudinaryUrl) {
                res.status(500).json(new ApiError(false, {}, "ServerError", "Failed to upload image to cloud storage", 500));
                return;
            }
            res.status(200).json({
                success: true,
                data: { imageUrl: cloudinaryUrl },
                status: "Success",
                message: "Image uploaded successfully (without compression)",
                statusCode: 200
            });
        }
    }
    catch (error) {
        console.error("Error in image upload controller:", error);
        res.status(500).json(new ApiError(false, {}, "ServerError", "Something went wrong while uploading the image", 500));
    }
};
