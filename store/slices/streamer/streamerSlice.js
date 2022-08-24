import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = [
]

export const streamerSlice = createSlice({
  name: 'streamer',
  initialState,
  reducers: {
    addStreamerData: (state, action) => {
      state = state.push(action.payload);
    },
    cleanState: (state, action) => {
      return state = action.payload;
    }
  },
});

export const { addStreamerData, cleanState } = streamerSlice.actions;

export const selectStreamer = (state) => state.streamer;

export default streamerSlice.reducer;
