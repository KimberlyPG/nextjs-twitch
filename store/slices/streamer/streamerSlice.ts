import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { UserData } from '../../../types/types';

const initialState: UserData[] = []

export const streamerSlice = createSlice({
	name: 'streamer',
	initialState,
	reducers: {
		addStreamerData: (state, action: PayloadAction<UserData>) => {
		state.push(action.payload);
		},
		cleanState: (state, action: PayloadAction<[]>) => {
		return state = action.payload;
		}
	},
});

export const { addStreamerData, cleanState } = streamerSlice.actions;

export const selectStreamer = (state: RootState) => state.streamer;

export default streamerSlice.reducer;
