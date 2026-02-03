import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "../slice/authSlice/authSlice";
import candidateSlice from "../slice/candidateSlice/candidateSlice";
import recruiterSlice from "../slice/recruiterSlice/recruiterSlice";

// 1. Create a function that returns a new store instance
export const makeStore = () => {
  return configureStore({
    reducer: {
      Auth: authSlice.reducer,
      Candidate: candidateSlice.reducer,
      Recruiter: recruiterSlice.reducer,
    },
  });
};

// 2. Derive types from the store creator
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// 3. Typed selector for use in components
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;