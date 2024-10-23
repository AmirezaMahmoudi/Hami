import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    access_token: "", // Added for better clarity
    firstname: "",
    id: null,
    lastname: "",
    permission: "",
    res: "",
    user: "",
  },
};

export const AdminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // Check if action.payload has the expected structure
      if (action.payload && typeof action.payload === "object") {
        state.userInfo = action.payload; // Store the entire userInfo payload
        state.permission = action.payload.permission || ""; // Fallback to empty string if permission is undefined
      } else {
        console.error("Invalid payload:", action.payload);
      }
    },
    clearUserInfo: (state) => {
      // Optional: A reducer to clear user info
      state.userInfo = initialState.userInfo; // Resetting to initial state
      state.permission = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo, clearUserInfo } = AdminSlice.actions;

export default AdminSlice.reducer;
