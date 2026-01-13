import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {}

const initialState: GlobalState = {};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export default globalSlice.reducer;
