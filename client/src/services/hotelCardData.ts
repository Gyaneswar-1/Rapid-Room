import axios from "axios";
import { API } from "./API";

export const hotelCardData = async () =>{
    try {
        const result = await axios.get(`${API}/hotel/get/?page=1&limit=10`)
        // console.log(result.data.data.hotels);
        return result.data.data.hotels;
    } catch (error) {
        console.error(error);
    }
}