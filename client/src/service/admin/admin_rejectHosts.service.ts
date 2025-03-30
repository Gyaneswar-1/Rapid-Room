import axios from "axios";
import API from "../api";

export const admin_rejectHost = async (id: string | number) => {
    try {
        const response = await axios.put(`${API}/admin/host/${id}/reject`);
        if (response.data.success === true) {
            return { success: true, data: response.data.data };
        } else {
            return { success: false, data: null };
        }
    } catch (error) {
        console.error(error);
        return { success: false, data: null };
    }
}