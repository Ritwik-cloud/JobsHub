import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "../slice/authSlice/authSlice";
import candidateSlice from "../slice/candidateSlice/candidateSlice";
import recruiterSlice from "../slice/recruiterSlice/recruiterSlice";

export const store = configureStore({
    reducer:{
        Auth:authSlice.reducer,
        Candidate: candidateSlice.reducer,
        Recruiter: recruiterSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;