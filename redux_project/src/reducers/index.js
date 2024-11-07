import { combineReducers } from '@reduxjs/toolkit';
import foodReducer from "./foodReducer";

export default combineReducers({
  foods:foodReducer
})
