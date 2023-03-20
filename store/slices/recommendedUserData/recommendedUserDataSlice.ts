import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { UserData } from '../../../types/types';

const initialState: UserData[] = []

export const recommendedUserDataSlice = createSlice({
    name: 'recommendedUser',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<UserData>) => {
            state.push(action.payload);
        },
    },
});

export const { addData } = recommendedUserDataSlice.actions;

export const selectRecommendedUserData = (state: RootState) => state.recommendedUser;

export default recommendedUserDataSlice.reducer;