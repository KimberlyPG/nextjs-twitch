import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = []

export const followedLiveSlice = createSlice({
  name: 'followed',
  initialState,
  reducers: {
    addFollowedData: (state, action) => {
      return state = action.payload;
    },
    cleanState: (state, action) => {
      return state = action.payload;
    }
  },
});

export const { addFollowedData, cleanState } = followedLiveSlice.actions;

export const selectFollowedLive = (state) => state.followed;

export default followedLiveSlice.reducer;