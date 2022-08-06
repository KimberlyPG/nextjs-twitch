import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = []

export const followedOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addFollowedOrder: (state, action) => {
      state = state.push(action.payload);
    },
  },
});

export const { addFollowedOrder } = followedOrderSlice.actions;

export const selectFollowedOrder = (state) => state.order;

export default followedOrderSlice.reducer;