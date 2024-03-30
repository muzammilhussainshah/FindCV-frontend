import { combineReducers } from '@reduxjs/toolkit';
import headerUIReducer from './features/headerUISlice';
import userReducer from './features/userSlice';
import translationReducer from './features/translationSlice';

const rootReducer = combineReducers({
  headerUI: headerUIReducer,
  user: userReducer,
  translation: translationReducer
});

export default rootReducer;