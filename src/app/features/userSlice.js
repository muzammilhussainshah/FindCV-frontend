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
              state.user = action.payload;
              state.token = action.meta.arg;
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

export const { logoutUser, setLoading } = userReducer.actions;

export default userReducer.reducer;
