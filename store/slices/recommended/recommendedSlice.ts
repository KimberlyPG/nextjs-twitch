import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { LiveStreamsData } from '../../../types/types';
import { InitialStreamDataValues } from '../../../initialValues/intialDataValues';

const initialState: LiveStreamsData[] = [
  InitialStreamDataValues
]

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

export const selectRecommended = (state: RootState) => state.recommended;

export default recommendedSlice.reducer;