import { createSlice } from "@reduxjs/toolkit";

interface HotelState {
  hasData: boolean;
  hotelId: number;
  hotelName: string;
  description: string;
  roomType: string;
  perNight: number;
  isWishlisted:boolean;
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
  isWishlisted:false,
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
        isWishlisted:data.isWishlisted,
        amenities: {
          hasParking: data.hasParking,
          hasPool: data.hasPool,
          hasWifi: data.hasWifi,
          hasTv: data.hasTv,
          hasBalcony: data.hasBalcony,
          hasKitchen: data.hasKitchen,
          hasWorkSpace: data.hasWorkSpace,
          hasWashingMachine: data.hasWashingMachine,
          hasGarden: data.hasGarden,
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
  },
});
export const { setAllHotelData } = singleHotelSlice.actions;
export default singleHotelSlice.reducer;
