import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { Follow } from '../../../types/types';

const initialState: Follow[] = []

export const followedSlice = createSlice({
	name: 'followed',
	initialState,
	reducers: {
		addFollowed: (state, action: PayloadAction<Follow[]>) => {
		    return state = action.payload;
		},
	},
});

export const { addFollowed } = followedSlice.actions;

export const selectFollowed = (state: RootState) => state.followed;

export default followedSlice.reducer;
