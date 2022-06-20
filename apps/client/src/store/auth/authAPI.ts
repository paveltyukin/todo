import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  CheckAuthResponse,
  LoginData,
  LoginResponse,
  RegisterData,
  User,
} from '../../types'
import { RootState } from '../index'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken
      const fingerprint = (getState() as RootState).auth.fingerprint
      const refreshToken = localStorage.getItem('refreshToken') ?? ''
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      if (fingerprint) {
        headers.set('x-fingerprint', fingerprint)
      }

      if (refreshToken) {
        headers.set('x-refresh-token', refreshToken)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    registrationUser: builder.mutation<User, RegisterData>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
      }),
    }),
    checkAuth: builder.mutation<CheckAuthResponse, void>({
      query: () => ({
        url: 'check-auth',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useRegistrationUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthMutation,
} = authApi
