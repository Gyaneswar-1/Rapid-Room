import axios from "axios";
import API from "../api";

export const getTodayCheckins = async () => {
    try {
        const response = await axios.get(
            `${API}/host/today-checkin`,
            {
                withCredentials: true,
            },
        );
        console.log(response);
        if (response.data.success === true) {
            return { success: true, data: response.data.data };
        } else {
            return { success: false, data: [] };
        }
    } catch (error) {
        console.log(error);
        return { success: false, data: [] };
    }
};
