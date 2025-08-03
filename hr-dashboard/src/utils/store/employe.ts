import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employee",
  initialState: null,
  reducers: {
    addEmployee: (state, action) => action.payload,
    removeEmployee: () => null
  },
});

export const { addEmployee, removeEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
