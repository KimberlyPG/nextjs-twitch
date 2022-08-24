import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = []

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchData: (state, action) => {
      state = state.push(action.payload);
    },
    cleanState: (state, action) => {
      return state = action.payload;
    }
  },
});

export const { addSearchData, cleanState } = searchSlice.actions;

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
