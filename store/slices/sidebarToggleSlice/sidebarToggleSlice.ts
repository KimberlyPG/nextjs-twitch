import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: boolean = true;

export const sidebarToggleSlice = createSlice({
	name: 'toggle',
	initialState,
	reducers: {
		createToggle: (state, action: PayloadAction<boolean>) => {
		return state = action.payload;
		},
	}
});

export const { createToggle } = sidebarToggleSlice.actions;

export const selectToggle = (state: RootState) => state.toggle;

export default sidebarToggleSlice.reducer;
