import API from "../api";
import axios from "axios";
export async function handelReservation(hotelId:any,duration:any) {
    try {
       

        const res = await axios.post(`${API}/user/bookHotel`, {
          hotelId: hotelId,
          reservationsDuration: duration,
        },{
          withCredentials: true,
        });
        

        if(res.data.success === true){
            return {success: true}
        }
        return{success: false}
    } catch (error) {
        console.log(error);
        return {success: false}
    }
}
