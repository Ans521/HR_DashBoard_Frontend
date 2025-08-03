import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Candidate {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  experience: string;
  resumeUrl: string;
}

type CandidatesState = Candidate[] | null;

const initialState: CandidatesState = [];

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addCandidates: (_state, action: PayloadAction<Candidate[]>) => {
      return action.payload;
    },
    removeCandidates: () => {
      return [];
    },
  },
});

export const { addCandidates, removeCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
