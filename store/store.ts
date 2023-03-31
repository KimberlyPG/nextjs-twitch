import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import streamerSlice from './slices/streamer/streamerSlice';
import sidebarTogleSlice from './slices/sidebarToggleSlice/sidebarToggleSlice';

export const store = configureStore({
  reducer: {
    streamer: streamerSlice,
    toggle: sidebarTogleSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
