import { configureStore } from "@reduxjs/toolkit";
import contactProfileReducer from "../features/contactProfileSlice";

const store = configureStore({
  reducer: {
    contactProfile: contactProfileReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
