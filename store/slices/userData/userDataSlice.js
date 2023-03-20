import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state = action.payload;
    },
  },
});

export const { addUserData } = userDataSlice.actions;

export const selectUser = (state) => state.userData;

export default userDataSlice.reducer;
