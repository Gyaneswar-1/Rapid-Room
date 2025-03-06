import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const updateAdmin = async (req, res) => {
    const { GovID, phoneNo, country, state, street, city, zipcode } = req.body;
    try {
        // const result = await prisma.users.update({
        //     where:{
        //         id:req.user.id,
        //     },
        //     data:{
        //         GovID:parseInt(GovID),
        //         phoneNo:parseInt(phoneNo),
        //         isHost:true,
        //         address:{
        //             street:street,
        //             city:city,
        //             state:state,
        //             zipcode:zipcode,
        //             country:country,
        //         }
        //     }
        // })
        return res.status(200).json(new ApiResponse(true, {}, "success to send the data", "success", 200));
    }
    catch (error) {
        return res.status(500).json(new ApiError(true, {}, "failed to send ", "failed", 500));
    }
};
