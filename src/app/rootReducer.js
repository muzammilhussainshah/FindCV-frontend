import { combineReducers } from '@reduxjs/toolkit';
import headerUIReducer from './features/headerUISlice';
import userReducer from './features/userSlice';

const rootReducer = combineReducers({
  headerUI: headerUIReducer,
  user: userReducer
});

export default rootReducer;