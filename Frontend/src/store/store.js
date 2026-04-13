import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import rideReducer from "../features/rideSlice"
const store = configureStore({
    reducer:{
        auth: authReducer,
        rides: rideReducer,
    },
});

export default store;