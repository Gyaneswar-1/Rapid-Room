import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
export const editUser = async (req, res) => {
    try {
        if (!req.user.id) {
            return res.status(401).json(new ApiError(false, {}, "Unauthorized", "Unauthorized access. Please login again.", 401));
        }
        const { fullName, email, phoneNumber, street, city, state, country, zipcode, govId, profileImage, } = req.body;
        // Update user using Prisma transaction
        const transaction = await prisma.$transaction(async (prisma) => {
            const existingUser = await prisma.users.findUnique({
                where: { id: req.user.id },
                include: {
                    address: true
                }
            });
            if (!existingUser) {
                throw new Error("User not found");
            }
            // Update user profile
            const updatedUser = await prisma.users.update({
                where: {
                    id: req.user.id
                },
                data: {
                    fullName: fullName || existingUser.fullName,
                    email: email || existingUser.email,
                    phoneNumber: phoneNumber || existingUser.phoneNumber,
                    GovID: govId || existingUser.GovID,
                    profileImage: profileImage || existingUser.profileImage
                }
            });
            // Update or create address if address-related fields are provided
            let updatedAddress = existingUser.address;
            if (street || city || state || country || zipcode) {
                if (existingUser.address) {
                    // Update existing address
                    updatedAddress = await prisma.address.update({
                        where: { id: existingUser.address.id },
                        data: {
                            street: street || existingUser.address.street,
                            city: city || existingUser.address.city,
                            state: state || existingUser.address.state,
                            country: country || existingUser.address.country,
                            zipCode: zipcode || existingUser.address.zipCode
                        }
                    });
                }
                else {
                    // Create new address
                    updatedAddress = await prisma.address.create({
                        data: {
                            id: existingUser.id,
                            street: street || "",
                            city: city || "",
                            state: state || "",
                            country: country || "",
                            zipCode: zipcode || ""
                        }
                    });
                }
            }
            return { user: updatedUser, address: updatedAddress };
        }).catch(error => {
            console.error("Transaction error:", error);
            return null;
        });
        if (!transaction) {
            return res.status(400).json(new ApiError(false, {}, "Update Failed", "Failed to update user profile", 400));
        }
        const responseData = {
            user: {
                id: transaction.user.id,
                fullName: transaction.user.fullName,
                email: transaction.user.email,
                phoneNumber: transaction.user.phoneNumber,
                profileImage: transaction.user.profileImage,
                govId: transaction.user.GovID
            },
            address: transaction.address
        };
        return res.status(200).json(new ApiResponse(true, responseData, "Success", "User profile updated successfully", 200));
    }
    catch (error) {
        console.error("Error updating user data:", error);
        return res.status(500).json(new ApiError(false, {}, "Server Error", "Server error while updating user profile", 500));
    }
    finally {
        prisma.$disconnect();
    }
};
