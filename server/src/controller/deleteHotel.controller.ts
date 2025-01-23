import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
import { deleteOnCloudinary } from "../utils/cloudinaryImageHandel.js";

export const deleteHotel = async (req: Request | any, res: Response | any) => {
    const { id, hid } = req.body;

    try {
        const result = await prisma.hotels.delete({
            where: {
                id: hid,
                ownerId: id,
            },
            select: {
                images: true,
            },
        });

        const imageDeletionResults = await Promise.all(
            result.images.map((img: any) => deleteOnCloudinary(img.imageUrl)),
        );

        return res
            .status(202)
            .json(
                new ApiResponse(
                    true,
                    { result, imagedelete: imageDeletionResults },
                    "successfully deleted !",
                    "userid and hotelid error occured !",
                    202,
                ),
            );
    } catch (error) {
        return res
            .status(406)
            .json(
                new ApiError(
                    false,
                    { error },
                    "cannot delete hotel",
                    "error deleting the hotel",
                    406,
                ),
            );
    } finally {
        prisma.$disconnect();
    }
};
