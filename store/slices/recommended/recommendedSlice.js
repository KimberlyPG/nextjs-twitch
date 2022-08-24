import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = []

export const recommendedSlice = createSlice({
  name: 'recommended',
  initialState,
  reducers: {
    addList: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { addList } = recommendedSlice.actions;

export const selectRecommended = (state) => state.recommended;

export default recommendedSlice.reducer;