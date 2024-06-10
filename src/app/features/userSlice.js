import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null, // User information
  token: null, // JWT token
  loading: true
};

export const fetchUserByToken = createAsyncThunk(
  'user/fetchUserByToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}user/getUserByToken/${token}`);
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('findcv_user');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateApplications: (state, action) => {
      state.user.applications = action.payload;
    },
    updateFavourites: (state, action) => {
      state.user.favourites = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchUserByToken.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserByToken.fulfilled, (state, action) => {

            if (action.payload === null) {
              state.loading = false;
              state.user = null;
              state.token = null;
              state.error = 'null user';
            }
            else {
              state.loading = false;
              state.token = action.meta.arg;

              state.user = action.payload;

              if (state.user.languages) {
                state.user.languages = state.user.languages.map((language) => {
                  return {
                      id: state.user.id + '-' + language.languageCode,
                      languageCode: language.languageCode,
                      level: language.level
                  };
                });
              }

              if (state.user.education) {
                state.user.education = state.user.education.map((diploma) => {
                  return {
                      id: diploma.id,
                      diploma: {
                          name: diploma.diploma
                      },
                      institution: diploma.institution,
                      startDate: diploma.start,
                      endDate: diploma.end
                  };
                });
              }

              if (state.user.skills) {
                state.user.skills = state.user.skills.map((skill) => {
                  return {
                      id: state.user.id + '-skill-' + skill.skill_code,
                      code: skill.skill_code
                  };
                });
              }

            }

        })
        .addCase(fetchUserByToken.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = action.payload;
        });
  }
});

export const { logoutUser, setLoading, updateApplications, updateFavourites } = userReducer.actions;

export default userReducer.reducer;
