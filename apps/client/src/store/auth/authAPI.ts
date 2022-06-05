import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginData, LoginResponse, RegisterData, User } from '../../types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
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
        credentials: 'include',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useRegistrationUserMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi
