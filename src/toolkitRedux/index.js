import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";
import userSlice from "./userSlice";



const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    user: userSlice,
})

export const store = configureStore({
    reducer: rootReducer
})