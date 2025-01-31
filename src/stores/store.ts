import { configureStore } from '@reduxjs/toolkit'
import { authSlices } from './slices/authSlice'

export const store = configureStore({
    reducer: {
        auth: authSlices.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;