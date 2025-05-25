import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import bookingSlice from './slices/bookingSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: bookingSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;