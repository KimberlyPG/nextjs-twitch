import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { LiveStreamsData } from '../../../types/types';
import { InitialStreamDataValues } from '../../../initialValues/intialDataValues';

const initialState: LiveStreamsData[] = [
  InitialStreamDataValues
]

export const followedLiveSlice = createSlice({
  name: 'followed',
  initialState,
  reducers: {
    addFollowedData: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { addFollowedData } = followedLiveSlice.actions;

export const selectFollowedLive = (state: RootState) => state.followed;

export default followedLiveSlice.reducer;