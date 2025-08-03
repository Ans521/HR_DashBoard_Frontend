import { configureStore } from "@reduxjs/toolkit";
import candidateSlice from './store/candidates'
import employeeSlice from './store/employe'
import leavesSlice from './store/leaves'
import sidebarSlice from './store/sidebar'
import userSlice from './store/user'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    candidates: candidateSlice,
    employee : employeeSlice,
    leaves : leavesSlice,
    sidebar : sidebarSlice,
    user : userSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;