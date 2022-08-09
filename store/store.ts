import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import streamerSlice from './slices/streamer/streamerSlice';
import followedLiveSlice from './slices/followedLive/followedLiveSlice'
import sidebarTogleSlice from './slices/sidebarToggleSlice/sidebarToggleSlice'
import searchSlice from './slices/searchSlice/searchSlice'

export const store = configureStore({
  reducer: {
    streamer: streamerSlice,
    followed: followedLiveSlice,
    toggle: sidebarTogleSlice,
    search: searchSlice
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
