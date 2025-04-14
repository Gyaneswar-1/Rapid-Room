import { createSlice } from "@reduxjs/toolkit";

export type userStoreType = {
  hasDataInStore: boolean;
  id: number;
  fullName: string;
  email: string;
  phoneNumber: number;
  profileImage: string;
  govId: number;
  createdAt: string;
  isHost: boolean;
  hostExperience: number;
  hostRating: number;
  hostResponseRate: number;
  country: string;
  state: string;
  street: string;
  city: string;
  zipCode: string;
  longitude: string;
  latitude: string;
  upiID: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
};

const initialState: userStoreType = {
  hasDataInStore: false,
  id: 0,
  fullName: "",
  email: "",
  phoneNumber: 0,
  profileImage: "",
  govId: 0,
  createdAt: "",
  isHost: false,
  hostExperience: 0,
  hostRating: 0,
  hostResponseRate: 0,
  country: "",
  state: "",
  street: "",
  city: "",
  zipCode: "",
  longitude: "",
  latitude: "",
  status: "PENDING",
  upiID: "",
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setHasDataInStore: (state, action) => {
      state.hasDataInStore = action.payload;
    },
    setUserID: (state, action) => {
      state.id = action.payload;
    },
    setUserFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setUserProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setUserGovId: (state, action) => {
      state.govId = action.payload;
    },
    setUserCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    setUserIsHost: (state, action) => {
      state.isHost = action.payload;
    },
    setUserHostExperience: (state, action) => {
      state.hostExperience = action.payload;
    },
    setUserHostRating: (state, action) => {
      state.hostRating = action.payload;
    },
    setUserHostResponseRate: (state, action) => {
      state.hostResponseRate = action.payload;
    },
    setUserCountry: (state, action) => {
      state.country = action.payload;
    },
    setUserState: (state, action) => {
      state.state = action.payload;
    },
    setUserStreet: (state, action) => {
      state.street = action.payload;
    },
    setUserCity: (state, action) => {
      state.city = action.payload;
    },
    setUserZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
    setUserLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setUserLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setUserStatus: (state, action) => {
      state.status = action.payload;
    },
    setUserUpiID: (state, action) => {
      state.upiID = action.payload;
    },
    resetUserData: () => {
      initialState === null;
    },
  },
});

export default UserSlice.reducer;
export const {
  setHasDataInStore,
  setUserCity,
  setUserCountry,
  setUserCreatedAt,
  setUserEmail,
  setUserFullName,
  setUserGovId,
  setUserHostExperience,
  setUserHostRating,
  setUserHostResponseRate,
  setUserID,
  setUserIsHost,
  setUserLatitude,
  setUserLongitude,
  setUserPhoneNumber,
  setUserProfileImage,
  setUserState,
  setUserStreet,
  setUserZipCode,
  setUserStatus,
  resetUserData,
  setUserUpiID
} = UserSlice.actions;
