import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = true

export const sidebarToggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    createToggle: (state, action) => {
      return state = action.payload;
    },
  }
});

export const { createToggle } = sidebarToggleSlice.actions;

export const selectToggle = (state) => state.toggle;

export default sidebarToggleSlice.reducer;
