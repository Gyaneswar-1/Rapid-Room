import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECREATE,
});
export async function upLoadOnCloudinary(filePath) {
    if (!filePath || filePath === null) {
        return null;
    }
    try {
        const uploadRes = await cloudinary.uploader.upload(filePath); //uplod the file
        if (!uploadRes) {
            console.log("file uplod failed on cloudinary");
            return null;
        }
        return uploadRes.url;
    }
    catch (error) {
        console.log("cannot upload on cloudinay", error);
        return null;
    }
    finally {
        fs.unlinkSync(filePath);
    }
}
