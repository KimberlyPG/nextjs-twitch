import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { LiveStreamsData } from '../../../types/types';

const initialState: LiveStreamsData[] = []

export const recommendedSlice = createSlice({
    name: 'recommended',
    initialState,
    reducers: {
		addList: (state, action: PayloadAction<LiveStreamsData[]>) => {
			return state = action.payload;
		},
    },
});

export const { addList } = recommendedSlice.actions;

export const selectRecommended = (state: RootState) => state.recommended;

export default recommendedSlice.reducer;