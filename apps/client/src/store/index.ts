import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from './auth/authAPI'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

//
/*
//
{
--statusCode: 200 | 201 ... - HTTP...
  status: OK | FAIL,
  message: '' | 'ERROR',
  data: null | ...
}
 */
