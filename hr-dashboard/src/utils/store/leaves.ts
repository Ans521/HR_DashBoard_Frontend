/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const leaveSlice = createSlice({
  name: "leaves",
  initialState: null,
  reducers: {
    setLeaves: (state, action) => action.payload,
    removeLeaves: () => null
  },
});

export const { setLeaves, removeLeaves } = leaveSlice.actions;
export default leaveSlice.reducer;
