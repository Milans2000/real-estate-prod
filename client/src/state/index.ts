import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice"; // 
import { api } from "./api";

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
