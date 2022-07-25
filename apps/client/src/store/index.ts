import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { $api } from '../api'

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { $api },
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
