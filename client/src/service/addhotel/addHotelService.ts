import axios from "axios";
import API from "../api";

interface HotelData {
  hotelName: string;
  state: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
  description: string;
  numberOfRooms: number;
  numberOfGuests: number; // This matches backend's expected parameter
  numberOfBeds: number;
  numberOfBathrooms: number;
  roomType: string;
  perNight: number;
  guestAllowed: number;
  hasWifi: boolean;
  hasTv: boolean;
  hasKitchen: boolean;
  hasBalcony: boolean;
  hasWorkSpace: boolean;
  hasWashingMachine: boolean;
  hasGarden: boolean;
  hasParking: boolean;
  hasAirConditioning: boolean;
  hasDiningArea: boolean;
  hasPool: boolean;
  hasHotTub: boolean;
  hasFirepit: boolean;
  hasBBQGrill: boolean;
  hasPoolTable: boolean;
  hasExerciseEquipment: boolean;
  hasOutdoorShower: boolean;
  hasSmokeAlarm: boolean;
  hasFirstAidKit: boolean;
  hasFireExtinguisher: boolean;
  hasAccessibility: boolean;
  images: string[];
  type: string;
  longitude: string;
  latitude: string;
}

export const addHotelService = async (
  data: HotelData
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axios.post(`${API}/hotel/add`, data, {
      withCredentials: true,
    });

    if (response.status === 200 || response.status === 201) {
      return { success: true, message: "Hotel added successfully!" };
    } else {
      return { success: false, message: "Failed to add hotel" };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add hotel",
    };
  }
};
