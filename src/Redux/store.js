import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from "./Admin/AdminSlice"
export const store = configureStore({
  reducer: {
    Admin : AdminReducer,
  },
})