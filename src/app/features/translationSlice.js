import { createSlice } from '@reduxjs/toolkit';
import { setItemWithExpiration, getItemWithExpiration } from '../../utils/localStorageHelpers';

const initialState = {
  language: getItemWithExpiration('language') || 'en',
  textDirection: 'ltr',
};

if (getItemWithExpiration('language') === 'ar') {
  initialState.textDirection = 'rtl';
}

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;

      if (action.payload === 'ar') {
        state.textDirection = 'rtl';
      }
      else {
        state.textDirection = 'ltr';
      }

      setItemWithExpiration('language', action.payload, 1000 * 60 * 60 * 24 * 365); // year

    },
  },
});

export const { setLanguage } = translationSlice.actions;

export default translationSlice.reducer;
