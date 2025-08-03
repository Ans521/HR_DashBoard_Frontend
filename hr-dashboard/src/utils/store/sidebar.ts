import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: false,
  reducers: {
    setSideBar: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;