import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { LiveStreamsData } from '../../../types/types';

const initialState: LiveStreamsData[] = []

export const followedLiveSlice = createSlice({
	name: 'followedLive',
	initialState,
	reducers: {
		addFollowedData: (state, action: PayloadAction<LiveStreamsData[]>) => {
			return state = action.payload;
		},
	},
});

export const { addFollowedData } = followedLiveSlice.actions;

export const selectFollowedLive = (state: RootState) => state.followedLive;

export default followedLiveSlice.reducer;