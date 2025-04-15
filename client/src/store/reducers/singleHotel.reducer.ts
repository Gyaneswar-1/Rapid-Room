import { createSlice } from "@reduxjs/toolkit";

interface HotelState {
  hasData: boolean;
  hotelId: number;
  hotelName: string;
  description: string;
  roomType: string;
  perNight: number;
  isWishlisted: boolean;
  amenities: {
    hasParking: boolean;
    hasPool: boolean;
    hasWifi: boolean;
    hasTv: boolean;
    hasBalcony: boolean;
    hasKitchen: boolean;
    hasWorkSpace: boolean;
    hasWashingMachine: boolean;
    hasGarden: boolean;
    hasAirConditioning: boolean;
    hasDiningArea: boolean;
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
  };
  type: string;
  isAllReserved: boolean;
  numberOfEmptyRooms: number;
  overalRating: number;
  totalReviews: number;
  guestAllowed: number;
  host: {
    id: number;
    fullName: string;
    email: string;
    hostExperience: number | null;
    hostResponseRate: number;
    hostRating: number;
    profileImage: string;
  };
  reviews: Array<{
    id: number;
    userId: number;
    reviewComment: string;
    overallRating: number;
    cleanlinessRating: number;
    accuracyRating: number;
    checkInRating: number;
    communicationRating: number;
    locationRating: number;
    priceRating: number;
    parkingRating: number;
    user: {
      email:string;
      fullName: string;
      profileImage: string;
    };
  }>;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    longitude: string;
    latitude: string;
  };
  images: Array<{ imageUrl: string }>;
}

const initialState: HotelState = {
  hasData: false,
  hotelId: 0,
  hotelName: "",
  description: "",
  roomType: "",
  perNight: 0,
  isWishlisted: false,
  amenities: {
    hasParking: false,
    hasPool: false,
    hasWifi: false,
    hasTv: false,
    hasBalcony: false,
    hasKitchen: false,
    hasWorkSpace: false,
    hasWashingMachine: false,
    hasGarden: false,
    hasAirConditioning: false,
    hasDiningArea: false,
    hasHotTub: false,
    hasFirepit: false,
    hasBBQGrill: false,
    hasPoolTable: false,
    hasExerciseEquipment: false,
    hasOutdoorShower: false,
    hasSmokeAlarm: false,
    hasFirstAidKit: false,
    hasFireExtinguisher: false,
    hasAccessibility: false,
  },
  type: "",
  isAllReserved: false,
  numberOfEmptyRooms: 0,
  overalRating: 0,
  totalReviews: 0,
  guestAllowed: 0,
  host: {
    id: 0,
    fullName: "",
    email: "",
    hostExperience: null,
    hostResponseRate: 0,
    hostRating: 0,
    profileImage: "",
  },
  reviews: [],
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    longitude: "",
    latitude: "",
  },
  images: [], // Ensure images is always an array
};

export const singleHotelSlice = createSlice({
  name: "singleHotelSlice",
  initialState,
  reducers: {
    setAllHotelData: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        hasData: true,
        hotelId: data.id,
        hotelName: data.hotelName,
        description: data.description,
        roomType: data.roomType,
        perNight: data.perNight,
        isWishlisted: data.isWishlisted,
        amenities: {
          hasParking: data.hasParking,
          hasPool: data.hasPool,
          hasWifi: data.haswifi,
          hasTv: data.hasTv,
          hasBalcony: data.hasBalcony,
          hasKitchen: data.hasKitchen,
          hasWorkSpace: data.hasWorkSpace,
          hasWashingMachine: data.hasWashingMachine,
          hasGarden: data.hasGarden,
          hasAirConditioning: data.hasAirConditioning,
          hasDiningArea: data.hasDiningArea,
          hasHotTub: data.hasHotTub,
          hasFirepit: data.hasFirepit,
          hasBBQGrill: data.hasBBQGrill,
          hasPoolTable: data.hasPoolTable,
          hasExerciseEquipment: data.hasExerciseEquipment,
          hasOutdoorShower: data.hasOutdoorShower,
          hasSmokeAlarm: data.hasSmokeAlarm,
          hasFirstAidKit: data.hasFirstAidKit,
          hasFireExtinguisher: data.hasFireExtinguisher,
          hasAccessibility: data.hasAccessibility,
        },
        type: data.type,
        isAllReserved: data.isAllReserved,
        numberOfEmptyRooms: data.numberOfEmptyRooms,
        overalRating: data.overalRating,
        totalReviews: data.totalReviews,
        guestAllowed: data.guestAllowed,
        host: data.host,
        reviews: data.reviews,
        address: data.address,
        images: data.images,
      };
    },
    toogleIsWishListed:(state,action) => {
      state.isWishlisted = !action.payload;
    }
  },
});
export const { setAllHotelData,toogleIsWishListed } = singleHotelSlice.actions;
export default singleHotelSlice.reducer;
