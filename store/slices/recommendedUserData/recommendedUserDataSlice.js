import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = []

export const recommendedUserDataSlice = createSlice({
  name: 'recommendedUser',
  initialState,
  reducers: {
    addData: (state, action) => {
      state = state.push(action.payload);
    },
  },
});

export const { addData } = recommendedUserDataSlice.actions;

export const selectRecommendedUserData = (state) => state.recommendedUser;

export default recommendedUserDataSlice.reducer;